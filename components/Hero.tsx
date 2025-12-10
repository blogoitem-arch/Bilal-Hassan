import React from 'react';
import { ArrowDown } from 'lucide-react';
import { AppSection } from '../types';

interface HeroProps {
  onNavigate: (section: AppSection) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Luxury Abstract" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/80 to-luxury-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <h2 className="text-gold-200 tracking-[0.3em] text-sm uppercase font-sans mb-4">
          Redefining Professional Excellence
        </h2>
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          The <span className="text-gold-400 italic">Corner Office</span> is <br /> Wherever You Are.
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light font-sans max-w-2xl mx-auto leading-relaxed">
          Command your career as a <strong>Remote Assistant Officer</strong>. 
          Orchestrate success from your private villa, sun-drenched terrace, or bespoke home office.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
          <button 
            onClick={() => onNavigate(AppSection.VISIONS)}
            className="px-8 py-3 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-luxury-black transition-all duration-300 font-sans tracking-widest uppercase text-sm"
          >
            Explore Visions
          </button>
          <button 
            onClick={() => onNavigate(AppSection.CONCIERGE)}
            className="px-8 py-3 bg-gold-500 text-luxury-black font-semibold hover:bg-white hover:text-black transition-all duration-300 font-sans tracking-widest uppercase text-sm"
          >
            Apply via Concierge
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce text-gold-500/50 cursor-pointer" onClick={() => onNavigate(AppSection.VISIONS)}>
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;