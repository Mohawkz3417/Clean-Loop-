import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth, homeFor } from './lib/auth.jsx';
import { Logo, Spinner } from './components/ui.jsx';
import MobileShell from './layouts/MobileShell.jsx';
import AdminShell from './layouts/AdminShell.jsx';

const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const PublicDashboard = lazy(() => import('./pages/PublicDashboard.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));

const CHome = lazy(() => import('./pages/citizen/Home.jsx'));
const CReport = lazy(() => import('./pages/citizen/Report.jsx'));
const CDumping = lazy(() => import('./pages/citizen/Dumping.jsx'));
const CMap = lazy(() => import('./pages/citizen/MapView.jsx'));
const CRewards = lazy(() => import('./pages/citizen/Rewards.jsx'));
const CProfile = lazy(() => import('./pages/citizen/Profile.jsx'));
const CReports = lazy(() => import('./pages/citizen/MyReports.jsx'));
const CReportDetail = lazy(() => import('./pages/citizen/ReportDetail.jsx'));
const CCoach = lazy(() => import('./pages/citizen/Coach.jsx'));
const CPickup = lazy(() => import('./pages/citizen/Pickup.jsx'));
const CDrives = lazy(() => import('./pages/citizen/Drives.jsx'));
const CServices = lazy(() => import('./pages/citizen/Services.jsx'));
const CVolunteer = lazy(() => import('./pages/citizen/Volunteer.jsx'));

const WJobs = lazy(() => import('./pages/worker/Jobs.jsx'));
const WJob = lazy(() => import('./pages/worker/ActiveJob.jsx'));
const WRoute = lazy(() => import('./pages/worker/RoutePlan.jsx'));
const WEarnings = lazy(() => import('./pages/worker/Earnings.jsx'));
const WProfile = lazy(() => import('./pages/worker/Profile.jsx'));

const AOverview = lazy(() => import('./pages/admin/Overview.jsx'));
const AMap = lazy(() => import('./pages/admin/LiveMap.jsx'));
const AReports = lazy(() => import('./pages/admin/Reports.jsx'));
const AViolations = lazy(() => import('./pages/admin/Violations.jsx'));
const AWorkers = lazy(() => import('./pages/admin/Workers.jsx'));
const ACitizens = lazy(() => import('./pages/admin/Citizens.jsx'));
const ASla = lazy(() => import('./pages/admin/Sla.jsx'));
const AAlerts = lazy(() => import('./pages/admin/Alerts.jsx'));
const AMarket = lazy(() => import('./pages/admin/Marketplace.jsx'));
const AFunds = lazy(() => import('./pages/admin/Funds.jsx'));
const AServices = lazy(() => import('./pages/admin/Services.jsx'));
const ASurvekshan = lazy(() => import('./pages/admin/Survekshan.jsx'));
const ASettings = lazy(() => import('./pages/admin/Settings.jsx'));

function Splash() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-mist">
      <Logo size={44} />
      <Spinner className="text-canopy" />
    </div>
  );
}

function Guard({ role, children }) {
  const { user, ready } = useAuth();
  if (!ready) return <Splash />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={homeFor(user.role)} replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Splash />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/public" element={<PublicDashboard />} />

        <Route path="/app" element={<Guard role="citizen"><MobileShell role="citizen" /></Guard>}>
          <Route index element={<CHome />} />
          <Route path="report" element={<CReport />} />
          <Route path="dumping" element={<CDumping />} />
          <Route path="map" element={<CMap />} />
          <Route path="rewards" element={<CRewards />} />
          <Route path="profile" element={<CProfile />} />
          <Route path="reports" element={<CReports />} />
          <Route path="reports/:id" element={<CReportDetail />} />
          <Route path="coach" element={<CCoach />} />
          <Route path="pickup" element={<CPickup />} />
          <Route path="drives" element={<CDrives />} />
          <Route path="services" element={<CServices />} />
          <Route path="volunteer" element={<CVolunteer />} />
          <Route path="job/:id" element={<WJob />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/worker" element={<Guard role="worker"><MobileShell role="worker" /></Guard>}>
          <Route index element={<WJobs />} />
          <Route path="job/:id" element={<WJob />} />
          <Route path="route" element={<WRoute />} />
          <Route path="earnings" element={<WEarnings />} />
          <Route path="profile" element={<WProfile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/admin" element={<Guard role="admin"><AdminShell /></Guard>}>
          <Route index element={<AOverview />} />
          <Route path="map" element={<AMap />} />
          <Route path="reports" element={<AReports />} />
          <Route path="violations" element={<AViolations />} />
          <Route path="workers" element={<AWorkers />} />
          <Route path="citizens" element={<ACitizens />} />
          <Route path="sla" element={<ASla />} />
          <Route path="alerts" element={<AAlerts />} />
          <Route path="marketplace" element={<AMarket />} />
          <Route path="funds" element={<AFunds />} />
          <Route path="services" element={<AServices />} />
          <Route path="survekshan" element={<ASurvekshan />} />
          <Route path="settings" element={<ASettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
