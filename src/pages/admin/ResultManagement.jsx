import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Award, Save, Loader2 } from 'lucide-react';

const ResultManagement = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', marks: 0, grade: '' }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/exams').then(res => setExams(res.data.data || []));
    api.get('/students').then(res => setStudents(res.data.data || []));
  }, []);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    if (field === 'marks') {
      const m = Number(value);
      newSubjects[index].grade = m >= 80 ? 'A+' : m >= 70 ? 'A' : m >= 60 ? 'B' : m >= 50 ? 'C' : m >= 40 ? 'D' : 'F';
    }
    setSubjects(newSubjects);
  };

  const addSubject = () => setSubjects([...subjects, { name: '', marks: 0, grade: '' }]);
  const removeSubject = (i) => setSubjects(subjects.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExam || !selectedStudent) return toast.error('Select Exam and Student');
    setSubmitting(true);
    try {
      const totalMarks = subjects.reduce((sum, s) => sum + Number(s.marks), 0);
      const gpa = (totalMarks / (subjects.length * 100) * 5).toFixed(2);
      await api.post('/results', { student: selectedStudent, examination: selectedExam, subjects, totalMarks, gpa, status: 'published' });
      toast.success('Result published!');
      setSubjects([{ name: '', marks: 0, grade: '' }]);
    } catch (err) { toast.error('Failed'); }
    finally { setSubmitting(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Award size={24} className="text-primary" /> Result Management</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Exam *</label>
            <select required value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className="w-full px-3 py-2 border rounded-md">
              <option value="">-- Choose Exam --</option>
              {exams.map(ex => <option key={ex._id} value={ex._id}>{ex.name} ({ex.class})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Select Student *</label>
            <select required value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="w-full px-3 py-2 border rounded-md">
              <option value="">-- Choose Student --</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name} (Roll: {s.rollNo})</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Subjects & Marks</h3>
            <button type="button" onClick={addSubject} className="text-sm text-primary font-medium hover:underline">+ Add Subject</button>
          </div>
          {subjects.map((sub, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input type="text" placeholder="Subject Name" required value={sub.name} onChange={e => handleSubjectChange(i, 'name', e.target.value)} className="flex-1 px-3 py-2 border rounded-md" />
              <input type="number" placeholder="Marks" required min="0" max="100" value={sub.marks} onChange={e => handleSubjectChange(i, 'marks', e.target.value)} className="w-24 px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Grade" value={sub.grade} readOnly className="w-20 px-3 py-2 border rounded-md bg-gray-50" />
              {subjects.length > 1 && <button type="button" onClick={() => removeSubject(i)} className="text-red-500">✕</button>}
            </div>
          ))}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {submitting ? 'Saving...' : 'Publish Result'}
        </button>
      </form>
    </div>
  );
};
export default ResultManagement;