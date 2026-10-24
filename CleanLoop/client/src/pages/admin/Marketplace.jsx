import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Factory, Check, Tag, BadgeCheck, TrendingUp } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useToast } from '../../lib/toast.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Sheet, Skeleton, Spinner, CountUp, Icon, CATEGORY_ICON, CATEGORY_LABEL, CATEGORY_COLOR } from '../../components/ui.jsx';
import { inr, kg, timeAgo } from '../../lib/format.js';

export default function Marketplace() {
  const toast = useToast();
  const [d, setD] = useState(null);
  const [sell, setSell] = useState(null);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState('');
  const [busy, setBusy] = useState('');
  const load = () => get('/admin/marketplace').then(setD).catch(() => {});
  useEffect(() => { load(); }, []);

  const list = async () => {
    setBusy('list');
    try { await post('/admin/marketplace/listings', { material: sell.material, kg: qty, pricePerKg: Number(price) }); toast('Listed. Authorised recyclers have sent bids.'); setSell(null); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };
  const accept = async (b) => {
    setBusy(b.id);
    try { const r = await post(`/admin/marketplace/bids/${b.id}/accept`); toast(`Sold for ${inr(r.revenue)} - added to the reward pool`); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };
  const open = (d?.listings || []).filter((l) => l.status === 'listed');
  const sold = (d?.listings || []).filter((l) => l.status === 'sold');

  return (
    <div>
      <PageHead title="Recycler marketplace" sub="Sell the sorted waste workers collect to authorised recyclers. The money funds citizen rewards." />
      <div className="grid gap-3 md:grid-cols-3">
        <div className="panel p-5"><TrendingUp size={20} className="text-lime" /><p className="mt-2 font-display text-3xl font-bold">{d ? <CountUp value={d.revenue} format={inr} /> : '—'}</p><p className="text-sm text-night-muted">Recycling revenue to date</p></div>
        <div className="panel p-5"><Store size={20} className="text-lime" /><p className="mt-2 font-display text-3xl font-bold">{d ? <CountUp value={d.inventory.reduce((s, i) => s + i.estValue, 0)} format={inr} /> : '—'}</p><p className="text-sm text-night-muted">Estimated value in stock</p></div>
        <div className="panel p-5"><Factory size={20} className="text-lime" /><p className="mt-2 font-display text-3xl font-bold">{d?.recyclers.length ?? '—'}</p><p className="text-sm text-night-muted">Authorised recyclers</p></div>
      </div>

      <h2 className="mb-3 mt-6 text-lg font-bold">Sorted stock at the collection centre</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {!d ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-36" />) : d.inventory.map((it, i) => (
          <motion.div key={it.material} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="panel p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${CATEGORY_COLOR[it.material]}26`, color: CATEGORY_COLOR[it.material] }}><Icon name={CATEGORY_ICON[it.material]} size={22} /></span>
              <div className="flex-1"><p className="font-semibold">{CATEGORY_LABEL[it.material]}</p><p className="text-xs text-night-muted">₹{it.valuePerKg}/kg market rate</p></div>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div><p className="font-display text-2xl font-bold">{kg(it.kg)}</p><p className="text-xs text-night-muted">≈ {inr(it.estValue)}</p></div>
              <button disabled={it.kg < 1} onClick={() => { setSell(it); setQty(Math.min(it.kg, Math.max(1, Math.round(it.kg * 0.5)))); setPrice(String(it.valuePerKg)); }} className="nbtn-lime"><Tag size={14} />List for sale</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Open listings & bids</h2>
          <div className="mt-3 space-y-3">
            {open.length === 0 && <p className="text-sm text-night-muted">No open listings. List some stock to receive bids.</p>}
            {open.map((l) => (
              <div key={l.id} className="rounded-2xl border border-night-line p-3">
                <p className="font-semibold">{kg(l.kg)} {CATEGORY_LABEL[l.material].toLowerCase()} <span className="text-sm font-normal text-night-muted">· asking ₹{l.pricePerKg}/kg · listed {timeAgo(l.createdAt)}</span></p>
                <div className="mt-2 space-y-1.5">
                  {l.bids.map((b, k) => (
                    <div key={b.id} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${k === 0 ? 'bg-lime/10' : 'bg-night-raised/60'}`}>
                      <BadgeCheck size={16} className="text-lime" />
                      <span className="flex-1 text-sm">{b.recyclerName} <span className="text-xs text-night-muted">· pickup in {b.pickupIn}</span></span>
                      <span className="num text-sm font-semibold">₹{b.pricePerKg}/kg</span>
                      <span className="num w-20 text-right text-sm text-night-muted">{inr(b.pricePerKg * l.kg)}</span>
                      <button className="nbtn-lime" disabled={busy === b.id} onClick={() => accept(b)}>{busy === b.id ? <Spinner size={14} /> : <Check size={14} />}Accept</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Sales history</h2>
          <div className="mt-3 space-y-2">
            {sold.map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl border border-night-line px-3 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${CATEGORY_COLOR[l.material]}26`, color: CATEGORY_COLOR[l.material] }}><Icon name={CATEGORY_ICON[l.material]} size={16} /></span>
                <div className="flex-1"><p className="text-sm font-medium">{kg(l.kg)} {CATEGORY_LABEL[l.material].toLowerCase()} → {l.soldTo}</p><p className="text-xs text-night-muted">{timeAgo(l.soldAt)} · ₹{l.soldPricePerKg}/kg</p></div>
                <span className="num font-semibold text-lime">+{inr(l.revenue)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Sheet open={Boolean(sell)} onClose={() => setSell(null)} title={`Sell ${sell ? CATEGORY_LABEL[sell.material].toLowerCase() : ''}`} dark>
        {sell && (
          <div className="space-y-4">
            <div><div className="flex justify-between text-sm"><span>Quantity</span><b>{kg(qty)}</b></div><input type="range" min="1" max={sell.kg} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="mt-2 w-full accent-lime" /></div>
            <label className="block"><span className="mb-1 block text-xs text-night-muted">Asking price per kg (₹)</span><input className="nfield" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))} /></label>
            <p className="text-sm text-night-muted">Expected revenue ≈ <b className="text-night-text">{inr(qty * Number(price || 0))}</b></p>
            <button className="nbtn-lime w-full" disabled={busy === 'list'} onClick={list}>{busy === 'list' && <Spinner size={14} />}List to authorised recyclers</button>
          </div>
        )}
      </Sheet>
    </div>
  );
}
