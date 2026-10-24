import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, ChevronLeft, ShieldCheck, EyeOff, X, Plus, MapPin, CheckCircle2, Car, User, Store, Gavel } from 'lucide-react';
import { Marker } from 'react-leaflet';
import CameraCapture from '../../components/CameraCapture.jsx';
import { BaseMap, PickLocation, Recenter, dotIcon, InvalidateOnResize } from '../../components/maps.jsx';
import { Spinner } from '../../components/ui.jsx';
import { blurFaces } from '../../lib/faces.js';
import { canvasToJpeg } from '../../lib/image.js';
import { post } from '../../lib/api.js';
import { useMeta } from '../../lib/meta.jsx';
import { useAuth } from '../../lib/auth.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useSpotLocation } from '../../lib/useSpotLocation.js';
import { celebrate } from '../../lib/confetti.js';

const VEHICLES = ['Car', 'Two-wheeler', 'Auto rickshaw', 'Goods carrier', 'Tipper lorry', 'Van'];

export default function Dumping() {
  const meta = useMeta();
  const { user } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const { loc, setLoc, info } = useSpotLocation(meta, user);
  const [cam, setCam] = useState(false);
  const [photos, setPhotos] = useState([]); // {url, faces, blurring}
  const [offender, setOffender] = useState('vehicle');
  const [plate, setPlate] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [desc, setDesc] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const onCapture = async (canvas) => {
    setCam(false);
    const idx = photos.length;
    setPhotos((p) => [...p, { url: canvasToJpeg(canvas), faces: 0, blurring: true }]);
    const r = await blurFaces(canvas);
    setPhotos((p) => p.map((x, i) => (i === idx ? { url: canvasToJpeg(canvas), faces: r.count, blurring: false, blurOk: r.ok } : x)));
  };

  const totalFaces = photos.reduce((s, p) => s + (p.faces || 0), 0);
  const blurring = photos.some((p) => p.blurring);

  const submit = async () => {
    if (!photos.length) return toast('Add at least one photo as evidence.', 'error');
    setBusy(true);
    try {
      const r = await post('/violations', { images: photos.map((p) => p.url), lat: loc.lat, lng: loc.lng, plate: offender === 'vehicle' ? plate : '', vehicleType: offender === 'vehicle' ? vehicleType : offender === 'shop' ? 'Shop / business' : 'Person on foot', offenderType: offender, description: desc, facesBlurred: totalFaces });
      setDone(r.violation);
      celebrate();
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };

  if (done) {
    return (
      <div className="px-5 pt-16 text-center">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-canopy text-lime shadow-float"><CheckCircle2 size={48} /></motion.span>
        <h2 className="mt-6 text-3xl font-bold">Evidence sent to the authority</h2>
        <p className="mx-auto mt-2 max-w-xs text-ink-soft">A municipal officer will review it. If a fine is issued and paid, 20% of it goes to your wallet. Your identity stays hidden from the offender.</p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-2">
          <Link to="/app/profile" className="btn-primary">Track my dumping reports</Link>
          <Link to="/app" className="py-2 text-sm font-semibold text-canopy">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <CameraCapture open={cam} onClose={() => setCam(false)} onCapture={onCapture} title="Capture the evidence" hint="Get the vehicle number in frame if you can" demoMode={meta?.demoMode} demo={{ kind: 'mixed' }} />
      <header className="flex items-center gap-2 px-4 pb-2 pt-[max(env(safe-area-inset-top),14px)]">
        <button onClick={() => nav('/app')} className="-ml-1 rounded-full p-2 hover:bg-white" aria-label="Back"><ChevronLeft size={22} /></button>
        <div><h1 className="text-xl font-bold">Report illegal dumping</h1><p className="text-xs text-ink-faint">Someone threw waste from a car, a shop or on foot</p></div>
      </header>

      <div className="space-y-3 px-4">
        <section className="flex gap-3 rounded-3xl bg-canopy p-4 text-white">
          <ShieldCheck size={24} className="shrink-0 text-lime" />
          <p className="text-sm text-white/85">The app never fines anyone. Your evidence goes to the municipal officer, who decides. You stay anonymous, and bystanders' faces are blurred on your phone before upload.</p>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="text-sm font-semibold">Evidence photos</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {photos.map((p, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
                <img src={p.url} alt={`Evidence ${i + 1}`} className="h-full w-full object-cover" />
                {p.blurring ? <div className="absolute inset-0 flex items-center justify-center bg-ink/50 text-xs text-white"><Spinner size={16} /></div>
                  : <span className="absolute bottom-1 left-1 rounded-full bg-ink/70 px-1.5 py-0.5 text-[10px] text-white">{p.faces ? `${p.faces} face${p.faces > 1 ? 's' : ''} blurred` : 'No faces'}</span>}
                <button onClick={() => setPhotos((x) => x.filter((_, k) => k !== i))} className="absolute right-1 top-1 rounded-full bg-ink/70 p-1 text-white" aria-label="Remove photo"><X size={12} /></button>
              </div>
            ))}
            {photos.length < 3 && (
              <button onClick={() => setCam(true)} className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line text-xs font-semibold text-ink-soft">
                {photos.length ? <Plus size={22} /> : <Camera size={22} />}{photos.length ? 'Add' : 'Take photo'}
              </button>
            )}
          </div>
          {photos.length > 0 && !blurring && <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft"><EyeOff size={13} />Privacy filter applied on this device.</p>}
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="text-sm font-semibold">Who dumped it?</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[{ id: 'vehicle', l: 'Vehicle', i: Car }, { id: 'shop', l: 'Shop', i: Store }, { id: 'person', l: 'Person', i: User }].map((o) => (
              <button key={o.id} onClick={() => setOffender(o.id)} className={`flex flex-col items-center gap-1 rounded-2xl border-2 py-2.5 text-xs font-semibold ${offender === o.id ? 'border-canopy bg-canopy-50' : 'border-line'}`}><o.i size={20} />{o.l}</button>
            ))}
          </div>
          {offender === 'vehicle' && (
            <div className="mt-3 space-y-3">
              <label className="block"><span className="label">Vehicle number</span>
                <input className="field font-display text-lg uppercase tracking-wider" value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} placeholder="TN 09 AB 1234" maxLength={14} />
              </label>
              <div className="flex flex-wrap gap-1.5">{VEHICLES.map((v) => <button key={v} onClick={() => setVehicleType(v)} className={`chip ${vehicleType === v ? 'border-canopy bg-canopy text-white' : 'border-line bg-white'}`}>{v}</button>)}</div>
            </div>
          )}
          <textarea className="field mt-3 min-h-[80px] resize-none" placeholder="What happened? e.g. threw two bags out of the window at 9 pm" value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={500} />
        </section>

        <section className="overflow-hidden rounded-3xl bg-white shadow-lift">
          <div className="h-36">
            {loc && (
              <BaseMap center={[loc.lat, loc.lng]} zoom={16} zoomControl={false}>
                <InvalidateOnResize /><Recenter center={[loc.lat, loc.lng]} />
                {info.state === 'gps' ? <Marker position={[loc.lat, loc.lng]} icon={dotIcon('#F0574A', { size: 18, pulse: true })} /> : <PickLocation value={loc} onChange={setLoc} />}
              </BaseMap>
            )}
          </div>
          <p className="flex items-center gap-2 p-3 text-xs text-ink-soft"><MapPin size={14} className="text-coral" />{info.state === 'gps' ? `GPS locked · ±${info.accuracy} m` : info.state === 'finding' ? 'Finding your location…' : 'Drag the pin to where it happened.'}</p>
        </section>

        <section className="flex items-center gap-3 rounded-3xl bg-marigold-soft p-4 text-sm">
          <Gavel size={20} className="shrink-0 text-marigold-deep" />
          <p className="text-ink-soft">If the officer issues a fine and it is paid, <b className="text-ink">20% goes to you</b> plus 100 points. False reports lower your trust score.</p>
        </section>

        <button onClick={submit} disabled={busy || blurring || !photos.length || !loc || (offender === 'vehicle' && plate.trim().length < 4)} className="btn-primary w-full">{busy && <Spinner />}Send evidence to the authority</button>
      </div>
    </div>
  );
}
