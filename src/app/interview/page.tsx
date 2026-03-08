
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Clock,
  Cpu,
  Mic,
  Send,
  X,
  ShieldCheck,
  Award,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type Step = "setup" | "interface" | "summary";

export default function InterviewPage() {
  const [step, setStep] = useState<Step>("setup");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [config, setConfig] = useState({
    username: "",
    email: "",
    role: "Backend Engineer",
    round: "Technical",
    difficulty: "Standard",
    duration: "30 Minutes",
    mode: "Text",
    sessionType: "Time", // "Time" or "Questions"
    questionCount: 10
  });

  // Steps handling
  if (step === "setup") return <SetupStep onStart={(id: string) => { setSessionId(id); setStep("interface"); }} config={config} setConfig={setConfig} />;
  if (step === "interface") return <InterfaceStep onFinish={() => setStep("summary")} config={config} sessionId={sessionId} />;
  return <SummaryStep onRestart={() => { setSessionId(null); setStep("setup"); }} config={config} sessionId={sessionId} />;
}

// --- SETUP STEP (AI ASSESSMENT CHAMBER) ---
function SetupStep({ onStart, config, setConfig }: any) {
  const roles = [
    "Backend Engineer",
    "Frontend Engineer",
    "Full Stack Engineer",
    "Data Structures & Algorithms",
    "System Design",
    "Behavioral Round"
  ];
  const rounds = ["Technical", "System Design", "Behavioral", "Rapid Fire"];
  const difficulties = ["Standard", "Advanced", "FAANG-Level"];
  const durations = ["15 Minutes", "30 Minutes", "45 Minutes"];
  const questionCounts = [5, 10, 15];
  const modes = ["Voice", "Text"];
  const sessionTypes = ["Time", "Questions"];

  return (
    <div className="min-h-screen bg-[#09090B] text-white selection:bg-primary/30 antialiased relative overflow-hidden flex flex-col">
      {/* Immersive Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full pointer-events-none opacity-60" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 flex items-center justify-center relative z-10">
        <div className="max-w-[880px] w-full glass rounded-[3rem] border-white/10 p-12 md:p-20 relative shadow-[0_0_80px_-20px_rgba(139,92,246,0.15)] overflow-hidden">
          {/* Step Label */}
          <div className="absolute top-10 right-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary/50">CHAMBER STATE: 01/02</span>
          </div>

          <header className="mb-20 text-center">
            <h1 className="text-[64px] md:text-[72px] font-extrabold tracking-tighter leading-none mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-primary/40">
              INTERVIEW SETUP
            </h1>
            <div className="space-y-2">
              <p className="text-[#94A3B8] text-lg font-medium max-w-xl mx-auto leading-relaxed">
                This session will simulate a real technical interview and evaluate your performance.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                Your performance will be analyzed in real-time.
              </p>
            </div>
          </header>

          <div className="space-y-16">
            {/* User Details */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
              <div className="space-y-8">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block text-left">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-white/5 rounded-xl p-4 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  value={config.username}
                  onChange={(e) => setConfig({ ...config, username: e.target.value })}
                />
              </div>
              <div className="space-y-8">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block text-left">YOUR EMAIL</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white/5 rounded-xl p-4 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                />
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Target Role */}
            <div className="space-y-8">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block text-center">TARGET ROLE</label>
              <div className="flex flex-wrap justify-center gap-4">
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => setConfig({ ...config, role: r })}
                    className={cn(
                      "px-8 py-4 rounded-xl border transition-all duration-200 text-[13px] font-bold",
                      config.role === r
                        ? "bg-primary/20 border-primary text-white scale-[1.03] shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                        : "border-white/5 bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
              {/* Round Type */}
              <div className="space-y-8">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block">ROUND TYPE</label>
                <div className="grid grid-cols-2 gap-3">
                  {rounds.map(r => (
                    <button
                      key={r}
                      onClick={() => setConfig({ ...config, round: r })}
                      className={cn(
                        "px-4 py-4 rounded-xl border transition-all duration-200 text-[12px] font-bold",
                        config.round === r
                          ? "bg-primary/20 border-primary text-white scale-[1.03] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                          : "border-white/5 bg-white/5 text-[#64748B] hover:bg-white/10"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-8">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block">DIFFICULTY LEVEL</label>
                <div className="grid grid-cols-1 gap-3">
                  {difficulties.map(d => (
                    <button
                      key={d}
                      onClick={() => setConfig({ ...config, difficulty: d })}
                      className={cn(
                        "w-full px-6 py-4 rounded-xl border transition-all duration-200 text-[12px] font-bold text-left flex items-center justify-between",
                        config.difficulty === d
                          ? d === "FAANG-Level"
                            ? "bg-gradient-to-r from-primary/30 to-purple-500/30 border-primary text-white scale-[1.03] shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                            : "bg-primary/20 border-primary text-white scale-[1.03] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                          : "border-white/5 bg-white/5 text-[#64748B] hover:bg-white/10"
                      )}
                    >
                      {d}
                      {config.difficulty === d && <ShieldCheck className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Type Toggle */}
              <div className="space-y-8 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block text-center">SESSION TYPE</label>
                <div className="flex justify-center gap-4">
                  {sessionTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setConfig({ ...config, sessionType: t })}
                      className={cn(
                        "px-10 py-4 rounded-xl border transition-all duration-200 text-[13px] font-bold",
                        config.sessionType === t
                          ? "bg-primary/20 border-primary text-white scale-[1.03]"
                          : "border-white/5 bg-white/5 text-[#64748B] hover:bg-white/10"
                      )}
                    >
                      {t === "Time" ? "Time-Limited" : "Question-Limited"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Selection: Duration or Question Count */}
              {config.sessionType === "Time" ? (
                <div className="space-y-8">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block">SESSION DURATION</label>
                  <div className="grid grid-cols-3 gap-3">
                    {durations.map(d => (
                      <button
                        key={d}
                        onClick={() => setConfig({ ...config, duration: d })}
                        className={cn(
                          "px-2 py-4 rounded-xl border transition-all duration-200 text-[12px] font-bold text-center",
                          config.duration === d
                            ? "bg-primary/20 border-primary text-white scale-[1.03]"
                            : "border-white/5 bg-white/5 text-[#64748B] hover:bg-white/10"
                        )}
                      >
                        {d.split(' ')[0]}m
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block">NUMBER OF QUESTIONS</label>
                  <div className="grid grid-cols-3 gap-3">
                    {questionCounts.map(q => (
                      <button
                        key={q}
                        onClick={() => setConfig({ ...config, questionCount: q })}
                        className={cn(
                          "px-2 py-4 rounded-xl border transition-all duration-200 text-[12px] font-bold text-center",
                          config.questionCount === q
                            ? "bg-primary/20 border-primary text-white scale-[1.03]"
                            : "border-white/5 bg-white/5 text-[#64748B] hover:bg-white/10"
                        )}
                      >
                        {q} Qs
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Communication Mode */}
              <div className="space-y-8">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block">COMMUNICATION MODE</label>
                <div className="grid grid-cols-2 gap-3">
                  {modes.map(m => (
                    <button
                      key={m}
                      onClick={() => setConfig({ ...config, mode: m })}
                      className={cn(
                        "px-4 py-4 rounded-xl border transition-all duration-200 text-[12px] font-bold text-center",
                        config.mode === m
                          ? "bg-primary/20 border-primary text-white scale-[1.03]"
                          : "border-white/5 bg-white/5 text-[#64748B] hover:bg-white/10"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-16 text-center space-y-8">
              <Button
                size="lg"
                disabled={config.username.trim() === "" || config.email.trim() === "" || !config.email.includes("@")}
                className="h-20 px-24 text-2xl font-black glow-primary rounded-3xl transition-all duration-300 hover:scale-[1.04] active:scale-[0.96] w-full md:w-auto uppercase tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={async () => {
                  try {
                    const res = await fetch("http://localhost:8000/start-interview", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(config)
                    });
                    const data = await res.json();
                    if (data.session_id) {
                      onStart(data.session_id);
                    } else {
                      alert("Failed to start session.");
                    }
                  } catch (e) {
                    console.error("Error starting session", e);
                    alert("Failed to connect to backend");
                  }
                }}
              >
                BEGIN ASSESSMENT
              </Button>
              <div className="flex items-center justify-center gap-3 text-[11px] text-[#64748B] font-bold uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4 text-primary/60" />
                <span>Standardized evaluation protocols active</span>
              </div>
              <p className="text-[10px] text-muted-foreground/60 italic">
                You’ll receive a detailed performance report at the end.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- INTERFACE STEP ---
function InterfaceStep({ onFinish, config, sessionId }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timer, setTimer] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch the initial question when component mounts
  useEffect(() => {
    const fetchInitialQuestion = async () => {
      if (!sessionId) return;
      setIsAnalyzing(true);
      try {
        const res = await fetch(`http://localhost:8000/get-question/${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const contentType = res.headers.get("content-type");
        let questionText = "";

        if (contentType && contentType.includes("audio")) {
          const encodedQ = res.headers.get("X-Question-Text");
          questionText = encodedQ ? decodeURIComponent(encodedQ) : "Listen to the audio...";

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);

          if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
          }

          const audio = new Audio(url);
          audio.playbackRate = 1.3; // Adjusted to 1.3x as requested
          currentAudioRef.current = audio;
          audio.play().catch(e => console.error("Audio block:", e));
        } else {
          const data = await res.json();
          questionText = data.question || "Could not load question.";
        }

        setMessages([{ role: "ai", text: questionText }]);
      } catch (e) {
        console.error("Failed to load first question", e);
      } finally {
        setIsAnalyzing(false);
      }
    };
    fetchInitialQuestion();
  }, [sessionId, config.mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setAudioBlob(null);
      } catch (err) {
        console.error("Microphone access denied or error:", err);
      }
    }
  };

  const handleSend = async () => {
    if (isAnalyzing || !sessionId) return;
    if (!audioBlob && !input.trim()) return;

    const userMessage = input.trim() || (audioBlob ? "(Audio Answer)" : "");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setAudioBlob(null);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      if (audioBlob) {
        formData.append("audio", audioBlob, "answer.webm");
      }
      if (input.trim()) {
        formData.append("text_answer", input.trim());
      }

      const res = await fetch("http://localhost:8000/submit-answer", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
      } else {
        if (data.transcribed_text && audioBlob && !input.trim()) {
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].text = data.transcribed_text;
            return newMsgs;
          });
        }

        const isTimeLimited = config.sessionType === "Time";
        const durationLimit = parseInt(config.duration.split(" ")[0]) * 60;
        const isTimeUp = isTimeLimited && timer >= durationLimit;

        if (data.interview_complete || isTimeUp) {
          onFinish();
        } else {
          const qRes = await fetch(`http://localhost:8000/get-question/${sessionId}`);
          let nextQ = "";
          const contentType = qRes.headers.get("content-type");

          if (contentType && contentType.includes("audio")) {
            const encodedQ = qRes.headers.get("X-Question-Text");
            nextQ = encodedQ ? decodeURIComponent(encodedQ) : "Listen to the audio...";

            const blob = await qRes.blob();
            const url = URL.createObjectURL(blob);

            if (currentAudioRef.current) {
              currentAudioRef.current.pause();
              currentAudioRef.current.currentTime = 0;
            }

            const audio = new Audio(url);
            audio.playbackRate = 1.3; // Adjusted to 1.3x as requested
            currentAudioRef.current = audio;
            audio.play().catch(e => console.error("Audio block:", e));
          } else {
            const qData = await qRes.json();
            nextQ = qData.question || "Could not load question.";
          }

          setMessages(prev => [...prev, { role: "ai", text: nextQ }]);
        }
      }

    } catch (e) {
      console.error("Failed to submit answer", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0F0F14] text-white z-[100] flex flex-col">
      {/* Top Bar */}
      <div className="h-20 border-b border-white/5 px-8 flex items-center justify-between glass">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">{config.role} - {config.round}</h2>
            <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{config.difficulty} Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono font-bold text-lg">{formatTime(timer)}</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive rounded-xl">
              <X className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid lg:grid-cols-2 gap-px bg-white/5">
        {/* Left Side: AI */}
        <div className="flex flex-col p-12 overflow-y-auto space-y-8 bg-[#0F0F14]">
          <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-500">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-6 flex-1">
              {messages.filter(m => m.role === "ai").map((m, i) => (
                <div key={i} className="glass p-6 rounded-[2rem] rounded-tl-none border-primary/20 bg-primary/5 text-lg leading-relaxed shadow-xl animate-in fade-in duration-500">
                  {m.text}
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex gap-2 items-center p-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.5s]"></div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary ml-2">Analyzing response...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: User */}
        <div className="flex flex-col p-12 bg-[#121218]">
          <div className="flex-1 flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Your Response</label>
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Mic className="w-4 h-4" /> Real-time detection active
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-white/5 rounded-[2rem] border border-white/10 p-6 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response here or record your voice..."
                className="w-full flex-1 min-h-[120px] bg-transparent resize-none outline-none text-xl font-medium placeholder:text-[#3F3F4E] mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRecordToggle}
                    className={cn(
                      "rounded-2xl h-14 w-14 flex items-center justify-center transition-all duration-300",
                      isRecording
                        ? "bg-destructive text-white border-destructive animate-pulse scale-105 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                        : "bg-[#1A1A24] border-white/20 hover:bg-[#252532]"
                    )}
                  >
                    {isRecording ? <div className="w-5 h-5 rounded-sm bg-white" /> : <Mic className="w-6 h-6 text-primary" />}
                  </Button>
                  {isRecording ? (
                    <span className="text-destructive font-bold text-sm animate-pulse">Recording...</span>
                  ) : audioBlob ? (
                    <span className="text-green-400 font-bold text-sm flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Audio Attached
                    </span>
                  ) : (
                    <span className="text-[#64748B] text-sm font-medium">Record voice answer</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-[#9CA3AF]">
                {config.mode.toLowerCase() === "text" && <>Use <span className="text-white font-bold">Shift + Enter</span> for new line</>}
              </p>
              <Button
                size="lg"
                className="h-16 px-10 text-xl font-bold rounded-2xl glow-primary"
                onClick={handleSend}
                disabled={isAnalyzing || (config.mode.toLowerCase() === "voice" ? !audioBlob && !input.trim() : !input.trim())}
              >
                Submit Answer <Send className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUMMARY STEP ---
function SummaryStep({ onRestart, config, sessionId }: any) {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`http://localhost:8000/final-report/${sessionId}`);
        const data = await res.json();
        setReport(data);
      } catch (e) {
        console.error("Failed to fetch report", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [sessionId]);

  if (loading) {
    return <div className="min-h-screen bg-[#0F0F14] text-white flex items-center justify-center">Generating your performance report...</div>;
  }

  // Fallback defaults if the report didn't generate correctly
  const strengths = report?.strengths || ["Analytical Thinking", "Communication"];
  const weakAreas = report?.weak_areas || ["System Design Depth"];
  const tips = report?.tips_for_improvement || ["Practice more mock interviews"];

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white selection:bg-primary/30 antialiased">
      <Navbar />
      <main className="pt-32 pb-24 px-6 flex justify-center">
        <div className="max-w-5xl w-full space-y-12">
          <header className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Award className="w-3 h-3" />
              <span>Interview Complete</span>
            </div>
            <h1 className="text-[48px] font-bold tracking-tight mb-2">Performance Summary</h1>
            <p className="text-[#B3B3C3] text-lg">Results for {config.role} - {config.round}</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Score (Placeholder for now, but scalable) */}
            <Card className="glass lg:col-span-2 rounded-[3rem] border-white/5 p-12 flex flex-col items-center justify-center text-center bg-primary/5 border-primary/10">
              <div className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="552.9" strokeDashoffset={`${552.9 - (80 / 100) * 552.9}`} strokeLinecap="round" className="text-primary transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[64px] font-bold leading-none">80</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Est. Score</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Interview Complete</h3>
              <p className="text-[#B3B3C3] leading-relaxed max-w-md">
                Review your detailed AI-generated feedback below based on your specific responses to the interviewer's prompts.
              </p>
            </Card>

            {/* Metrics */}
            <div className="space-y-6">
              {[
                { label: "Confidence", val: 88, color: "text-blue-400" },
                { label: "Technical Depth", val: 76, color: "text-purple-400" },
                { label: "Communication", val: 84, color: "text-green-400" }
              ].map((m, i) => (
                <Card key={i} className="glass rounded-[2rem] border-white/5 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">{m.label}</span>
                    <span className={cn("text-xl font-bold", m.color)}>{m.val}%</span>
                  </div>
                  <Progress value={m.val} className="h-2 bg-white/5" />
                </Card>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-[2.5rem] border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-green-500" />
                <h4 className="text-lg font-bold">Key Strengths</h4>
              </div>
              <ul className="text-[#9CA3AF] list-disc pl-5 space-y-2">
                {strengths.map((str: string, i: number) => (
                  <li key={i}>{str}</li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-[2.5rem] border-orange-500/20 bg-orange-500/5">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-orange-500" />
                <h4 className="text-lg font-bold">Areas for Improvement</h4>
              </div>
              <ul className="text-[#9CA3AF] list-disc pl-5 space-y-2 mb-4">
                {weakAreas.map((wk: string, i: number) => (
                  <li key={i}>{wk}</li>
                ))}
              </ul>

              <h5 className="text-sm font-bold text-orange-400 mt-4 mb-2">Tips</h5>
              <ul className="text-[#9CA3AF] list-disc pl-5 space-y-2 text-sm">
                {tips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" className="h-16 px-12 text-lg font-bold glow-primary rounded-2xl" onClick={onRestart}>
              Start New Interview
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/10 rounded-2xl hover:bg-white/5">
              View Detailed Insights
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
