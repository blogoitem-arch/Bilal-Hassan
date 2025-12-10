import React, { useState } from 'react';
import Hero from './components/Hero';
import VisionCard from './components/VisionCard';
import BioRefiner from './components/BioRefiner';
import ConciergeChat from './components/ConciergeChat';
import { JobOption, AppSection } from './types';

// Data from user prompt
const JOB_OPTIONS: JobOption[] = [
  {
    id: 1,
    title: "Effortless Prestige",
    headline: "Your Next Corner Office",
    description: "Orchestrate success from your private villa or bespoke home office. This is an invitation to a career sculpted for the discerning, offering unparalleled influence without compromising freedom.",
    cta: "Secure your future",
    tags: ["#RemoteOfficer", "#LuxuryCareer"],
    image: "https://picsum.photos/id/1036/800/1000" // snowy mountains/lodge vibe
  },
  {
    id: 2,
    title: "Lifestyle & Exclusivity",
    headline: "Command Your Domain",
    description: "A career where your expertise is celebrated and your commute is non-existent. A curated lifestyle offering the elegance of a high-status position with the ultimate freedom you deserve.",
    cta: "Elevate your narrative",
    tags: ["#DigitalNomadPro", "#PremiumCareer"],
    image: "https://picsum.photos/id/164/800/1000" // boat/water vibe
  },
  {
    id: 3,
    title: "The Excellence Call",
    headline: "Opulent Living, Professional Impact",
    description: "Forget the daily grind; embrace a world-class role from the comfort of your chosen paradise. Seamlessly blend opulent living with unparalleled professional impact.",
    cta: "Apply for the life you deserve",
    tags: ["#RemoteElite", "#HighConversion"],
    image: "https://picsum.photos/id/1040/800/1000" // castle/architecture vibe
  }
];

const App: React.FC = () => {
  const [showConcierge, setShowConcierge] = useState(false);
  
  const handleNavigate = (section: AppSection) => {
    if (section === AppSection.CONCIERGE) {
      setShowConcierge(true);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black text-gray-200 selection:bg-gold-500 selection:text-black font-sans">
      
      {/* Navigation (Sticky) */}
      <nav className="fixed top-0 w-full z-40 bg-luxury-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl font-serif font-bold tracking-wider text-white">
          LUXE<span className="text-gold-500">REMOTE</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] font-bold text-gray-400">
          <button onClick={() => handleNavigate(AppSection.HOME)} className="hover:text-gold-400 transition-colors uppercase">Home</button>
          <button onClick={() => handleNavigate(AppSection.VISIONS)} className="hover:text-gold-400 transition-colors uppercase">Visions</button>
          <button onClick={() => handleNavigate(AppSection.REFINER)} className="hover:text-gold-400 transition-colors uppercase">Elevate</button>
        </div>
        <button 
          onClick={() => setShowConcierge(true)}
          className="px-6 py-2 border border-white/20 hover:border-gold-500 text-xs tracking-widest uppercase hover:text-gold-400 transition-all duration-300"
        >
          Concierge
        </button>
      </nav>

      {/* Hero Section */}
      <div id={AppSection.HOME}>
        <Hero onNavigate={handleNavigate} />
      </div>

      {/* Job Options (Visions) Section */}
      <section id={AppSection.VISIONS} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-gold-600 text-sm tracking-[0.3em] uppercase">Select Your Path</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">Curated Professional Lifestyles</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {JOB_OPTIONS.map((opt, idx) => (
            <VisionCard key={opt.id} option={opt} index={idx} />
          ))}
        </div>
      </section>

      {/* Bio Refiner Tool */}
      <div id={AppSection.REFINER}>
        <BioRefiner />
      </div>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5 text-center text-gray-600 text-xs tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} LuxeRemote. Reserved for the elite.</p>
      </footer>

      {/* Concierge Modal */}
      {showConcierge && (
        <ConciergeChat onClose={() => setShowConcierge(false)} />
      )}

    </div>
  );
};

export default App;