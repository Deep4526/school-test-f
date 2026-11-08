import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Award, Plus, Loader2 } from 'lucide-react';

const CertificateManagement = () => {
  const [certs, setCerts] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ student: '', type: 'Completion', details: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/certificates').then(res => setCerts(res.data.data || []));
    api.get('/students').then(res => setStudents(res.data.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      await api.post('/certificates', formData);
      toast.success('Certificate Generated!');
      setFormData({ student: '', type: 'Completion', details: '' });
      const res = await api.get('/certificates');
      setCerts(res.data.data || []);
    } catch (err) { toast.error('Failed'); }
    finally { setSubmitting(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Award size={24} className="text-primary" /> Certificate Management</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Generate Certificate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select required value={formData.student} onChange={e => setFormData({...formData, student: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="">-- Select Student --</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="Completion">Completion</option>
              <option value="Character">Character</option>
              <option value="Achievement">Achievement</option>
            </select>
            <textarea placeholder="Details (Optional)" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full px-3 py-2 border rounded-md" rows="3"></textarea>
            <button type="submit" disabled={submitting} className="btn-primary w-full flex justify-center items-center gap-2">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Generate
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Cert ID</th><th className="px-6 py-4">Student</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Date</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {certs.map(c => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-primary">{c.certificateNo}</td>
                  <td className="px-6 py-4">{c.student?.name}</td>
                  <td className="px-6 py-4"><span className="bg-accent-light text-accent-dark px-2 py-1 rounded text-xs font-medium">{c.type}</span></td>
                  <td className="px-6 py-4 text-xs">{new Date(c.issueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CertificateManagement;