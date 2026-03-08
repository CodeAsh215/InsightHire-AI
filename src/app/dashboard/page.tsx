
"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Clock, 
  BarChart3, 
  Trophy, 
  ChevronRight, 
  Target,
  FileText,
  Briefcase,
  Layers,
  Code
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const modes = [
    { id: "dsa", label: "DSA Rounds", icon: Code, desc: "C++, Java, Python, JavaScript", color: "text-blue-400" },
    { id: "core", label: "Core CS", icon: Layers, desc: "OS, DBMS, CN, OOPS", color: "text-purple-400" },
    { id: "hr", label: "HR Behavioral", icon: Target, desc: "Leadership, Conflict Resolution", color: "text-pink-400" },
    { id: "resume", label: "Resume-Based", icon: FileText, desc: "Questions from your CV", color: "text-yellow-400" },
    { id: "system", label: "System Design", icon: BarChart3, desc: "Scalability, Databases, APIs", color: "text-green-400" },
    { id: "company", label: "Company Mode", icon: Briefcase, desc: "FAANG & Top Startup Patterns", color: "text-orange-400" },
  ];

  return (
    <div className="flex bg-background min-h-screen antialiased">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-[32px] font-bold mb-1 tracking-tight">Welcome back, Aryan! 👋</h1>
            <p className="text-[16px] text-muted-foreground font-normal">You're in the <span className="text-primary font-semibold">top 15%</span> of candidates this week.</p>
          </div>
          <div className="flex gap-3">
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Streak</p>
                <p className="text-[14px] font-bold">12 Days</p>
              </div>
            </div>
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">XP Points</p>
                <p className="text-[14px] font-bold">2,450</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-6 rounded-[2rem] border border-white/5 overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">UP 12%</span>
            </div>
            <p className="text-[14px] text-muted-foreground mb-1 font-medium">Interview Readiness</p>
            <h3 className="text-[32px] font-bold mb-4 tracking-tight">84%</h3>
            <Progress value={84} className="h-2 bg-blue-500/10" />
          </div>

          <div className="glass p-6 rounded-[2rem] border border-white/5 overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-[14px] text-muted-foreground mb-1 font-medium">Avg. Response Time</p>
            <h3 className="text-[32px] font-bold mb-4 tracking-tight">45s</h3>
            <div className="flex items-end gap-1 h-8">
              {[4, 7, 5, 8, 3, 6, 9].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h * 10}%` }}></div>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-[2rem] border border-white/5 overflow-hidden relative group bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <p className="text-[14px] text-muted-foreground mb-1 font-medium">Weakest Topic</p>
            <h3 className="text-[22px] font-bold mb-2 tracking-tight">Dynamic Programming</h3>
            <p className="text-[12px] text-primary font-bold uppercase tracking-widest hover:underline cursor-pointer">Practice Now →</p>
          </div>
        </div>

        {/* Modes Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold tracking-tight">Start a Simulation</h2>
            <Link href="/interview" className="text-[14px] text-primary hover:underline font-semibold">View all modes</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modes.map((mode, i) => (
              <Link 
                key={mode.id} 
                href={`/interview/${mode.id}`}
                className="glass p-6 rounded-[2rem] border border-white/5 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${mode.color} group-hover:scale-110 transition-transform duration-300`}>
                    <mode.icon className="w-7 h-7" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-[22px] font-bold mb-2 tracking-tight">{mode.label}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed font-normal">{mode.desc}</p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">Adaptive AI</span>
                  {mode.id === "company" && <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">Pro</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Activity Feed */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass p-8 rounded-[2rem] border border-white/5">
            <h3 className="text-[20px] font-bold mb-6 tracking-tight">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { title: "DSA Round (Graphs)", score: "88%", date: "2 hours ago", status: "success" },
                { title: "System Design Mock", score: "72%", date: "Yesterday", status: "warning" },
                { title: "HR Behavioral", score: "94%", date: "2 days ago", status: "success" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="text-[16px] font-bold">{item.title}</p>
                      <p className="text-[12px] text-muted-foreground font-normal">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[18px] tracking-tight">{item.score}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-8 rounded-[2rem] border border-white/5 bg-primary/5">
            <h3 className="text-[20px] font-bold mb-6 tracking-tight">AI Mentor Tips</h3>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[15px] leading-relaxed italic text-muted-foreground font-normal">
                  "Your technical accuracy in DFS/BFS is strong, but you tend to use too many filler words when explaining complexity. Try pausing before you speak."
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Recommended Actions</p>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px] font-medium">Practice 'Explain Code' exercises</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px] font-medium">Mock HR: Leadership Questions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
