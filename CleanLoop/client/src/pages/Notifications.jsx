import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Award, Briefcase, Wallet, Gavel, CheckCheck, Heart, Siren } from 'lucide-react';
import { get, post } from '../lib/api.js';
import { useI18n } from '../lib/i18n.jsx';
import { TopBar } from '../layouts/MobileShell.jsx';
import { Empty, Skeleton } from '../components/ui.jsx';
import { timeAgo } from '../lib/format.js';

const KIND = { badge: [Award, 'bg-lime-soft text-lime-deep'], job: [Briefcase, 'bg-[#E0EDFF] text-[#1F5FBF]'], payout: [Wallet, 'bg-canopy-50 text-canopy'], violation: [Gavel, 'bg-marigold-soft text-marigold-deep'], confirm: [CheckCheck, 'bg-canopy-50 text-canopy'], tip: [Heart, 'bg-coral-soft text-coral'], sos: [Siren, 'bg-coral-soft text-coral'] };

export default function Notifications() {
  const { t } = useI18n();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const base = pathname.startsWith('/worker') ? '/worker' : '/app';
  const [list, setList] = useState(null);
  useEffect(() => {
    get('/notifications').then((r) => { setList(r.notifications); post('/notifications/read').catch(() => {}); }).catch(() => setList([]));
  }, []);
  const open = (n) => {
    if (!n.reportId) return;
    if (base === '/app') nav(`/app/reports/${n.reportId}`);
    else if (n.kind === 'job') nav('/worker');
  };
  return (
    <div>
      <TopBar title={t('notifications')} back />
      <div className="space-y-2 px-4">
        {!list ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-16" />) : list.length === 0 ? <Empty icon="Bell" title="All caught up" body="Updates about your reports, jobs and rewards will appear here." />
          : list.map((n, i) => {
            const [I, c] = KIND[n.kind] || [Bell, 'bg-mist text-ink-soft'];
            return (
              <motion.button key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} onClick={() => open(n)} className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ${n.read ? 'bg-white/60' : 'bg-white shadow-lift'}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c}`}><I size={18} /></span>
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{n.title}</p><p className="text-xs text-ink-soft">{n.body}</p><p className="mt-0.5 text-[11px] text-ink-faint">{timeAgo(n.createdAt)}</p></div>
                {!n.read && <span className="mt-1.5 h-2 w-2 rounded-full bg-coral" />}
              </motion.button>
            );
          })}
      </div>
    </div>
  );
}
