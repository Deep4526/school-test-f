import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Megaphone, GraduationCap, Award, Phone, FileQuestion, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { title: 'Notice Board', desc: 'Read latest announcements', path: '/notices', icon: Megaphone, color: 'text-blue-600 bg-blue-50' },
    { title: 'Admissions', desc: 'Apply online & requirements', path: '/admission', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Exam Results', desc: 'Search academic marksheet', path: '/results', icon: Award, color: 'text-amber-600 bg-amber-50' },
    { title: 'Contact Office', desc: 'Get in touch with support', path: '/contact', icon: Phone, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-gray-50/60">
      <div className="max-w-2xl w-full text-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6 shadow-xs animate-bounce">
          <FileQuestion size={44} />
        </div>

        {/* 404 Headline */}
        <h1 className="text-7xl md:text-9xl font-black text-primary tracking-tight mb-2 select-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Oops! The page you are looking for might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center gap-2 !py-2.5 !px-5 text-sm"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link
            to="/"
            className="btn-primary flex items-center gap-2 !py-2.5 !px-5 text-sm shadow-md"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>

        {/* Helpful Links Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-xs text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-center">
            Or try one of these popular pages
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50 transition group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;