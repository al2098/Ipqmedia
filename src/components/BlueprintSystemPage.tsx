import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function BlueprintSystemPage() {
  const { setTheme } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const agents = [
    {
      name: "AGENT 1 — META ADS AGENT",
      function: "High-level target acquisition",
      bullets: [
        "Deploys lookalike audiences from your best past clients",
        "Scans users engaging with luxury real estate, design publications, high-net-worth content",
        "Automatic budget reallocation every 72 hours"
      ]
    },
    {
      name: "AGENT 2 — GOOGLE ADS AGENT",
      function: "High-intent search capture",
      bullets: [
        "Captures high-intent search traffic (e.g., \"architect for modern beach house\")",
        "Dynamic keyword insertion and competitor conquesting",
        "Negative keyword pruning weekly"
      ]
    },
    {
      name: "AGENT 3 — LINKEDIN ADS AGENT",
      function: "Decision-maker proximity engagement",
      bullets: [
        "Targets principals of development firms, property owners, real estate trusts",
        "Decision-maker engagement scoring (0-100)",
        "Account-based marketing campaign deployment"
      ]
    },
    {
      name: "AGENT 4 — PSYCHOLOGICAL ANALYSIS AGENT",
      function: "Sentiment and motivation mapping",
      bullets: [
        "Analyzes prospect language, email responses, call transcripts",
        "Identifies decision drivers: \"legacy-driven\" vs \"budget-anxious\" vs \"deadline-obsessed\"",
        "Routes prospects to appropriate follow-up sequences"
      ]
    },
    {
      name: "AGENT 5 — COLLECT & QUALIFY AGENT",
      function: "Gateway filtering system",
      bullets: [
        "Gathers project scope, budget range, timeline",
        "Scores leads 0-100 using 17 qualification signals",
        "Only surfaces prospects above 85. Sends rejection messages to others."
      ]
    },
    {
      name: "AGENT 6 — LEAD SCORING AGENT",
      function: "Dynamic priority weighting",
      bullets: [
        "Scores leads ~100 per batch",
        "Weighted scoring: budget (35%), timeline (25%), project complexity (20%), authority (20%)",
        "Outputs: Hot/Warm/Cold + specific follow-up recommendation"
      ]
    },
    {
      name: "AGENT 7 — CSV WASTE HUNT AGENT",
      function: "Database recovery & extraction",
      bullets: [
        "Analyzes uploaded CSV files (~500 rows per analysis, up to 2x)",
        "Identifies uncontacted leads, stalled opportunities, mis-tagged contacts",
        "Generates \"recovery potential report\" with estimated revenue left on table"
      ]
    },
    {
      name: "AGENT 8 — AD COPY GENERATION AGENT",
      function: "Cognitive persuasion engine",
      bullets: [
        "Generates 15 ad copy variations per request (~300 tokens per run, 1x per campaign)",
        "Outputs: 5 problem-aware, 5 solution-aware, 5 product-aware headlines+bodies",
        "A/B test ready with suggested winning hypotheses"
      ]
    },
    {
      name: "AGENT 9 — AD CONCEPT GENERATION AGENT",
      function: "Visual and structural ideation",
      bullets: [
        "Generates 5 distinct ad concepts per request (~200 tokens per concept, 1x per campaign)",
        "Each concept includes: hook, angle, visual description, target audience segment",
        "Formats for Meta, Google, and LinkedIn placements"
      ]
    },
    {
      name: "AGENT 10 — RE-ENGAGEMENT & REPORTING AGENT",
      function: "Closure and insight delivery",
      bullets: [
        "Drafts 3 re-engagement emails per batch (~200 tokens, for stalled leads)",
        "Generates performance report (~400 tokens, includes: spend, leads, cost per intro, show rate, closed fees)",
        "Produces CEO daily briefing (one-paragraph summary of performance + actions)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-red selection:text-white pb-32">
      {/* Navigation Indicator */}
      <nav className="fixed top-0 w-full z-50 flex justify-center py-6 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold">
          <button onClick={() => setTheme('home')} className="text-white/40 hover:text-white transition-colors">HOME</button>
          <div className="w-px h-3 bg-white/10" />
          <button onClick={() => setTheme('trace')} className="text-white/40 hover:text-white transition-colors">TRACE</button>
          <span className="text-white/20">→</span>
          <span className="text-brand-red">BLUEPRINT</span>
          <span className="text-white/20">→</span>
          <button onClick={() => setTheme('ink')} className="text-white/40 hover:text-white transition-colors">INK</button>
        </div>
      </nav>

      {/* SECTION 1 — Funnel Example */}
      <section className="pt-40 pb-24 px-6 max-w-6xl mx-auto scroll-mt-20">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-brand-red text-[11px] uppercase tracking-[0.5em] font-bold mb-4">Phase 02: Systems</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            WATCH THIS FUNNEL. <br/>
            <span className="text-white/40">THEN IMAGINE IT WORKING FOR YOUR FIRM.</span>
          </h2>
        </motion.div>

        {/* Funnel Visualization */}
        <div className="relative max-w-4xl mx-auto py-12 px-6 border border-white/5 bg-white/[0.02] rounded-2xl">
          <div className="flex flex-col gap-12">
            {[
              { stage: "Stage 1: The Intellectual Hook", title: "The 2026 Luxury Residential Report", desc: "PDF download to capture awareness" },
              { stage: "Stage 2: The Architect Interview", title: "Principal Qualification Video", desc: "5-min qualifying video with your principal" },
              { stage: "Stage 3: The Commission Calculator", title: "Financial Alignment Tool", desc: "Estimate design fees and budget compatibility" },
              { stage: "Stage 4: Book the Introduction", title: "Qualified Prospect Calendar", desc: "Direct booking for high-intent leads" }
            ].map((item, i, arr) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-red flex items-center justify-center text-brand-red font-bold">
                  {i + 1}
                </div>
                <div className="flex-grow">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold mb-1">{item.stage}</div>
                  <div className="text-xl font-bold uppercase tracking-tight">{item.title}</div>
                  <div className="text-sm text-white/40">{item.desc}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute -bottom-10 left-6 w-px h-8 bg-brand-red/30" />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Decorative Arrows/Lines */}
          <div className="absolute top-0 right-10 bottom-0 w-32 opacity-10 pointer-events-none hidden md:block">
            <div className="h-full border-r border-dashed border-brand-red flex flex-col justify-around">
              <ArrowRight size={20} className="text-brand-red" />
              <ArrowRight size={20} className="text-brand-red" />
              <ArrowRight size={20} className="text-brand-red" />
            </div>
          </div>
        </div>

        <motion.p 
          className="text-center mt-12 text-sm text-white/30 italic font-light tracking-wide max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={fadeInUp.viewport}
        >
          "Every element is trackable, testable, and optimizable. This is not marketing theater. This is engineering."
        </motion.p>
      </section>

      {/* SECTION 2 — The Agent Stack */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-white/[0.01] border-y border-white/5">
        <motion.div 
          className="mb-20 text-center md:text-left"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
        >
          <div className="text-brand-red text-[11px] uppercase tracking-[0.5em] font-bold mb-4">The Command Center</div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">THE AGENT STACK.</h2>
          <p className="text-white/40 text-lg mt-4 max-w-xl uppercase tracking-widest text-[10px] font-bold">Comprehensive deployment architecture.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {agents.map((agent, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 border border-white/10 bg-white/5 hover:border-brand-red/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-red/5"
            >
              <div className="text-brand-red font-black text-xs uppercase tracking-[0.3em] mb-2 font-mono">
                {agent.name}
              </div>
              <div className="text-lg font-medium text-white mb-6 uppercase tracking-tight group-hover:text-brand-red transition-colors">
                {agent.function}
              </div>
              <ul className="space-y-4">
                {agent.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                    <CheckCircle2 size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-24"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
        >
          <div className="inline-block py-4 px-12 border border-white/20 text-2xl font-black uppercase tracking-[0.4em]">
            Ten agents. One funnel. Zero chaos.
          </div>
        </motion.div>
      </section>

      {/* Button Cluster */}
      <div className="mt-32 flex flex-col md:flex-row justify-center items-center gap-8 px-6">
        <motion.button 
          onClick={() => setTheme('trace')}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold"
          whileHover={{ x: -10 }}
        >
          <ArrowLeft size={18} /> BACK TO TRACE
        </motion.button>
        
        <motion.button 
          onClick={() => setTheme('ink')}
          className="group relative flex items-center gap-6 bg-brand-red text-white px-12 py-6 text-sm uppercase tracking-[0.3em] font-black overflow-hidden shadow-2xl shadow-brand-red/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">PROCEED TO INK</span>
          <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
          <div className="absolute inset-0 bg-[#8B0000] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
      </div>
    </div>
  );
}
