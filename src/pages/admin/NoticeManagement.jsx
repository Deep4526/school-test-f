import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Trash2, Megaphone, Loader2, Pencil, X, Check } from 'lucide-react';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'General', isImportant: false, attachment: '' });
  const [submitting, setSubmitting] = useState(false);

  // Fetch Notices
  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices');
      setNotices(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  // Handle Populate Form for Edit
  const handleEdit = (notice) => {
    setEditingId(notice._id);
    setFormData({
      title: notice.title || '',
      description: notice.description || '',
      category: notice.category || 'General',
      isImportant: !!notice.isImportant,
      attachment: notice.attachment || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', category: 'General', isImportant: false, attachment: '' });
  };

  // Handle Add or Update Notice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/notices/${editingId}`, formData);
        toast.success('Notice updated successfully!');
      } else {
        await api.post('/notices', formData);
        toast.success('Notice published successfully!');
      }
      handleCancelEdit();
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || (editingId ? 'Failed to update notice' : 'Failed to create notice'));
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Notice
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      toast.success('Notice deleted');
      if (editingId === id) {
        handleCancelEdit();
      }
      fetchNotices();
    } catch (err) {
      toast.error('Failed to delete notice');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notice Management</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Add / Edit Notice Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {editingId ? (
                  <>
                    <Pencil size={20} className="text-blue-600" /> Edit Notice
                  </>
                ) : (
                  <>
                    <Plus size={20} className="text-primary" /> Add New Notice
                  </>
                )}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium"
                >
                  <X size={14} /> Cancel
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                  placeholder="e.g. Eid Holiday Notice"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Details about the notice..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                >
                  <option value="General">General</option>
                  <option value="Admission">Admission</option>
                  <option value="Exam">Exam</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment / Document Link (Optional)</label>
                <input 
                  type="url" 
                  value={formData.attachment}
                  onChange={(e) => setFormData({...formData, attachment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary text-sm"
                  placeholder="https://... (PDF, Document link)"
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="important"
                  checked={formData.isImportant}
                  onChange={(e) => setFormData({...formData, isImportant: e.target.checked})}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <label htmlFor="important" className="text-sm text-gray-700">Mark as Important</label>
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className={`${editingId ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'btn-primary'} flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition`}
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : editingId ? <Check size={18} /> : <Plus size={18} />}
                  {submitting ? (editingId ? 'Updating...' : 'Publishing...') : (editingId ? 'Update Notice' : 'Publish Notice')}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn-outline !py-2.5 !px-4 text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Notices List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Megaphone size={20} className="text-primary" /> All Notices
              </h2>
              <span className="text-sm text-gray-500">{notices.length} Total</span>
            </div>
            
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No notices found. Add one!</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notices.map((notice) => {
                  const isCurrent = editingId === notice._id;
                  return (
                    <div 
                      key={notice._id} 
                      className={`p-4 transition flex items-start justify-between gap-4 ${
                        isCurrent ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                          {notice.isImportant && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded font-medium">Important</span>}
                          <span className="bg-primary-light text-primary text-xs px-2 py-0.5 rounded font-medium">{notice.category}</span>
                          {isCurrent && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-bold">Editing</span>}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{notice.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-xs text-gray-400">{new Date(notice.date).toLocaleDateString()}</p>
                          {notice.attachment && (
                            <a 
                              href={notice.attachment} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-primary hover:underline font-medium"
                            >
                              View Attachment
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEdit(notice)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Notice"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(notice._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete Notice"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeManagement;