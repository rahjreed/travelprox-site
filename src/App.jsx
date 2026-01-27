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
  ChevronRight
} from 'lucide-react';

/**
 * ASSETS & CONFIG
 */
const OFFICIAL_HERO_IMAGE = "https://images.travelprox.com/splash/villa.png";
const TESTIMONIAL_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/02956ab7-33a5-4f3b-8754-ef763a308f28";

const DESTINATION_ASSETS = {
  "Florida": "https://images.travelprox.com/splash/miami.png",
  "New York": "https://images.travelprox.com/splash/newyork.png",
  "Las Vegas": "https://images.travelprox.com/splash/vegas.png",
  "Cancun": "https://images.travelprox.com/splash/cancun.png"
};

const SAVINGS_FEED = [
  { user: "Sarah J.", location: "Miami", saved: "$420", time: "2m ago" },
  { user: "Michael R.", location: "Cancun", saved: "$890", time: "5m ago" },
  { user: "Elena W.", location: "NYC", saved: "$310", time: "12m ago" },
  { user: "David K.", location: "Vegas", saved: "$1,200", time: "18m ago" },
];

/**
 * STYLES & ANIMATIONS
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

/**
 * REUSABLE COMPONENTS
 */

const ScrollReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    >
      {children}
    </div>
  );
};

const ActionButton = ({ onClick, children, className = "", variant = "primary", noGloss = false, type = "button" }) => {
  const styles = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-slate-950", 
    secondary: "bg-slate-950 hover:bg-black text-white",
    waitlist: "bg-amber-600 hover:bg-amber-700 text-white shadow-lg",
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-yellow-500 hover:text-yellow-600"
  };

  const showGloss = !noGloss && (variant === 'primary' || variant === 'waitlist' || variant === 'orange');

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}
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

const WaitlistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-slate-950/60">
      <div className="bg-white w-full max-w-lg rounded-[48px] p-8 md:p-12 relative shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors z-20">
          <X className="w-6 h-6 text-slate-400" />
        </button>
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-8 shadow-inner animate-float">
            <Lock className="w-10 h-10" />
          </div>
          <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">
            UNLISTED RATES <br/> ARE PROTECTED.
          </h3>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm">
            To view our private group pricing, you must be a verified member. Join the waitlist to be notified when a membership slot opens.
          </p>
          
          <form 
            action="https://app.kit.com/forms/9018875/subscriptions" 
            method="post" 
            data-sv-form="9018875" 
            data-uid="d33b584771" 
            className="space-y-4"
          >
             <div className="text-left">
               <input 
                 name="email_address" 
                 required 
                 type="email" 
                 placeholder="your@email.com" 
                 className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 outline-none focus:border-yellow-400 text-slate-900 font-bold transition-all" 
               />
             </div>
             <ActionButton type="submit" variant="waitlist" className="w-full py-5 text-sm">
               Request Member Invite
             </ActionButton>
             <div className="flex items-center justify-center space-x-2 mt-6">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secured by Travel Pro X Vault</span>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SavingsTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SAVINGS_FEED.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 flex items-center space-x-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-black text-slate-950 border-2 border-slate-900">TP</div>
      </div>
      <p className="text-white text-[11px] font-medium tracking-wide">
        <span className="text-yellow-400 font-black">{SAVINGS_FEED[index].user}</span> just saved <span className="font-black">{SAVINGS_FEED[index].saved}</span> in <span className="text-amber-400">{SAVINGS_FEED[index].location}</span>
      </p>
      <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">{SAVINGS_FEED[index].time}</span>
    </div>
  );
};

/**
 * MAIN VIEWS
 */

const Header = ({ setView }) => (
  <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-6 pointer-events-none">
    <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-[28px] px-6 py-3 shadow-2xl pointer-events-auto">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
        <div className="p-2 bg-yellow-400 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
          <Plane className="w-5 h-5 text-slate-950" />
        </div>
        <span className="font-black text-slate-950 tracking-tighter text-xl uppercase">TRAVELPRO<span className="text-amber-600 text-2xl italic">X</span></span>
      </div>
      <div className="hidden lg:flex items-center space-x-8">
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">Member Perks</button>
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">Public Search</button>
        <div className="w-[1px] h-4 bg-slate-200 mx-2" />
        <button onClick={() => setView('agency')} className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors px-4 py-2 bg-amber-50 rounded-full border border-amber-100">Promoter Hub</button>
      </div>
      <ActionButton variant="primary" noGloss className="py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest" onClick={() => setView('agency')}>Inquire</ActionButton>
    </div>
  </nav>
);

