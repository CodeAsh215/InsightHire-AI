
"use client";

import { useParams } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { InterviewSession } from "@/components/interview/InterviewSession";
import { 
  BadgeCheck, 
  Brain, 
  Info,
  Layers,
  Code,
  Target,
  FileText,
  Briefcase
} from "lucide-react";

const modeDetails: Record<string, { label: string; icon: any; color: string }> = {
  dsa: { label: "Data Structures & Algorithms", icon: Code, color: "text-blue-400" },
  core: { label: "Core CS Fundamentals", icon: Layers, color: "text-purple-400" },
  hr: { label: "HR Behavioral", icon: Target, color: "text-pink-400" },
  resume: { label: "Resume-Based Mock", icon: FileText, color: "text-yellow-400" },
  system: { label: "System Design", icon: Brain, color: "text-green-400" },
  company: { label: "Company Specific", icon: Briefcase, color: "text-orange-400" },
};

export default function InterviewModePage() {
  const params = useParams();
  const mode = params.mode as string;
  const detail = modeDetails[mode] || { label: "General Interview", icon: Brain, color: "text-primary" };

  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${detail.color}`}>
              <detail.icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{detail.label}</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-muted-foreground">Session Active</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 glass px-4 py-2 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">Difficulty: Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-wider">Mode: Text + Audio</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <InterviewSession mode={detail.label} />
        </div>
      </main>
    </div>
  );
}
