
"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Bell, Shield, Wallet } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and subscription.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass border-white/5 rounded-[2rem] overflow-hidden text-center p-8">
              <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/u4/128/128" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold mb-1">Aryan Verma</h3>
              <p className="text-sm text-muted-foreground mb-4">B.Tech Student @ IIT Delhi</p>
              <Badge className="bg-primary/20 text-primary border-primary/30 rounded-full px-4 mb-6">Pro Member</Badge>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="rounded-xl border-white/10">Edit Photo</Button>
              </div>
            </Card>

            <Card className="glass border-white/5 rounded-[2rem] p-6">
              <nav className="flex flex-col gap-2">
                {[
                  { icon: User, label: "Personal Info", active: true },
                  { icon: Bell, label: "Notifications" },
                  { icon: Shield, label: "Security" },
                  { icon: Wallet, label: "Subscription" },
                  { icon: Settings, label: "Integrations" },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="glass border-white/5 rounded-[2rem]">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details for better AI personalization.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Aryan Verma" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input defaultValue="aryan.v@iitd.ac.in" disabled className="bg-white/5 border-white/10 h-12 rounded-xl opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Company</Label>
                    <Input placeholder="e.g. Google, Amazon" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input placeholder="e.g. 0 (Fresher)" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio / Headline</Label>
                  <Input defaultValue="Aspiring Software Engineer passionate about Distributed Systems and AI." className="bg-white/5 border-white/10 h-12 rounded-xl" />
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="glow-primary rounded-xl px-8 h-12 font-bold">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/5 rounded-[2rem] bg-orange-500/5 border-orange-500/20">
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>You are currently on the Pro Annual plan.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold">Pro Monthly - ₹499/month</p>
                  <p className="text-sm text-muted-foreground">Next billing date: Sept 12, 2024</p>
                </div>
                <Button variant="outline" className="border-orange-500/20 text-orange-500 hover:bg-orange-500/10 rounded-xl">Manage Subscription</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