const HomeView = ({ openWaitlist, setView }) => {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img src={OFFICIAL_HERO_IMAGE} className="w-full h-full object-cover" alt="Luxury Villa" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-white" />
        </div>

        <div className="relative z-10 w-full max-w-6xl text-center">
          <ScrollReveal>
            <div className="mb-8 flex flex-col items-center space-y-6">
              <SavingsTicker />
              <h1 className="text-6xl md:text-[11rem] font-black text-white tracking-tighter leading-[0.75] uppercase drop-shadow-2xl">
                THE TRAVEL <br/> <span className="text-yellow-400 italic">CARTEL.</span>
              </h1>
              <p className="text-white text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-tight drop-shadow-lg opacity-90">
                Stop paying retail. Our members access "Unlisted" wholesale rates protected by private travel agreements.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
              <ActionButton variant="primary" className="w-full md:w-auto px-12 py-7 text-lg" onClick={openWaitlist}>
                Unlock Member Portal
              </ActionButton>
              <button 
                onClick={() => document.getElementById('insights').scrollIntoView({ behavior: 'smooth' })} 
                className="group text-white font-black text-[11px] uppercase tracking-[0.5em] flex items-center hover:text-yellow-400 transition-colors py-4"
              >
                View Comparison <MoveRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </ScrollReveal>

          {/* SEARCH COMPONENT (GHOST VERSION) */}
          <ScrollReveal>
            <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white overflow-hidden">
              <div className="flex border-b border-slate-100">
                {['flights', 'hotels', 'cruises'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? 'bg-white text-amber-600 border-b-4 border-amber-500' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-100">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</span>
                    <div className="flex items-center space-x-3 text-slate-400 font-bold italic">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <span>Where are we heading?</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-100">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Range</span>
                    <div className="flex items-center space-x-3 text-slate-400 font-bold italic">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span>Select Departure</span>
                    </div>
                  </div>
                  <ActionButton variant="orange" className="h-full rounded-2xl" onClick={openWaitlist}>
                    <Search className="w-5 h-5" />
                    <span>Scan Unlisted</span>
                  </ActionButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MEMBER INSIGHTS */}
      <section id="insights" className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-16">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-amber-600 mb-6">Price Comparison</h2>
              <p className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase leading-[0.85] italic">STEP BEHIND THE VELVET ROPE.</p>
            </div>
            <p className="text-slate-400 font-bold max-w-xs text-sm leading-relaxed mt-8 md:mt-0">
              The rates below represent standard public market pricing. Verified members typically see 25-60% reductions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { name: "Florida", loc: "Miami Beach", price: "189", tag: "Beachfront" },
            { name: "New York", loc: "Times Square", price: "245", tag: "Skyline" },
            { name: "Las Vegas", loc: "The Strip", price: "99", tag: "High Roller" },
            { name: "Cancun", loc: "All-Inclusive", price: "220", tag: "Paradise" }
          ].map((dest, i) => (
            <ScrollReveal key={i}>
              <div className="group cursor-pointer">
                <div className="relative h-[540px] rounded-[56px] overflow-hidden mb-8 border-4 border-white shadow-2xl transition-transform duration-700 hover:-translate-y-4">
                  <img src={DESTINATION_ASSETS[dest.name]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={dest.name} />
                  <div className="absolute top-10 left-10"><span className="px-6 py-3 bg-yellow-400 rounded-full text-[10px] font-black text-slate-950 uppercase tracking-widest shadow-xl">{dest.tag}</span></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-12 left-10 right-10 text-white translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                    <ActionButton variant="waitlist" className="w-full py-5 rounded-3xl" onClick={openWaitlist}>Verify Private Rate</ActionButton>
                  </div>
                </div>
                <div className="flex justify-between items-start px-6">
                  <div>
                    <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none mb-2">{dest.name}</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center"><MapPin className="w-3 h-3 mr-2 text-amber-500" /> {dest.loc}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest line-through mb-1">Public: ${parseInt(dest.price) + 120}</p>
                     <p className="text-2xl font-black text-amber-700 leading-none">${dest.price}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* VIDEO TESTIMONIAL */}
      <section className="bg-slate-950 py-32 md:py-48 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.4em] uppercase bg-white/10 text-yellow-400 rounded-full border border-white/10">
                  <PlayCircle className="w-4 h-4" />
                  <span>Member Diaries</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-12">
                  REAL <br/> ACCESS. <br/> <span className="text-white/40 italic">REAL SAVINGS.</span>
                </h2>
                <div className="space-y-8 mb-12">
                   {[
                    "Exclusive wholesale hotel inventory",
                    "Global flight consolidator rates",
                    "Luxury cruise & villa access",
                    "No commissions. Just net costs."
                   ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <span className="text-white font-bold text-lg">{item}</span>
                    </div>
                   ))}
                </div>
                <ActionButton variant="primary" className="px-10" onClick={openWaitlist}>Explore Member Life</ActionButton>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 bg-yellow-400/20 blur-[100px] rounded-full animate-pulse" />
                <div className="relative aspect-[9/16] md:aspect-video w-full rounded-[60px] overflow-hidden border-[12px] border-white/5 shadow-3xl">
                   <iframe 
                    src={TESTIMONIAL_VIDEO_URL} 
                    className="w-full h-full scale-[1.01]"
                    loading="lazy" 
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-32 pb-16 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-yellow-400 rounded-xl"><Plane className="w-5 h-5 text-slate-950" /></div>
              <span className="font-black text-slate-950 text-3xl tracking-tighter uppercase">TRAVELPRO<span className="text-amber-600">X</span></span>
            </div>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed mb-10 text-lg">
              The world's leading private travel ecosystem. We combine global group volume to deliver net-wholesale rates directly to our members.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-yellow-600 cursor-pointer transition-colors"><Globe className="w-6 h-6" /></div>
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-yellow-600 cursor-pointer transition-colors"><Star className="w-6 h-6" /></div>
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-yellow-600 cursor-pointer transition-colors"><Navigation className="w-6 h-6" /></div>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Navigation</h4>
            <ul className="space-y-6">
              <li><button onClick={() => setView('home')} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">Global Search</button></li>
              <li><button onClick={() => setView('agency')} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">Promoter Portal</button></li>
              <li><button onClick={openWaitlist} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">Verify Membership</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Status</h4>
            <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
               <div className="flex items-center space-x-3 mb-3">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Portal Online</span>
               </div>
               <p className="text-xs font-bold text-slate-600 leading-snug">All global scanning modules are currently operational.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
            © 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014
          </p>
          <div className="flex space-x-8">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-950">Terms</button>
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-950">Privacy</button>
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-950">Disclosures</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AgencyView = ({ setView }) => (
  <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
    <main className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 mb-10 text-[10px] font-black tracking-[0.5em] uppercase bg-amber-100 text-amber-700 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span>B2B INFRASTRUCTURE</span>
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">
              BUILD YOUR <br/> TRAVEL <br/> <span className="text-yellow-500 italic">EMPIRE.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-16 max-w-xl">
              We provide the tech. You provide the community. Scalable booking portals designed for travel influencers, agents, and scaling promoters.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-16">
               <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-3">01. Global Feed</h4>
                  <p className="text-slate-600 font-medium">Real-time GDS and Wholesale feeds integrated into your brand.</p>
               </div>
               <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-3">02. Auto-Funnels</h4>
                  <p className="text-slate-600 font-medium">Capture leads and manage bookings without lifting a finger.</p>
               </div>
            </div>
            <button onClick={() => setView('home')} className="flex items-center space-x-3 text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] hover:text-slate-950 transition-colors">
              <MoveRight className="w-5 h-5 rotate-180" />
              <span>Back to Member Portal</span>
            </button>
          </div>
          <div className="bg-white p-12 md:p-20 rounded-[80px] border border-slate-200 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] relative">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-slate-950 mx-auto mb-10 shadow-xl">
                <Code className="w-10 h-10" />
              </div>
              <h3 className="text-4xl font-black mb-12 uppercase tracking-tighter text-center italic text-slate-950 underline decoration-amber-500 decoration-8 underline-offset-8">Promoter Inquiry</h3>
              
              <form action="https://app.kit.com/forms/9018896/subscriptions" method="post" data-sv-form="9018896" data-uid="33bdc59b1b" className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Professional Identity</label>
                    <input name="fields[first_name]" required type="text" placeholder="John Doe / Agency Name" className="w-full h-18 bg-slate-50 rounded-3xl px-8 outline-none focus:ring-4 ring-yellow-400/20 text-slate-900 font-bold border-2 border-slate-100 transition-all py-6" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Corporate Email</label>
                    <input name="email_address" required type="email" placeholder="partner@yourbrand.com" className="w-full h-18 bg-slate-50 rounded-3xl px-8 outline-none focus:ring-4 ring-yellow-400/20 text-slate-900 font-bold border-2 border-slate-100 transition-all py-6" />
                  </div>
                  <ActionButton type="submit" variant="secondary" className="w-full py-8 text-xl">
                    Register Interest
                  </ActionButton>
                  <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">Confidential Review • travelprox.com/b2b</p>
              </form>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  </div>
);

/**
 * APP ENTRY POINT
 */
const App = () => {
  const [view, setView] = useState('home'); 
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // DYNAMIC SCARCITY LOGIC
  const { spotsLeft } = useMemo(() => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    // Deterministic countdown throughout the month
    const remaining = Math.max(100 - (dayOfMonth - 1) * 3, 4); 
    return { spotsLeft: remaining };
  }, []);

  // Script Loader for Kit
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.5.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); }
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <div className="font-sans selection:bg-yellow-400 selection:text-slate-950">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <Header setView={setView} />
      
      {view === 'home' ? (
        <HomeView 
          setView={setView}
          openWaitlist={() => setIsWaitlistOpen(true)}
        />
      ) : (
        <AgencyView setView={setView} />
      )}

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Floating Status Pill */}
      <div 
        onClick={() => setIsWaitlistOpen(true)}
        className="fixed bottom-8 right-8 z-[120] bg-white border border-slate-200/50 p-1.5 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex items-center space-x-1 cursor-pointer hover:scale-105 transition-all group"
      >
        <div className="bg-yellow-400 px-5 py-3 rounded-full flex items-center space-x-3">
           <Timer className="w-5 h-5 text-slate-950" />
           <span className="text-[12px] font-black text-slate-950 uppercase tracking-widest">{spotsLeft} Spots Left</span>
        </div>
        <div className="px-4 py-3 hidden md:flex items-center space-x-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Join Waitlist</span>
           <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default App;
