import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Users, Plus, Trash2, Loader2, X } from 'lucide-react';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', rollNo: '', class: '', section: 'A',
    fatherName: '', motherName: '', phone: '', email: '',
    dob: '', gender: 'Male', address: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchStudents = async () => {
    try { const res = await api.get('/students'); setStudents(res.data.data || []); }
    catch (err) { toast.error('Failed to load students'); }
    finally { setLoading(false); }
  };

  const fetchClasses = async () => {
    try { const res = await api.get('/classes'); setClassesList(res.data.data || []); }
    catch (err) { /* silently ignore */ }
  };

  useEffect(() => { fetchStudents(); fetchClasses(); }, []);

  const resetForm = () => setFormData({
    name: '', rollNo: '', class: '', section: 'A',
    fatherName: '', motherName: '', phone: '', email: '',
    dob: '', gender: 'Male', address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/students', formData);
      toast.success('Student added successfully!');
      resetForm();
      setShowForm(false);
      fetchStudents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add student');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try { await api.delete(`/students/${id}`); toast.success('Student deleted'); fetchStudents(); }
    catch (err) { toast.error('Failed to delete'); }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Users size={24} className="text-primary" /> Student Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? 'Close Form' : 'Add Student'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid md:grid-cols-3 gap-4">
          <input type="text" placeholder="Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="text" placeholder="Roll No *" required value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="px-3 py-2 border rounded-md" />
          <select required value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="px-3 py-2 border rounded-md">
            <option value="">-- Select Class * --</option>
            {classesList.length > 0 ? (
              classesList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)
            ) : (
              <>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Hifz">Hifz</option>
              </>
            )}
          </select>
          <input type="text" placeholder="Father Name *" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="text" placeholder="Mother Name *" required value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="tel" placeholder="Phone *" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="px-3 py-2 border rounded-md" />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-3 py-2 border rounded-md" />
          <div>
            <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
            <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="px-3 py-2 border rounded-md">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="px-3 py-2 border rounded-md md:col-span-2" />
          <button type="submit" disabled={submitting} className="btn-primary md:col-span-3 flex justify-center items-center gap-2">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} {submitting ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Roll</th><th className="px-6 py-4">Class</th><th className="px-6 py-4">Phone</th><th className="px-6 py-4 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.length === 0 ? <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No students found.</td></tr> :
              students.map(s => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4">{s.rollNo}</td>
                  <td className="px-6 py-4">{s.class}-{s.section}</td>
                  <td className="px-6 py-4">{s.phone}</td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StudentManagement;