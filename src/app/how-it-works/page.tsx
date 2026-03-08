
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Cpu, 
  Sparkles, 
  Target, 
  ArrowRight,
  Brain,
  Users,
  Globe
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Select Your Dream Role",
      desc: "Pick job role, difficulty level, and interview type tailored to your specific goals.",
      icon: Briefcase,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      number: "02",
      title: "AI Conducts Real Interview",
      desc: "Our adaptive AI asks dynamic, company-level questions that react to your depth of knowledge.",
      icon: Cpu,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      dominant: true
    },
    {
      number: "03",
      title: "Get Instant Intelligent Feedback",
      desc: "Analyze confidence, clarity, filler words, and technical accuracy with precision scoring.",
      icon: Sparkles,
      color: "text-pink-400",
      bg: "bg-pink-400/10"
    },
    {
      number: "04",
      title: "Improve & Retry",
      desc: "Track progress across different sessions and practice strategically to bridge skill gaps.",
      icon: Target,
      color: "text-green-400",
      bg: "bg-green-400/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background antialiased">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto text-center mb-24">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              The Process
            </span>
          </div>
          <h1 className="text-[48px] md:text-[68px] font-bold mb-8 leading-[1.1] tracking-[-0.5px] animate-in fade-in slide-in-from-bottom-6 duration-700">
            How <span className="text-gradient italic">InsightHire AI</span> Works
          </h1>
          <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-[1.6] font-normal animate-in fade-in slide-in-from-bottom-8 duration-1000">
            From practice to placement in 4 intelligent steps. Our system mimics real-world interview conditions to make you bulletproof.
          </p>
        </section>

        {/* Steps Grid */}
        <section className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 items-stretch">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={cn(
                "group glass p-10 rounded-[2.5rem] border-white/5 hover:bg-white/5 transition-all duration-500 relative flex flex-col items-start overflow-hidden animate-in fade-in zoom-in-95",
                step.dominant && "lg:scale-105 lg:z-10 ring-1 ring-primary/20 shadow-2xl bg-primary/[0.02]"
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className="text-[90px] font-bold text-white/[0.03] absolute -top-4 -right-4 transition-all group-hover:text-primary/[0.08] select-none tracking-tighter">
                {step.number}
              </span>
              <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform relative z-10`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h4 className="text-[22px] font-semibold mb-4 group-hover:text-primary transition-colors relative z-10 leading-[1.3]">{step.title}</h4>
              <p className="text-[16px] text-muted-foreground leading-[1.6] relative z-10 font-normal">{step.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="mt-32 text-center max-w-4xl mx-auto glass p-16 rounded-[3rem] border-primary/20 bg-primary/5">
          <h2 className="text-[32px] md:text-[40px] font-bold mb-6 tracking-tight">Ready to Experience it?</h2>
          <p className="text-[18px] text-muted-foreground mb-12 font-normal leading-[1.6]">
            Join thousands of successful candidates who used InsightHire AI to land their dream offers.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="h-16 px-12 text-[20px] glow-primary rounded-2xl font-bold group" asChild>
              <Link href="/dashboard">
                Start Free Interview <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">No credit card required.</p>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 px-6 glass-darker">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className="text-[24px] font-bold tracking-tight">InsightHire <span className="text-primary italic">AI</span></span>
            </Link>
            <p className="text-[16px] text-muted-foreground max-w-sm mb-8 leading-[1.6] font-normal">
              Master technical and behavioral interviews with real-time AI simulations. Designed for the top 1% of candidates.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[12px] uppercase tracking-widest text-primary/70">Platform</h4>
            <ul className="space-y-4 text-[14px] text-muted-foreground font-medium">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[12px] uppercase tracking-widest text-primary/70">Company</h4>
            <ul className="space-y-4 text-[14px] text-muted-foreground font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About AI Mentor</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} InsightHire AI Engine.
        </div>
      </footer>
    </div>
  );
}
