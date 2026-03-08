"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo (Far Left) */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            InsightHire <span className="text-primary italic">AI</span>
          </span>
        </Link>

        {/* Right Group: Navigation Links + Log In Button */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation Links with Dividers */}
          <div className="flex items-center gap-4">
            <Link 
              href="/#features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <div className="w-px h-4 bg-white/15" />
            <Link 
              href="/#pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <div className="w-px h-4 bg-white/15" />
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Primary Action Button */}
          <Button 
            className="glow-primary rounded-xl px-6 h-10 font-bold hover:-translate-y-0.5 transition-all duration-200" 
            asChild
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-darker border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <Link href="/#features" className="text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="/#pricing" className="text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/dashboard" className="text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <div className="pt-4 border-t border-white/5">
            <Button className="w-full rounded-xl h-12 glow-primary font-bold" asChild>
              <Link href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
