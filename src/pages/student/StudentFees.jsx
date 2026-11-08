import { useState, useEffect } from 'react';
import api from '../../services/api';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

const StudentFees = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portal/student/dashboard').then(res => {
      setPayments(res.data.data.payments || []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard size={24} className="text-primary" /> Fee History</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr><th className="px-6 py-4">Type</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.length === 0 ? <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">No payment records found.</td></tr> :
            payments.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{p.type}</td>
                <td className="px-6 py-4 font-bold">₹{p.amount}</td>
                <td className="px-6 py-4 text-xs">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {p.status === 'Paid' ? 
                    <span className="flex items-center gap-1 text-green-600"><CheckCircle size={14} /> Paid</span> : 
                    <span className="flex items-center gap-1 text-red-600"><XCircle size={14} /> {p.status}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StudentFees;