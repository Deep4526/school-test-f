import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Calendar, Plus, Trash2, Loader2 } from 'lucide-react';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({ name: '', class: '', startDate: '', endDate: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchExams = async () => {
    const res = await api.get('/exams');
    setExams(res.data.data || []);
  };
  useEffect(() => { fetchExams(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      await api.post('/exams', formData);
      toast.success('Exam created!');
      setFormData({ name: '', class: '', startDate: '', endDate: '' });
      fetchExams();
    } catch (err) { toast.error('Failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exam?')) return;
    await api.delete(`/exams/${id}`);
    toast.success('Deleted');
    fetchExams();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Calendar size={24} className="text-primary" /> Exam Management</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Add New Exam</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Exam Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
            <input type="text" placeholder="Class *" required value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
            <input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
            <input type="date" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
            <button type="submit" disabled={submitting} className="btn-primary w-full flex justify-center items-center gap-2">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Exam
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Class</th><th className="px-6 py-4">Dates</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {exams.map(ex => (
                <tr key={ex._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{ex.name}</td>
                  <td className="px-6 py-4">{ex.class}</td>
                  <td className="px-6 py-4 text-xs">{new Date(ex.startDate).toLocaleDateString()} - {new Date(ex.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(ex._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ExamManagement;