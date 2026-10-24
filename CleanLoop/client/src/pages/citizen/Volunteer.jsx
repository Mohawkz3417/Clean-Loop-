import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HandHeart } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import JobCard from '../../components/JobCard.jsx';
import { Skeleton, Empty } from '../../components/ui.jsx';
import { useOrigin } from '../worker/Jobs.jsx';

export default function Volunteer() {
  const { user } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const nav = useNavigate();
  const origin = useOrigin(meta, user);
  const [jobs, setJobs] = useState(null);
  const [active, setActive] = useState([]);
  useEffect(() => {
    if (!origin) return;
    get(`/jobs/feed?lat=${origin.lat}&lng=${origin.lng}`).then((r) => setJobs(r.jobs.filter((j) => j.eligible).slice(0, 12))).catch(() => setJobs([]));
    get('/jobs/active').then((r) => setActive(r.jobs)).catch(() => {});
  }, [origin]);
  const claim = async (job) => {
    try { await post(`/jobs/${job.id}/claim`); toast(`Thank you! Earn ${job.yourPay} points when it's verified.`); nav(`/app/job/${job.id}`); return true; } catch (e) { toast(e.message, 'error'); return false; }
  };
  return (
    <div>
      <TopBar title="Volunteer cleanups" sub="Small, safe spots near you · paid in points" back="/app" />
      <div className="space-y-3 px-4">
        <div className="flex gap-3 rounded-3xl bg-canopy-50 p-4 text-sm text-ink-soft"><HandHeart size={22} className="shrink-0 text-canopy" />Only small, non-hazardous spots are shown. Check in at the spot, take a before and an after photo, and the AI verifies your work.</div>
        {active.map((j) => <button key={j.id} onClick={() => nav(`/app/job/${j.id}`)} className="btn-lime w-full">Continue your active cleanup</button>)}
        {!jobs ? [0, 1].map((i) => <Skeleton key={i} className="h-44" />) : jobs.length === 0 ? <Empty title="No volunteer spots nearby" body="Check back later or report a spot yourself." />
          : <AnimatePresence>{jobs.map((j) => <JobCard key={j.id} job={j} onClaim={claim} wardLabel={wardName(meta, j.ward)} volumeLabel={meta?.volumes?.[j.ai?.volume]?.label} />)}</AnimatePresence>}
      </div>
    </div>
  );
}
