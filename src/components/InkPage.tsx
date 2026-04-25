import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function InkPage() {
  const { setTheme } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-red selection:text-white pb-32">
      {/* Navigation Indicator */}
      <nav className="fixed top-0 w-full z-50 flex justify-center py-6 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold">
          <button onClick={() => setTheme('home')} className="text-white/40 hover:text-white transition-colors">HOME</button>
          <div className="w-px h-3 bg-white/10" />
          <button onClick={() => setTheme('trace')} className="text-white/40 hover:text-white transition-colors">TRACE</button>
          <span className="text-white/20">→</span>
          <button onClick={() => setTheme('blueprint')} className="text-white/40 hover:text-white transition-colors">BLUEPRINT</button>
          <span className="text-white/20">→</span>
          <span className="text-brand-red">INK</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.div 
          className="text-brand-red text-[11px] uppercase tracking-[0.5em] font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Phase 03: Scaled Deployment
        </motion.div>
        <motion.h1 
          className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase leading-[0.9]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          WE SPEND LIKE <br/> YOU BUILD. <span className="text-brand-red">AT SCALE.</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your budget is not a problem. It is the fuel for our algorithmic advantage.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {[
            { name: 'Home', mode: 'home' },
            { name: 'Trace', mode: 'trace' },
            { name: 'Blueprint', mode: 'blueprint' },
            { name: 'INK', mode: 'ink' }
          ].map((btn) => (
            <button
              key={btn.name}
              onClick={() => setTheme(btn.mode as any)}
              className={`px-4 py-2 text-[9px] uppercase tracking-[0.3em] font-bold border transition-all duration-300 ${
                btn.name === 'INK' 
                  ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/30"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
              }`}
            >
              {btn.name}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Content Blocks */}
      <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-32">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-6">
          <div className="text-brand-red text-[11px] uppercase tracking-[0.4em] font-bold">Block 1 — Trend Analysis</div>
          <h3 className="text-2xl font-medium tracking-tight">Real-time architecture firm acquisition benchmarks</h3>
          <div className="p-6 border border-white/10 bg-white/5 font-mono text-xs space-y-4">
            <div className="flex justify-between items-center text-white/40 uppercase"> Lead Cost <span className="text-white">$287-$514</span></div>
            <div className="flex justify-between items-center text-white/40 uppercase"> Close Rate <span className="text-white">34%</span></div>
            <div className="flex justify-between items-center text-white/40 uppercase"> Avg Fee <span className="text-white">$87k</span></div>
          </div>
          <p className="text-xs text-white/40 italic">Based on analysis of 50+ studios across 12 markets</p>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-6">
          <div className="text-brand-red text-[11px] uppercase tracking-[0.4em] font-bold">Block 2 — Algorithm Adaptation</div>
          <h3 className="text-2xl font-medium tracking-tight">We adjust Meta/Google/LinkedIn algorithms every 48-72 hours</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-3"><div className="w-1 h-1 bg-brand-red" /> Performance signals: CTR, CPC, cost per booked intro</li>
            <li className="flex items-center gap-3"><div className="w-1 h-1 bg-brand-red" /> Automated budget reallocation based on 14-day rolling averages</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-6">
          <div className="text-brand-red text-[11px] uppercase tracking-[0.4em] font-bold">Block 3 — Deployment Models</div>
          <h3 className="text-2xl font-medium tracking-tight">For firms spending $20k+/month:</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex flex-col gap-1">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Velocity scaling</span>
              <span>Double what works in 7 days</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Geographic dominance</span>
              <span>Own your postal code</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Psychographic layering</span>
              <span>17 audience stacks per campaign</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Bold Statement */}
      <section className="py-40 px-6 text-center border-y border-white/5 mb-32">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
            Confidence is not a feeling. <br/>
            It is a function of <span className="text-brand-red">data density.</span> <br/>
            Your budget buys both.
          </h2>
        </motion.div>
      </section>

      {/* Footer Navigation */}
      <div className="flex justify-center px-6">
        <motion.button 
          onClick={() => setTheme('blueprint')}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold"
          whileHover={{ x: -10 }}
        >
          <ArrowLeft size={18} /> BACK TO BLUEPRINT
        </motion.button>
      </div>
    </div>
  );
}
