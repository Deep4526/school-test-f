import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { BookOpen, Plus, Trash2, Edit2, Loader2, ExternalLink } from 'lucide-react';

const AcademicManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', category: 'Routine', description: '', link: '', fileType: 'pdf' });
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await api.get('/academics');
      setItems(res.data.data || []);
    } catch (err) { toast.error('Failed to load resources'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/academics/${editingId}`, formData);
        toast.success('Resource updated successfully!');
      } else {
        await api.post('/academics', formData);
        toast.success('Resource added successfully!');
      }
      setFormData({ title: '', category: 'Routine', description: '', link: '', fileType: 'pdf' });
      setEditingId(null);
      fetchItems();
    } catch (err) { toast.error('Failed to save'); }
    finally { setSubmitting(false); }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, category: item.category, description: item.description, link: item.link, fileType: item.fileType });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      await api.delete(`/academics/${id}`);
      toast.success('Deleted successfully');
      fetchItems();
    } catch (err) { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen size={24} className="text-primary" /> Academics Management
      </h1>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Title (e.g., Class 5 Routine 2026)" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="px-3 py-2 border rounded-md focus:outline-none focus:border-primary" />
        
        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="px-3 py-2 border rounded-md focus:outline-none focus:border-primary">
          <option value="Routine">Routine</option>
          <option value="Syllabus">Syllabus</option>
          <option value="Exam Schedule">Exam Schedule</option>
          <option value="Other">Other</option>
        </select>

        <select value={formData.fileType} onChange={e => setFormData({...formData, fileType: e.target.value})} className="px-3 py-2 border rounded-md focus:outline-none focus:border-primary">
          <option value="pdf">PDF Document</option>
          <option value="image">Image</option>
          <option value="link">External Link (Google Drive)</option>
        </select>

        <input type="url" placeholder="Google Drive Link or File URL *" required value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="px-3 py-2 border rounded-md focus:outline-none focus:border-primary md:col-span-2" />
        
        <textarea placeholder="Short Description (Optional)" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="px-3 py-2 border rounded-md focus:outline-none focus:border-primary md:col-span-2" rows="2"></textarea>
        
        <button type="submit" disabled={submitting} className="btn-primary md:col-span-2 flex justify-center items-center gap-2">
          {submitting ? <Loader2 size={16} className="animate-spin" /> : (editingId ? <Edit2 size={16} /> : <Plus size={16} />)}
          {editingId ? 'Update Resource' : 'Add Resource'}
        </button>
        
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', category: 'Routine', description: '', link: '', fileType: 'pdf' }); }} className="text-gray-500 text-sm md:col-span-2 hover:text-red-500 text-center mt-2">
            Cancel Editing
          </button>
        )}
      </form>

      {/* Resources List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="4" className="p-8 text-center">Loading...</td></tr> :
              items.length === 0 ? <tr><td colSpan="4" className="p-8 text-center text-gray-500">No resources added yet.</td></tr> :
              items.map(item => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{item.description}</div>
                  </td>
                  <td className="px-6 py-4"><span className="bg-primary-light text-primary px-2 py-1 rounded text-xs font-medium">{item.category}</span></td>
                  <td className="px-6 py-4 capitalize">{item.fileType}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Link"><ExternalLink size={16} /></a>
                    <button onClick={() => handleEdit(item)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg" title="Edit"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AcademicManagement;