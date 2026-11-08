import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Heart } from 'lucide-react';

const DonationManagement = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get('/donations').then(res => setDonations(res.data.data || []));
  }, []);

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Heart size={24} className="text-red-500" /> Donation Management</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold">Total Collected: ₹{totalAmount.toLocaleString()}</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr><th className="px-6 py-4">Donor</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.length === 0 ? <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No donations yet.</td></tr> :
            donations.map(d => (
              <tr key={d._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{d.isAnonymous ? 'Anonymous' : d.donorName}<div className="text-xs text-gray-500">{d.email}</div></td>
                <td className="px-6 py-4"><span className="bg-accent-light text-accent-dark px-2 py-1 rounded text-xs font-medium">{d.type}</span></td>
                <td className="px-6 py-4 font-bold text-green-600">₹{d.amount}</td>
                <td className="px-6 py-4 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DonationManagement;