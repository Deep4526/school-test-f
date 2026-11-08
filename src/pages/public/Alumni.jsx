import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Users, Loader2 } from 'lucide-react';

const Alumni = () => {
  const [formData, setFormData] = useState({ name: '', batch: '', currentJob: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      await api.post('/community/alumni', formData);
      toast.success('Registered as Alumni successfully!');
      setFormData({ name: '', batch: '', currentJob: '', email: '', phone: '' });
    } catch (err) { toast.error('Registration failed'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4"><Users size={32} className="text-purple-600" /></div>
          <h1 className="text-4xl font-bold text-primary mb-2">Alumni Registration</h1>
          <p className="text-gray-600">Join our alumni network and stay connected.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-card space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-4 py-3 border rounded-md" />
            <input type="text" placeholder="Passing Batch/Year *" required value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="px-4 py-3 border rounded-md" />
            <input type="text" placeholder="Current Job/Study" value={formData.currentJob} onChange={e => setFormData({...formData, currentJob: e.target.value})} className="px-4 py-3 border rounded-md" />
            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="px-4 py-3 border rounded-md" />
            <input type="email" placeholder="Email Address *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-4 py-3 border rounded-md md:col-span-2" />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full flex justify-center items-center gap-2">
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Users size={18} />} {submitting ? 'Registering...' : 'Register as Alumni'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Alumni;