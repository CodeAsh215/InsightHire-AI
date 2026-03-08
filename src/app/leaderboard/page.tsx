
"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Flame, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const leaders = [
  { id: 1, name: "Arjun Mehta", score: 2840, rounds: 42, rank: 1, avatar: "https://picsum.photos/seed/u1/40/40", streak: 15 },
  { id: 2, name: "Sara Khan", score: 2650, rounds: 38, rank: 2, avatar: "https://picsum.photos/seed/u2/40/40", streak: 12 },
  { id: 3, name: "Ryan Gupta", score: 2510, rounds: 35, rank: 3, avatar: "https://picsum.photos/seed/u3/40/40", streak: 8 },
  { id: 4, name: "Aryan Verma", score: 2450, rounds: 32, rank: 4, avatar: "https://picsum.photos/seed/u4/40/40", streak: 12 },
  { id: 5, name: "Neha Sharma", score: 2320, rounds: 30, rank: 5, avatar: "https://picsum.photos/seed/u5/40/40", streak: 5 },
  { id: 6, name: "Kabir Singh", score: 2210, rounds: 28, rank: 6, avatar: "https://picsum.photos/seed/u6/40/40", streak: 3 },
  { id: 7, name: "Priya Das", score: 2150, rounds: 25, rank: 7, avatar: "https://picsum.photos/seed/u7/40/40", streak: 10 },
];

export default function LeaderboardPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">Competitive mock practice to sharpen your skills.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {leaders.slice(0, 3).map((l, i) => (
            <Card key={l.id} className={`glass border-white/5 rounded-[2.5rem] relative overflow-hidden text-center p-8 ${i === 0 ? 'border-primary/40 bg-primary/5 scale-105 shadow-2xl z-10' : ''}`}>
              <div className="absolute top-4 right-4">
                {i === 0 ? <Trophy className="w-8 h-8 text-yellow-500" /> : <Medal className={`w-6 h-6 ${i === 1 ? 'text-gray-400' : 'text-orange-400'}`} />}
              </div>
              <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-white/10">
                <AvatarImage src={l.avatar} />
                <AvatarFallback>{l.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{l.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Rank #{l.rank}</p>
              <div className="flex items-center justify-center gap-4 py-4 border-t border-white/5">
                <div>
                  <p className="text-lg font-bold">{l.score}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">XP Points</p>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div>
                  <p className="text-lg font-bold">{l.streak}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Streak</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="glass border-white/5 rounded-[2rem] overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Mock Rounds</TableHead>
                <TableHead>Streak</TableHead>
                <TableHead className="text-right">Total XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((l) => (
                <TableRow key={l.id} className={`hover:bg-white/5 border-white/5 ${l.name === 'Aryan Verma' ? 'bg-primary/5' : ''}`}>
                  <TableCell className="font-bold">#{l.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={l.avatar} />
                        <AvatarFallback>{l.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{l.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{l.rounds}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{l.streak} days</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">{l.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
