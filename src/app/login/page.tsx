
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Github, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(130,77,186,0.1),transparent)] pointer-events-none" />
      
      <Card className="w-full max-w-md glass border-white/10 shadow-2xl relative z-10 rounded-[2rem]">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
              <Brain className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">InsightHire <span className="text-primary">AI</span></span>
          </Link>
          <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials or use social login to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 rounded-xl">
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 rounded-xl">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="name@example.com" className="bg-white/5 border-white/10 h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="bg-white/5 border-white/10 h-12 rounded-xl" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full h-12 rounded-xl glow-primary font-bold text-lg" asChild>
            <Link href="/dashboard">Log In</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
