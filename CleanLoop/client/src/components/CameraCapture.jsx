import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Camera, X, RefreshCw, ImagePlus, Wand2, CameraOff } from 'lucide-react';
import { toCanvas, loadImage, fileToDataUrl } from '../lib/image.js';
import { drawDemoScene } from '../lib/demoScene.js';

const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Full-screen in-app camera. Photos come from the live camera (anti-fraud: no gallery).
// In demo mode two extra buttons appear: upload a photo, or generate a demo street scene.
export default function CameraCapture({ open, onClose, onCapture, title = 'Take a photo', hint, demoMode = false, demo = {} }) {
  const video = useRef(null);
  const stream = useRef(null);
  const fileRef = useRef(null);
  const camFileRef = useRef(null);
  const [facing, setFacing] = useState('environment');
  const [status, setStatus] = useState('starting'); // starting | live | unavailable
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    (async () => {
      setStatus('starting');
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('no camera api');
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1600 }, height: { ideal: 1200 } }, audio: false });
        if (cancelled) { s.getTracks().forEach((t) => t.stop()); return; }
        stream.current = s;
        if (video.current) { video.current.srcObject = s; await video.current.play().catch(() => {}); }
        setStatus('live');
      } catch {
        if (!cancelled) setStatus('unavailable');
      }
    })();
    return () => {
      cancelled = true;
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
    };
  }, [open, facing]);

  if (!open) return null;

  const shoot = () => {
    if (!video.current || status !== 'live') return;
    setFlash(true);
    setTimeout(() => setFlash(false), 160);
    const c = toCanvas(video.current, 1280);
    onCapture(c, { mode: 'camera' });
  };

  const fromFile = async (file, mode) => {
    if (!file) return;
    const img = await loadImage(await fileToDataUrl(file));
    onCapture(toCanvas(img, 1280), { mode });
  };

  const demoShot = () => onCapture(drawDemoScene({ seed: demo.seed ?? Math.floor(Math.random() * 1e6), clean: Boolean(demo.clean), kind: demo.kind || 'mixed' }), { mode: 'camera', demo: true });

  return createPortal(
    <motion.div className="fixed inset-0 z-[1800] flex flex-col bg-black text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)]">
        <button onClick={onClose} className="rounded-full bg-white/10 p-2.5" aria-label="Close camera"><X size={22} /></button>
        <div className="text-center">
          <p className="font-display text-base font-semibold">{title}</p>
          {hint && <p className="text-xs text-white/60">{hint}</p>}
        </div>
        <button onClick={() => setFacing((f) => (f === 'environment' ? 'user' : 'environment'))} className="rounded-full bg-white/10 p-2.5" aria-label="Switch camera" disabled={status !== 'live'}><RefreshCw size={20} /></button>
      </div>

      <div className="relative mx-auto flex w-full max-w-xl flex-1 items-center justify-center overflow-hidden">
        <video ref={video} playsInline muted className={`h-full w-full object-cover ${status === 'live' ? '' : 'hidden'}`} />
        {status === 'live' && (
          <div className="pointer-events-none absolute inset-6 rounded-3xl border-2 border-white/40">
            <span className="absolute -left-0.5 -top-0.5 h-8 w-8 rounded-tl-3xl border-l-4 border-t-4 border-lime" />
            <span className="absolute -right-0.5 -top-0.5 h-8 w-8 rounded-tr-3xl border-r-4 border-t-4 border-lime" />
            <span className="absolute -bottom-0.5 -left-0.5 h-8 w-8 rounded-bl-3xl border-b-4 border-l-4 border-lime" />
            <span className="absolute -bottom-0.5 -right-0.5 h-8 w-8 rounded-br-3xl border-b-4 border-r-4 border-lime" />
          </div>
        )}
        {status === 'starting' && <p className="text-white/70">Starting camera…</p>}
        {status === 'unavailable' && (
          <div className="max-w-xs px-6 text-center">
            <CameraOff size={40} className="mx-auto mb-3 text-white/60" />
            <p className="font-display text-lg font-semibold">Live camera not available</p>
            <p className="mt-1 text-sm text-white/60">Allow camera access in your browser. On a phone, camera access needs the https link of your deployed app.</p>
            <button onClick={() => camFileRef.current?.click()} className="btn-lime mt-5 w-full"><Camera size={18} />Open phone camera</button>
          </div>
        )}
        {flash && <div className="absolute inset-0 bg-white" />}
      </div>

      <div className="flex items-center justify-center gap-6 px-6 pb-[max(env(safe-area-inset-bottom),22px)] pt-5">
        {demoMode ? (
          <button onClick={() => fileRef.current?.click()} className="flex w-20 flex-col items-center gap-1 text-xs text-white/70"><span className="rounded-full bg-white/10 p-3"><ImagePlus size={20} /></span>Upload</button>
        ) : <span className="w-20" />}
        <button onClick={shoot} disabled={status !== 'live'} aria-label="Take photo" className="relative h-20 w-20 rounded-full border-4 border-white/90 disabled:opacity-40">
          <span className="absolute inset-1.5 rounded-full bg-white transition active:scale-90" />
        </button>
        {demoMode ? (
          <button onClick={demoShot} className="flex w-20 flex-col items-center gap-1 text-xs text-white/70"><span className="rounded-full bg-lime/20 p-3 text-lime"><Wand2 size={20} /></span>Demo photo</button>
        ) : <span className="w-20" />}
      </div>
      {demoMode && <p className="pb-3 text-center text-[11px] text-white/40">Demo mode: upload and demo photos are enabled for testing on laptops.</p>}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => fromFile(e.target.files?.[0], 'upload')} />
      <input ref={camFileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => fromFile(e.target.files?.[0], isMobile() ? 'camera' : 'upload')} />
    </motion.div>,
    document.body,
  );
}
