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

/**
 * ASSETS & CONFIG
 */
const OFFICIAL_HERO_IMAGE = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"; // Premium high-res fallback backup for luxury feel
const ALTERNATIVE_HERO_IMAGE = "https://images.travelprox.com/splash/villa.png";

const TESTIMONIAL_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/02956ab7-33a5-4f3b-8754-ef763a308f28";
const PERKS_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/43d40616-b9b4-4efa-b54f-22d08d420e09";
const DIAGNOSTIC_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/03a48a31-4610-4d41-b4fc-72f8f4a84af2";

const ROGER_PROFILE_IMAGE = "https://images.travelprox.com/callista/rahj.png";
const TRAVORIUM_ENROLL_URL = "https://travorium.com/enroll.php?sponsor=376362";

const DESTINATION_ASSETS = {
  "Florida": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", // Miami high res
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80", // Times Square high res
  "Las Vegas": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", // Vegas high res
  "Cancun": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"  // Cancun high res
};

const SAVINGS_FEED = [
  { user: "Sarah J.", location: "Miami", saved: "$420", time: "1m ago" },
  { user: "Michael R.", location: "Cancun", saved: "$890", time: "3m ago" },
  { user: "Elena W.", location: "NYC", saved: "$310", time: "1m ago" },
  { user: "David K.", location: "Vegas", saved: "$1,200", time: "8m ago" },
  { user: "Sophia L.", location: "Paris", saved: "$540", time: "12m ago" },
  { user: "Marcus T.", location: "Dubai", saved: "$2,100", time: "15m ago" },
  { user: "Julian M.", location: "Bali", saved: "$760", time: "18m ago" },
  { user: "Aria V.", location: "London", saved: "$480", time: "21m ago" },
  { user: "Chloe B.", location: "Rome", saved: "$390", time: "24m ago" },
  { user: "Nathan S.", location: "Santorini", saved: "$1,150", time: "26m ago" },
  { user: "Isabella G.", location: "Mykonos", saved: "$920", time: "29m ago" },
  { user: "Liam P.", location: "Aspen", saved: "$630", time: "31m ago" },
  { user: "Olivia H.", location: "Tulum", saved: "$410", time: "33m ago" },
  { user: "Ethan W.", location: "Barcelona", saved: "$580", time: "35m ago" },
  { user: "Mia C.", location: "Maldives", saved: "$2,450", time: "38m ago" },
  { user: "Noah F.", location: "Amalfi", saved: "$1,340", time: "40m ago" },
  { user: "Ava R.", location: "Ibiza", saved: "$720", time: "42m ago" },
  { user: "Lucas D.", location: "Cabo", saved: "$850", time: "45m ago" },
  { user: "Emma S.", location: "Zurich", saved: "$610", time: "47m ago" },
  { user: "James K.", location: "Tokyo", saved: "$1,080", time: "50m ago" },
];

/**
 * UNIQUE CORE ANIMATIONS & GLOBAL GLASSY DESIGN UTILITIES
 */
const customStyles = `
  @keyframes gloss-sweep {
    0% { transform: translateX(-150%) skewX(-25deg); }
    30% { transform: translateX(150%) skewX(-25deg); }
    100% { transform: translateX(150%) skewX(-25deg); }
  }
  .animate-gloss {
    animation: gloss-sweep 4s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .animate-scan {
    animation: scanline 3s linear infinite;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .glass-card-dark {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .gold-glow {
    box-shadow: 0 0 50px -5px rgba(245, 158, 11, 0.25);
  }
  .gold-glow-hover:hover {
    box-shadow: 0 0 60px -5px rgba(245, 158, 11, 0.45);
  }
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0f172a;
  }
  ::-webkit-scrollbar-thumb {
    background: #f59e0b;
    border-radius: 4px;
  }
`;

/**
 * REUSABLE ANIMATED SCROLL REVEAL COMPONENT
 */
const ScrollReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true); 
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * PREMIUM HIGH-CONVERSION GLOSS BUTTON
 */
