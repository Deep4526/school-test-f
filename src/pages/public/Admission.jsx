   import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { GraduationCap, Loader2 } from 'lucide-react';

const Admission = () => {
  const [formData, setFormData] = useState({
    studentName: '', fatherName: '', motherName: '', dob: '', gender: 'Male',
    phone: '', address: '', appliedClass: '', previousSchool: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/admissions/apply', formData);
      toast.success('Application submitted successfully!');
      setFormData({ studentName: '', fatherName: '', motherName: '', dob: '', gender: 'Male', phone: '', address: '', appliedClass: '', previousSchool: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
            <GraduationCap size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Admission Application</h1>
          <p className="text-gray-600">Fill out the form below to apply for admission.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-card space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
              <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name *</label>
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Applied Class *</label>
              <select name="appliedClass" value={formData.appliedClass} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary">
                <option value="">Select Class</option>
                <option value="Nursery">Nursery</option>
                <option value="KG">KG</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary"></textarea>
            </div>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <GraduationCap size={18} />}
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Admission;