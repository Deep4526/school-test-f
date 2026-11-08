import { useState, useEffect } from 'react';
import api from '../../services/api';
import { BookOpen } from 'lucide-react';

const Departments = () => {
  const [depts, setDepts] = useState([]);
  useEffect(() => { api.get('/misc/departments').then(res => setDepts(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Special Departments</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {depts.map(d => (
            <div key={d._id} className="bg-white p-8 rounded-xl shadow-sm flex gap-6 items-center">
              {d.imageUrl && <img src={d.imageUrl} alt={d.name} className="w-32 h-32 object-cover rounded-lg" />}
              <div><h2 className="text-2xl font-bold text-primary mb-2">{d.name}</h2><p className="text-sm text-gray-500 mb-2">Head: {d.headName}</p><p className="text-gray-700">{d.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Departments;