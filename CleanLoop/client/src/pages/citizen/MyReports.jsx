import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { get } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Segmented, StatusPill, SeverityPill, Skeleton, Empty, CATEGORY_LABEL, stagger } from '../../components/ui.jsx';
import { Photo } from '../../components/media.jsx';
import { timeAgo } from '../../lib/format.js';

export default function MyReports() {
  const meta = useMeta();
  const { t } = useI18n();
  const [reports, setReports] = useState(null);
  const [tab, setTab] = useState('all');
  useEffect(() => { get('/reports/mine').then((r) => setReports(r.reports)).catch(() => setReports([])); }, []);
  const list = useMemo(() => (reports || []).filter((r) => tab === 'all' || (tab === 'open' ? r.status !== 'completed' && r.status !== 'rejected' : r.status === 'completed')), [reports, tab]);
  return (
    <div>
      <TopBar title={t('myReports')} back="/app" />
      <div className="px-4">
        <Segmented value={tab} onChange={setTab} options={[{ value: 'all', label: 'All', count: reports?.length }, { value: 'open', label: 'In progress' }, { value: 'done', label: 'Cleaned' }]} />
        <div className="mt-4 space-y-2">
          {!reports ? [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)
            : list.length === 0 ? <Empty icon="Camera" title="Nothing here yet" body="Reports you file or confirm show up here." action={<Link to="/app/report" className="btn-primary btn-sm">Report garbage</Link>} />
              : list.map((r, i) => (
                <motion.div key={r.id} {...stagger(i, 0.03)}>
                  <Link to={`/app/reports/${r.id}`} className="flex gap-3 rounded-3xl bg-white p-2.5 shadow-lift">
                    <Photo src={r.photo} category={r.ai?.category} seed={r.id} className="h-20 w-20 shrink-0 rounded-2xl" />
                    <div className="min-w-0 flex-1 py-0.5">
                      <p className="truncate font-semibold">{CATEGORY_LABEL[r.ai?.category]}</p>
                      <p className="truncate text-xs text-ink-faint">{wardName(meta, r.ward)} · {timeAgo(r.createdAt)}{r.isConfirmation ? ' · confirmed by you' : ''}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1"><StatusPill status={r.status} short /><SeverityPill severity={r.ai?.severity} /></div>
                    </div>
                    <ChevronRight size={18} className="mt-1 text-ink-faint" />
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
}
