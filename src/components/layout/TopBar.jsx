import { Mail, Phone, Megaphone, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSiteSettings } from '../../contexts/SiteSettingContext';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { lang, toggleLang } = useLanguage();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const announcements = [
    lang === 'en' ? 'Official Admission Notification 2027-2028' : '২০২৭-২০২৮ সেশনের ভর্তি বিজ্ঞপ্তি',
    lang === 'en' ? 'Scholarship Available for Meritorious Students' : 'মেধাবী শিক্ষার্থীদের জন্য বৃত্তি সুবিধা চালু',
    lang === 'en' ? 'Annual Sports Day Registration Open' : 'বার্ষিক ক্রীড়া প্রতিযোগিতায় অংশগ্রহণের জন্য নিবন্ধন চলছে',
  ];

  return (
    <>
      {/* ===== SECTION 1: Announcement Marquee & Language Toggle ===== */}
      <div className="bg-accent text-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Announcement Label & Scrolling Text */}
          <div className="flex items-center flex-1 overflow-hidden">
            {/* Announcement Label */}
            <div className="bg-black text-accent px-4 md:px-5 py-3 font-bold flex items-center gap-2 shrink-0 z-10">
              <Megaphone size={18} />
              <span className="hidden sm:inline">{lang === 'en' ? 'Announcement' : 'ঘোষণা'}</span>
            </div>

            {/* Scrolling Text */}
            <div className="flex-1 overflow-hidden py-3 relative">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...announcements, ...announcements].map((text, i) => (
                  <span key={i} className="flex items-center mx-4 md:mx-8 font-medium text-sm">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-primary-dark rounded-full mr-2 md:mr-3"></span>
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Language Toggle Button */}
          <div className="shrink-0 px-2 md:px-4 py-2">
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-md text-xs md:text-sm font-bold transition shadow-sm"
            >
              <Globe size={14} />
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

        </div>
      </div>

      {/* ===== SECTION 2: Contact Info Bar ===== */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center border-2 border-accent shadow-md overflow-hidden shrink-0">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-xs text-center leading-tight">MADRASHA</span>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary leading-tight">{settings?.siteName || 'Madrasha Site'}</h1>
              <p className="text-xs text-gray-600">{settings?.tagline || 'Knowledge • Character • Excellence'}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-4 md:gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div className="hidden md:block">
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-gray-800">{settings?.email || 'connect@madrasha.org'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                <p className="text-sm font-semibold text-gray-800">{settings?.phone || '+91 99320 63119'}</p>
              </div>
            </div>
          </div>

          {/* Donate Button */}
          <button 
            onClick={() => navigate('/donate')}
            className="bg-accent text-primary-dark px-5 py-2.5 rounded-md font-bold hover:bg-accent-dark transition shadow-md flex items-center gap-2 shrink-0"
          >
            <span>❤</span> <span className="hidden sm:inline">{lang === 'en' ? 'Donate Now' : 'এখনই দান করুন'}</span>
          </button>

        </div>
      </div>
    </>
  );
};

export default TopBar;