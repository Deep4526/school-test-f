import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Heart, Loader2, CheckCircle } from 'lucide-react';

const Donation = () => {
  const [formData, setFormData] = useState({ donorName: '', email: '', phone: '', amount: 500, type: 'General', isAnonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1. Create Order on Backend
      const { data } = await api.post('/payments/create-order', { 
        amount: formData.amount, type: 'Donation', ...formData 
      });
      
      const { orderId } = data.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXX', // Replace with your test key or add to .env
        amount: formData.amount * 100,
        currency: 'INR',
        name: 'Madrasha Site',
        description: `${formData.type} Donation`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // 3. Verify on Backend
            await api.post('/payments/verify', { ...response, paymentId: data.data.paymentId });
            // 4. Save Donation Record
            await api.post('/donations', { ...formData, razorpayPaymentId: response.razorpay_payment_id });
            
            toast.success('Donation successful! JazakAllah Khair.');
            setSuccess(true);
            setFormData({ donorName: '', email: '', phone: '', amount: 500, type: 'General', isAnonymous: false });
          } catch (err) { toast.error('Payment verification failed'); }
        },
        prefill: { name: formData.donorName, email: formData.email, contact: formData.phone },
        theme: { color: '#0d5c3e' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => toast.error('Payment failed'));
      rzp.open();
    } catch (err) { toast.error('Failed to initiate payment'); }
    finally { setSubmitting(false); }
  };

  if (success) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-card text-center max-w-md animate-fade-in">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Donation Successful!</h2>
          <p className="text-gray-600 mb-6">JazakAllah Khair for your generous contribution.</p>
          <button onClick={() => setSuccess(false)} className="btn-primary">Make Another Donation</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Heart size={32} className="text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Make a Donation</h1>
          <p className="text-gray-600">Support our mission. Your contribution makes a difference.</p>
        </div>

        <form onSubmit={handlePayment} className="bg-white p-8 rounded-xl shadow-card space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="donorName" placeholder="Your Name *" required value={formData.donorName} onChange={handleChange} className="px-4 py-3 border rounded-md" />
            <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} className="px-4 py-3 border rounded-md" />
            <input type="tel" name="phone" placeholder="Phone *" required value={formData.phone} onChange={handleChange} className="px-4 py-3 border rounded-md" />
            <select name="type" value={formData.type} onChange={handleChange} className="px-4 py-3 border rounded-md">
              <option value="General">General Donation</option>
              <option value="Zakat">Zakat</option>
              <option value="Sadaqah">Sadaqah</option>
              <option value="Orphan Fund">Orphan Fund</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (INR) *</label>
            <div className="flex gap-2 mb-3">
              {[100, 500, 1000, 5000].map(amt => (
                <button key={amt} type="button" onClick={() => setFormData({...formData, amount: amt})} 
                  className={`flex-1 py-2 rounded-md border font-medium ${formData.amount === amt ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700'}`}>
                  ₹{amt}
                </button>
              ))}
            </div>
            <input type="number" name="amount" required min="10" value={formData.amount} onChange={handleChange} className="w-full px-4 py-3 border rounded-md" />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} className="w-4 h-4 text-primary rounded" />
            <span className="text-sm text-gray-700">Make this donation anonymous</span>
          </label>

          <button type="submit" disabled={submitting} className="btn-accent w-full flex items-center justify-center gap-2 !text-lg !py-4">
            {submitting ? <Loader2 size={20} className="animate-spin" /> : <Heart size={20} />} 
            {submitting ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Donation;