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

const DESTINATION_ASSETS = {
  "Florida": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", // Miami high res
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80", // Times Square high res
  "Las Vegas": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", // Vegas high res
  "Cancun": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"  // Cancun high res
};

const SAVINGS_FEED = [];

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
            <div className="mb-10 flex flex-col items-center space-y-8"><a href="https://www.callistadigital.com/" className="text-white text-xs font-black uppercase tracking-widest drop-shadow-lg">A Callista Digital Company</a>

              
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[13rem] font-black text-white tracking-tighter leading-[0.8] uppercase drop-shadow-[0_10px_50px_rgba(0,0,0,0.65)]">
                TRAVEL MARKETING <br/> 
                <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)]">
                  HUB.
                </span>
              </h1>
              
              <p className="text-white text-base sm:text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-95">
                Congratulations! You’ve just discovered what we’re building to be the last travel marketing platform you’ll ever need.
              </p>
              <p className="text-white font-bold text-sm sm:text-lg drop-shadow-lg">Capture attention. Spark curiosity. Generate leads. Build your brand.</p>
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
              <a href="/marketing-hub/#member" className="rounded-xl border border-slate-300 px-6 py-4 text-slate-950 font-black uppercase text-xs tracking-widest">Marketing Hub Sign In</a>
            </div>
          </div>
        </div>
      </section>

      {/* RETAIL AUDIT COMPLEMENT (MODAL CONTAINER TRIGGER) */}
      <TravelerQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} setView={setView} />

      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-amber-600 font-black uppercase tracking-widest text-xs mb-3">The next generation of travel marketing</p>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-slate-950 mb-5">The world has changed. Has your marketing?</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">In a world of TikTok, Instagram Reels, Facebook and YouTube Shorts, the window to capture attention is incredibly short. Long presentations and generic sales pitches can lose people before they discover the value of your offer.</p>
            <p className="text-slate-600 font-medium leading-relaxed">Short-form video sparks curiosity. Interactive quiz funnels invite participation, build momentum through small commitments and make information personally relevant. Together, they give prospects a reason to explore your brand at their own pace.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[['01','Capture attention','Create short-form social content that earns the next few seconds.'],['02','Spark curiosity','Give viewers a compelling reason to visit your website.'],['03','Invite participation','Use easy quiz questions to turn passive viewers into active participants.'],['04','Personalize','Show relevant information based on their answers.'],['05','Connect','Invite interested prospects to share their details and continue the conversation.']].map(([n,title,desc])=><div key={n} className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm"><span className="text-amber-600 font-black text-xs tracking-widest">STEP {n}</span><h3 className="text-xl font-black uppercase text-slate-950 my-3">{title}</h3><p className="text-slate-600">{desc}</p></div>)}
          </div>
          <div className="text-center mt-12"><h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-slate-950">Stop chasing. <span className="text-amber-600">Start attracting.</span></h3><p className="text-slate-600 font-medium mt-4 max-w-2xl mx-auto">Start today with our free creator tools and marketing training. Our personalized quiz funnel builder and private lead dashboard are coming soon.</p></div>
        </div>
      </section>

      <section id="insights" className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-amber-600 font-black uppercase tracking-widest text-xs mb-3">Tools built for travel entrepreneurs</p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-slate-950 mb-5">Create. Connect. Grow.</h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto mb-10">Learn practical marketing skills, record stronger videos, and explore lead-generation funnels without needing to join a travel company.</p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[{title:'Creator Tools',desc:'Use Mr. Prompterson, our free video teleprompter, to record and share better travel content.'},{title:'Marketing Academy',desc:'Learn practical content, lead-generation, and follow-up basics.'},{title:'Funnel Builder — Coming Soon',desc:'Create your own branded travel website, personalized quiz and lead dashboard.'}].map(item=><div key={item.title} className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm"><h3 className="text-xl font-black uppercase text-slate-950 mb-3">{item.title}</h3><p className="text-slate-600">{item.desc}</p></div>)}
          </div>
          <a href="/marketing-hub/" className="inline-flex mt-9 rounded-xl bg-slate-950 text-amber-400 font-black uppercase text-xs tracking-widest px-8 py-5">Explore the Marketing Hub →</a>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-12 px-5 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-5 text-xs uppercase font-black tracking-widest text-slate-700"><a href="/marketing-hub/">Marketing Hub</a><a href="/marketing-hub/#member">Member Access</a></div>
        <p className="text-xs text-slate-500">© 2026 Travel Pro X · <a href="https://www.callistadigital.com/">A Callista Digital Company</a></p>
      </footer>
    </div>
  );
};

const App = () => { const [view,setView] = useState('home'); return <div className="font-sans selection:bg-amber-400 selection:text-slate-950 text-slate-950 bg-slate-50 antialiased min-h-screen"><style dangerouslySetInnerHTML={{__html:customStyles}}/><Header setView={setView}/><HomeView setView={setView}/></div>; }; export default App;
