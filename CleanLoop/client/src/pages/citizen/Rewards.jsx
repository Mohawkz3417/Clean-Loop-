import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown, Wallet, ArrowDownLeft, ArrowUpRight, Ticket, Copy } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Segmented, Icon, Avatar, Sheet, Spinner, CountUp, Skeleton, stagger } from '../../components/ui.jsx';
import { celebrate } from '../../lib/confetti.js';
import { inr, timeAgo, dateShort } from '../../lib/format.js';

export function WithdrawSheet({ open, onClose, onDone }) {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [upi, setUpi] = useState(user?.upi || '');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (open) { setAmount(String(Math.floor(user?.wallet || 0))); setUpi(user?.upi || ''); } }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const go = async () => {
    setBusy(true);
    try {
      const r = await post('/me/withdraw', { amount: Number(amount), upi });
      setUser(r.user);
      toast(`${inr(amount)} sent to ${upi}${r.simulated ? ' (simulated payout)' : ''}. Ref ${r.reference}`);
      onDone?.();
      onClose();
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };
  return (
    <Sheet open={open} onClose={onClose} title="Withdraw to UPI">
      <p className="text-sm text-ink-soft">Available: <b className="text-ink">{inr(user?.wallet)}</b></p>
      <label className="mt-4 block"><span className="label">Amount (₹)</span><input className="field font-display text-2xl" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} /></label>
      <label className="mt-3 block"><span className="label">UPI ID</span><input className="field" value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="name@bank" /></label>
      <button onClick={go} disabled={busy} className="btn-primary mt-5 w-full">{busy && <Spinner />}Withdraw {amount ? inr(amount) : ''}</button>
      <p className="mt-3 text-center text-xs text-ink-faint">Payouts are simulated until a UPI payout gateway is connected (see README).</p>
    </Sheet>
  );
}

