import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScanLine, Search, Cpu, Trash2 } from 'lucide-react';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { useMeta } from '../../lib/meta.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import CameraCapture from '../../components/CameraCapture.jsx';
import ScanOverlay from '../../components/ScanOverlay.jsx';
import { CategoryTile, CATEGORY_LABEL, CATEGORY_COLOR } from '../../components/ui.jsx';
import { classify, modelInfo } from '../../lib/ai.js';
import { canvasToJpeg } from '../../lib/image.js';

const BINS = {
  plastic: { bin: 'Blue bin · Dry waste', color: '#2F80ED' },
  paper: { bin: 'Blue bin · Dry waste', color: '#2F80ED' },
  glass: { bin: 'Blue bin · Dry waste (wrap if broken)', color: '#2F80ED' },
  metal: { bin: 'Blue bin · Dry waste', color: '#2F80ED' },
  organic: { bin: 'Green bin · Wet waste', color: '#14A06B' },
  ewaste: { bin: 'E-waste drop-off point', color: '#8E5CF6' },
  medical: { bin: 'Red bag · Domestic hazardous', color: '#F0574A' },
  construction: { bin: 'C&D debris pickup', color: '#A0715A' },
  mixed: { bin: 'Sort it first - dry, wet or hazardous', color: '#5B6B66' },
};
const TIPS = {
  plastic: 'Rinse and dry it. Clean plastic is worth up to ₹12/kg to recyclers.',
  paper: 'Keep it dry and flat. Oily or wet paper goes to wet waste.',
  glass: 'Do not break it. Wrap broken glass in newspaper and mark it.',
  metal: 'Rinse cans and crush them. Metal is the most valuable recyclable.',
  organic: 'Perfect for home composting - ask for a subsidised compost bin.',
  ewaste: 'Never in household bins. Use an e-waste camp or doorstep pickup.',
  medical: 'Wrap it, mark it with a red dot, and keep it away from other waste.',
  construction: 'Book a debris pickup - never leave it on the road.',
  mixed: 'Separate it at home: dry, wet and hazardous. It earns more points at pickups.',
};

export default function Coach() {
  const meta = useMeta();
  const { t } = useI18n();
  const [cam, setCam] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [res, setRes] = useState(null);
  const [q, setQ] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => { modelInfo().then(setInfo); }, []);

  const onCapture = async (canvas) => {
    setCam(false);
    setPhoto(canvasToJpeg(canvas));
    setRes(null); setScanning(true);
    const [preds] = await Promise.all([classify(canvas).catch(() => []), new Promise((r) => setTimeout(r, 1700))]);
    setScanning(false);
    const byCat = {};
    for (const p of preds) byCat[p.category] = (byCat[p.category] || 0) + p.p;
    const ranked = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    setRes({ category: ranked[0]?.[0] || 'mixed', p: ranked[0]?.[1] || 0, ranked });
  };

  const guide = useMemo(() => (meta?.segregation || []).filter((g) => g.item.toLowerCase().includes(q.toLowerCase())), [meta, q]);

  return (
    <div>
      <CameraCapture open={cam} onClose={() => setCam(false)} onCapture={onCapture} title={t('segregationCoach')} hint="Hold one item in front of the camera" demoMode={meta?.demoMode} demo={{ kind: 'plastic' }} />
      <TopBar title={t('segregationCoach')} sub="Point the camera at any item to see which bin it goes in" back="/app" />
      <div className="space-y-3 px-4">
        {!photo ? (
          <button onClick={() => setCam(true)} className="flex w-full flex-col items-center gap-3 rounded-[28px] border-2 border-dashed border-canopy-200 bg-white px-6 py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-canopy text-lime"><ScanLine size={30} /></span>
            <span className="font-display text-lg font-bold">Scan an item</span>
            <span className="text-sm text-ink-soft">Works offline - the AI runs on your phone</span>
          </button>
        ) : (
          <ScanOverlay src={photo} active={scanning} steps={['Looking at the item', 'Matching the material', 'Finding the right bin']} className="aspect-square w-full" />
        )}

        <AnimatePresence>
          {res && (
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl bg-white shadow-lift">
              <div className="flex items-center gap-3 p-4" style={{ background: `${BINS[res.category].color}14` }}>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: BINS[res.category].color }}><Trash2 size={26} /></span>
                <div><p className="text-xs text-ink-faint">Goes in</p><p className="font-display text-lg font-bold">{BINS[res.category].bin}</p></div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2"><CategoryTile category={res.category} size={28} /><p className="font-semibold">{CATEGORY_LABEL[res.category]}</p><span className="ml-auto text-sm font-semibold text-ink-soft">{Math.round(res.p * 100)}%</span></div>
                <p className="mt-2 text-sm text-ink-soft">{TIPS[res.category]}</p>
                <div className="mt-3 space-y-1.5">
                  {res.ranked.slice(0, 4).map(([c, p]) => (
                    <div key={c} className="flex items-center gap-2 text-xs">
                      <span className="w-28 truncate text-ink-soft">{CATEGORY_LABEL[c]}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist"><motion.div className="h-full rounded-full" style={{ background: CATEGORY_COLOR[c] }} initial={{ width: 0 }} animate={{ width: `${p * 100}%` }} /></div>
                      <span className="num w-9 text-right font-semibold">{Math.round(p * 100)}%</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setCam(true)} className="btn-soft btn-sm mt-4 w-full">Scan another item</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {info?.ready && (
          <p className="flex items-start gap-2 px-1 text-xs text-ink-faint"><Cpu size={14} className="mt-px shrink-0" />On-device model: {info.metrics?.base} trained on {info.metrics?.trainImages} photos · {info.metrics?.accuracy}% accuracy on unseen photos · knows {info.labels?.join(', ')}.</p>
        )}

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="text-sm font-semibold">Or look it up</p>
          <div className="relative mt-2"><Search size={18} className="absolute left-3.5 top-3.5 text-ink-faint" /><input className="field pl-10" placeholder="Milk packet, battery, coconut shell…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="mt-3 divide-y divide-line">
            {guide.map((g) => (
              <div key={g.item} className="flex items-start gap-3 py-2.5">
                <CategoryTile category={g.category} size={34} />
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{g.item}</p><p className="text-xs text-ink-soft">{g.tip}</p></div>
                <span className="mt-0.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: BINS[g.category].color }}>{BINS[g.category].bin.split(' · ')[0]}</span>
              </div>
            ))}
            {!guide.length && <p className="py-4 text-center text-sm text-ink-faint">No match. Try scanning it instead.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
