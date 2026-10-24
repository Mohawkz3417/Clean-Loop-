import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Check, X, UserCheck, Cpu, Cloud, ShieldCheck, Star, AlertTriangle, Users, Banknote, Timer, HardHat, Truck } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { PageHead, AdminAvatar } from '../../layouts/AdminShell.jsx';
import { Segmented, Sheet, Skeleton, Spinner, Empty, CategoryTile, SeverityPill, StatusPill, CATEGORY_LABEL } from '../../components/ui.jsx';
import { Photo, BeforeAfter } from '../../components/media.jsx';
import { timeAgo, inr, dist, dateTime, timeUntil } from '../../lib/format.js';

const STATUSES = [
  { value: 'active', label: 'Active' }, { value: 'verifying', label: 'Needs check' }, { value: 'disputed', label: 'Disputed' },
  { value: 'review', label: 'Low trust' }, { value: 'overdue', label: 'Overdue' }, { value: 'completed', label: 'Cleaned' }, { value: 'all', label: 'All' },
];

function ReportDrawer({ id, onClose, onChanged }) {
  const meta = useMeta();
  const toast = useToast();
  const [d, setD] = useState(null);
  const [busy, setBusy] = useState('');
  const [payout, setPayout] = useState('');
  const load = () => get(`/admin/reports/${id}`).then((x) => { setD(x); setPayout(String(x.report.payout)); }).catch((e) => toast(e.message, 'error'));
  useEffect(() => { if (id) { setD(null); load(); } }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const act = async (key, path, body, msg) => {
    setBusy(key);
    try { await post(path, body); toast(msg); await load(); onChanged(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };
  const r = d?.report;
  return (
    <Sheet open={Boolean(id)} onClose={onClose} title={r ? `${CATEGORY_LABEL[r.ai?.category]} · ${wardName(meta, r.ward)}` : 'Report'} dark wide>
      {!r ? <Skeleton className="h-80" /> : (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {r.afterPhoto || r.status === 'completed' || r.status === 'verifying' || r.status === 'disputed'
              ? <BeforeAfter before={r.beforePhoto || r.photo} after={r.afterPhoto} category={r.ai?.category} seed={r.id} className="aspect-[4/3]" />
              : <Photo src={r.photo} category={r.ai?.category} seed={r.id} className="aspect-[4/3] rounded-3xl" />}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5"><StatusPill status={r.status} /><SeverityPill severity={r.ai?.severity} />{r.ai?.hazard && <span className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-2.5 py-0.5 text-xs font-semibold text-coral"><AlertTriangle size={12} />Hazard</span>}</div>
              <p className="text-sm">{r.ai?.summary}</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-night-raised p-2"><p className="font-display text-base font-bold">{meta?.volumes?.[r.ai?.volume]?.label}</p><p className="text-night-muted">Volume</p></div>
                <div className="rounded-xl bg-night-raised p-2"><p className="font-display text-base font-bold">{r.ai?.severityScore}</p><p className="text-night-muted">Severity score</p></div>
                <div className="rounded-xl bg-night-raised p-2"><p className="font-display text-base font-bold">{Math.round((r.ai?.confidence || 0) * 100)}%</p><p className="text-night-muted">Confidence</p></div>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-night-muted">{r.ai?.provider === 'gemini' ? <Cloud size={13} /> : <Cpu size={13} />}{r.ai?.providerLabel}{r.ai?.correctedByUser ? ' · type corrected by citizen' : ''}</p>
              {r.ai?.items?.length > 0 && <p className="text-xs text-night-muted">Detected: {r.ai.items.join(', ')}</p>}
              {r.ai?.workerNote && <p className="rounded-xl bg-night-raised px-3 py-2 text-xs">Worker note: {r.ai.workerNote}</p>}
              <div className="grid grid-cols-2 gap-2 text-xs text-night-muted">
                <span>Reported {dateTime(r.createdAt)}</span>
                <span className={r.overdue ? 'text-coral' : ''}><Timer size={12} className="mr-1 inline" />{r.status === 'completed' ? `Cleaned ${dateTime(r.completedAt)}` : `Deadline ${timeUntil(r.slaDeadline)}`}</span>
                <span>GPS {r.lat.toFixed(4)}, {r.lng.toFixed(4)} ±{r.accuracy || '?'} m</span>
                <span>Capture: {r.captureMode}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-night-line p-3">
              <p className="text-xs text-night-muted">Reporter</p>
              <p className="font-semibold">{d.reporter?.name}</p>
              <p className="text-xs text-night-muted">Trust score <b className={d.reporter?.trustScore < 35 ? 'text-coral' : 'text-lime'}>{d.reporter?.trustScore}</b> · {d.reporter?.reports} reports</p>
            </div>
            <div className="rounded-2xl border border-night-line p-3">
              <p className="flex items-center gap-1 text-xs text-night-muted"><Users size={12} />Confirmations</p>
              <p className="font-semibold">{r.confirmations?.length || 0} citizens</p>
              <p className="truncate text-xs text-night-muted">{d.confirmationsDetail.map((c) => c.name?.split(' ')[0]).join(', ') || 'None yet'}</p>
            </div>
            <div className="rounded-2xl border border-night-line p-3">
              <p className="flex items-center gap-1 text-xs text-night-muted"><Banknote size={12} />Payout</p>
              <div className="mt-1 flex gap-1.5"><input className="nfield !py-1.5" value={payout} onChange={(e) => setPayout(e.target.value.replace(/\D/g, ''))} /><button className="nbtn" disabled={busy === 'pay'} onClick={() => act('pay', `/admin/reports/${r.id}/payout`, { payout: Number(payout) }, 'Payout updated')}>Save</button></div>
              <p className="mt-1 text-xs text-night-muted">{r.payoutStatus ? `Status: ${r.payoutStatus}` : 'Paid after verification'}</p>
            </div>
          </div>

          {r.verification && (
            <div className={`rounded-2xl border p-3 ${r.verification.passed ? 'border-lime/30 bg-lime/5' : 'border-marigold/30 bg-marigold/5'}`}>
              <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={16} />Cleanup verification · {r.verification.provider === 'gemini' ? 'Gemini' : 'on-device AI'}{r.verification.manualApproval ? ' · approved manually' : ''}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-5">
                <span>Same place: <b>{Math.round((r.verification.sceneMatch || 0) * 100)}%</b></span>
                <span>Waste before: <b>{Math.round((r.verification.garbageBefore || 0) * 100)}%</b></span>
                <span>Waste after: <b>{Math.round((r.verification.garbageAfter || 0) * 100)}%</b></span>
                <span>Distance: <b>{r.verification.distance ?? '—'} m</b>{r.verification.simulatedLocation ? ' (demo)' : ''}</span>
                <span>Time: <b>{Math.round((r.verification.secondsBetween || 0) / 60)} min</b></span>
              </div>
              {r.verification.remark && <p className="mt-2 text-xs text-night-muted">{r.verification.remark}</p>}
            </div>
          )}
          {r.citizenConfirmation && (
            <p className="text-sm">{r.citizenConfirmation.ok ? <><Star size={14} className="mr-1 inline fill-marigold text-marigold" />Citizen confirmed{r.citizenConfirmation.stars ? ` · ${r.citizenConfirmation.stars}★` : ''}</> : <span className="text-coral">Citizen disputed: “{r.citizenConfirmation.comment || 'not clean'}”</span>}</p>
          )}
          {r.escalations?.length > 0 && <p className="text-sm text-coral">Escalated to {r.escalatedTo} (level {r.escalationLevel})</p>}

          {/* actions */}
          <div className="flex flex-wrap gap-2 border-t border-night-line pt-4">
            {['verifying', 'disputed', 'review'].includes(r.status) && (
              <button className="nbtn-lime" disabled={busy === 'approve'} onClick={() => act('approve', `/admin/reports/${r.id}/approve`, {}, r.status === 'review' ? 'Report approved and sent to workers' : 'Cleanup approved - payout released')}>{busy === 'approve' ? <Spinner size={14} /> : <Check size={16} />}{r.status === 'review' ? 'Approve report' : 'Approve cleanup'}</button>
            )}
            {['verifying', 'disputed'].includes(r.status) && (
              <button className="nbtn-danger" disabled={busy === 'reject'} onClick={() => act('reject', `/admin/reports/${r.id}/reject`, { reason: 'Cleanup photos do not show the spot cleaned' }, 'Cleanup rejected - job is back in the feed')}><X size={16} />Reject cleanup</button>
            )}
            {['open', 'review'].includes(r.status) && (
              <button className="nbtn-danger" disabled={busy === 'reject'} onClick={() => act('reject', `/admin/reports/${r.id}/reject`, { reason: 'Not a genuine waste report' }, 'Report rejected - reporter trust lowered')}><X size={16} />Reject as fake</button>
            )}
            {r.status === 'completed' && r.payoutStatus === 'held' && (
              <button className="nbtn" disabled={busy === 'rel'} onClick={() => act('rel', `/admin/reports/${r.id}/release-payout`, {}, 'Payout released')}><Banknote size={16} />Release payout now</button>
            )}
          </div>

          {['open', 'review', 'claimed'].includes(r.status) && (
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><UserCheck size={16} />Assign to a worker {r.workerName && <span className="font-normal text-night-muted">· currently {r.workerName}</span>}</p>
              <div className="grid max-h-64 gap-1.5 overflow-y-auto sm:grid-cols-2">
                {d.workers.map((w) => (
                  <button key={w.id} disabled={!w.eligible || busy === w.id} onClick={() => act(w.id, `/admin/reports/${r.id}/assign`, { workerId: w.id }, `Assigned to ${w.name}`)}
                    className="flex items-center gap-2.5 rounded-xl border border-night-line px-3 py-2 text-left hover:border-lime/50 disabled:opacity-40">
                    <AdminAvatar name={w.name} size={30} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{w.name}</p>
                      <p className="text-[11px] text-night-muted">{w.online ? 'Online' : 'Offline'} · {w.distance != null ? dist(w.distance) : '—'} · {w.active} active · {w.rating?.toFixed?.(1)}★</p>
                    </div>
                    {w.hazardCertified && <HardHat size={14} className="text-marigold" />}
                    {w.hasVehicle && <Truck size={14} className="text-night-muted" />}
                    {busy === w.id && <Spinner size={14} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Sheet>
  );
}

export default function Reports() {
  const meta = useMeta();
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState(params.get('status') || 'active');
  const [ward, setWard] = useState('');
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(params.get('open'));

  const load = () => {
    const qs = new URLSearchParams({ status, ...(ward && { ward }), ...(category && { category }), ...(q && { q }) });
    get(`/admin/reports?${qs}`).then(setData).catch(() => setData({ reports: [], total: 0 }));
  };
  useEffect(() => { load(); }, [status, ward, category]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <PageHead title="Reports & jobs" sub="Every citizen report and the cleanup job it became" />
      <div className="no-scrollbar mb-3 overflow-x-auto"><Segmented dark value={status} onChange={(v) => { setStatus(v); setParams({ status: v }); }} options={STATUSES} /></div>
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1"><Search size={16} className="absolute left-3 top-3 text-night-muted" /><input className="nfield pl-9" placeholder="Search by address, item or ID" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <select className="nfield w-auto" value={ward} onChange={(e) => setWard(e.target.value)}><option value="">All wards</option>{meta?.wards.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select>
        <select className="nfield w-auto" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All waste types</option>{Object.entries(CATEGORY_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
      </div>
      <section className="panel overflow-hidden">
        {!data ? <Skeleton className="m-4 h-80" /> : data.reports.length === 0 ? <Empty dark icon="Inbox" title="No reports match" body="Try another filter." /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead><tr className="border-b border-night-line text-left text-xs text-night-muted"><th className="px-4 py-3 font-medium">Report</th><th className="px-3 py-3 font-medium">Ward</th><th className="px-3 py-3 font-medium">Severity</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Worker</th><th className="px-3 py-3 text-right font-medium">Payout</th><th className="px-4 py-3 text-right font-medium">Deadline</th></tr></thead>
              <tbody>
                {data.reports.map((r) => (
                  <tr key={r.id} onClick={() => setOpen(r.id)} className="cursor-pointer border-b border-night-line/60 last:border-0 hover:bg-night-raised/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <Photo src={r.photo} category={r.ai?.category} seed={r.id} className="h-11 w-11 shrink-0 rounded-xl" />
                        <div className="min-w-0"><p className="flex items-center gap-1.5 font-medium"><CategoryTile category={r.ai?.category} size={18} className="!rounded-md" />{CATEGORY_LABEL[r.ai?.category]}</p><p className="truncate text-xs text-night-muted">{meta?.volumes?.[r.ai?.volume]?.label} · {timeAgo(r.createdAt)}{r.confirmations?.length ? ` · ${r.confirmations.length} confirmations` : ''}</p></div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">{wardName(meta, r.ward)}</td>
                    <td className="px-3 py-2.5"><SeverityPill severity={r.ai?.severity} /></td>
                    <td className="px-3 py-2.5"><StatusPill status={r.status} short /></td>
                    <td className="px-3 py-2.5 text-night-muted">{r.workerName || '—'}</td>
                    <td className="num px-3 py-2.5 text-right">{inr(r.payout)}</td>
                    <td className={`px-4 py-2.5 text-right text-xs ${r.overdue ? 'font-semibold text-coral' : 'text-night-muted'}`}>{r.status === 'completed' ? 'done' : timeUntil(r.slaDeadline)}{r.escalationLevel ? ` · L${r.escalationLevel}` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 text-xs text-night-muted">Showing {data.reports.length} of {data.total}</p>
          </div>
        )}
      </section>
      <ReportDrawer id={open} onClose={() => { setOpen(null); if (params.get('open')) setParams({ status }); }} onChanged={load} />
    </div>
  );
}
