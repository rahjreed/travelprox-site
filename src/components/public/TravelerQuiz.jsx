import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Globe,
  Camera,
  Star, 
  ShieldCheck,
  Clock,
  Plane,
  Palmtree,
  MapPin,
  Sun,
  Search,
  Calendar,
  Users,
  Building2,
  ArrowUpRight,
  Info,
  Navigation,
  Ship,
  TrendingUp,
  MoveRight,
  Key,
  Code,
  Lock,
  X,
  AlertCircle,
  Timer,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Sparkles,
  Zap,
  Layout,
  UserCheck,
  Wand2,
  Award,
  Gift,
  Ticket,
  Check,
  Volume2,
  Menu
} from 'lucide-react';
const TravelerQuiz = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  if (!isOpen) return null;
  const questions = [
    { title: "What best describes your travel business right now?", options: ["I'm just getting started", "I'm active but need more leads", "I have leads but struggle with follow-up", "I'm growing and want better systems"] },
    { title: "How often are you posting travel-related content?", options: ["Rarely or never", "A few times a month", "A few times a week", "Almost every day"] },
    { title: "What happens when someone asks about your travel offer?", options: ["I send a message and hope they reply", "I share a link but don't track interest", "I collect contact information manually", "I have a repeatable follow-up process"] },
    { title: "Which marketing task feels hardest?", options: ["Knowing what to post", "Recording confident videos", "Finding and capturing interested people", "Following up consistently"] },
    { title: "If you improved one thing this month, what would it be?", options: ["Create content more consistently", "Make better videos", "Build a lead-generating page", "Organize my follow-up system"] }
  ];
  const chosen = answers[3] ?? 0;
  const recs = [
    {title:"Your starting point: Content Clarity",desc:"A repeatable content plan can make it easier to show up and explain what you offer.",resource:"Start with the Travel Marketing Academy and ready-to-record scripts."},
    {title:"Your starting point: Confident Video",desc:"You want to communicate more naturally on camera without memorizing everything.",resource:"Try the free Mr. Prompterson teleprompter and video lessons."},
    {title:"Your starting point: Lead Capture",desc:"A useful quiz or landing page can give interested people a clear next step.",resource:"Explore the upcoming funnel builder and funnel training."},
    {title:"Your starting point: Follow-Up",desc:"A simple, permission-based follow-up process helps you keep conversations organized.",resource:"Start with lead-generation and follow-up lessons in the hub."}
  ];
  const rec = recs[chosen];
  const reset = () => {setStep(0);setAnswers({});};
  return <div className="fixed inset-0 z-[200] flex justify-center items-start overflow-y-auto bg-slate-950/90 backdrop-blur-xl p-3 sm:p-8 py-8 sm:py-16">
    <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden relative my-auto">
      <div className="flex justify-between items-center px-6 sm:px-10 py-6 border-b border-slate-200">
        <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">TravelProX Marketing Checkup</p><p className="font-black text-slate-950 uppercase text-sm">Find your next marketing move</p></div>
        <button aria-label="Close marketing checkup" onClick={onClose}><X className="w-6 h-6 text-slate-500"/></button>
      </div>
      <div className="p-6 sm:p-10">
        {step < questions.length ? <>
          <p className="text-amber-600 text-xs font-black uppercase tracking-widest mb-3">Question {step+1} of {questions.length}</p>
          <div className="w-full h-2 rounded-full bg-slate-100 mb-8"><div className="h-2 rounded-full bg-amber-400 transition-all" style={{width:`${((step+1)/questions.length)*100}%`}}/></div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 mb-8">{questions[step].title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">{questions[step].options.map((opt,i)=><button key={opt} onClick={()=>{setAnswers(prev=>({...prev,[step]:i}));setStep(prev=>prev+1)}} className="text-left border-2 border-slate-100 hover:border-amber-400 bg-slate-50 rounded-2xl p-5 font-bold text-slate-800 transition-colors">{String.fromCharCode(65+i)}. {opt}</button>)}</div>
          {step>0&&<button className="mt-6 text-slate-500 font-bold text-sm" onClick={()=>setStep(prev=>prev-1)}>← Previous question</button>}
        </>:<>
          <span className="inline-flex rounded-full bg-amber-100 text-amber-800 font-black text-xs uppercase tracking-widest px-4 py-2 mb-5">Your suggested next step</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 mb-4">{rec.title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-5">{rec.desc}</p>
          <div className="rounded-2xl bg-slate-950 text-white p-6 mb-7"><p className="text-amber-400 font-black uppercase text-xs tracking-widest mb-2">Recommended resource</p><p className="font-bold">{rec.resource}</p></div>
          <p className="text-slate-500 text-sm mb-6">This is a practical recommendation based on your answers, not a scored assessment or a promise of business results. No email is required to see it.</p>
          <div className="flex flex-wrap gap-3"><a className="inline-flex rounded-xl bg-amber-400 px-6 py-4 font-black uppercase text-xs tracking-widest text-slate-950" href="/marketing-hub/">Explore Free Marketing Hub →</a><button className="rounded-xl border border-slate-300 px-6 py-4 font-black uppercase text-xs tracking-widest text-slate-700" onClick={reset}>Retake checkup</button></div>
        </>}
      </div>
    </div>
  </div>;
};

export default TravelerQuiz;