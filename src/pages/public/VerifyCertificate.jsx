import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { ShieldCheck, Search, Loader2, CheckCircle, XCircle } from 'lucide-react';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault(); setLoading(true); setCert(null);
    try {
      const res = await api.get(`/certificates/verify/${certId}`);
      setCert(res.data.data);
      toast.success('Certificate Verified!');
    } catch (err) { toast.error('Invalid Certificate ID'); }
    finally { setLoading(false); }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Verify Certificate</h1>
          <p className="text-gray-600">Enter the Certificate ID to verify its authenticity.</p>
        </div>

        <form onSubmit={handleVerify} className="bg-white p-8 rounded-xl shadow-card flex gap-4">
          <input type="text" placeholder="Enter Certificate ID (e.g., CERT-123456-789)" required value={certId} onChange={e => setCertId(e.target.value)} className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary font-mono" />
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Verify
          </button>
        </form>

        {cert && (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-card border-l-4 border-green-500 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={32} className="text-green-500" />
              <div>
                <h2 className="text-xl font-bold text-green-700">Certificate is Valid</h2>
                <p className="text-sm text-gray-500">This certificate is authentic and issued by Madrasha Site.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Certificate ID</p><p className="font-mono font-bold text-primary">{cert.certificateNo}</p></div>
              <div><p className="text-gray-500">Type</p><p className="font-semibold">{cert.type}</p></div>
              <div><p className="text-gray-500">Student Name</p><p className="font-semibold">{cert.student.name}</p></div>
              <div><p className="text-gray-500">Class</p><p className="font-semibold">{cert.student.class}</p></div>
              <div><p className="text-gray-500">Issue Date</p><p className="font-semibold">{new Date(cert.issueDate).toLocaleDateString()}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default VerifyCertificate;