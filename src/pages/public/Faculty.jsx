import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, UserCheck } from 'lucide-react';

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);
  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    api.get('/teachers').then(res => setTeachers(res.data.data || []));
    api.get('/misc/committees').then(res => setCommittee(res.data.data || []));
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Faculty & Committee</h1>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><UserCheck size={24} className="text-primary" /> Management Committee</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {committee.map(c => (
            <div key={c._id} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-primary-light rounded-full flex items-center justify-center mb-4 text-primary font-bold text-2xl">{c.name[0]}</div>
              <h3 className="font-bold text-gray-900">{c.name}</h3>
              <p className="text-sm text-accent font-medium">{c.designation}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Users size={24} className="text-primary" /> Our Teachers</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {teachers.map(t => (
            <div key={t._id} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-2xl">{t.name[0]}</div>
              <h3 className="font-bold text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.subject}</p>
              <p className="text-xs text-gray-400 mt-2">{t.qualification}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Faculty;