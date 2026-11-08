import { useState, useEffect } from 'react';
import api from '../../services/api';
import { CreditCard } from 'lucide-react';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get('/payments').then(res => setPayments(res.data.data || []));
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Paid') return 'bg-green-100 text-green-700';
    if (status === 'Failed') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard size={24} className="text-blue-500" /> Fee Payment Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr><th className="px-6 py-4">Payer</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Order ID</th><th className="px-6 py-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.length === 0 ? <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No payments yet.</td></tr> :
            payments.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{p.payerName}<div className="text-xs text-gray-500">{p.email}</div></td>
                <td className="px-6 py-4">{p.type}</td>
                <td className="px-6 py-4 font-bold text-blue-600">₹{p.amount}</td>
                <td className="px-6 py-4 font-mono text-xs">{p.razorpayOrderId}</td>
                <td className="px-6 py-4"><span className={`${getStatusColor(p.status)} px-2 py-1 rounded-full text-xs font-medium`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PaymentManagement;