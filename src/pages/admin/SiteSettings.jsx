import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Settings, Save, Loader2, Globe, Phone, Mail, MapPin, Image } from 'lucide-react';

const defaultSettings = {
  siteName: '', tagline: '', logoUrl: '',
  email: '', phone: '', address: '',
  facebook: '', youtube: '', instagram: '', twitter: '',
  footerAbout: '', mapEmbedUrl: '',
};

const SiteSettings = () => {
  const [formData, setFormData] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings')
      .then(res => setFormData({ ...defaultSettings, ...res.data.data }))
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', formData);
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={32} className="animate-spin text-primary" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings size={26} className="text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Changes reflect live across the entire website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Identity */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Image size={18} className="text-primary" /> Site Identity
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Site Name</label>
              <input type="text" value={formData.siteName} onChange={set('siteName')} placeholder="Madrasha Site" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Logo Image URL</label>
              <input type="url" value={formData.logoUrl} onChange={set('logoUrl')} placeholder="https://example.com/logo.png" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tagline</label>
              <input type="text" value={formData.tagline} onChange={set('tagline')} placeholder="Knowledge • Character • Excellence" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Footer About Text</label>
              <textarea rows={2} value={formData.footerAbout} onChange={set('footerAbout')} placeholder="Short description in the footer" className="w-full px-3 py-2 border rounded-md text-sm resize-none" />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Phone size={18} className="text-primary" /> Contact Information
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1"><Mail size={12} className="inline mr-1" />Email</label>
              <input type="email" value={formData.email} onChange={set('email')} placeholder="contact@example.com" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1"><Phone size={12} className="inline mr-1" />Phone</label>
              <input type="text" value={formData.phone} onChange={set('phone')} placeholder="+91 99320 63119" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1"><MapPin size={12} className="inline mr-1" />Address</label>
              <input type="text" value={formData.address} onChange={set('address')} placeholder="Village, District, State" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Google Maps Embed URL (src only)</label>
              <input type="text" value={formData.mapEmbedUrl} onChange={set('mapEmbedUrl')} placeholder="https://maps.google.com/maps?q=..." className="w-full px-3 py-2 border rounded-md text-sm" />
              <p className="text-xs text-gray-400 mt-1">Google Maps → Share → Embed a map → copy the src value</p>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Globe size={18} className="text-primary" /> Social Media Links
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Facebook</label>
              <input type="text" value={formData.facebook} onChange={set('facebook')} placeholder="https://facebook.com/yourpage" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">YouTube</label>
              <input type="text" value={formData.youtube} onChange={set('youtube')} placeholder="https://youtube.com/@yourchannel" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Instagram</label>
              <input type="text" value={formData.instagram} onChange={set('instagram')} placeholder="https://instagram.com/yourprofile" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Twitter / X</label>
              <input type="text" value={formData.twitter} onChange={set('twitter')} placeholder="https://twitter.com/yourhandle" className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
          </div>
        </section>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 px-8 py-3">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
};

export default SiteSettings;
