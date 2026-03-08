
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Mic,
  MicOff,
  Send,
  Brain,
  Volume2,
  VolumeX,
  Video,
  X,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: "ai" | "user";
  content: string;
  feedback?: string;
  confidence?: string;
}

export function InterviewSession({ mode, personality = "Friendly Mentor", sessionId }: { mode: string; personality?: string, sessionId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [progress, setProgress] = useState(10);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Question
    const startInterview = async () => {
      if (!sessionId) return;
      setIsTyping(true);
      try {
        const res = await fetch(`/api/get-question/${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch");

        let questionText = "";

        // Let's assume text mode for now in this component or check headers
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          questionText = data.question;
        } else {
          questionText = res.headers.get("X-Question-Text") || "Please answer the audio question.";
        }

        setMessages([{ role: "ai", content: questionText }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTyping(false);
      }
    };
    startInterview();
  }, [sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || !sessionId) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("text_answer", userMessage);

      const res = await fetch("/api/submit-answer", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!data.error) {
        if (data.interview_complete) {
          setMessages(prev => [
            ...prev,
            {
              role: "ai",
              content: "Thank you for your time. The interview session is now complete.",
              feedback: data.sentimentFeedback,
              confidence: data.confidenceFeedback
            }
          ]);
        } else {
          // Fetch next question
          const qRes = await fetch(`/api/get-question/${sessionId}`);
          let nextQ = "";
          const contentType = qRes.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const qData = await qRes.json();
            nextQ = qData.question;
          } else {
            nextQ = qRes.headers.get("X-Question-Text") || "Please proceed with the audio question.";
          }

          setMessages(prev => [
            ...prev,
            {
              role: "ai",
              content: nextQ,
              feedback: data.sentimentFeedback,
              confidence: data.confidenceFeedback
            }
          ]);
        }
        setProgress(p => Math.min(p + 15, 100));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] relative">
      {/* Session Controls */}
      <div className="flex items-center justify-between mb-6 glass px-6 py-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
          </div>
          <div>
            <p className="text-sm font-bold">AI Interviewer: {personality}</p>
            <p className="text-xs text-muted-foreground">Real-time adaptive session</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsAudioOn(!isAudioOn)} className="rounded-xl">
            {isAudioOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="destructive" size="sm" className="rounded-xl ml-2">End Session</Button>
        </div>
      </div>

      <Progress value={progress} className="h-1 mb-6 bg-white/5" />

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-4 mb-6 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex flex-col max-w-[85%]",
            msg.role === "ai" ? "mr-auto" : "ml-auto items-end"
          )}>
            <div className={cn(
              "px-6 py-4 rounded-3xl text-sm leading-relaxed",
              msg.role === "ai"
                ? "glass border-white/5 rounded-tl-none"
                : "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20"
            )}>
              {msg.content}
            </div>

            {msg.role === "ai" && (msg.feedback || msg.confidence) && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {msg.feedback && (
                  <div className="glass-darker px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> {msg.feedback}
                  </div>
                )}
                {msg.confidence && (
                  <div className="glass-darker px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3" /> {msg.confidence}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="mr-auto glass border-white/5 px-6 py-4 rounded-3xl rounded-tl-none flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-300"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="glass p-4 rounded-3xl border border-white/10 flex items-end gap-3">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-2xl h-12 w-12 shrink-0 transition-all",
            isRecording ? "bg-destructive text-white animate-pulse" : "bg-white/5 hover:bg-white/10"
          )}
          onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        <Textarea
          placeholder={isRecording ? "Listening..." : "Type your detailed response..."}
          className="min-h-[3rem] max-h-32 bg-transparent border-none focus-visible:ring-0 resize-none py-3 px-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          className="rounded-2xl h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 glow-primary"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
