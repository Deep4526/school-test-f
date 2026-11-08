import { Outlet } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;