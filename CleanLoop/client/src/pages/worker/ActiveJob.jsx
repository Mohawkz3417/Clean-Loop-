import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Marker, Polyline, Circle } from 'react-leaflet';
import { ChevronLeft, Navigation, MapPin, Camera, CheckCircle2, ShieldCheck, AlertTriangle, Timer, XCircle, Footprints, HardHat, Cpu, Cloud } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { getLocation, distanceM } from '../../lib/geo.js';
import { BaseMap, pinIcon, meIcon, FitBounds, InvalidateOnResize } from '../../components/maps.jsx';
import CameraCapture from '../../components/CameraCapture.jsx';
import ScanOverlay from '../../components/ScanOverlay.jsx';
import { CategoryTile, SeverityPill, Skeleton, Spinner, CATEGORY_LABEL } from '../../components/ui.jsx';
import { Photo, BeforeAfter } from '../../components/media.jsx';
import { verifyCleanupOffline } from '../../lib/ai.js';
import { canvasToJpeg, dataUrlToCanvas } from '../../lib/image.js';
import { celebrate } from '../../lib/confetti.js';
import { inr, dist } from '../../lib/format.js';

const STEPS = ['Go to spot', 'Check in', 'Before photo', 'Clean & verify'];
const SAFETY = ['Gloves on', 'Mask on', 'Sharps box / sealed bag ready', 'Closed shoes'];

