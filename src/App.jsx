import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SiteSettingProvider } from './contexts/SiteSettingContext';


// Layouts & Guards
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import PortalLayout from './layouts/PortalLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Page Loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// ==========================================
// LAZY LOADED PUBLIC PAGES
// ==========================================
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Notices = lazy(() => import('./pages/public/Notices'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Admission = lazy(() => import('./pages/public/Admission'));
const ResultSearch = lazy(() => import('./pages/public/ResultSearch'));
const VerifyCertificate = lazy(() => import('./pages/public/VerifyCertificate'));
const Donation = lazy(() => import('./pages/public/Donation'));
const Library = lazy(() => import('./pages/public/Library'));
const IslamicCorner = lazy(() => import('./pages/public/IslamicCorner'));
const Alumni = lazy(() => import('./pages/public/Alumni'));
const Gallery = lazy(() => import('./pages/public/Gallery'));
const Faculty = lazy(() => import('./pages/public/Faculty'));
const Downloads = lazy(() => import('./pages/public/Downloads'));
const PressRelease = lazy(() => import('./pages/public/PressRelease'));
const Events = lazy(() => import('./pages/public/Events'));
const Departments = lazy(() => import('./pages/public/Departments'));
const Magazine = lazy(() => import('./pages/public/Magazine'));
const ParentFeedback = lazy(() => import('./pages/public/ParentFeedback'));
const DonorPanel = lazy(() => import('./pages/public/DonorPanel'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const Login = lazy(() => import('./pages/auth/Login'));

// ==========================================
// LAZY LOADED ADMIN PAGES
// ==========================================
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const NoticeManagement = lazy(() => import('./pages/admin/NoticeManagement'));
const AdmissionManagement = lazy(() => import('./pages/admin/AdmissionManagement'));
const StudentManagement = lazy(() => import('./pages/admin/StudentManagement'));
const ClassManagement = lazy(() => import('./pages/admin/ClassManagement'));
const TeacherManagement = lazy(() => import('./pages/admin/TeacherManagement'));
const ExamManagement = lazy(() => import('./pages/admin/ExamManagement'));
const ResultManagement = lazy(() => import('./pages/admin/ResultManagement'));
const CertificateManagement = lazy(() => import('./pages/admin/CertificateManagement'));
const DonationManagement = lazy(() => import('./pages/admin/DonationManagement'));
const PaymentManagement = lazy(() => import('./pages/admin/PaymentManagement'));
const LibraryManagement = lazy(() => import('./pages/admin/LibraryManagement'));
const ContentManagement = lazy(() => import('./pages/admin/ContentManagement'));
const CommunityManagement = lazy(() => import('./pages/admin/CommunityManagement'));
const MiscManagement = lazy(() => import('./pages/admin/MiscManagement'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
import Academics from './pages/public/Academics';
import AcademicManagement from './pages/admin/AcademicManagement';

// ==========================================
// LAZY LOADED PORTAL PAGES
// ==========================================
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const StudentFees = lazy(() => import('./pages/student/StudentFees'));
const ParentDashboard = lazy(() => import('./pages/parent/ParentDashboard'));

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  return (
    <SiteSettingProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
            
            {/* 1. Auth Route */}
            <Route path="/login" element={<Login />} />

            {/* 2. Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/results" element={<ResultSearch />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
              <Route path="/donate" element={<Donation />} />
              <Route path="/library" element={<Library />} />
              <Route path="/islamic-corner" element={<IslamicCorner />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/press" element={<PressRelease />} />
              <Route path="/events" element={<Events />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/magazine" element={<Magazine />} />
              <Route path="/feedback" element={<ParentFeedback />} />
              <Route path="/donors" element={<DonorPanel />} />
              <Route path="/404" element={<NotFound />} />
            </Route>

            {/* 3. Student Portal Routes */}
            <Route path="/student" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
              <Route index element={<StudentDashboard />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="results" element={<StudentDashboard />} />
              <Route path="notices" element={<StudentDashboard />} />
            </Route>

            {/* 4. Parent Portal Routes */}
            <Route path="/parent" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
              <Route index element={<ParentDashboard />} />
              <Route path="children" element={<ParentDashboard />} />
              <Route path="results" element={<ParentDashboard />} />
              <Route path="notices" element={<ParentDashboard />} />
            </Route>

            {/* 5. Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="notices" element={<NoticeManagement />} />
              <Route path="admissions" element={<AdmissionManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="classes" element={<ClassManagement />} />
              <Route path="teachers" element={<TeacherManagement />} />
              <Route path="exams" element={<ExamManagement />} />
              <Route path="results" element={<ResultManagement />} />
              <Route path="certificates" element={<CertificateManagement />} />
              <Route path="academics" element={<AcademicManagement />} />
              <Route path="donations" element={<DonationManagement />} />
              <Route path="payments" element={<PaymentManagement />} />
              <Route path="library" element={<LibraryManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="community" element={<CommunityManagement />} />
              <Route path="misc" element={<MiscManagement />} />
              <Route path="settings" element={<SiteSettings />} />
            </Route>

            {/* 6. Catch-All 404 Route */}
            <Route element={<PublicLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>

          </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </SiteSettingProvider>
  );
}

export default App;