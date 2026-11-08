import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { GraduationCap, Plus, Trash2, Loader2, X } from 'lucide-react';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', subject: '', qualification: '', phone: '', email: '', photo: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchTeachers = async () => {
    try { const res = await api.get('/teachers'); setTeachers(res.data.data || []); }
    catch (err) { toast.error('Failed to load teachers'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchTeachers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      await api.post('/teachers', formData);
      toast.success('Teacher added!');
      setFormData({ name: '', subject: '', qualification: '', phone: '', email: '', photo: '' });
      setShowForm(false); fetchTeachers();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this teacher?')) return;
    try { await api.delete(`/teachers/${id}`); toast.success('Deleted'); fetchTeachers(); }
    catch (err) { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><GraduationCap size={24} className="text-primary" /> Teacher Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? 'Close Form' : 'Add Teacher'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="text" placeholder="Subject *" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="text" placeholder="Qualification *" required value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="tel" placeholder="Phone *" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="email" placeholder="Email *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-3 py-2 border rounded-md md:col-span-2" />
          <input type="url" placeholder="Photo URL (optional)" value={formData.photo} onChange={e => setFormData({...formData, photo: e.target.value})} className="px-3 py-2 border rounded-md md:col-span-2" />
          <button type="submit" disabled={submitting} className="btn-primary md:col-span-2 flex justify-center items-center gap-2">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} {submitting ? 'Adding...' : 'Add Teacher'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Subject</th><th className="px-6 py-4">Qualification</th><th className="px-6 py-4">Contact</th><th className="px-6 py-4 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.length === 0 ? <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No teachers found.</td></tr> :
              teachers.map(t => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    {t.photo ? <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">{t.name[0]}</div>}
                    {t.name}
                  </td>
                  <td className="px-6 py-4">{t.subject}</td>
                  <td className="px-6 py-4">{t.qualification}</td>
                  <td className="px-6 py-4 text-xs"><div>{t.phone}</div><div className="text-gray-500">{t.email}</div></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(t._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TeacherManagement;