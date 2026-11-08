import { useEffect, useState } from 'react';
import api from '../../services/api';
import HeroSection from '../../components/home/HeroSection';
import QuickLinks from '../../components/home/QuickLinks';
import { Link } from 'react-router-dom';
import { Megaphone, ArrowRight } from 'lucide-react';

const Home = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    api.get('/notices').then(res => setNotices(res.data.data || [])).catch(err => console.error(err));
  }, []);

  return (
    <>
      <HeroSection />
      
      {/* Real Notice Board */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-2 font-semibold">
              <Megaphone size={18} /> Notice Board
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6">
            {notices.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No notices published yet.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {notices.slice(0, 3).map((n) => (
                  <div key={n._id} className="flex items-start gap-4 pb-4 md:pb-0 md:border-r last:border-0 border-gray-100">
                    <div className="bg-primary text-white rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-2xl font-bold">{new Date(n.date).getDate()}</div>
                      <div className="text-xs">{new Date(n.date).toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {n.title}
                        {n.isImportant && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">New</span>}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
              <Link to="/notices" className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">View All <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <QuickLinks />
    </>
  );
};
export default Home;