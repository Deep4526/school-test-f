import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-card">
            <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4"><div className="w-10 h-10 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0"><MapPin size={18} /></div><div><h4 className="font-semibold">Address</h4><p className="text-gray-600 text-sm">Village- Moushal, South 24 Parganas</p></div></div>
              <div className="flex items-start gap-4"><div className="w-10 h-10 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0"><Phone size={18} /></div><div><h4 className="font-semibold">Phone</h4><a href="tel:+919932063119" className="text-gray-600 text-sm hover:text-primary">+91 99320 63119</a></div></div>
              <div className="flex items-start gap-4"><div className="w-10 h-10 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0"><Mail size={18} /></div><div><h4 className="font-semibold">Email</h4><a href="mailto:connect@madrasha.org" className="text-gray-600 text-sm hover:text-primary">connect@madrasha.org</a></div></div>
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-card h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118029.7358189955!2d88.35!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMjLCsDMwJzAwLjAiTiA4OMKwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;