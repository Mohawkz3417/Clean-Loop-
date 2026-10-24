import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Gavel, Check, X, EyeOff, ShieldCheck, Receipt, Car, MapPin } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Segmented, Skeleton, Spinner, Empty } from '../../components/ui.jsx';
import { CategoryArt } from '../../components/media.jsx';
import { timeAgo, inr } from '../../lib/format.js';

const STATUS = {
  under_review: ['Under review', 'bg-marigold/15 text-marigold'],
  fine_issued: ['Fine issued · unpaid', 'bg-[#4F8FE8]/15 text-[#7FB2FF]'],
  reward_credited: ['Paid · reporter rewarded', 'bg-lime/15 text-lime'],
  rejected: ['Rejected', 'bg-night-raised text-night-muted'],
};

function Case({ v, defaults, onChange }) {
  const meta = useMeta();
  const toast = useToast();
  const heavy = /lorry|goods|tipper/i.test(v.vehicleType || '');
  const [amount, setAmount] = useState(String(heavy ? defaults.vehicleFine : defaults.fine));
  const [busy, setBusy] = useState('');
  const act = async (k, path, body, msg) => {
    setBusy(k);
    try { const r = await post(path, body); onChange(r.violation); toast(msg); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };
  const [label, cls] = STATUS[v.status];
  return (
    <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="panel overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[260px_1fr]">
        <div className="relative h-48 bg-night-raised md:h-full">
          {v.photos?.length ? <img src={v.photos[0]} alt="Evidence" className="h-full w-full object-cover" /> : <CategoryArt category="mixed" seed={v.id} />}
          {v.photos?.length > 1 && <span className="absolute bottom-2 right-2 rounded-full bg-night/80 px-2 py-0.5 text-xs">+{v.photos.length - 1} photos</span>}
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-night/80 px-2 py-0.5 text-[11px]"><EyeOff size={11} />{v.facesBlurred} face{v.facesBlurred === 1 ? '' : 's'} blurred on device</span>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              {v.plate ? (
                <span className="inline-block rounded-lg border-2 border-night-text/80 bg-white px-3 py-1 font-display text-lg font-bold tracking-[0.12em] text-ink">{v.plate}</span>
              ) : <span className="font-display text-lg font-bold">{v.vehicleType}</span>}
              <p className="mt-1.5 flex items-center gap-2 text-xs text-night-muted"><Car size={13} />{v.vehicleType} · <MapPin size={13} />{wardName(meta, v.ward)} · {timeAgo(v.createdAt)}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{label}</span>
          </div>
          <p className="mt-3 text-sm">{v.description || 'No description.'}</p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-night-muted"><ShieldCheck size={13} />Reported by {v.reporterAlias} (identity hidden) · trust score {v.reporterTrust}</p>
          {v.vehicleInfo && (
            <div className="mt-3 rounded-xl border border-night-line bg-night-raised/60 px-3 py-2 text-xs">
              <p><b>Registry lookup{v.vehicleInfo.simulated ? ' (simulated)' : ''}:</b> {v.vehicleInfo.owner} · {v.vehicleInfo.vehicleClass} · {v.vehicleInfo.rto}</p>
            </div>
          )}
          {v.fineAmount && <p className="mt-3 flex items-center gap-2 text-sm"><Receipt size={15} className="text-night-muted" />Challan {v.challanNo} · <b>{inr(v.fineAmount)}</b>{v.reporterReward ? <span className="text-lime">· {inr(v.reporterReward)} paid to reporter</span> : ''}</p>}
          {v.rejectReason && <p className="mt-2 text-xs text-night-muted">Reason: {v.rejectReason}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {v.status === 'under_review' && (<>
              {!v.vehicleInfo && v.plate && <button className="nbtn" disabled={busy === 'l'} onClick={() => act('l', `/admin/violations/${v.id}/lookup`, {}, 'Vehicle details fetched')}>{busy === 'l' ? <Spinner size={14} /> : <Search size={15} />}Look up vehicle</button>}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-night-muted">Fine ₹</span>
                <input className="nfield !w-24 !py-1.5" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} />
                <button className="nbtn-lime" disabled={busy === 'f'} onClick={() => act('f', `/admin/violations/${v.id}/fine`, { amount: Number(amount) }, `Fine of ${inr(amount)} issued`)}>{busy === 'f' ? <Spinner size={14} /> : <Gavel size={15} />}Issue fine</button>
              </div>
              <button className="nbtn-danger" disabled={busy === 'r'} onClick={() => act('r', `/admin/violations/${v.id}/reject`, { reason: 'Evidence not sufficient to identify the offender' }, 'Case closed')}><X size={15} />Reject</button>
            </>)}
            {v.status === 'fine_issued' && (
              <button className="nbtn-lime" disabled={busy === 'p'} onClick={() => act('p', `/admin/violations/${v.id}/paid`, {}, 'Fine marked paid. 20% credited to the reporter.')}>{busy === 'p' ? <Spinner size={14} /> : <Check size={15} />}Mark fine as paid</button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Violations() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('under_review');
  useEffect(() => { get('/admin/violations').then(setData).catch(() => setData({ violations: [], defaults: {} })); }, []);
  const onChange = (v) => setData((d) => ({ ...d, violations: d.violations.map((x) => (x.id === v.id ? { ...x, ...v } : x)) }));
  const list = (data?.violations || []).filter((v) => tab === 'all' || v.status === tab);
  const count = (s) => (data?.violations || []).filter((v) => v.status === s).length;
  return (
    <div>
      <PageHead title="Illegal dumping cases" sub="Citizen evidence for the authority to act on. The app never fines anyone by itself - an officer decides." />
      <div className="no-scrollbar mb-4 overflow-x-auto">
        <Segmented dark value={tab} onChange={setTab} options={[{ value: 'under_review', label: 'To review', count: count('under_review') }, { value: 'fine_issued', label: 'Unpaid fines', count: count('fine_issued') }, { value: 'reward_credited', label: 'Paid', count: count('reward_credited') }, { value: 'rejected', label: 'Rejected' }, { value: 'all', label: 'All' }]} />
      </div>
      <div className="space-y-3">
        {!data ? [0, 1].map((i) => <Skeleton key={i} className="h-52" />) : list.length === 0 ? <div className="panel"><Empty dark icon="Gavel" title="Nothing in this queue" body="New dumping reports from citizens appear here." /></div>
          : list.map((v) => <Case key={v.id} v={v} defaults={data.defaults} onChange={onChange} />)}
      </div>
    </div>
  );
}
