import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Download, FileText } from 'lucide-react';

const Downloads = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => { api.get('/misc/downloads').then(res => setFiles(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Download Corner</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {files.length === 0 ? <p className="p-8 text-center text-gray-500">No files available for download.</p> :
          <div className="divide-y divide-gray-100">
            {files.map(f => (
              <div key={f._id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center"><FileText size={24} /></div>
                  <div><h3 className="font-bold text-gray-900">{f.title}</h3><p className="text-xs text-gray-500">{f.category}</p></div>
                </div>
                <a href={f.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm"><Download size={16} /> Download</a>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
};
export default Downloads;