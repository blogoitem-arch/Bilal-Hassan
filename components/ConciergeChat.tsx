import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { Message, AppSection } from '../types';
import { sendMessageToConcierge } from '../services/geminiService';

interface ConciergeChatProps {
  onClose: () => void;
}

const ConciergeChat: React.FC<ConciergeChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Greetings. I am Aurelius, your personal career concierge. May I inquire as to which aspect of the Remote Assistant Officer position most intrigues you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await sendMessageToConcierge(messages, input);
    
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-luxury-charcoal border border-gold-900 shadow-2xl shadow-gold-900/20 flex flex-col h-[80vh] md:h-[700px] relative overflow-hidden rounded-sm">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-luxury-black to-luxury-charcoal">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-black">
                <Sparkles size={18} className="text-gold-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-gold-100">Aurelius</h3>
              <p className="text-xs text-gold-600 uppercase tracking-widest">Career Concierge</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-luxury-black/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-5 text-sm md:text-base leading-relaxed font-sans ${
                  msg.role === 'user' 
                    ? 'bg-gold-900/20 text-gold-100 border border-gold-800/50 rounded-tl-xl rounded-bl-xl rounded-br-xl' 
                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-tr-xl rounded-bl-xl rounded-br-xl'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-transparent p-4 flex gap-2">
                <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-0"></span>
                <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-luxury-charcoal">
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Compose your message..."
              className="flex-1 bg-black/30 border border-white/10 p-4 text-gold-100 focus:outline-none focus:border-gold-700 placeholder-gray-600 font-light"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 bg-gold-600 text-black hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConciergeChat;