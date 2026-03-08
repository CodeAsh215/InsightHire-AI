
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Mic2, 
  BarChart, 
  Trophy, 
  Settings, 
  User, 
  LogOut,
  Brain,
  Sparkles
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Mic2, label: "Interviews", href: "/interview/dsa" },
  { icon: BarChart, label: "Analytics", href: "/analytics" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Mock logout logic
    router.push("/");
  };

  return (
    <div className="w-64 h-screen glass border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 hidden lg:flex">
      <Link href="/" className="flex items-center gap-2 mb-10 group">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
          <Brain className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-bold">InsightHire</span>
      </Link>

      <div className="space-y-2 flex-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3">Menu</p>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-white" : "group-hover:text-primary"
            )} />
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
        <div className="glass p-4 rounded-2xl mb-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
          <div className="relative flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider">Pro Plan</span>
          </div>
          <p className="text-[10px] text-muted-foreground relative mb-3">Unlock unlimited AI simulations and premium coaching.</p>
          <button className="text-[10px] font-bold text-primary hover:underline relative">Upgrade Now</button>
        </div>

        <Link 
          href="/profile" 
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
            pathname === "/profile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
          )}
        >
          <User className="w-5 h-5" />
          <span className="font-medium text-sm">Profile</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
