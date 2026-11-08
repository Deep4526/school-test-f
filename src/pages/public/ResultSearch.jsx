import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Search, Loader2, FileText } from 'lucide-react';

const ResultSearch = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({ rollNo: '', examId: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.get('/exams').then(res => setExams(res.data.data || [])); }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); setLoading(true); setResult(null);
    try {
      const res = await api.post('/results/search', formData);
      setResult(res.data.data);
    } catch (err) { toast.error(err.response?.data?.message || 'Result not found'); }
    finally { setLoading(false); }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
            <FileText size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Check Your Result</h1>
          <p className="text-gray-600">Enter your Roll Number and select Exam to view results.</p>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-8 rounded-xl shadow-card mb-8 flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Enter Roll Number *" required value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
          <select required value={formData.examId} onChange={e => setFormData({...formData, examId: e.target.value})} className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary">
            <option value="">-- Select Exam --</option>
            {exams.map(ex => <option key={ex._id} value={ex._id}>{ex.name}</option>)}
          </select>
          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 md:w-auto w-full">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Search
          </button>
        </form>

        {result && (
          <div className="bg-white rounded-xl shadow-card overflow-hidden animate-fade-in">
            <div className="bg-primary text-white p-6">
              <h2 className="text-2xl font-bold">{result.result.examination.name}</h2>
              <p className="text-white/80 mt-1">Student: {result.student.name} | Class: {result.student.class} | Roll: {result.student.rollNo}</p>
            </div>
            <div className="p-6">
              <table className="w-full text-sm text-left mb-6">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Marks</th><th className="px-4 py-3">Grade</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {result.result.subjects.map((s, i) => (
                    <tr key={i}><td className="px-4 py-3 font-medium">{s.name}</td><td className="px-4 py-3">{s.marks}</td><td className="px-4 py-3"><span className="bg-primary-light text-primary px-2 py-1 rounded text-xs font-bold">{s.grade}</span></td></tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div><p className="text-sm text-gray-500">Total Marks</p><p className="text-xl font-bold text-gray-900">{result.result.totalMarks}</p></div>
                <div><p className="text-sm text-gray-500">GPA</p><p className="text-xl font-bold text-accent">{result.result.gpa}</p></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResultSearch;