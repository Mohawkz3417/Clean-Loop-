import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, MapPin, Cpu, Cloud, AlertTriangle, Layers, CheckCircle2, RotateCcw, ChevronLeft, Pencil, Sparkles, Info } from 'lucide-react';
import { Marker } from 'react-leaflet';
import CameraCapture from '../../components/CameraCapture.jsx';
import ScanOverlay from '../../components/ScanOverlay.jsx';
import { BaseMap, PickLocation, Recenter, dotIcon, InvalidateOnResize } from '../../components/maps.jsx';
import { CategoryTile, CATEGORY_LABEL, CATEGORY_COLOR, SEVERITY_STYLE, Spinner, Icon, CATEGORY_ICON } from '../../components/ui.jsx';
import { analyzeOffline, loadModel } from '../../lib/ai.js';
import { canvasToJpeg, dHash } from '../../lib/image.js';
import { getLocation, nearCity } from '../../lib/geo.js';
import { post } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useAuth } from '../../lib/auth.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { celebrate } from '../../lib/confetti.js';
import { queueReport } from '../../lib/offlineQueue.js';
import { inr, dist } from '../../lib/format.js';

const VOL_BASE = { bag: 22, pile: 42, cart: 62, truck: 80 };
const sevFromScore = (s) => (s >= 80 ? 'critical' : s >= 58 ? 'high' : s >= 35 ? 'medium' : 'low');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function SeverityGauge({ score }) {
  const sev = sevFromScore(score);
  const color = SEVERITY_STYLE[sev].dot;
  const a = Math.PI * (1 - score / 100);
  return (
    <div className="relative mx-auto w-full max-w-[150px]">
      <svg viewBox="0 0 120 70" className="w-full">
        <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#E4ECE8" strokeWidth="11" strokeLinecap="round" />
        <motion.path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" pathLength="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: score / 100 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
        <motion.circle r="5" fill="#0C2620" initial={false} animate={{ cx: 60 + Math.cos(a) * 50, cy: 62 - Math.sin(a) * 50 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="font-display text-2xl font-bold leading-none" style={{ color }}>{score}</p>
      </div>
    </div>
  );
}

export default function Report() {
  const meta = useMeta();
  const { user, refresh } = useAuth();
  const toast = useToast();
  const { t } = useI18n();
  const nav = useNavigate();
  const [cam, setCam] = useState(true);
  const [stage, setStage] = useState('capture'); // capture | scanning | result | done
  const [photo, setPhoto] = useState(null);
  const [captureMode, setCaptureMode] = useState('camera');
  const [phash, setPhash] = useState(null);
  const [ai, setAi] = useState(null);
  const [loc, setLoc] = useState(null);
  const [locInfo, setLocInfo] = useState({ state: 'finding' });
  const [dup, setDup] = useState(null);
  const [editType, setEditType] = useState(false);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const capturedAt = useRef(null);

  const ward = useMemo(() => meta?.wards?.find((w) => w.id === user?.ward) || meta?.wards?.[0], [meta, user]);

  // preload the model + start GPS while the camera is open
  useEffect(() => { loadModel().catch(() => {}); }, []);
  useEffect(() => {
    if (!meta) return;
    (async () => {
      const g = await getLocation();
      const center = ward ? { lat: ward.lat, lng: ward.lng } : null;
      if (g.ok && (nearCity(g, center) || !meta.demoMode)) {
        setLoc({ lat: g.lat, lng: g.lng, accuracy: g.accuracy });
        setLocInfo({ state: 'gps', accuracy: g.accuracy });
      } else if (meta.demoMode && center) {
        setLoc({ lat: center.lat + (Math.random() - 0.5) * 0.01, lng: center.lng + (Math.random() - 0.5) * 0.01 });
        setLocInfo({ state: 'demo', reason: g.ok ? 'You are outside the demo city, so the pin was placed in your ward.' : g.reason });
      } else {
        setLocInfo({ state: 'manual', reason: g.reason });
        if (center) setLoc({ lat: center.lat, lng: center.lng });
      }
    })();
  }, [meta]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCapture = async (canvas, m) => {
    setCam(false);
    const dataUrl = canvasToJpeg(canvas);
    capturedAt.current = new Date().toISOString();
    setPhoto(dataUrl);
    setCaptureMode(m.mode);
    setPhash(dHash(canvas));
    setStage('scanning');
    setDup(null);
    const minDelay = wait(2600);
    const offlineP = analyzeOffline(canvas);
    const cloudP = meta?.ai?.cloud?.length ? post('/ai/analyze', { image: dataUrl }).then((r) => r.cloud).catch(() => null) : Promise.resolve(null);
    const [offline, cloud] = await Promise.all([offlineP, cloudP, minDelay]);
    const merged = cloud ? { ...cloud, offline: { category: offline.category, confidence: offline.confidence } } : offline;
    if (!merged.summary) merged.summary = `${meta?.volumes?.[merged.volume]?.label || 'Pile'} of ${CATEGORY_LABEL[merged.category].toLowerCase()}`;
    setAi(merged);
    setStage('result');
  };

  // duplicate check when we have everything
  useEffect(() => {
    if (stage !== 'result' || !loc || !ai) return;
    post('/reports/check-duplicate', { lat: loc.lat, lng: loc.lng, phash, category: ai.category }).then(setDup).catch(() => {});
  }, [stage, loc?.lat, loc?.lng, ai?.category]); // eslint-disable-line react-hooks/exhaustive-deps

  const setVolume = (v) => setAi((a) => {
    const score = Math.max(5, Math.min(98, VOL_BASE[v] + (a.hazard ? 22 : 0) + (a.severityScore - VOL_BASE[a.volume] - (a.hazard ? 22 : 0)) * 0.5));
    return { ...a, volume: v, severityScore: Math.round(score), severity: sevFromScore(score), correctedByUser: true };
  });
  const setCategory = (c) => setAi((a) => {
    const hazard = meta?.categories?.[c]?.hazard || false;
    const score = Math.max(5, Math.min(98, a.severityScore + (hazard && !a.hazard ? 22 : !hazard && a.hazard ? -22 : 0)));
    setEditType(false);
    return { ...a, category: c, hazard, severityScore: score, severity: sevFromScore(score), correctedByUser: true, summary: `${meta?.volumes?.[a.volume]?.label} of ${CATEGORY_LABEL[c].toLowerCase()}` };
  });

  const submit = async () => {
    if (!loc) return toast('Set the location first.', 'error');
    setBusy(true);
    try {
      const r = await post('/reports', { image: photo, lat: loc.lat, lng: loc.lng, accuracy: loc.accuracy, ai, phash, captureMode, capturedAt: capturedAt.current, note });
      setResult(r);
      setStage('done');
      celebrate(!r.merged);
      refresh();
    } catch (e) {
      if (e.status === 0 && queueReport({ image: photo, lat: loc.lat, lng: loc.lng, accuracy: loc.accuracy, ai, phash, captureMode, capturedAt: capturedAt.current, note })) {
        toast('You are offline. The report is saved on your phone and will be sent automatically when you are back online.', 'info');
        nav('/app');
      } else toast(e.message, 'error');
    } finally { setBusy(false); }
  };

  const retake = () => { setStage('capture'); setAi(null); setPhoto(null); setCam(true); };
  const payout = ai && meta ? Math.round(meta.volumes[ai.volume].pay * (meta.categories[ai.category].hazard ? 1.5 : 1) * (ai.severity === 'critical' ? 1.2 : 1) / 5) * 5 : 0;
  const pts = ai && meta ? meta.severity[ai.severity].points : 0;

  return (
    <div className="min-h-screen pb-10">
      <CameraCapture open={cam} onClose={() => (photo ? setCam(false) : nav('/app'))} onCapture={onCapture} title={t('reportGarbage')} hint="Fit the whole pile in the frame" demoMode={meta?.demoMode} demo={{ kind: ['plastic', 'mixed', 'organic', 'construction'][Math.floor(Math.random() * 4)] }} />

      <header className="flex items-center gap-2 px-4 pb-2 pt-[max(env(safe-area-inset-top),14px)]">
        <button onClick={() => nav('/app')} className="-ml-1 rounded-full p-2 hover:bg-white" aria-label="Back"><ChevronLeft size={22} /></button>
        <h1 className="text-xl font-bold">{stage === 'done' ? 'Report sent' : t('reportGarbage')}</h1>
      </header>

      {stage === 'capture' && !cam && (
        <div className="px-4 pt-10 text-center">
          <button onClick={() => setCam(true)} className="btn-primary"><Camera size={18} />{t('takePhoto')}</button>
        </div>
      )}

      {(stage === 'scanning' || stage === 'result') && photo && (
        <div className="px-4">
          <ScanOverlay src={photo} active={stage === 'scanning'} className="aspect-[4/3] w-full" />
          {stage === 'scanning' && <p className="mt-3 text-center text-sm text-ink-soft">{t('analysing')}. The model runs on your phone - no upload needed.</p>}
        </div>
      )}

      <AnimatePresence>
        {stage === 'result' && ai && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="space-y-3 px-4 pt-3">
            {/* AI result */}
            <section className="rounded-3xl bg-white p-4 shadow-lift">
              <div className="flex items-start gap-3">
                <CategoryTile category={ai.category} size={52} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-xl font-bold">{CATEGORY_LABEL[ai.category]}</p>
                    {ai.correctedByUser && <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] text-ink-soft">edited</span>}
                  </div>
                  <p className="text-sm text-ink-soft">{ai.summary}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist"><motion.div className="h-full rounded-full" style={{ background: CATEGORY_COLOR[ai.category] }} initial={{ width: 0 }} animate={{ width: `${Math.round(ai.confidence * 100)}%` }} transition={{ duration: 0.9 }} /></div>
                    <span className="num text-xs font-semibold text-ink-soft">{Math.round(ai.confidence * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink-soft">
                  {ai.provider === 'gemini' ? <Cloud size={13} /> : <Cpu size={13} />}{ai.providerLabel}
                </span>
                <button onClick={() => setEditType((x) => !x)} className="inline-flex items-center gap-1 text-sm font-semibold text-canopy"><Pencil size={14} />Not right?</button>
              </div>
              <AnimatePresence>
                {editType && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {Object.keys(CATEGORY_LABEL).map((c) => (
                        <button key={c} onClick={() => setCategory(c)} className={`flex flex-col items-center gap-1 rounded-2xl border p-2 text-[11px] font-semibold ${ai.category === c ? 'border-canopy bg-canopy-50' : 'border-line'}`}>
                          <Icon name={CATEGORY_ICON[c]} size={18} style={{ color: CATEGORY_COLOR[c] }} />{CATEGORY_LABEL[c]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-white p-4 shadow-lift">
                <p className="text-xs font-semibold text-ink-faint">Severity</p>
                <SeverityGauge score={ai.severityScore} />
                <p className="mt-1 text-center text-sm font-bold" style={{ color: SEVERITY_STYLE[ai.severity].dot }}>{SEVERITY_STYLE[ai.severity].label}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-lift">
                <p className="text-xs font-semibold text-ink-faint">How much?</p>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {Object.entries(meta.volumes).map(([k, v]) => (
                    <button key={k} onClick={() => setVolume(k)} className={`rounded-xl px-2 py-2 text-xs font-semibold transition ${ai.volume === k ? 'bg-canopy text-white' : 'bg-mist text-ink-soft'}`}>{v.label}</button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-ink-faint">≈ {meta.volumes[ai.volume].kg} kg{meta.volumes[ai.volume].needsVehicle ? ' · needs a vehicle' : ''}</p>
              </div>
            </section>

            {ai.hazard && (
              <section className="flex gap-3 rounded-3xl border border-coral/30 bg-coral-soft p-4">
                <AlertTriangle size={22} className="shrink-0 text-coral" />
                <div><p className="text-sm font-semibold text-coral-deep">Hazardous waste - please don't touch it</p><p className="text-xs text-coral-deep/80">{ai.hazardNote || 'Only trained workers with safety gear will be sent.'}</p></div>
              </section>
            )}

            {ai.items?.length > 0 && (
              <section className="rounded-3xl bg-white p-4 shadow-lift">
                <p className="text-xs font-semibold text-ink-faint">Detected</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{ai.items.map((it) => <span key={it} className="rounded-full bg-mist px-3 py-1 text-xs font-medium">{it}</span>)}</div>
                <p className="mt-3 text-xs text-ink-soft">{ai.recyclablePercent}% likely recyclable · goes to: {meta.categories[ai.category].bin}</p>
              </section>
            )}

            {/* duplicate */}
            {dup?.duplicate && (
              <section className="flex gap-3 rounded-3xl border border-marigold/40 bg-marigold-soft p-4">
                <Layers size={22} className="shrink-0 text-marigold-deep" />
                <div><p className="text-sm font-semibold">Already reported {dist(dup.duplicate.distance)} away</p><p className="text-xs text-ink-soft">Your photo will be added as a confirmation (+5 pts) and raises its priority. {dup.duplicate.confirmations} other{dup.duplicate.confirmations === 1 ? '' : 's'} confirmed it.</p></div>
              </section>
            )}
            {dup?.reused && (
              <section className="flex gap-3 rounded-3xl border border-coral/30 bg-coral-soft p-4 text-sm text-coral-deep"><AlertTriangle size={20} className="shrink-0" />You already used this photo in another report. Retake a fresh one.</section>
            )}

            {/* location */}
            <section className="overflow-hidden rounded-3xl bg-white shadow-lift">
              <div className="h-40">
                {loc && (
                  <BaseMap center={[loc.lat, loc.lng]} zoom={16} zoomControl={false}>
                    <InvalidateOnResize />
                    <Recenter center={[loc.lat, loc.lng]} />
                    {locInfo.state === 'gps' ? <Marker position={[loc.lat, loc.lng]} icon={dotIcon('#F0574A', { size: 18, pulse: true })} /> : <PickLocation value={loc} onChange={setLoc} />}
                  </BaseMap>
                )}
              </div>
              <div className="flex items-start gap-2 p-3.5 text-sm">
                <MapPin size={18} className="mt-0.5 shrink-0 text-coral" />
                <div>
                  {locInfo.state === 'finding' && <p className="flex items-center gap-2 text-ink-soft"><Spinner size={14} />Finding your location…</p>}
                  {locInfo.state === 'gps' && <p><b>GPS locked</b> · ±{locInfo.accuracy} m · near {wardName(meta, nearestWard(meta, loc))}</p>}
                  {locInfo.state === 'demo' && <p><b>Demo location</b> · {locInfo.reason} Drag the pin to adjust.</p>}
                  {locInfo.state === 'manual' && <p><b>Drop the pin on the spot.</b> {locInfo.reason}</p>}
                </div>
              </div>
            </section>

            <textarea className="field min-h-[72px] resize-none" placeholder="Add a note for the worker (optional) - e.g. behind the bus stop" value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} />

            <section className="flex items-center gap-3 rounded-3xl bg-canopy-50 p-4 text-sm">
              <Sparkles size={20} className="shrink-0 text-canopy" />
              <p className="text-ink-soft"><b className="text-ink">+{dup?.duplicate ? 5 : pts} points</b> {dup?.duplicate ? 'now for confirming' : 'when the cleanup is verified'}. A worker will be paid <b className="text-ink">{inr(payout)}</b> to clean it.</p>
            </section>

            <div className="flex gap-2 pt-1">
              <button onClick={retake} className="btn-ghost"><RotateCcw size={18} />{t('retake')}</button>
              <button onClick={submit} disabled={busy || !loc || dup?.reused} className="btn-primary flex-1">{busy && <Spinner />}{dup?.duplicate ? 'Confirm this report' : t('submit')}</button>
            </div>
            {captureMode !== 'camera' && <p className="flex items-center gap-1.5 text-xs text-ink-faint"><Info size={13} />Uploaded photo - accepted because demo mode is on.</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 'done' && result && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="px-5 pt-10 text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }} className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-canopy text-lime shadow-float">
            <CheckCircle2 size={48} />
          </motion.span>
          <h2 className="mt-6 text-3xl font-bold">{result.merged ? (result.alreadyConfirmed ? 'Already on it' : 'Confirmation added') : 'Thanks! Report sent'}</h2>
          <p className="mx-auto mt-2 max-w-xs text-ink-soft">
            {result.merged
              ? result.alreadyConfirmed ? 'You have already reported or confirmed this spot.' : `This spot was already reported nearby. Your photo raised its priority to ${result.report.ai.severity}. +${result.pointsAwarded} points.`
              : result.lowTrust ? 'Your report is being reviewed by the ward office before it goes to workers.'
                : `Nearby workers can see it now. You will get +${result.report.pointsPending} points once the cleanup is verified.`}
          </p>
          {!result.merged && !result.rewardEligible && <p className="mx-auto mt-2 max-w-xs text-xs text-ink-faint">You reached today's limit of rewarded reports - this one still counts for the city.</p>}
          <div className="mx-auto mt-8 flex max-w-xs flex-col gap-2">
            <Link to={`/app/reports/${result.report.id}`} className="btn-primary">Track this report</Link>
            <button onClick={retake} className="btn-ghost"><Camera size={18} />Report another spot</button>
            <Link to="/app" className="py-2 text-sm font-semibold text-canopy">Back to home</Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function nearestWard(meta, loc) {
  if (!meta || !loc) return '';
  let best = meta.wards[0]; let bd = Infinity;
  for (const w of meta.wards) { const d = (w.lat - loc.lat) ** 2 + (w.lng - loc.lng) ** 2; if (d < bd) { bd = d; best = w; } }
  return best.id;
}