const ActionButton = ({ onClick, children, className = "", variant = "primary", noGloss = false, type = "button", disabled = false }) => {
  const styles = {
    primary: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black tracking-widest shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] border border-yellow-300/30", 
    secondary: "bg-slate-950 hover:bg-black text-white border border-slate-800",
    waitlist: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-950/20",
    orange: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50/50"
  };

  const showGloss = !noGloss && (variant === 'primary' || variant === 'waitlist' || variant === 'orange');

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-55 disabled:pointer-events-none flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}
    >
      {showGloss && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-[40%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-gloss" />
        </div>
      )}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </button>
  );
};

/**
 * TRAVELER PERSONA QUIZ & DIAGNOSTIC MODAL
 */
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
    {title:"Your starting point: Lead Capture",desc:"A useful quiz or landing page can give interested people a clear next step.",resource:"Explore the No Time to Share example and funnel training."},
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

/**
 * PREMIUM PRIVATE WAITLIST MODAL (NO ALERT BLOCKS)
 */
const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('email_address', email);
      
      await fetch("https://app.kit.com/forms/9018875/subscriptions", {
        method: "POST",
        body: formData,
        mode: 'no-cors'
      });
      setTimeout(() => setStatus('success'), 1200);
    } catch (err) {
      setTimeout(() => setStatus('success'), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/70 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-8 md:p-12 relative shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors z-20">
          <X className="w-6 h-6 text-slate-400" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 border border-green-100 shadow-inner">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-3 leading-none">
              SLOT REQUESTED.
            </h3>
            <p className="text-slate-500 font-bold mb-8 text-sm leading-relaxed max-w-sm mx-auto">
              We have archived your digital timestamp. A concierge representative will transmit details shortly if an slot clears.
            </p>
            <ActionButton variant="secondary" className="w-full py-4 text-xs" onClick={onClose}>
              Dismiss Portal
            </ActionButton>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-8 shadow-inner animate-float">
              <Lock className="w-10 h-10" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">
              UNLISTED RATES <br/> ARE PROTECTED.
            </h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed text-xs sm:text-sm">
              To guarantee system integrity, private group booking options require verified member approval. Join the queue to receive real-time availability updates.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="text-left">
                 <input 
                   name="email_address" 
                   required 
                   type="email" 
                   placeholder="your@email.com" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   disabled={status === 'loading'}
                   className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 outline-none focus:border-amber-400 text-slate-900 font-bold transition-all disabled:opacity-50" 
                 />
               </div>
               <ActionButton type="submit" disabled={status === 'loading'} variant="waitlist" className="w-full py-5 text-sm tracking-wider font-black">
                 {status === 'loading' ? 'Encrypting Connection...' : 'Request Exclusive Access Invite'}
               </ActionButton>
               <div className="flex items-center justify-center space-x-2 mt-6">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secured by Travel Pro X Vault</span>
               </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * HIGH-FREQUENCY SOCIAL PROOF TICKER
 */
const SavingsTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SAVINGS_FEED.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-3">
      {/* Dynamic Pill Container */}
      <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center space-x-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-[9px] font-black text-slate-950 border border-slate-900 shadow">TPX</div>
        </div>
        <p className="text-white text-[11px] font-bold tracking-wide">
          <span className="text-amber-400 font-black">{SAVINGS_FEED[index].user}</span> saved <span className="text-emerald-400 font-black">{SAVINGS_FEED[index].saved}</span> in <span className="text-white/90 font-black">{SAVINGS_FEED[index].location}</span>
        </p>
        <div className="w-[1px] h-3 bg-white/20" />
        <span className="text-white/40 text-[9px] uppercase font-black tracking-widest shrink-0">{SAVINGS_FEED[index].time}</span>
      </div>

      {/* Pulsing Hotspot Banner */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-full px-5 py-2.5 flex items-center space-x-2">
        <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Trending: Maldives</span>
      </div>
    </div>
  );
};

/**
 * FLUID RESPONSIVE GLASS SYSTEM HEADER
 */
const Header = ({ setView }) => {
  const [isOpen,setIsOpen] = useState(false);
  return <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-5 pointer-events-none"><div className="max-w-7xl mx-auto flex items-center justify-between bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[24px] px-5 sm:px-8 py-4 shadow-2xl pointer-events-auto">
    <button onClick={()=>setView('home')} className="flex items-center gap-3 font-black text-xl uppercase tracking-tighter text-slate-950"><Plane className="w-6 h-6 text-amber-500"/> TRAVELPRO<span className="text-amber-500 italic">X</span></button>
    <div className="hidden sm:flex items-center gap-6"><button onClick={()=>setView('home')} className="text-xs font-black uppercase tracking-widest text-slate-700">Home</button><a href="/marketing-hub/" className="text-xs font-black uppercase tracking-widest text-slate-700">Marketing Hub</a><a href="/marketing-hub/#member" className="rounded-xl bg-amber-400 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-950">Free Member Access</a></div>
    <button className="sm:hidden text-slate-950" aria-label="Toggle menu" onClick={()=>setIsOpen(!isOpen)}><Menu/></button>
    {isOpen&&<div className="absolute top-[78px] left-4 right-4 rounded-2xl bg-white p-5 shadow-xl flex flex-col gap-4"><button className="text-left font-bold" onClick={()=>{setView('home');setIsOpen(false)}}>Home</button><a href="/marketing-hub/" className="font-bold">Marketing Hub</a><a href="/marketing-hub/#member" className="font-bold">Free Member Access</a></div>}
  </div></nav>;
};

/**
 * HOME VIEW COMPONENT
 */
const HomeView = ({ openWaitlist, setView }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        
        {/* Animated Visual Canvas Backdrop */}
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src={ALTERNATIVE_HERO_IMAGE} 
            className="w-full h-full object-cover" 
            alt="Luxury Villa Panorama" 
            onError={(e) => {
              e.target.src = OFFICIAL_HERO_IMAGE; // High Quality Fallback if official is down
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-white" />
        </div>

        <div className="relative z-10 w-full max-w-6xl text-center">
          <ScrollReveal>
            <div className="mb-10 flex flex-col items-center space-y-8">

              
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[13rem] font-black text-white tracking-tighter leading-[0.8] uppercase drop-shadow-[0_10px_50px_rgba(0,0,0,0.65)]">
                TRAVEL MARKETING <br/> 
                <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)]">
                  HUB.
                </span>
              </h1>
              
              <p className="text-white text-base sm:text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-95">
                Free creator tools, practical marketing training, and lead-generation resources for travel agents, creators, and independent travel marketers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-md sm:max-w-none mx-auto">
              <ActionButton variant="primary" className="w-full sm:w-auto px-12 py-6 text-base tracking-widest" onClick={() => window.location.assign("/marketing-hub/")}>
                Explore Free Marketing Hub
              </ActionButton>
              <button 
                onClick={() => {
                  const el = document.getElementById('insights');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="group text-white font-black text-xs uppercase tracking-[0.4em] flex items-center hover:text-amber-400 transition-colors py-4 px-6 rounded-full hover:bg-white/5"
              >
                Discover Free Tools <MoveRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto rounded-[32px] bg-white/95 backdrop-blur-xl p-7 sm:p-10 shadow-2xl border border-white text-left">
            <span className="text-amber-600 text-xs font-black uppercase tracking-widest">Not sure what marketing tool you need?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mt-2 mb-3">Take the free 5-question marketing checkup</h2>
            <p className="text-slate-600 font-medium mb-6">Identify your biggest marketing challenge and get a suggested starting point. No email required.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setIsQuizOpen(true)} className="rounded-xl bg-amber-400 px-6 py-4 text-slate-950 font-black uppercase text-xs tracking-widest">Start Marketing Checkup</button>
              <a href="/marketing-hub/#member" className="rounded-xl border border-slate-300 px-6 py-4 text-slate-950 font-black uppercase text-xs tracking-widest">Member Sign In / Demo Access</a>
            </div>
          </div>
        </div>
      </section>

      {/* RETAIL AUDIT COMPLEMENT (MODAL CONTAINER TRIGGER) */}
      <TravelerQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} setView={setView} />

      <section id="insights" className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-amber-600 font-black uppercase tracking-widest text-xs mb-3">Tools built for travel entrepreneurs</p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-slate-950 mb-5">Create. Connect. Grow.</h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto mb-10">Learn practical marketing skills, record stronger videos, and explore lead-generation funnels without needing to join a travel company.</p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[{title:'Creator Tools',desc:'Use free tools to record and share better travel content.'},{title:'Marketing Academy',desc:'Learn practical content, lead-generation, and follow-up basics.'},{title:'Funnel Examples',desc:'See how a travel quiz can introduce an offer and invite interested people to connect.'}].map(item=><div key={item.title} className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm"><h3 className="text-xl font-black uppercase text-slate-950 mb-3">{item.title}</h3><p className="text-slate-600">{item.desc}</p></div>)}
          </div>
          <a href="/marketing-hub/" className="inline-flex mt-9 rounded-xl bg-slate-950 text-amber-400 font-black uppercase text-xs tracking-widest px-8 py-5">Explore the Marketing Hub →</a>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-12 px-5 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-5 text-xs uppercase font-black tracking-widest text-slate-700"><a href="/marketing-hub/">Marketing Hub</a><a href="/marketing-hub/#member">Member Access</a></div>
        <p className="text-xs text-slate-500">© 2026 TravelProX & Callista Digital</p>
      </footer>
    </div>
  );
};

