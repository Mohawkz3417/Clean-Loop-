import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Wallet, Hourglass, Heart, BadgeIndianRupee, ArrowUpRight, ArrowDownLeft, Star } from 'lucide-react';
import { get } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { CountUp, Segmented, Skeleton } from '../../components/ui.jsx';
import { WithdrawSheet } from '../citizen/Rewards.jsx';
import { inr, timeAgo, dateShort } from '../../lib/format.js';

export default function Earnings() {
  const { user, refresh } = useAuth();
  const { t } = useI18n();
  const [e, setE] = useState(null);
  const [w, setW] = useState(null);
  const [tab, setTab] = useState('week');
  const [withdraw, setWithdraw] = useState(false);
  const load = () => { get('/worker/earnings').then(setE).catch(() => {}); get('/me/wallet').then(setW).catch(() => {}); refresh(); };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const big = e ? { today: e.today, week: e.week, month: e.month }[tab] : 0;
  return (
    <div>
      <TopBar title={t('earnings')} />
      <div className="space-y-3 px-4">
        <section className="rounded-[28px] bg-ink p-5 text-white shadow-float">
          <Segmented dark value={tab} onChange={setTab} options={[{ value: 'today', label: 'Today' }, { value: 'week', label: '7 days' }, { value: 'month', label: '30 days' }]} />
          <p className="mt-4 font-display text-5xl font-bold text-lime">{e ? <CountUp value={big} format={inr} key={tab} /> : '—'}</p>
          <p className="text-sm text-white/60">{user?.workerType === 'salaried' ? `Incentives on top of your ${inr(e?.salary)} monthly salary` : 'Paid per verified cleanup'}</p>
          <div className="mt-4 h-28">
            {e && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={e.days} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" tickFormatter={(d) => new Date(d).getDate()} tick={{ fill: 'rgba(255,255,255,.5)', fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,.06)' }} contentStyle={{ background: '#0E5E4A', border: 0, borderRadius: 12, color: '#fff' }} labelFormatter={(d) => dateShort(d)} formatter={(v) => [inr(v), 'Earned']} />
                  <Bar dataKey="amount" radius={[6, 6, 2, 2]}>{e.days.map((d, i) => <Cell key={i} fill={i === e.days.length - 1 ? '#B6F04A' : 'rgba(182,240,74,.45)'} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white p-4 shadow-lift"><Wallet size={18} className="text-canopy" /><p className="mt-2 font-display text-2xl font-bold">{inr(user?.wallet)}</p><p className="text-xs text-ink-faint">Available</p>
            <button onClick={() => setWithdraw(true)} disabled={(user?.wallet || 0) < 10} className="mt-2 text-xs font-semibold text-canopy disabled:text-ink-faint">Withdraw to UPI</button></div>
          <div className="rounded-3xl bg-white p-4 shadow-lift"><Hourglass size={18} className="text-marigold-deep" /><p className="mt-2 font-display text-2xl font-bold">{inr(e?.held)}</p><p className="text-xs text-ink-faint">Held until citizens confirm (max 24 h)</p></div>
          <div className="rounded-3xl bg-white p-4 shadow-lift"><Heart size={18} className="text-coral" /><p className="mt-2 font-display text-2xl font-bold">{inr(e?.tips)}</p><p className="text-xs text-ink-faint">Thank-you tips</p></div>
          <div className="rounded-3xl bg-white p-4 shadow-lift"><BadgeIndianRupee size={18} className="text-canopy" /><p className="mt-2 font-display text-2xl font-bold">{inr(e?.total)}</p><p className="text-xs text-ink-faint">Lifetime earnings</p></div>
        </section>
        <section className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-lift">
          <Star size={22} className="fill-marigold text-marigold" />
          <div className="flex-1"><p className="font-semibold">{e?.tier} tier · {e?.rating?.toFixed?.(2)} rating</p><p className="text-xs text-ink-faint">{e?.jobsDone} verified jobs. Higher tiers see high-pay jobs first.</p></div>
        </section>
        <section className="rounded-3xl bg-white p-2 shadow-lift">
          <p className="px-2 pb-1 pt-2 text-sm font-semibold">Transactions</p>
          {!w ? <Skeleton className="h-40" /> : w.transactions.filter((x) => x.kind === 'money').slice(0, 25).map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="flex items-center gap-3 px-2 py-2.5">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.amount > 0 ? 'bg-canopy-50 text-canopy' : 'bg-coral-soft text-coral'}`}>{tx.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm">{tx.description}</p><p className="text-xs text-ink-faint">{timeAgo(tx.createdAt)}{tx.simulated ? ' · simulated payout' : ''}</p></div>
              <span className={`num text-sm font-bold ${tx.amount > 0 ? 'text-canopy' : 'text-coral'}`}>{tx.amount > 0 ? '+' : '−'}{inr(Math.abs(tx.amount))}</span>
            </motion.div>
          ))}
        </section>
      </div>
      <WithdrawSheet open={withdraw} onClose={() => setWithdraw(false)} onDone={load} />
    </div>
  );
}
