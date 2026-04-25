import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function TraceDiagnosisPage() {
  const { setTheme } = useTheme();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-red selection:text-white pb-32">
      {/* Navigation Indicator */}
      <nav className="fixed top-0 w-full z-50 flex justify-center py-6 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold">
          <button onClick={() => setTheme('home')} className="text-white/40 hover:text-white transition-colors">HOME</button>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-brand-red">TRACE</span>
          <span className="text-white/20">→</span>
          <button onClick={() => setTheme('blueprint')} className="text-white/40 hover:text-white transition-colors">BLUEPRINT</button>
          <span className="text-white/20">→</span>
          <button onClick={() => setTheme('ink')} className="text-white/40 hover:text-white transition-colors">INK</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
        >
          <div className="inline-block px-4 py-1 border border-brand-red text-brand-red text-[10px] uppercase tracking-[0.4em] font-bold mb-8">
            Phase 01: Diagnosis
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            BEFORE YOU SPEND.<br/>
            BEFORE WE BUILD.<br/>
            <span className="text-brand-red">LET US DIAGNOSE.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto font-light tracking-tight">
            Your firm's acquisition system has leaks. We will find them. At no cost.
          </p>
        </motion.div>
      </section>

      {/* Offer Content */}
      <section className="px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          className="space-y-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest border-l-4 border-brand-red pl-6">The Firm Diagnosis</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              THE IPQ MEDIA FIRM DIAGNOSIS is a 45-minute architectural audit of your current client acquisition engine. We analyze:
            </p>
            <ul className="space-y-4">
              {[
                "Your website traffic-to-inquiry conversion rate",
                "Your lead qualification process (or lack thereof)",
                "Your current ad account structure (if any)",
                "Your follow-up sequence speed and effectiveness",
                "Your competitor's digital footprint in your market"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white/80">
                  <span className="text-brand-red font-bold text-xl leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 border border-white/10 bg-white/5 space-y-4">
            <div className="text-xs uppercase tracking-[0.4em] text-brand-red font-bold">The Deliverable</div>
            <p className="text-xl font-medium tracking-tight">
              A 7-page PDF diagnosis report + a 15-minute recorded walkthrough.
            </p>
            <p className="text-sm text-white/40 italic">
              No obligation. No hidden fees. No sales call unless you request one.
            </p>
          </div>

          <div className="text-sm text-white/30 italic font-light tracking-wide pt-8 border-t border-white/5">
            "Why free? Because we are confident that once you see the gaps, you will want to close them. And if not, you keep the diagnosis. Fair."
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          className="relative sticky top-32 p-10 border border-white/10 bg-white/[0.02] shadow-2xl"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-brand-red flex items-center justify-center text-brand-red">
                    <CheckCircle size={40} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight">Request Received</h3>
                <p className="text-white/40 leading-relaxed">
                  Your diagnosis request has been received. A member of our team will send your report within 2 business days.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-xs uppercase tracking-widest text-brand-red font-bold hover:text-white transition-colors"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8"
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-red outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Firm Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-red outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Work Email</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-red outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Estimated Annual Project Revenue</label>
                    <select 
                      required 
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-red outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-[#0A0A0A]">Select Range</option>
                      <option value="under-1m" className="bg-[#0A0A0A]">Under $1M</option>
                      <option value="1m-5m" className="bg-[#0A0A0A]">$1M-$5M</option>
                      <option value="5m-10m" className="bg-[#0A0A0A]">$5M-$10M</option>
                      <option value="10m-plus" className="bg-[#0A0A0A]">$10M+</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full group relative flex items-center justify-center gap-4 bg-brand-red text-white py-5 text-sm uppercase tracking-[0.4em] font-black overflow-hidden shadow-2xl shadow-brand-red/20 disabled:opacity-50"
                >
                   <span className="relative z-10">
                    {formState === 'submitting' ? 'PROCESSING...' : 'CLAIM YOUR FIRM DIAGNOSIS'}
                  </span>
                  <Send size={16} className={formState === 'submitting' ? 'hidden' : 'relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform'} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer Navigation */}
      <div className="mt-32 flex flex-col md:flex-row justify-center items-center gap-8 px-6">
        <motion.button 
          onClick={() => setTheme('home')}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold"
          whileHover={{ x: -10 }}
        >
          <ArrowLeft size={18} /> BACK TO HOME
        </motion.button>
        
        <motion.button 
          onClick={() => setTheme('blueprint')}
          className="group relative flex items-center gap-6 bg-brand-red text-white px-12 py-6 text-sm uppercase tracking-[0.3em] font-black overflow-hidden shadow-2xl shadow-brand-red/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">PROCEED TO BLUEPRINT</span>
          <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
          <div className="absolute inset-0 bg-[#8B0000] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
      </div>
    </div>
  );
}
