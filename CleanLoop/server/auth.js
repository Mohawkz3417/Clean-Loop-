import crypto from 'node:crypto';
import { config } from './config.js';
import { find } from './db.js';

export function hashPassword(pw) {
  const salt = crypto.randomBytes(8).toString('hex');
  const h = crypto.scryptSync(String(pw), salt, 32).toString('hex');
  return `${salt}:${h}`;
}

export function checkPassword(pw, stored) {
  if (!stored) return false;
  const [salt, h] = stored.split(':');
  const test = crypto.scryptSync(String(pw), salt, 32).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(h, 'hex'), Buffer.from(test, 'hex'));
}

const b64 = (s) => Buffer.from(s).toString('base64url');

export function signToken(user) {
  const payload = b64(JSON.stringify({ id: user.id, role: user.role, iat: Date.now() }));
  const sig = crypto.createHmac('sha256', config.secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const expect = crypto.createHmac('sha256', config.secret).update(payload).digest('base64url');
  if (sig.length !== expect.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch {
    return null;
  }
}

export function publicUser(u) {
  if (!u) return null;
  const { password, ...rest } = u;
  return rest;
}

// Express middleware: attaches req.user if a valid token is present.
export function authOptional(req, _res, next) {
  const h = req.headers.authorization || '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : null;
  const p = verifyToken(t);
  if (p) {
    const u = find('users', p.id);
    if (u && !u.suspended) req.user = u;
  }
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Please sign in to continue.' });
    if (roles.length && !roles.includes(req.user.role)) return res.status(403).json({ error: 'Your account does not have access to this.' });
    next();
  };
}