export default function Rewards() {
  const { user, setUser, refresh } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const { t } = useI18n();
  const [tab, setTab] = useState('redeem');
  const [board, setBoard] = useState(null);
  const [boardTab, setBoardTab] = useState('citizens');
  const [wallet, setWallet] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [badge, setBadge] = useState(null);
  const [busy, setBusy] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  const loadWallet = () => get('/me/wallet').then(setWallet).catch(() => {});
  useEffect(() => { refresh(); loadWallet(); get('/leaderboard').then(setBoard).catch(() => {}); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const redeem = async () => {
    setBusy(true);
    try {
      const r = await post('/rewards/redeem', { itemId: confirm.id });
      setUser(r.user);
      setConfirm(null);
      setVoucher(r.redemption);
      celebrate(true);
      loadWallet();
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };

  const myBadges = new Map((user?.badges || []).map((b) => [b.key, b]));
  const badgeList = meta ? Object.entries(meta.badges).filter(([, b]) => b.role === 'citizen') : [];

  return (
    <div>
      <TopBar title={t('rewards')} />
      <div className="px-4">
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-canopy p-4 text-white shadow-float">
            <p className="text-xs text-white/70">Points balance</p>
            <p className="font-display text-3xl font-bold text-lime"><CountUp value={user?.points || 0} /></p>
            <p className="text-xs text-white/60">worth {inr((user?.points || 0) * 0.1)}</p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-lift">
            <p className="flex items-center gap-1 text-xs text-ink-faint"><Wallet size={13} />Cash wallet</p>
            <p className="font-display text-3xl font-bold"><CountUp value={user?.wallet || 0} format={inr} /></p>
            <button onClick={() => setWithdraw(true)} disabled={(user?.wallet || 0) < 10} className="mt-1 text-xs font-semibold text-canopy disabled:text-ink-faint">Withdraw to UPI</button>
          </div>
        </section>

        <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4">
          <Segmented value={tab} onChange={setTab} options={[{ value: 'redeem', label: t('redeem') }, { value: 'badges', label: t('badges') }, { value: 'board', label: t('leaderboard') }, { value: 'history', label: t('history') }]} />
        </div>

        {tab === 'redeem' && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {meta?.catalog.map((it, i) => {
              const can = (user?.points || 0) >= it.cost;
              return (
                <motion.button key={it.id} {...stagger(i)} onClick={() => setConfirm(it)} className="flex flex-col rounded-3xl bg-white p-4 text-left shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canopy-50 text-canopy"><Icon name={it.icon} size={22} /></span>
                  <p className="mt-3 text-sm font-semibold leading-tight">{it.title}</p>
                  <p className="text-xs text-ink-faint">{it.partner} · worth {inr(it.value)}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-leaf" style={{ width: `${Math.min(100, ((user?.points || 0) / it.cost) * 100)}%` }} /></div>
                  <p className={`mt-1.5 text-xs font-bold ${can ? 'text-canopy' : 'text-ink-faint'}`}>{it.cost.toLocaleString('en-IN')} pts</p>
                </motion.button>
              );
            })}
          </div>
        )}

        {tab === 'badges' && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {badgeList.map(([key, b], i) => {
              const got = myBadges.get(key);
              return (
                <motion.button key={key} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05, type: 'spring', damping: 14 }} onClick={() => setBadge({ key, ...b, got })}
                  className={`flex flex-col items-center rounded-3xl p-3 text-center ${got ? 'bg-white shadow-lift' : 'bg-white/50'}`}>
                  <span className={`relative flex h-16 w-16 items-center justify-center rounded-full ${got ? 'bg-[conic-gradient(from_200deg,#B6F04A,#14A06B,#0E5E4A,#B6F04A)] text-white shadow-glow' : 'bg-line/60 text-ink-faint'}`}>
                    <span className={`flex h-[52px] w-[52px] items-center justify-center rounded-full ${got ? 'bg-canopy' : 'bg-white/60'}`}>{got ? <Icon name={b.icon} size={24} className="text-lime" /> : <Lock size={20} />}</span>
                  </span>
                  <p className={`mt-2 text-xs font-semibold leading-tight ${got ? '' : 'text-ink-faint'}`}>{b.name}</p>
                </motion.button>
              );
            })}
          </div>
        )}

        {tab === 'board' && (
          <div className="mt-4">
            <Segmented value={boardTab} onChange={setBoardTab} options={[{ value: 'citizens', label: 'Citizens' }, { value: 'wards', label: 'Wards' }]} />
            {!board ? <Skeleton className="mt-4 h-60" /> : boardTab === 'citizens' ? (
              <>
                <div className="mt-5 grid grid-cols-3 items-end gap-2">
                  {[board.citizens[1], board.citizens[0], board.citizens[2]].map((c, k) => c && (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * k }} className="flex flex-col items-center text-center">
                      {k === 1 && <Crown size={22} className="mb-1 text-marigold" />}
                      <Avatar name={c.name} size={k === 1 ? 60 : 48} />
                      <p className="mt-1 w-full truncate text-xs font-semibold">{c.name.split(' ')[0]}</p>
                      <div className={`mt-2 w-full rounded-t-2xl ${k === 1 ? 'h-24 bg-canopy text-lime' : 'h-16 bg-canopy-100 text-canopy-700'} flex flex-col items-center justify-center`}>
                        <span className="font-display text-xl font-bold">{c.rank}</span>
                        <span className="text-[10px]">{c.points.toLocaleString('en-IN')} pts</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-1.5 rounded-b-3xl bg-white p-2 shadow-lift">
                  {board.citizens.slice(3, 15).map((c) => (
                    <div key={c.id} className={`flex items-center gap-3 rounded-2xl px-2 py-2 ${c.id === user?.id ? 'bg-lime-soft' : ''}`}>
                      <span className="num w-6 text-center text-sm font-bold text-ink-faint">{c.rank}</span>
                      <Avatar name={c.name} size={34} />
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{c.name}{c.id === user?.id ? ' (you)' : ''}</p><p className="text-xs text-ink-faint">{c.level} · {wardName(meta, c.ward)}</p></div>
                      <span className="num text-sm font-bold">{c.points.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-4 space-y-2">
                {board.wards.map((w) => (
                  <div key={w.id} className={`flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lift ${w.id === user?.ward ? 'ring-2 ring-lime' : ''}`}>
                    <span className="num w-6 text-center font-display text-lg font-bold text-ink-faint">{w.rank}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{w.name}{w.id === user?.ward ? ' · your ward' : ''}</p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-[linear-gradient(90deg,#14A06B,#B6F04A)]" style={{ width: `${w.score}%` }} /></div>
                    </div>
                    <span className="font-display text-lg font-bold text-canopy">{w.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="mt-4 space-y-4">
            {wallet?.redemptions?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold">My vouchers</p>
                {wallet.redemptions.map((r) => (
                  <div key={r.id} className="mb-2 flex items-center gap-3 rounded-2xl border border-dashed border-canopy-300 bg-white p-3">
                    <Ticket size={22} className="text-canopy" />
                    <div className="flex-1"><p className="text-sm font-semibold">{r.title}</p><p className="text-xs text-ink-faint">{dateShort(r.createdAt)} · {r.partner}</p></div>
                    <code className="rounded-lg bg-mist px-2 py-1 text-xs font-bold">{r.code}</code>
                  </div>
                ))}
              </div>
            )}
            <div className="rounded-3xl bg-white p-2 shadow-lift">
              {!wallet ? <Skeleton className="h-40" /> : wallet.transactions.length === 0 ? <p className="p-4 text-center text-sm text-ink-faint">No activity yet.</p> : wallet.transactions.map((tx) => {
                const plus = (tx.points || tx.amount) > 0;
                return (
                  <div key={tx.id} className="flex items-center gap-3 px-2 py-2.5">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full ${plus ? 'bg-canopy-50 text-canopy' : 'bg-coral-soft text-coral'}`}>{plus ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm">{tx.description}</p><p className="text-xs text-ink-faint">{timeAgo(tx.createdAt)}</p></div>
                    <span className={`num text-sm font-bold ${plus ? 'text-canopy' : 'text-coral'}`}>{tx.kind === 'money' ? `${plus ? '+' : '−'}${inr(Math.abs(tx.amount))}` : `${plus ? '+' : '−'}${Math.abs(tx.points)} pts`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Sheet open={Boolean(confirm)} onClose={() => setConfirm(null)} title="Redeem reward">
        {confirm && (
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-canopy-50 text-canopy"><Icon name={confirm.icon} size={30} /></span>
            <p className="mt-3 font-display text-xl font-bold">{confirm.title}</p>
            <p className="text-sm text-ink-soft">{confirm.partner} · worth {inr(confirm.value)}</p>
            <p className="mt-4 text-sm">Costs <b>{confirm.cost.toLocaleString('en-IN')} points</b>. You have {(user?.points || 0).toLocaleString('en-IN')}.</p>
            <button onClick={redeem} disabled={busy || (user?.points || 0) < confirm.cost} className="btn-primary mt-5 w-full">{busy && <Spinner />}{(user?.points || 0) < confirm.cost ? `${(confirm.cost - (user?.points || 0)).toLocaleString('en-IN')} more points needed` : 'Redeem now'}</button>
          </div>
        )}
      </Sheet>
      <Sheet open={Boolean(voucher)} onClose={() => setVoucher(null)} title="Reward unlocked">
        {voucher && (
          <div className="text-center">
            <p className="text-sm text-ink-soft">{voucher.title}</p>
            <div className="mx-auto mt-4 rounded-3xl border-2 border-dashed border-canopy bg-canopy-50 px-4 py-5">
              <p className="text-xs text-ink-faint">Your voucher code</p>
              <p className="font-display text-3xl font-bold tracking-wider text-canopy">{voucher.code}</p>
            </div>
            <button onClick={() => { navigator.clipboard?.writeText(voucher.code); toast('Code copied'); }} className="btn-soft mt-4"><Copy size={16} />Copy code</button>
            <p className="mt-3 text-xs text-ink-faint">Show this code at {voucher.partner}. It is saved under History.</p>
          </div>
        )}
      </Sheet>
      <Sheet open={Boolean(badge)} onClose={() => setBadge(null)} title={badge?.name || ''}>
        {badge && (
          <div className="text-center">
            <motion.span initial={{ rotate: -20, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', damping: 10 }} className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${badge.got ? 'bg-canopy text-lime shadow-glow' : 'bg-mist text-ink-faint'}`}>
              {badge.got ? <Icon name={badge.icon} size={40} /> : <Lock size={32} />}
            </motion.span>
            <p className="mt-4 text-ink-soft">{badge.desc}</p>
            <p className="mt-2 text-sm font-semibold">{badge.got ? `Unlocked ${dateShort(badge.got.at)}` : 'Not unlocked yet'}</p>
          </div>
        )}
      </Sheet>
      <WithdrawSheet open={withdraw} onClose={() => setWithdraw(false)} onDone={loadWallet} />
    </div>
  );
}
