import { BookOpen, GraduationCap, Trophy, Image, Download, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  { icon: BookOpen, title: 'Academics', desc: 'Our Academic Info', to: '/academics', color: 'bg-green-100 text-green-700' },
  { icon: GraduationCap, title: 'Admission', desc: 'Apply Online', to: '/admission', color: 'bg-blue-100 text-blue-700' },
  { icon: Trophy, title: 'Results', desc: 'Check Result', to: '/results', color: 'bg-yellow-100 text-yellow-700' },
  { icon: Image, title: 'Gallery', desc: 'Photos & Videos', to: '/gallery', color: 'bg-purple-100 text-purple-700' },
  { icon: Download, title: 'Downloads', desc: 'Get Forms', to: '/downloads', color: 'bg-red-100 text-red-700' },
  { icon: Headphones, title: 'Contact Us', desc: 'Get in Touch', to: '/contact', color: 'bg-indigo-100 text-indigo-700' },
];

const QuickLinks = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {links.map((l, i) => (
            <Link key={i} to={l.to} className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-14 h-14 mx-auto rounded-full ${l.color} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <l.icon size={26} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{l.title}</h3>
              <p className="text-xs text-gray-600">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default QuickLinks;