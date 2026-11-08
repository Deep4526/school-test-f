import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const SiteSettingContext = createContext();

export const useSiteSettings = () => useContext(SiteSettingContext);

export const SiteSettingProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'Madrasha Site',
    tagline: 'Knowledge • Character • Excellence',
    logoUrl: '',
    email: 'connect@madrasha.org',
    phone: '+91 99320 63119',
    address: 'Village- Moushal, South 24 Parganas',
    facebook: '#',
    youtube: '#',
    instagram: '#',
    twitter: '#',
    footerAbout: 'Building a brighter future through quality Islamic and modern education.',
    mapEmbedUrl: '',
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      setSettings(res.data.data);
    } catch (err) {
      // keep defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  return (
    <SiteSettingContext.Provider value={{ settings, loading, refetch: fetchSettings }}>
      {children}
    </SiteSettingContext.Provider>
  );
};
