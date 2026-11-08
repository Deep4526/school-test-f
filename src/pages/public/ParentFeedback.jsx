import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { MessageSquare, Loader2 } from 'lucide-react';

const ParentFeedback = () => {
  const [formData, setFormData] = useState({ parentName: '', studentName: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try { await api.post('/misc/feedback', formData); toast.success('Feedback sent successfully!'); setFormData({ parentName: '', studentName: '', message: '' }); }
    catch (err) { toast.error('Failed'); } finally { setSubmitting(false); }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Parent's Corner</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-card space-y-4">
          <input type="text" placeholder="Parent Name *" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full px-4 py-3 border rounded-md" />
          <input type="text" placeholder="Student Name *" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 border rounded-md" />
          <textarea placeholder="Your Feedback / Suggestion *" required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border rounded-md"></textarea>
          <button type="submit" disabled={submitting} className="btn-primary w-full flex justify-center items-center gap-2">{submitting ? <Loader2 size={18} className="animate-spin" /> : <MessageSquare size={18} />} {submitting ? 'Sending...' : 'Send Feedback'}</button>
        </form>
      </div>
    </div>
  );
};
export default ParentFeedback;