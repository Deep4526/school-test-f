import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Heart } from 'lucide-react';

const DonorPanel = () => {
  const [donors, setDonors] = useState([]);
  useEffect(() => { api.get('/misc/donors').then(res => setDonors(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Generous Donors</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Date</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {donors.map(d => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{d.donorName}</td>
                  <td className="px-6 py-4"><span className="bg-accent-light text-accent-dark px-2 py-1 rounded text-xs font-medium">{d.type}</span></td>
                  <td className="px-6 py-4 font-bold text-green-600">₹{d.amount}</td>
                  <td className="px-6 py-4 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DonorPanel;