/**
 * AGENCY VIEW COMPONENT
 */
const AgencyView = ({ setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaved(true);

    try {
      const formData = new FormData();
      formData.append('fields[first_name]', name);
      formData.append('email_address', email);
      
      await fetch("https://app.kit.com/forms/9018899/subscriptions", {
        method: "POST",
        body: formData,
        mode: 'no-cors'
      });
    } catch (err) {
      // safe fallback
    }

    setTimeout(() => {
      setView('presentation');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
      <main className="pt-40 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-24">
            
            {/* Core Info Columns */}
            <div className="relative lg:col-span-7">
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.5em] uppercase bg-amber-100 text-amber-700 rounded-full border border-amber-200">
                <Zap className="w-3.5 h-3.5" />
                <span>Platinum Club Promoter</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-slate-950">
                GENERATE A <br/> TRAVEL <br/> <span className="text-amber-500 italic">EMPIRE.</span>
              </h1>
              
              <p className="text-lg sm:text-2xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
                Partner directly with our team as a <span className="text-slate-950 font-black">Platinum Travel Club Promoter</span>. Power your business via <span className="text-amber-600 font-black">Travorium</span>.
              </p>
              
              <div className="space-y-6 mb-12">
                 <div className="flex items-start space-x-5 bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/50 shadow-sm transition-all hover:scale-[1.01]">
                    <div className="bg-amber-50 p-4 rounded-2xl text-amber-500 shrink-0 border border-amber-100">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-slate-950 mb-1.5">Industry Rates up to 80% Off</h4>
                      <p className="text-slate-500 text-sm font-semibold leading-relaxed">Platinum members bypass consumer brokers entirely, unlocking net wholesale rates on private inventories.</p>
                    </div>
                 </div>
                 
                 {/* WEB SYSTEM BONUS ACCENT CARD */}
                 <div className="relative pt-10">
                   <div className="absolute top-0 right-4 sm:right-6 z-20">
                      <div className="relative animate-float">
                        <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 sm:border-[6px] border-white shadow-2xl overflow-hidden gold-glow">
                          <img src={ROGER_PROFILE_IMAGE} className="w-full h-full object-cover" alt="Roger Profile" />
                        </div>
                        <div className="absolute -bottom-1 right-1 bg-amber-400 p-2 rounded-xl shadow-lg border-2 border-white">
                          <Wand2 className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>
                   </div>

                   <div className="bg-slate-950 p-8 sm:p-12 rounded-[40px] sm:rounded-[48px] shadow-3xl border-2 border-amber-500/10 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                      
                      <div className="relative z-10 pr-20 sm:pr-24 lg:pr-0">
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 mb-5 text-[9px] font-black tracking-[0.3em] uppercase bg-amber-400 text-slate-950 rounded-full border border-yellow-300">
                          <Award className="w-3.5 h-3.5" />
                          <span>Direct Sponsor Action Pack</span>
                        </div>
                        
                        <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none italic">
                          Bespoke Pages <br/> <span className="text-amber-400">Custom Styled.</span>
                        </h3>
                        
                        <p className="text-slate-300 font-bold text-sm sm:text-base mb-6 leading-relaxed max-w-sm">
                          As your designated pilot, <span className="text-white font-black">Roger Reed</span> will handcraft and deliver your high-converting online capture ecosystem.
                        </p>

                        <div className="grid grid-cols-1 gap-3 mb-8">
                          {[
                            "16-Year Veteran Web Architect Team",
                            "High-Conversion Custom Funnels Built For You",
                            "Direct Technical Configuration & Support"
                          ].map((feat, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px]">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border-l-4 border-amber-400">
                          <p className="text-slate-400 text-[9px] uppercase font-black tracking-widest">Estimated Value Matrix</p>
                          <p className="text-lg sm:text-2xl font-black text-white tracking-tight">
                            $1,000+ <span className="text-amber-400 line-through text-xs sm:text-sm opacity-50 ml-1">RETAIL VALUE</span> 
                            <span className="text-[9px] bg-white text-slate-950 px-2.5 py-1 rounded-full ml-3 italic shrink-0 font-bold">SPONSORED NO FEE</span>
                          </p>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>

              <button onClick={() => setView('home')} className="inline-flex items-center space-x-2 text-slate-400 font-black uppercase tracking-[0.3em] text-[9px] hover:text-slate-950 transition-colors mt-4">
                <MoveRight className="w-4 h-4 rotate-180" />
                <span>Return to Public Audit Vault</span>
              </button>
            </div>

            {/* Sticky Application Form Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-36 mt-12 lg:mt-0">
              <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[40px] border border-slate-200/85 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-xl">
                    <Users className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black mb-8 uppercase tracking-tighter text-center italic text-slate-950 leading-none">
                    PROMOTER INTAKE
                  </h3>
                  
                  {isSaved ? (
                    <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4 border border-green-100 shadow-inner animate-bounce">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter mb-2">Request Processed!</h4>
                      <p className="text-slate-400 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                        Routing session directly to the Premium Perks presentation module...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Legal Name</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="John Doe" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-14 bg-slate-50 rounded-2xl px-5 outline-none focus:ring-4 ring-amber-400/10 text-slate-900 font-bold border-2 border-slate-100 focus:border-amber-400 focus:bg-white transition-all text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">Confidential Email</label>
                        <input 
                          required 
                          type="email" 
                          placeholder="partner@yourbrand.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-14 bg-slate-50 rounded-2xl px-5 outline-none focus:ring-4 ring-amber-400/10 text-slate-900 font-bold border-2 border-slate-100 focus:border-amber-400 focus:bg-white transition-all text-sm" 
                        />
                      </div>
                      <ActionButton type="submit" variant="secondary" className="w-full py-5 text-sm tracking-wider font-black">
                        Submit Secure Application
                      </ActionButton>
                      
                      <div className="text-center space-y-4 pt-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                          Platinum Travorium Protocol Verification • travelprox.com
                        </p>
                        <div className="flex items-center justify-center space-x-1.5 text-emerald-600">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Confidential Sponsor Queue</span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </main>

      <footer className="py-16 border-t border-slate-200 text-center px-4 bg-white">
        <button onClick={() => setView('home')} className="mb-6 text-slate-400 hover:text-slate-950 transition-colors uppercase font-black text-[9px] tracking-[0.4em]">Return to Core Comparison Nodes</button>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014
        </p>
      </footer>
    </div>
  );
};

/**
 * PRESENTATION VAULT VIEW COMPONENT
 */
const PresentationView = ({ setView }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      <main className="pt-32 pb-24">
        <ScrollReveal className="text-center">
          
          {/* TOP FLASH ACCENT */}
          <div className="max-w-2xl mx-auto px-4 mb-8">
            <div className="bg-amber-400/10 border border-amber-400/20 py-2 px-5 rounded-full inline-flex items-center space-x-2.5 shadow-lg">
              <Gift className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300">
                Platinum Exclusive: Lock in Membership this {currentMonth} for an Vegas Escape Voucher
              </span>
            </div>
          </div>

          <div className="px-4 mb-12 max-w-4xl mx-auto space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">
              INSIDE THE <span className="text-amber-400 drop-shadow-[0_4px_15px_rgba(245,158,11,0.2)]">VAULT.</span>
            </h1>
            <p className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">
              Confidential wholesale rates, premium rewards keys, and luxury portals revealed below.
            </p>
          </div>

          {/* HIGH-RES IMMERSIVE EMBEDDED SYSTEM VIDEO */}
          <div className="w-full relative group px-4 sm:px-6 mb-16">
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="max-w-5xl mx-auto w-full">
                <div className="relative aspect-video w-full rounded-2xl sm:rounded-[40px] overflow-hidden border-[6px] sm:border-[12px] border-white/5 shadow-3xl bg-black">
                  <iframe 
                    src={PERKS_VIDEO_URL} 
                    className="w-full h-full"
                    loading="lazy" 
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                    allowFullScreen
                  />
                </div>
            </div>
          </div>

          {/* DYNAMIC SPONSOR REDIRECT PANEL */}
          <div className="px-4 max-w-3xl mx-auto">
            <a 
              href={TRAVORIUM_ENROLL_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center bg-white text-slate-950 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] hover:scale-[1.01] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] w-full border border-white/80"
            >
              <div className="absolute inset-0 rounded-[32px] sm:rounded-[48px] bg-gradient-to-tr from-amber-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 relative z-10">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">Travorium Platinum Enrollment</span>
                  <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 block">Join Team & Initialize Account</span>
                </div>
                <div className="bg-slate-950 p-3 sm:p-4 rounded-full text-amber-400 group-hover:rotate-45 transition-transform shrink-0 shadow-lg shadow-amber-500/10">
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </a>
            
            <div className="mt-10 flex justify-center items-center space-x-8 opacity-50">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Wholesale Contracts Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Direct Placement Priority</span>
                </div>
            </div>

            <button onClick={() => setView('home')} className="mt-16 text-white/30 hover:text-white font-black uppercase tracking-[0.4em] text-[9px] transition-colors">
              Return to Public Portal
            </button>
          </div>

        </ScrollReveal>
      </main>

      <footer className="py-16 border-t border-white/5 text-center px-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest text-center">
            © 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014
          </p>
      </footer>
    </div>
  );
};

/**
 * MASTER ENTRY SYSTEM
 */
const App = () => {
  const [view, setView] = useState('home'); 
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Dynamic Scarcity Module
  const { spotsLeft } = useMemo(() => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const remaining = Math.max(100 - (dayOfMonth - 1) * 3, 7); 
    return { spotsLeft: remaining };
  }, []);

  // Script Loader for Kit Form System Integration
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.5.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); }
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [view]);

  return (
    <div className="font-sans selection:bg-amber-400 selection:text-slate-950 text-slate-950 bg-slate-50 antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Header Nodes */}
      <Header setView={setView} activeView={view} />
      
      {/* Routing Nodes */}
      {view === 'home' && (
        <HomeView 
          setView={setView}
          openWaitlist={() => setIsWaitlistOpen(true)}
        />
      )}

      {view === 'agency' && (
        <AgencyView setView={setView} />
      )}

      {view === 'presentation' && (
        <PresentationView setView={setView} />
      )}

      {/* Shared Modals */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Sticky High-Urgency Floating Hotspot */}
      <div 
        onClick={() => setIsWaitlistOpen(true)}
        className="fixed bottom-6 right-6 z-[120] bg-white border border-slate-200/60 p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 transition-all group"
      >
        <div className="bg-slate-950 px-5 py-3 rounded-full flex items-center space-x-2.5 shadow-lg">
           <Timer className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
           <span className="text-[11px] font-black text-white uppercase tracking-widest">{spotsLeft} Vacancies Left</span>
        </div>
        <div className="px-3.5 py-3 hidden md:flex items-center space-x-1.5">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Seat</span>
           <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default App;
