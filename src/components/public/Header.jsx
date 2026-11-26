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
const Header = ({ setView }) => {
  const [isOpen,setIsOpen] = useState(false);
  return <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-5 pointer-events-none"><div className="max-w-7xl mx-auto flex items-center justify-between bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[24px] px-5 sm:px-8 py-4 shadow-2xl pointer-events-auto">
    <button onClick={()=>setView('home')} className="flex items-center gap-3 font-black text-xl uppercase tracking-tighter text-slate-950"><Plane className="w-6 h-6 text-amber-500"/> TRAVELPRO<span className="text-amber-500 italic">X</span></button>
    <div className="hidden sm:flex items-center gap-6"><button onClick={()=>setView('home')} className="text-xs font-black uppercase tracking-widest text-slate-700">Home</button><a href="/marketing-hub/" className="text-xs font-black uppercase tracking-widest text-slate-700">Marketing Hub</a><a href="/marketing-hub/#member" className="rounded-xl bg-amber-400 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-950">Free Member Access</a></div>
    <button className="sm:hidden text-slate-950" aria-label="Toggle menu" onClick={()=>setIsOpen(!isOpen)}><Menu/></button>
    {isOpen&&<div className="absolute top-[78px] left-4 right-4 rounded-2xl bg-white p-5 shadow-xl flex flex-col gap-4"><button className="text-left font-bold" onClick={()=>{setView('home');setIsOpen(false)}}>Home</button><a href="/marketing-hub/" className="font-bold">Marketing Hub</a><a href="/marketing-hub/#member" className="font-bold">Free Member Access</a></div>}
  </div></nav>;
};

export default Header;