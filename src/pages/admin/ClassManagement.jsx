import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { BookOpen, Plus, Trash2, Edit2, Loader2, X } from 'lucide-react';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/classes');
      setClasses(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/classes/${editingId}`, formData);
        toast.success('Class updated successfully!');
      } else {
        await api.post('/classes', formData);
        toast.success('Class created successfully!');
      }
      setFormData({ name: '', description: '' });
      setEditingId(null);
      setShowForm(false);
      fetchClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (cls) => {
    setEditingId(cls._id);
    setFormData({ name: cls.name, description: cls.description || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    try {
      await api.delete(`/classes/${id}`);
      toast.success('Class deleted');
      fetchClasses();
    } catch (err) {
      toast.error('Failed to delete class');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen size={24} className="text-primary" /> Class Management
        </h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', description: '' });
            setShowForm(!showForm);
          }}
          className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? 'Close Form' : 'Add Class'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Class Name * (e.g. Class 1, Hifz)"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary md:col-span-2 flex justify-center items-center gap-2"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {submitting ? 'Saving...' : editingId ? 'Update Class' : 'Create Class'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Class Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                    No classes found. Add your first class above.
                  </td>
                </tr>
              ) : (
                classes.map((cls) => (
                  <tr key={cls._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{cls.name}</td>
                    <td className="px-6 py-4 text-gray-600">{cls.description || '—'}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cls._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