function seedFrom(id) { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

export default function ActiveJob() {
  const { id } = useParams();
  const { user } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const base = pathname.startsWith('/app') ? '/app' : '/worker';
  const [job, setJob] = useState(null);
  const [me, setMe] = useState(null);
  const [checks, setChecks] = useState([]);
  const [cam, setCam] = useState(null); // 'before' | 'after'
  const [busy, setBusy] = useState('');
  const [afterShot, setAfterShot] = useState(null);
  const [verdict, setVerdict] = useState(null);

  const load = async () => {
    const a = await get('/jobs/active').catch(() => ({ jobs: [] }));
    const j = a.jobs.find((x) => x.id === id);
    if (j) return setJob(j);
    const h = await get('/jobs/history').catch(() => ({ jobs: [] }));
    const done = h.jobs.find((x) => x.id === id);
    if (done) return setJob(done);
    toast('This job is not assigned to you any more.', 'error');
    nav(base === '/app' ? '/app/volunteer' : '/worker');
  };
  useEffect(() => { load(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { getLocation().then((g) => g.ok && setMe({ lat: g.lat, lng: g.lng, accuracy: g.accuracy })); }, []);

  const step = !job ? 0 : job.status === 'claimed' ? (me && distanceM(me, job) < (meta?.geofenceM || 60) ? 1 : 0) : job.status === 'in_progress' ? (job.beforePhoto ? 3 : 2) : 4;
  const distance = me && job ? distanceM(me, job) : null;
  const near = distance != null && distance <= (meta?.geofenceM || 60);

  const checkin = async (simulated = false) => {
    setBusy('checkin');
    try {
      const g = simulated ? { ok: true, lat: job.lat, lng: job.lng } : await getLocation();
      if (!g.ok) throw new Error(g.reason);
      const loc = simulated ? { lat: me?.lat ?? job.lat, lng: me?.lng ?? job.lng } : g;
      const r = await post(`/jobs/${id}/checkin`, { lat: loc.lat, lng: loc.lng, simulated, checklist: checks });
      setJob(r.job);
      toast('Checked in. Take the before photo.');
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };

  const onPhoto = async (canvas) => {
    const which = cam;
    setCam(null);
    const dataUrl = canvasToJpeg(canvas);
    const g = await getLocation({ timeout: 5000 });
    const loc = g.ok ? { lat: g.lat, lng: g.lng } : { lat: job.lat, lng: job.lng };
    if (which === 'before') {
      setBusy('before');
      try { const r = await post(`/jobs/${id}/before`, { image: dataUrl, ...loc }); setJob(r.job); toast('Before photo saved. Start cleaning!'); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
      return;
    }
    setAfterShot(dataUrl);
    setBusy('verify');
    try {
      const beforeCanvas = await dataUrlToCanvas(job.beforePhoto);
      const offline = verifyCleanupOffline(beforeCanvas, canvas);
      const simulated = !g.ok || distanceM(loc, job) > (meta?.geofenceM || 60);
      const [r] = await Promise.all([post(`/jobs/${id}/after`, { image: dataUrl, lat: simulated ? job.lat : loc.lat, lng: simulated ? job.lng : loc.lng, simulated, offline }), new Promise((res) => setTimeout(res, 2600))]);
      setJob(r.job);
      setVerdict(r.verification);
      if (r.verification.passed) celebrate(true);
    } catch (e) { toast(e.message, 'error'); setAfterShot(null); } finally { setBusy(''); }
  };

  const release = async () => {
    if (!window.confirm('Release this job back to the feed?')) return;
    await post(`/jobs/${id}/release`).catch((e) => toast(e.message, 'error'));
    nav(base === '/app' ? '/app/volunteer' : '/worker');
  };

  if (!job) return <div className="space-y-3 p-4 pt-10"><Skeleton className="h-64" /><Skeleton className="h-32" /></div>;
  const demoSeed = seedFrom(job.id);
  const kind = ['plastic', 'organic', 'construction', 'medical', 'paper'].includes(job.ai?.category) ? job.ai.category : 'mixed';

  return (
    <div className="pb-10">
      <CameraCapture open={Boolean(cam)} onClose={() => setCam(null)} onCapture={onPhoto}
        title={cam === 'before' ? 'Before photo' : 'After photo'} hint={cam === 'before' ? 'Show the waste and its surroundings' : 'Stand where you took the before photo'}
        demoMode={meta?.demoMode} demo={{ seed: demoSeed, clean: cam === 'after', kind }} />

      <header className="flex items-center gap-2 px-4 pb-2 pt-[max(env(safe-area-inset-top),14px)]">
        <button onClick={() => nav(base === '/app' ? '/app' : '/worker')} className="-ml-1 rounded-full p-2 hover:bg-white" aria-label="Back"><ChevronLeft size={22} /></button>
        <div className="min-w-0 flex-1"><h1 className="truncate text-xl font-bold">{CATEGORY_LABEL[job.ai?.category]}</h1><p className="text-xs text-ink-faint">{wardName(meta, job.ward)} · {job.payUnit === 'Rs' ? inr(job.yourPay) : `${job.yourPay} points`}</p></div>
        <SeverityPill severity={job.ai?.severity} />
      </header>

      {step < 4 && (
        <div className="mb-3 flex gap-1.5 px-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-line"><motion.div className="h-full bg-canopy" initial={false} animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }} /></div>
              <p className={`mt-1 text-[10px] font-semibold ${i <= step ? 'text-canopy' : 'text-ink-faint'}`}>{s}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 px-4">
        {/* map for navigation / checkin */}
        {step <= 1 && (
          <section className="overflow-hidden rounded-3xl bg-white shadow-lift">
            <div className="h-64">
              <BaseMap center={[job.lat, job.lng]} zoom={15} zoomControl={false}>
                <InvalidateOnResize />
                <Circle center={[job.lat, job.lng]} radius={meta?.geofenceM || 60} pathOptions={{ color: '#14A06B', fillColor: '#B6F04A', fillOpacity: 0.2, weight: 1.5 }} />
                <Marker position={[job.lat, job.lng]} icon={pinIcon('#F0574A')} />
                {me && <Marker position={[me.lat, me.lng]} icon={meIcon()} />}
                {me && distance < 30000 && <Polyline positions={[[me.lat, me.lng], [job.lat, job.lng]]} pathOptions={{ color: '#0E5E4A', weight: 4, dashArray: '8 8' }} />}
                <FitBounds points={me && distance < 30000 ? [[me.lat, me.lng], [job.lat, job.lng]] : [[job.lat, job.lng]]} padding={50} maxZoom={16} />
              </BaseMap>
            </div>
            <div className="flex items-center gap-3 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canopy-50 text-canopy"><Footprints size={22} /></span>
              <div className="flex-1">
                <p className="font-semibold">{distance == null ? 'Locating you…' : near ? 'You are at the spot' : `${dist(distance)} away`}</p>
                <p className="text-xs text-ink-faint">{job.address} · check in within {meta?.geofenceM || 60} m</p>
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${job.lat},${job.lng}`} target="_blank" rel="noreferrer" className="btn-soft btn-sm"><Navigation size={16} />Navigate</a>
            </div>
          </section>
        )}

        {step <= 1 && (
          <section className="rounded-3xl bg-white p-4 shadow-lift">
            <div className="flex gap-3">
              <Photo src={job.photo} category={job.ai?.category} seed={job.id} className="h-20 w-20 shrink-0 rounded-2xl" />
              <div className="text-sm">
                <p className="font-semibold">What to expect</p>
                <p className="text-ink-soft">{meta?.volumes?.[job.ai?.volume]?.label} · {job.ai?.items?.slice(0, 3).join(', ')}</p>
                {job.ai?.workerNote && <p className="mt-1 text-xs text-ink-faint">{job.ai.workerNote}</p>}
                {job.note && <p className="mt-1 text-xs text-ink-faint">Citizen note: “{job.note}”</p>}
              </div>
            </div>
            {job.ai?.hazard && (
              <div className="mt-4 rounded-2xl border border-coral/30 bg-coral-soft p-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-coral-deep"><HardHat size={18} />Safety checklist (required)</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {SAFETY.map((s) => (
                    <label key={s} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 text-xs font-medium">
                      <input type="checkbox" className="h-4 w-4 accent-canopy" checked={checks.includes(s)} onChange={() => setChecks((c) => (c.includes(s) ? c.filter((x) => x !== s) : [...c, s]))} />{s}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => checkin(false)} disabled={busy === 'checkin' || (job.ai?.hazard && checks.length < 3)} className="btn-primary mt-4 w-full">{busy === 'checkin' ? <Spinner /> : <MapPin size={18} />}Check in at the spot</button>
            {meta?.demoMode && !near && (
              <button onClick={() => checkin(true)} disabled={busy === 'checkin' || (job.ai?.hazard && checks.length < 3)} className="mt-2 w-full py-2 text-sm font-semibold text-canopy">Demo: simulate arriving at the spot</button>
            )}
            <button onClick={release} className="mt-1 w-full py-2 text-xs font-semibold text-ink-faint">Can't do it? Release the job</button>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-3xl bg-white p-5 text-center shadow-lift">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-canopy-50 text-canopy"><Camera size={30} /></span>
            <p className="mt-3 font-display text-lg font-bold">Take the before photo</p>
            <p className="mt-1 text-sm text-ink-soft">Include walls, poles or landmarks so the AI can match it with the after photo.</p>
            <button onClick={() => setCam('before')} disabled={busy === 'before'} className="btn-primary mt-4 w-full">{busy === 'before' ? <Spinner /> : <Camera size={18} />}Open camera</button>
          </section>
        )}

        {step === 3 && !afterShot && (
          <section className="rounded-3xl bg-white p-4 shadow-lift">
            <Photo src={job.beforePhoto} category={job.ai?.category} seed={job.id} className="aspect-[4/3] w-full rounded-2xl" />
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-marigold-soft text-marigold-deep"><Timer size={22} /></span>
              <div className="flex-1"><p className="font-semibold">Cleaning in progress</p><p className="text-xs text-ink-faint">Segregate dry, wet and hazardous waste while bagging.</p></div>
            </div>
            <button onClick={() => setCam('after')} className="btn-primary mt-4 w-full"><CheckCircle2 size={18} />Done - take the after photo</button>
          </section>
        )}

        {afterShot && busy === 'verify' && (
          <section>
            <ScanOverlay src={afterShot} active steps={['Matching the location', 'Comparing before and after', 'Checking for leftover waste']} className="aspect-[4/3] w-full" />
          </section>
        )}

        <AnimatePresence>
          {step === 4 && (
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {(job.afterPhoto || job.beforePhoto) && <BeforeAfter before={job.beforePhoto} after={job.afterPhoto} category={job.ai?.category} seed={job.id} className="aspect-[4/3] w-full" />}
              <div className={`rounded-3xl p-5 text-center ${job.status === 'completed' ? 'bg-canopy text-white' : 'bg-white shadow-lift'}`}>
                {job.status === 'completed' ? (<>
                  <ShieldCheck size={40} className="mx-auto text-lime" />
                  <p className="mt-2 font-display text-2xl font-bold">Cleanup verified</p>
                  <p className="mt-1 text-sm text-white/80">{job.payUnit === 'Rs' ? `${inr(job.yourPay)} is ${job.payoutStatus === 'released' ? 'in your wallet' : 'held until the citizen confirms (max 24 h)'}.` : `${job.yourPay} points added. Thank you!`}</p>
                </>) : job.status === 'verifying' ? (<>
                  <AlertTriangle size={36} className="mx-auto text-marigold" />
                  <p className="mt-2 font-display text-xl font-bold">Sent for a manual check</p>
                  <p className="mt-1 text-sm text-ink-soft">{(verdict || job.verification)?.remark || 'The AI was not sure.'} The ward office will review the photos shortly.</p>
                </>) : (<>
                  <XCircle size={36} className="mx-auto text-coral" />
                  <p className="mt-2 font-display text-xl font-bold">Disputed by the citizen</p>
                  <p className="mt-1 text-sm text-ink-soft">The ward office is reviewing. Payment is on hold.</p>
                </>)}
              </div>
              {(verdict || job.verification) && (
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-2xl bg-white p-2.5 shadow-lift"><p className="font-display text-lg font-bold">{Math.round(((verdict || job.verification).sceneMatch || 0) * 100)}%</p><p className="text-ink-faint">Same place</p></div>
                  <div className="rounded-2xl bg-white p-2.5 shadow-lift"><p className="font-display text-lg font-bold">{Math.round(((verdict || job.verification).garbageAfter || 0) * 100)}%</p><p className="text-ink-faint">Waste left</p></div>
                  <div className="rounded-2xl bg-white p-2.5 shadow-lift"><p className="flex items-center justify-center gap-1 font-display text-lg font-bold">{(verdict || job.verification).provider === 'gemini' ? <Cloud size={16} /> : <Cpu size={16} />}</p><p className="text-ink-faint">{(verdict || job.verification).provider === 'gemini' ? 'Gemini' : 'On-device AI'}</p></div>
                </div>
              )}
              <button onClick={() => nav(base === '/app' ? '/app' : '/worker')} className="btn-primary w-full">{base === '/app' ? 'Back to home' : 'Find the next job'}</button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
