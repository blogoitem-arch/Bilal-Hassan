import React, { useState } from 'react';
import { Loader2, Wand2, Copy, Check } from 'lucide-react';
import { refineBioWithGemini } from '../services/geminiService';

const BioRefiner: React.FC = () => {
  const [bio, setBio] = useState('');
  const [refinedBio, setRefinedBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRefine = async () => {
    if (!bio.trim()) return;
    setLoading(true);
    const result = await refineBioWithGemini(bio);
    setRefinedBio(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refinedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 bg-luxury-black relative overflow-hidden border-t border-white/5">
       {/* Background Decor */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Elevate Your Narrative</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            Does your professional profile reflect the prestige you deserve? 
            Allow our AI to transform your current bio into a masterpiece of executive allure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Input Side */}
          <div className="space-y-4">
            <label className="text-gold-500 text-xs uppercase tracking-widest font-bold">Current Narrative</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. I have 5 years experience as a virtual assistant. I handle emails, booking flights, and managing calendars for my boss."
              className="w-full h-64 bg-white/5 border border-white/10 p-6 text-gray-300 focus:outline-none focus:border-gold-700 resize-none font-sans font-light leading-relaxed transition-all"
            />
            <button 
              onClick={handleRefine}
              disabled={loading || !bio.trim()}
              className="w-full py-4 bg-transparent border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Wand2 size={16} className="group-hover:rotate-12 transition-transform"/> Refine Narrative</>}
            </button>
          </div>

          {/* Output Side */}
          <div className="space-y-4 relative">
            <label className="text-gold-500 text-xs uppercase tracking-widest font-bold">Refined Masterpiece</label>
            <div className={`w-full h-64 bg-gradient-to-br from-gold-900/10 to-black border border-gold-500/20 p-6 relative overflow-y-auto ${refinedBio ? 'text-gold-100' : 'text-gray-600 italic'}`}>
              {refinedBio ? (
                <p className="font-serif text-lg leading-relaxed whitespace-pre-line">{refinedBio}</p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <Wand2 size={32} className="mb-2" />
                  <span>Your elevated profile will appear here.</span>
                </div>
              )}
            </div>
            
            {refinedBio && (
              <button 
                onClick={copyToClipboard}
                className="absolute top-10 right-4 p-2 text-gold-400 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BioRefiner;