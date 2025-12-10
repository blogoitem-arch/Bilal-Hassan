import React from 'react';
import { JobOption } from '../types';

interface VisionCardProps {
  option: JobOption;
  index: number;
}

const VisionCard: React.FC<VisionCardProps> = ({ option, index }) => {
  return (
    <div className="group relative w-full md:w-[350px] bg-luxury-charcoal border border-white/5 hover:border-gold-500/50 transition-all duration-500 overflow-hidden">
      {/* Image Header */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
        <img 
          src={option.image} 
          alt={option.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Content */}
      <div className="p-8 space-y-4">
        <div className="flex items-baseline justify-between">
           <span className="text-xs tracking-widest text-gold-500 uppercase">Option 0{index + 1}</span>
        </div>
        
        <h3 className="text-2xl font-serif text-white italic">{option.title}</h3>
        
        <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
          {option.description}
        </p>

        <div className="pt-4 border-t border-white/5">
           <button className="text-gold-300 text-sm tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2 group-hover:gap-4 duration-300">
             {option.cta} <span>&rarr;</span>
           </button>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold-500 group-hover:w-full transition-all duration-700 ease-in-out"></div>
    </div>
  );
};

export default VisionCard;