import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { LucideIcon, Menu, X, ArrowRight, Check, Play, BookOpen, Quote, Info } from 'lucide-react';
import { SITE_DATA } from './data';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { Hero3D, ExtrudedStat } from './components/ThreeComponents';
import { InkPage } from './components/InkPage';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  viewport: { once: true, margin: "-100px" }
};

const drawLine = {
  initial: { width: 0 },
  whileInView: { width: "100%" },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
};

// CAD Hover Card Component
function CADCard({ children, title, subtitle, i }: { children?: React.ReactNode, title: string, subtitle: string, i: number }) {
  const { theme } = useTheme();
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className="group relative p-8 border border-white/10 transition-all duration-300 hover:border-brand-red bg-[#222222]/50 h-full hover:shadow-xl hover:shadow-brand-red/5"
    >
      {/* CAD Selection Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <h3 className="text-xl font-medium mb-4 tracking-tight text-white">{title}</h3>
      <p className="text-[#E0E0E0] group-hover:text-white transition-colors duration-300 line-clamp-4 leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}

// Blueprint Page Content (Original PageContent)
function BlueprintPage() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div id="blueprint-page" className={cn("min-h-screen font-sans", theme === 'trace' && "bg-white/90 backdrop-blur-sm")}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-red z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* CAD Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none cad-grid opacity-[0.03]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-10 h-16 transition-colors duration-500">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme('blueprint')}>
            <span className="font-bold tracking-tighter text-xl uppercase text-white">IPQ <span className="font-light text-brand-red">MEDIA</span></span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest text-[#E0E0E0]">
            <button onClick={() => setTheme('blueprint')} className="hover:text-brand-red transition-colors font-bold">Home</button>
            <div className="w-px h-2 bg-white/10" />
            <a href="#services" className="hover:text-brand-red transition-colors">Systems</a>
            <a href="#process" className="hover:text-brand-red transition-colors">Process</a>
            <a href="#philosophy" className="hover:text-brand-red transition-colors">Philosophy</a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex border border-white/10 rounded-sm overflow-hidden bg-white/5">
            <button 
              onClick={() => setTheme('ink')}
              className={cn("px-3 py-1 text-[9px] uppercase tracking-tighter transition-colors", theme === 'ink' ? "bg-brand-red text-white" : "text-[#E0E0E0] hover:bg-white/10")}
            >Ink</button>
            <button 
              onClick={() => setTheme('blueprint')}
              className={cn("px-3 py-1 text-[9px] uppercase tracking-tighter transition-colors", theme === 'blueprint' ? "bg-brand-red text-white" : "text-[#E0E0E0] hover:bg-white/10")}
            >Blueprint</button>
            <button 
              onClick={() => setTheme('trace')}
              className={cn("px-3 py-1 text-[9px] uppercase tracking-tighter transition-colors", theme === 'trace' ? "bg-brand-red text-white" : "text-[#E0E0E0] hover:bg-white/10")}
            >Trace</button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors duration-300 text-[10px] uppercase font-bold tracking-widest"
          >
            Book a Call
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Hero Section - Editorial Split Layout */}
      <section className="relative min-h-screen grid md:grid-cols-12 overflow-hidden border-b border-white/10 pt-16">
        {/* Left Column: Hero Content */}
        <div className="col-span-12 md:col-span-7 border-r border-white/10 flex flex-col p-10 md:p-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col pt-10"
          >
            <div className="overflow-hidden mb-4">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[10px] uppercase tracking-[0.4em] text-[#E63946] font-semibold"
              >
                Client Acquisition Systems
              </motion.div>
            </div>
            
            <h1 className="text-[64px] md:text-[110px] leading-[0.9] font-bold tracking-tighter mb-6 uppercase text-white overflow-hidden">
              {SITE_DATA.hero.title.split('. ').map((segment, i) => (
                <motion.span 
                  key={i} 
                  className={cn("block", i === 2 && "text-brand-red text-[42px] md:text-[64px] mt-4 tracking-normal normal-case italic font-serif")}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + (i * 0.2), ease: [0.22, 1, 0.36, 1] }}
                >
                  {segment}{i < 2 ? "." : ""}
                </motion.span>
              ))}
            </h1>

            <motion.p 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              className="text-[#E0E0E0] text-base md:text-lg max-w-md mb-12 leading-relaxed italic"
            >
              "Precision is the foundational geometry of the high-end commission." We apply architectural precision to your firm's growth pipeline, connecting visionary studios with high-net-worth commissions.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-auto pt-12"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-red text-white px-10 py-5 text-sm uppercase tracking-widest hover:bg-brand-red-dark transition-all flex items-center gap-3 w-full sm:w-fit justify-center shadow-lg shadow-brand-red/20"
              >
                {SITE_DATA.hero.cta}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>

          {/* Stats in a grid as per Editorial Aesthetic */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-px bg-white/10 mt-20 -mx-10 md:-mx-16 mb-[-64px] md:mb-[-64px]"
          >
            {SITE_DATA.stats.map((stat, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className={cn("bg-[#1A1A1A] py-10 flex flex-col items-center border-white/5", i % 2 !== 0 && "border-l", i >= 2 && "border-t")}
              >
                <span className={cn("text-5xl font-black mb-2 text-white", i === 3 && "editorial-stroke")}>{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/60 font-medium px-4 text-center">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Visualizer */}
        <div className="col-span-12 md:col-span-5 flex flex-col bg-white/5">
          <div className="flex-1 relative flex items-center justify-center overflow-hidden h-[400px] md:h-auto">
            <Hero3D theme={theme} />
            <div className="absolute bottom-4 right-4 text-[8px] uppercase tracking-widest text-[#E0E0E0]/40 font-mono">
              render_iso_sys_v1.0
            </div>
          </div>
          
          {/* Action Callout area */}
          <div className="p-12 border-t border-white/10 bg-[#222222]">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-8 text-brand-red">Architectural Intent</div>
              <p className="text-[#E0E0E0] text-sm leading-relaxed mb-8 opacity-80">
                We don't just "market" firms. We engineer acquisition layers that mirror the quality of your built portfolio.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              className="flex items-center gap-4 group cursor-pointer" 
              onClick={() => setIsModalOpen(true)}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold group-hover:text-brand-red transition-colors text-white">Claim Your Firm's Diagnostic</span>
              <div className="flex-1 h-px bg-white/10 group-hover:bg-brand-red transition-all duration-500 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  className="absolute inset-0 bg-brand-red"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 md:px-12 border-b border-white/10 bg-[#0A0A0A]">
        <div className="mb-20 overflow-hidden">
          <motion.span 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.3em] text-brand-red mb-4 block"
          >
            01 / Capabilities
          </motion.span>
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium uppercase tracking-tight text-white"
          >
            {SITE_DATA.services.title}
          </motion.h2>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10"
        >
          {SITE_DATA.services.items.map((item, i) => (
            <div key={i} className="border-r border-b border-white/10">
              <CADCard title={item.title} subtitle={item.description} i={i} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 border-b border-white/10 bg-[#1A1A1A]">
        <div className="px-6 md:px-12 mb-20">
          <motion.span 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.3em] text-brand-red mb-4 block"
          >
            02 / Implementation
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium uppercase tracking-tight text-white"
          >
            {SITE_DATA.process.title}
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="px-12 space-y-12 max-w-4xl"
        >
          {SITE_DATA.process.steps.map((step, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-6 group"
              variants={fadeInUp}
            >
              <span className="text-xs font-mono text-brand-red/60 w-8">{step.id}</span>
              <motion.div 
                variants={drawLine}
                className="flex-1 h-px bg-white/5 group-hover:bg-brand-red transition-colors" 
              />
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 min-w-[50%]">
                <span className="text-sm uppercase tracking-tight font-bold text-white transition-colors group-hover:text-brand-red">
                  {step.title}
                </span>
                <p className="text-[#E0E0E0] text-[10px] uppercase tracking-widest hidden md:block opacity-60">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy Quote */}
      <section id="philosophy" className="py-40 px-10 bg-[#0A0A0A] text-white overflow-hidden relative border-b border-white/10">
        <motion.div 
          className="max-w-4xl ml-auto text-right"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <p className="text-[10px] text-brand-red italic uppercase tracking-[0.4em] mb-4">
            The Philosophy
          </p>
          <h2 className="text-3xl md:text-4xl italic font-serif leading-tight mb-8 antialiased text-[#F5F5F5]">
            "{SITE_DATA.quote.text}"
          </h2>
          <div className="flex items-center justify-end gap-4 overflow-hidden">
             <div className="flex-1 h-px bg-white/10 max-w-[200px]"></div>
             <span className="text-xs uppercase tracking-[0.5em] font-bold text-white">
               {SITE_DATA.quote.author}
             </span>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center border-b border-white/10 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-medium uppercase tracking-tighter mb-12 leading-[0.9] text-white"
          >
            READY TO SCALE<br/>YOUR LEGACY?
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-4 bg-brand-red text-white px-12 py-6 text-sm uppercase tracking-widest overflow-hidden transition-all shadow-xl shadow-brand-red/10"
            >
              <span className="relative z-10">{SITE_DATA.hero.cta}</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-[#8B0000] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full h-auto md:h-12 border-t border-white/10 bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between px-10 py-6 md:py-0 text-[8px] text-[#E0E0E0]/40 uppercase tracking-widest">
        <div>{SITE_DATA.footer.copyright}</div>
        <div className="flex gap-6 items-center mt-4 md:mt-0">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showEasterEgg && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-brand-red lower-case font-mono"
                >
                  {SITE_DATA.footer.easterEgg}
                </motion.span>
              )}
            </AnimatePresence>
            <button 
              className="hover:text-brand-red transition-colors cursor-help" 
              onClick={() => setShowEasterEgg(!showEasterEgg)}
            >
              §
            </button>
          </div>
        </div>
      </footer>

      {/* Modal / Book Call */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#1A1A1A] w-full max-w-2xl p-12 border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-[#E0E0E0]/40 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-red mb-4 block">Application Form</span>
                <h2 className="text-3xl font-medium uppercase tracking-tight text-white">Start Your Transformation</h2>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submitted. We will contact you shortly."); setIsModalOpen(false); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/60 block">Principal Name</label>
                    <input type="text" className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-red outline-none transition-colors text-white" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/60 block">Firm Website</label>
                    <input type="url" className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-red outline-none transition-colors text-white" placeholder="https://" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/60 block">Email Address</label>
                  <input type="email" className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-red outline-none transition-colors text-white" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/60 block">Current Focus</label>
                  <select className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-red outline-none transition-colors text-white appearance-none">
                    <option className="bg-[#1A1A1A]">High-End Residential</option>
                    <option className="bg-[#1A1A1A]">Commercial / Institutional</option>
                    <option className="bg-[#1A1A1A]">Sustainable Architecture</option>
                    <option className="bg-[#1A1A1A]">Urban Planning</option>
                  </select>
                </div>
                <button className="w-full bg-brand-red text-white py-5 text-sm uppercase tracking-widest hover:bg-brand-red-dark transition-all mt-8 font-bold">
                  Submit Application
                </button>
                <p className="text-[10px] text-[#E0E0E0]/40 text-center uppercase tracking-widest">
                  Strict Confidentiality Guaranteed.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// App Content Switcher
function AppContent() {
  const { theme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      {theme === 'ink' ? (
        <motion.div
          key="ink"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <InkPage />
        </motion.div>
      ) : (
        <motion.div
          key="blueprint"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <BlueprintPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
