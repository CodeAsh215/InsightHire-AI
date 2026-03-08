
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { 
  ArrowRight, 
  CheckCircle2, 
  Mic, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  Zap,
  Quote,
  Users,
  Trophy,
  Brain,
  Sparkles,
  Target,
  Briefcase,
  Lock,
  Globe,
  Flame,
  Award,
  FileText
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SectionDivider = () => (
  <div className="max-w-7xl mx-auto px-6">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20" />
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
      {children}
    </span>
  </div>
);

const CircularProgress = ({ value, label, colorClass, delay = 0 }: { value: number, label: string, colorClass: string, delay?: number }) => {
  const [progress, setProgress] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const size = 85;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const id = `biometric-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const el = document.getElementById(id);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [label]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setProgress(value);
      let start = 0;
      const duration = 1000;
      const interval = 16;
      const steps = duration / interval;
      const increment = value / steps;
      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(start);
        }
      }, interval);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div 
      id={`biometric-${label.toLowerCase().replace(/\s+/g, '-')}`} 
      className="glass p-6 rounded-[2.5rem] flex flex-col items-center justify-center text-center group transition-all duration-500 hover:border-primary/30"
    >
      <div className="relative mb-4" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn("transition-all duration-1000 ease-out", colorClass)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-[20px] font-bold tracking-tighter tabular-nums", colorClass)}>{Math.round(displayValue)}%</span>
        </div>
      </div>
      <p className="text-[9px] text-[#9CA3AF] font-bold uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F14] selection:bg-primary/30 antialiased relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
      
      <Navbar />

      <section className="relative pt-[110px] pb-[140px] px-6 z-10">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'radial-gradient(circle at 30% 40%, rgba(139,92,246,0.12), transparent 45%)' 
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Next-Gen Interview Simulation</span>
            </div>
            <h1 className="hero-headline text-white">
              Practice. Improve.<br />
              <span className="text-gradient">Get Hired.</span>
            </h1>
            <p className="subheadline max-w-lg text-[#B3B3C3]">
              AI-powered mock interviews with real-time feedback, confidence analysis, and company-level simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button size="lg" className="h-14 px-8 text-[18px] glow-primary rounded-xl font-bold group hover:-translate-y-1 transition-all" asChild>
                <Link href="/interview">
                  Start Free AI Interview <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-[18px] border-primary/30 rounded-xl hover:bg-primary/5 transition-all font-bold relative group overflow-hidden"
                asChild
              >
                <Link href="/how-it-works">
                  How It Works
                  <span className="absolute bottom-3 left-8 right-8 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 py-6 border-t border-white/5 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden ring-1 ring-primary/20">
                    <img src={`https://picsum.photos/seed/${i + 45}/32/32`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-[13px] font-medium text-[#9CA3AF]">
                Trusted by <span className="text-foreground font-bold text-white">2,000+ engineers</span>
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[400px]">
            <div 
              className="absolute w-[120%] h-[120%] rounded-full opacity-30 blur-[100px]"
              style={{ 
                background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' 
              }}
            ></div>
            
            <div className="relative z-10 w-full max-w-sm aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-[4rem] blur-[60px] animate-pulse"></div>
              <div className="relative w-64 h-64 glass rounded-[3rem] border-primary/20 bg-primary/5 flex items-center justify-center animate-float shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
                 <Brain className="w-24 h-24 text-primary opacity-50" />
                 <div className="absolute -top-4 -right-4 w-12 h-12 glass rounded-2xl flex items-center justify-center animate-bounce duration-1000">
                    <Sparkles className="w-6 h-6 text-primary" />
                 </div>
                 <div className="absolute -bottom-8 -left-8 w-16 h-16 glass rounded-full flex items-center justify-center animate-pulse">
                    <Target className="w-8 h-8 text-primary/60" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-[90px] px-6 bg-[#14141A] relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>The Challenge</SectionLabel>
            <h2 className="section-headline mb-6 text-white">
              Interviews Don’t Test Knowledge. <br />
              <span className="text-primary italic">They Test Confidence.</span>
            </h2>
            <p className="subheadline mb-8 max-w-md text-[#C9C9D6]">
              Most candidates fail not because of technical gaps, but because of pressure, lack of structure, and unknown behavioral weaknesses.
            </p>
            <Button size="lg" className="rounded-xl glow-primary font-bold text-[16px] hover:-translate-y-1 transition-all" asChild>
              <Link href="/interview">Fix Your Interview Gap</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { text: "Pressure Blindness", desc: "Forgetting logic when the timer starts.", icon: Brain },
              { text: "Structure Deficit", desc: "Rambling without clear STAR framing.", icon: MessageSquare },
              { text: "Feedback Void", desc: "No idea why you didn't get the offer.", icon: Target },
              { text: "Unprepared Persona", desc: "Lacking the 'Engineer' mindset.", icon: Briefcase },
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-3xl group hover:bg-primary/5 transition-all hover:-translate-y-1">
                <item.icon className="w-5 h-5 text-primary mb-4" />
                <h4 className="card-title mb-2 text-white">{item.text}</h4>
                <p className="text-[14px] text-[#9CA3AF] leading-normal font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="demo" className="py-[90px] px-6 bg-[#0F0F14] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Live Simulation</SectionLabel>
            <h2 className="section-headline text-white">See It In Action</h2>
          </div>
          <div className="glass rounded-[2.5rem] p-8 md:p-12 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <Brain className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-white">AI Mentor</h3>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.2em] font-bold">System Design Round</p>
                  </div>
                </div>
                <div className="space-y-4 font-normal text-[15px]">
                  <div className="glass p-5 rounded-2xl rounded-tl-none border-primary/20 bg-primary/5 max-w-[90%] text-white">
                    <p className="font-medium">"How would you handle eventual consistency in a global banking app?"</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-5 rounded-2xl rounded-tr-none max-w-[90%] shadow-lg shadow-primary/20">
                      <p>"I would implement a saga pattern to manage distributed transactions while ensuring idempotent operations..."</p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center animate-pulse mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <span className="text-[9px] text-[#9CA3AF] uppercase font-bold tracking-widest ml-2">Analyzing Sentiment...</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="card-title text-white">Biometric Insights</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Confidence", val: 78, color: "text-blue-400" },
                    { label: "Clarity", val: 82, color: "text-purple-400" },
                    { label: "Technical", val: 74, color: "text-green-400" },
                    { label: "Tone", val: 88, color: "text-pink-400" },
                  ].map((stat, i) => (
                    <CircularProgress 
                      key={i} 
                      label={stat.label} 
                      value={stat.val} 
                      colorClass={stat.color} 
                      delay={i * 200}
                    />
                  ))}
                </div>
                <div className="glass p-4 rounded-xl flex items-center justify-between border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white">Filler Word Alert</p>
                  </div>
                  <span className="text-[20px] font-bold text-primary">2 detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="features" className="py-[90px] px-6 bg-[#14141A] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Powered By AI</SectionLabel>
            <h2 className="section-headline text-white">Professional-Grade Analysis</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Sentiment Analysis", desc: "Real-time tone monitoring to ensure you sound calm and authoritative.", icon: Users, tag: "VOICE" },
              { title: "Filler Word Tracker", desc: "Detects 'um', 'like', and 'actually' to improve your verbal clarity.", icon: Mic, tag: "NLP" },
              { title: "Topic Heatmap", desc: "Visualizes your technical strengths and identifies critical logic gaps.", icon: Target, tag: "LOGIC" },
              { title: "Dynamic Resume Mocks", desc: "AI builds a context-aware question set based on your projects.", icon: FileText, tag: "CUSTOM" },
              { title: "FAANG Patterns", desc: "Simulate specific styles used at firms like Google, Amazon, and Meta.", icon: Briefcase, tag: "DATA" },
              { title: "Verified Roadmap", desc: "Receive an automated improvement plan after every session.", icon: Award, tag: "PLAN" },
            ].map((f, i) => (
              <div key={i} className="group glass p-8 rounded-[2rem] hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mb-3 inline-block tracking-widest uppercase">{f.tag}</span>
                <h4 className="card-title mb-3 text-white">{f.title}</h4>
                <p className="text-[#C9C9D6] leading-relaxed text-[15px] font-normal">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="pricing" className="py-[90px] px-6 bg-[#0F0F14] relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <SectionLabel>Pricing Plans</SectionLabel>
          <h2 className="section-headline mb-4 text-white">The ROI on Your Career <br /> is Infinite.</h2>
          <p className="subheadline mb-12 max-w-2xl mx-auto text-[#C9C9D6]">Mastering one single interview pays for a lifetime of preparation.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass p-10 rounded-[2.5rem] flex flex-col items-start text-left hover:-translate-y-1 transition-all">
              <h3 className="card-title mb-2 text-white">Casual Practice</h3>
              <p className="text-[#9CA3AF] text-[14px] mb-6">Great for starting out.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[42px] font-bold text-white">₹0</span>
                <span className="text-[16px] text-[#9CA3AF]">/ forever</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["3 AI Mocks / week", "Standard Behavioral", "Text Mode", "Community Access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-[#9CA3AF] font-normal">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 font-bold" asChild>
                <Link href="/interview">Get Started</Link>
              </Button>
            </div>

            <div className="glass p-10 rounded-[2.5rem] border-primary/40 bg-primary/5 flex flex-col items-start text-left relative scale-105 shadow-2xl hover:-translate-y-1 transition-all">
              <div className="absolute top-6 right-6 bg-primary text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase text-white">Popular</div>
              <h3 className="card-title mb-2 text-white">Job Ready Pro</h3>
              <p className="text-primary/80 text-[14px] font-medium tracking-wide mb-6">For serious candidates.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[42px] font-bold text-gradient">₹499/month</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Unlimited AI Mocks", "Voice & Face Sentiment", "FAANG Modes", "Priority Feedback", "Resume AI Analysis"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-white">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 glow-primary font-bold" asChild>
                <Link href="/interview">Start Pro Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[90px] px-6 bg-[#14141A] relative z-10">
        <div className="max-w-4xl mx-auto glass p-12 md:p-16 rounded-[3rem] border-primary/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-primary/10 blur-[80px] rounded-full opacity-50"></div>
          <h2 className="section-headline mb-4 relative z-10 text-white">Start Your First AI Interview Today</h2>
          <p className="subheadline mb-10 relative z-10 max-w-lg mx-auto text-[#C9C9D6]">
            Practice smarter. Perform better. Get hired faster.
          </p>
          <div className="flex flex-col items-center gap-4 relative z-10">
            <Button size="lg" className="h-14 px-10 text-[18px] glow-primary rounded-xl font-bold group hover:-translate-y-1 transition-all" asChild>
              <Link href="/interview">
                Start Free AI Interview <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-widest">No credit card required. Takes less than 60 seconds.</p>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 px-6 glass-darker relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-left">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
                <Brain className="text-white w-5 h-5" />
              </div>
              <span className="text-[22px] font-bold tracking-tight text-white">InsightHire <span className="text-primary italic">AI</span></span>
            </Link>
            <p className="text-[#9CA3AF] max-w-sm mb-8 leading-relaxed font-normal text-[15px]">
              Master technical and behavioral interviews with real-time AI simulations.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[11px] uppercase tracking-widest text-primary/70">Platform</h4>
            <ul className="space-y-4 text-[14px] text-[#C9C9D6] font-medium">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[11px] uppercase tracking-widest text-primary/70">Legal</h4>
            <ul className="space-y-4 text-[14px] text-[#C9C9D6] font-medium">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">
          © {new Date().getFullYear()} InsightHire AI Engine.
        </div>
      </footer>
    </div>
  );
}
