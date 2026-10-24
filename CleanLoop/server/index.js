// CleanLoop server: serves the API and the built web app from one process.
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { exec } from 'node:child_process';
import { config, ROOT } from './config.js';
import { load, dbExists, UPLOAD_DIR, ensureDirs } from './db.js';
import { reseed } from './seed.js';
import { api, runEscalations } from './routes.js';
import { aiStatus } from './ai.js';

const args = process.argv.slice(2);
ensureDirs();
const fresh = !dbExists();
load();
if (fresh || args.includes('--reset') || args.includes('--reset-only')) {
  reseed();
  console.log('Demo data created.');
  if (args.includes('--reset-only')) process.exit(0);
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '25mb' }));
app.use('/api', api);
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

const dist = path.join(ROOT, 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false }));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  app.get('/', (req, res) => res.send('The web app has not been built yet. Run: npm run build'));
}

setInterval(() => { try { runEscalations(); } catch (e) { console.error(e); } }, 60 * 1000);

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function start(port, attempt = 0) {
  const server = app.listen(port, () => {
    const ai = aiStatus();
    const url = `http://localhost:${port}`;
    const lan = Object.values(os.networkInterfaces()).flat().find((i) => i && i.family === 'IPv4' && !i.internal);
    console.log('');
    console.log('  CleanLoop is running');
    console.log(`  Open on this computer:  ${url}`);
    if (lan) console.log(`  Same Wi-Fi network:     http://${lan.address}:${port}  (camera/GPS on phones need https - see README)`);
    console.log(`  AI: offline model in the browser${ai.cloud.length ? ` + ${ai.cloud.join(', ')} (${ai.gemini.model})` : ' (add GEMINI_API_KEY in .env for cloud AI)'}`);
    console.log(`  Demo mode: ${config.demoMode ? 'on' : 'off'}`);
    console.log('  Demo logins: citizen@cleanloop.in / demo123, worker@cleanloop.in / demo123, admin@cleanloop.in / admin123');
    console.log('  Press Ctrl+C to stop.');
    console.log('');
    if (args.includes('--open')) openBrowser(url);
  });
  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE' && attempt < 10 && !process.env.PORT) {
      console.log(`  Port ${port} is busy, trying ${port + 1}...`);
      start(port + 1, attempt + 1);
    } else {
      console.error(`  Could not start the server: ${e.message}`);
      process.exit(1);
    }
  });
}
start(config.port);
