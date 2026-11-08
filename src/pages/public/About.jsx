import { BookOpen, Target, Eye, Quote } from 'lucide-react';

const About = () => {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Introduction and History
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Building a brighter future through quality Islamic and modern education, rooted in strong moral values.
          </p>
        </div>

        {/* History, Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left: Visual / Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://i.ibb.co/23GxffQ4/photo-2026-11-07-11-17-45.jpg" 
                alt="Madrasa History" 
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">Established with a vision for excellence</p>
              </div>
            </div>
          </div>

          {/* Right: Content Cards */}
          <div className="space-y-6">
            
            {/* History Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-primary">Our History</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Madrasha Site was established with the noble vision of providing quality Islamic and modern education to the community. Over the years, we have grown from a small local initiative into a comprehensive educational institution, nurturing thousands of students with knowledge, faith, and ethical values.
              </p>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent-dark">
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To nurture students with strong moral values, academic excellence, and a deep understanding of Islamic principles.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent-dark">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To be a leading institution that produces well-rounded individuals who contribute positively to society and the Ummah.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Principal's Message Section */}
        <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative Background Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-3 gap-8 p-8 md:p-12 items-center">
            
            {/* Principal Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-accent rounded-full blur-lg opacity-50"></div>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white/20 overflow-hidden bg-white flex items-center justify-center">
                  {/* Replace 'P' with actual image: <img src="/principal.jpg" alt="Principal" className="w-full h-full object-cover" /> */}
                  <span className="text-6xl font-bold text-primary">P</span>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="md:col-span-2 text-white space-y-6">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Quote size={32} className="opacity-80" />
                <span className="text-sm font-bold uppercase tracking-wider">Principal's Message</span>
              </div>
              
              <blockquote className="text-xl md:text-2xl font-serif leading-relaxed italic opacity-95">
                "Welcome to our institution. We are deeply committed to providing the best education that balances modern academic excellence with strong Islamic values. Our goal is to raise a generation that is not only knowledgeable but also compassionate and morally upright."
              </blockquote>

              <div className="pt-4 border-t border-white/20">
                <h4 className="text-xl font-bold text-white">Md. Principal Name</h4>
                <p className="text-accent font-medium">Principal, Khirishkhali Darul Hikmah Madrasah</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;