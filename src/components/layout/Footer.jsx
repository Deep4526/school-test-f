// import { MapPin, Phone, Mail, Globe, Share2, PlayCircle, ArrowUp } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-primary text-white pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
//         <div>
//           <h3 className="text-xl font-bold mb-4 text-accent">Madrasha Site</h3>
//           <p className="text-white/80 text-sm mb-4">Building a brighter future through quality Islamic and modern education.</p>
          
//           {/* Replaced brand icons */}
//           <div className="flex gap-3">
//             <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition"><Globe size={14} /></a>
//             <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition"><PlayCircle size={14} /></a>
//             <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition"><Share2 size={14} /></a>
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
//           <ul className="space-y-2 text-sm text-white/80">
//             <li><Link to="/" className="hover:text-accent">Home</Link></li>
//             <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
//             <li><Link to="/admission" className="hover:text-accent">Admission</Link></li>
//             <li><Link to="/notices" className="hover:text-accent">Notices</Link></li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-4 text-accent">Contact Info</h4>
//           <ul className="space-y-3 text-sm text-white/80">
//             <li className="flex gap-2"><MapPin size={16} className="text-accent shrink-0" /> Village- Moushal, South 24 Parganas</li>
//             <li className="flex gap-2"><Phone size={16} className="text-accent shrink-0" /> +91 99320 63119</li>
//             <li className="flex gap-2"><Mail size={16} className="text-accent shrink-0" /> connect@madrasha.org</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-4 text-accent">Newsletter</h4>
//           <p className="text-sm text-white/80 mb-3">Get latest updates and news.</p>
//           <div className="flex">
//             <input type="email" placeholder="Your Email" className="flex-1 px-3 py-2 rounded-l-md text-gray-900 text-sm focus:outline-none" />
//             <button className="bg-accent text-primary-dark px-4 rounded-r-md font-semibold hover:bg-accent-dark transition">→</button>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60 flex justify-between items-center max-w-7xl mx-auto px-4">
//         <p>© 2026 Madrasha Site. All Rights Reserved.</p>
//         <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-10 h-10 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-dark transition">
//           <ArrowUp size={18} />
//         </button>
//       </div>
//     </footer>
//   );
// };
// export default Footer;

import { MapPin, Phone, Mail, Globe, Share2, PlayCircle, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../contexts/SiteSettingContext';

const Footer = () => {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold mb-4 text-accent">{settings.siteName || 'Madrasha Site'}</h3>
          <p className="text-white/80 text-sm mb-4">{settings.footerAbout || 'Building a brighter future through quality Islamic and modern education.'}</p>
          
          <div className="flex gap-3">
            <a href={settings.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition"><Globe size={14} /></a>
            <a href={settings.youtube || '#'} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition"><PlayCircle size={14} /></a>
            <a href={settings.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition"><Share2 size={14} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/admission" className="hover:text-accent">Admission</Link></li>
            <li><Link to="/notices" className="hover:text-accent">Notices</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Contact Info</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin size={16} className="text-accent shrink-0" /> {settings.address || 'Village- Moushal, South 24 Parganas'}</li>
            <li className="flex gap-2"><Phone size={16} className="text-accent shrink-0" /> {settings.phone || '+91 99320 63119'}</li>
            <li className="flex gap-2"><Mail size={16} className="text-accent shrink-0" /> {settings.email || 'connect@madrasha.org'}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Newsletter</h4>
          <p className="text-sm text-white/80 mb-3">Get latest updates and news.</p>
          <div className="flex">
            <input type="email" placeholder="Your Email" className="flex-1 px-3 py-2 rounded-l-md text-gray-900 text-sm focus:outline-none" />
            <button className="bg-accent text-primary-dark px-4 rounded-r-md font-semibold hover:bg-accent-dark transition">→</button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-sm text-white/60 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <p>© 2026 {settings.siteName || 'Madrasha Site'}. All Rights Reserved.</p>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-10 h-10 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-dark transition">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;