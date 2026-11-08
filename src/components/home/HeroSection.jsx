import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      className="relative overflow-hidden font-sans min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex flex-col justify-between"
      style={{
        backgroundImage: "url('https://i.ibb.co/23GxffQ4/photo-2026-11-07-11-17-45.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Green Gradient Overlay - ensures text is perfectly readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent md:via-white/70"></div>
      <div className="absolute inset-0 bg-primary/5"></div>

      {/* Top Badge */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6 md:pt-10 pb-2 relative z-20">
        <div className="inline-flex items-center bg-primary text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-md">
          Welcome to Umeed Global School
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 grid lg:grid-cols-2 gap-6 md:gap-8 items-center relative z-10 pb-10 md:pb-16">
        
        {/* Left Content */}
        <div className="space-y-4 md:space-y-6 bg-white/50 lg:bg-transparent p-5 md:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary leading-[1.1] tracking-tight">
            Learn with Faith <br className="hidden sm:block" />
            Grow with <span className="text-accent">Values</span>
          </h1>
          
          <p className="text-sm md:text-base lg:text-lg text-gray-800 max-w-md leading-relaxed font-medium">
            A centre of Islamic and modern education, building a better future for our children.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-1">
            <button className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base">
              Explore More
              <ArrowRight size={18} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-md text-sm md:text-base">
              Admission Info
            </button>
          </div>

          {/* Bottom Tagline */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-800 pt-1">
            <span className="text-accent text-base md:text-lg leading-none">✦</span>
            <span className="font-semibold">Nurturing knowledge, character and confidence</span>
          </div>
        </div>

        {/* Right Side blank (Image is in background) */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="relative w-full mt-auto z-10 leading-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
          {/* Yellow/Gold layer */}
          <path 
            d="M0 40L60 48.3C120 57 240 73 360 78.3C480 83 600 83 720 80C840 77 960 70 1080 66.7C1200 63 1320 63 1380 63L1440 63V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" 
            fill="#d4941f"
            fillOpacity="0.9"
          />
          {/* Green layer */}
          <path 
            d="M0 65L60 73.3C120 82 240 98 360 103.3C480 108 600 108 720 105C840 102 960 95 1080 91.7C1200 88 1320 88 1380 88L1440 88V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V65Z" 
            fill="#0f5a36"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;