
"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Activity, Target, TrendingUp, Users } from "lucide-react";

const mockPerformanceData = [
  { name: "Mon", score: 65 },
  { name: "Tue", score: 72 },
  { name: "Wed", score: 68 },
  { name: "Thu", score: 85 },
  { name: "Fri", score: 82 },
  { name: "Sat", score: 90 },
  { name: "Sun", score: 88 },
];

const mockTopicData = [
  { name: "DSA", value: 85 },
  { name: "Core CS", value: 70 },
  { name: "System Design", value: 65 },
  { name: "HR Behavioral", value: 92 },
];

const COLORS = ['#824DBA', '#A888F8', '#B4CDFC', '#FF9900'];

export default function AnalyticsPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your interview progress and skill gaps.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Overall Score", value: "84/100", icon: TrendingUp, color: "text-blue-400" },
            { label: "Total Mock Rounds", value: "24", icon: Activity, color: "text-purple-400" },
            { label: "Success Rate", value: "78%", icon: Target, color: "text-green-400" },
            { label: "Global Percentile", value: "Top 12%", icon: Users, color: "text-orange-400" },
          ].map((stat, i) => (
            <Card key={i} className="glass border-white/5 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="glass border-white/5 rounded-[2rem] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Readiness Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#A888F8' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#A888F8" strokeWidth={3} dot={{ fill: '#A888F8' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass border-white/5 rounded-[2rem] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Topic Proficiency</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockTopicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockTopicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 ml-4">
                {mockTopicData.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-xs text-muted-foreground">{t.name} ({t.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
