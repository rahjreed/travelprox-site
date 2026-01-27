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
  PlayCircle
} from 'lucide-react';

const apiKey = "";
const OFFICIAL_HERO_IMAGE = "https://images.travelprox.com/splash/villa.png";
const TESTIMONIAL_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/02956ab7-33a5-4f3b-8754-ef763a308f28";

// Official Destination Images
const DESTINATION_ASSETS = {
  "Florida": "https://images.travelprox.com/splash/miami.png",
  "New York": "https://images.travelprox.com/splash/newyork.png",
  "Las Vegas": "https://images.travelprox.com/splash/vegas.png",
  "Cancun": "https://images.travelprox.com/splash/cancun.png"
};

/**
 * CUSTOM STYLES & ANIMATIONS
 */
const shimmerStyles = `
  @keyframes gloss-sweep {
    0% { transform: translateX(-150%) skewX(-25deg); }
    30% { transform: translateX(150%) skewX(-25deg); }
    100% { transform: translateX(150%) skewX(-25deg); }
  }
  .animate-gloss {
    animation: gloss-sweep 4s ease-in-out infinite;
  }
`;

/**
 * REUSABLE COMPONENTS
 */

const ScrollReveal = ({ children, width = "w-full" }) => {
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
    <div ref={ref} className={`${width} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
};

const ActionButton = ({ onClick, children, className = "", variant = "primary", noGloss = false, type = "button" }) => {
  const styles = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-slate-950", 
    secondary: "bg-slate-950 hover:bg-black text-white",
    waitlist: "bg-amber-600 hover:bg-amber-700 text-white shadow-sm",
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-yellow-500 hover:text-yellow-600"
  };

  const showGloss = !noGloss && (variant === 'primary' || variant === 'waitlist' || variant === 'orange');

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-slate-950/40">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-10 relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-20">
          <X className="w-6 h-6 text-slate-400" />
        </button>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">
            PRIVATE ACCESS <br/> REQUIRED.
          </h3>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm">
            Our unlisted rates are protected by member-only agreements. Join the waitlist to be notified when a spot opens in the club.
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
                 placeholder="Your Email Address" 
                 className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 outline-none focus:ring-2 ring-yellow-400/50 text-slate-900 font-bold" 
               />
             </div>
             <ActionButton type="submit" variant="waitlist" className="w-full py-5">
               Request Member Invite
             </ActionButton>
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-4">
               Processed securely via Kit
             </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const TravelSearchWidget = ({ activeTab, setActiveTab, onSearchAttempt }) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearchClick = () => {
    onSearchAttempt();
  };

  return (
    <div className="w-full bg-white rounded-[32px] md:rounded-[40px] overflow-hidden border border-slate-200 shadow-xl">
      <div className="flex bg-slate-50 border-b border-slate-100">
        {[
          { id: 'flights', label: 'Flights', icon: <Plane className="w-3 h-3" /> },
          { id: 'hotels', label: 'Hotels', icon: <Building2 className="w-3 h-3" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-amber-600 border-r border-slate-200 border-t-2 border-t-yellow-400' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4 group cursor-text">
              <MapPin className="w-5 h-5 text-amber-600" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] font-black uppercase text-slate-400">Destination</span>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" className="bg-transparent font-bold text-slate-700 outline-none w-full text-sm" />
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4 group cursor-text">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] font-black uppercase text-slate-400">Add Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent font-bold text-slate-700 outline-none w-full text-sm cursor-pointer" />
              </div>
            </div>
          </div>
          <ActionButton variant="orange" className="h-[68px] px-10 min-w-[220px]" onClick={handleSearchClick}>
            <Search className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest font-black">Search Market Rates</span>
          </ActionButton>
        </div>
      </div>
      
      <div className="bg-slate-50 px-8 py-3 flex items-center justify-between border-t border-slate-100">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center">
          <Key className="w-3 h-3 mr-2 text-amber-600" />
          Join the club to unlock unlisted group pricing
        </span>
      </div>
    </div>
  );
};

const Header = ({ setView }) => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-md border border-slate-200 rounded-[32px] px-6 py-3 shadow-sm">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
        <div className="p-2 bg-yellow-400 rounded-xl group-hover:rotate-12 transition-transform shadow-sm">
          <Plane className="w-5 h-5 text-slate-950" />
        </div>
        <span className="font-black text-slate-950 tracking-tighter text-xl uppercase">TRAVELPRO<span className="text-amber-600 text-2xl italic">X</span></span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">Member Perks</button>
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">Public Search</button>
        <div className="w-[1px] h-4 bg-slate-200 mx-2" />
        <button onClick={() => setView('agency')} className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors px-4 py-2 bg-amber-50 rounded-full border border-amber-100">Promoter Hub</button>
      </div>
      <ActionButton variant="primary" noGloss className="py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest" onClick={() => setView('agency')}>Inquire</ActionButton>
    </div>
  </nav>
);

/**
 * MAIN VIEWS
 */
const HomeView = ({ heroImage, activeSearchTab, setActiveSearchTab, setView, openWaitlist }) => (
  <div className="bg-white min-h-screen text-slate-900 font-sans">
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 z-0">
        <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>
      <div className="relative z-10 w-full max-w-6xl px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-[0.8] uppercase">
              ACCESS THE <br/> <span className="text-yellow-400 italic drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">UNLISTED.</span>
            </h1>
            <p className="text-white text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              The public sees one price. Our members see another. Join the waitlist to unlock private wholesale travel rates.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <ActionButton variant="primary" className="w-full md:w-auto px-12 py-6 text-lg" onClick={openWaitlist}>
                Request Member Invite
              </ActionButton>
              <button 
                onClick={() => document.getElementById('search').scrollIntoView({ behavior: 'smooth' })} 
                className="group text-white font-black text-[11px] uppercase tracking-[0.4em] flex items-center hover:text-yellow-400 transition-colors"
              >
                Public Market Search <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
          <div className="max-w-5xl mx-auto pb-12" id="search">
            <TravelSearchWidget activeTab={activeSearchTab} setActiveTab={setActiveSearchTab} onSearchAttempt={openWaitlist} />
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Member Insights Section */}
    <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-12">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-600 mb-4">Member Insights</h2>
            <p className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">CURIOUS?</p>
          </div>
          <p className="text-slate-400 font-bold max-w-xs text-sm leading-relaxed">Baseline rates shown. Actual member rates are found behind the velvet rope.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Florida", loc: "Miami Beach", price: "189", tag: "Coastline" },
          { name: "New York", loc: "Manhattan", price: "245", tag: "Metropolis" },
          { name: "Las Vegas", loc: "The Strip", price: "99", tag: "Entertainment" },
          { name: "Cancun", loc: "Resort Zone", price: "220", tag: "Retreat" }
        ].map((dest, i) => (
          <ScrollReveal key={i}>
            <div className="group cursor-pointer">
              <div className="relative h-[480px] rounded-[48px] overflow-hidden mb-8 border border-slate-100 shadow-sm">
                <img src={DESTINATION_ASSETS[dest.name]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={dest.name} />
                <div className="absolute top-10 left-10"><span className="px-5 py-2 bg-yellow-400/90 backdrop-blur-xl rounded-full text-[10px] font-black text-slate-950 uppercase tracking-widest">{dest.tag}</span></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-12 left-12 right-12 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ActionButton variant="waitlist" className="w-full py-4 rounded-2xl text-[10px] uppercase tracking-widest font-black" onClick={openWaitlist}>Unlock Private Rate</ActionButton>
                </div>
              </div>
              <div className="flex justify-between items-start px-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{dest.name}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center italic"><MapPin className="w-3 h-3 mr-1 text-amber-600" /> {dest.loc}</p>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Public rate</p>
                   <p className="text-xl font-black text-amber-700 leading-none">${dest.price}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* TESTIMONIAL VIDEO SECTION */}
    <section className="bg-white pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-amber-50 text-amber-600 rounded-full border border-amber-100">
              <PlayCircle className="w-3 h-3" />
              <span>Inside the Club</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none italic mb-6">
              HEAR FROM OUR MEMBERS.
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Real feedback from travelers who have stepped behind the velvet rope and transformed how they experience the world.
            </p>
          </div>

          <div className="relative w-full rounded-[40px] md:rounded-[60px] overflow-hidden bg-slate-950 shadow-2xl border-[8px] border-slate-50 group">
            <div className="aspect-video w-full">
              <iframe 
                src={TESTIMONIAL_VIDEO_URL} 
                className="w-full h-full"
                loading="lazy" 
                style={{ border: 0 }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-[10px] font-black uppercase tracking-widest">Featured Story • Member Verified</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <ActionButton variant="primary" className="mx-auto px-10" onClick={openWaitlist}>
              Join the Movement <MoveRight className="ml-2 w-4 h-4" />
            </ActionButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Information Section */}
    <section className="bg-slate-50 py-32 border-y border-slate-100">
       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="text-center">
             <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-950 mx-auto mb-8"><Search className="w-8 h-8" /></div>
             <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Global Scans</h4>
             <p className="text-slate-500 font-medium leading-relaxed">Establish the lowest price available to the public across all major sites using our search engine.</p>
          </div>
          <div className="text-center">
             <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-yellow-400 mx-auto mb-8"><Users className="w-8 h-8" /></div>
             <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Group Volume</h4>
             <p className="text-slate-500 font-medium leading-relaxed">We consolidate our member base to unlock rates that individual travelers are never shown.</p>
          </div>
          <div className="text-center">
             <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mx-auto mb-8"><TrendingUp className="w-8 h-8" /></div>
             <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Promoter Scaling</h4>
             <p className="text-slate-500 font-medium leading-relaxed">Agents and promoters use our platform to build their own communities and scale their travel volume.</p>
          </div>
       </div>
    </section>

    <footer className="bg-white py-24 px-6 border-t border-slate-100">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 text-left">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-yellow-400 rounded-xl"><Plane className="w-5 h-5 text-slate-950" /></div>
                <span className="font-black text-slate-950 text-2xl tracking-tighter uppercase">TRAVELPRO<span className="text-amber-600">X</span></span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Explore • Discover • Experience • Est. 2014</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
             <button onClick={() => setView('agency')} className="text-slate-950 font-black uppercase tracking-widest text-[11px] border-2 border-slate-950 px-10 py-5 rounded-full hover:bg-slate-950 hover:text-white transition-all">Promoters Apply</button>
             <button onClick={openWaitlist} className="text-white bg-amber-600 font-black uppercase tracking-widest text-[11px] px-10 py-5 rounded-full hover:opacity-90 transition-all">Join the Waitlist</button>
          </div>
       </div>
       <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            © 2026 <a href="https://callistadigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">Callista Digital</a> and Travel Pro X. All rights reserved.
          </p>
       </div>
    </footer>
  </div>
);

const AgencyView = ({ setView }) => (
  <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.3em] uppercase bg-amber-100 text-amber-700 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>B2B PARTNERSHIPS</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12">
              BUILD YOUR <br/> TRAVEL <br/> <span className="text-yellow-500">INFLUENCE.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
              Are you a travel agent or promoter? We build professional booking portals and group scaling funnels designed specifically for high-volume travel promoters.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
               <ActionButton variant="primary" className="w-full sm:w-auto px-12" onClick={() => {}}>View Partner Guide</ActionButton>
               <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-950 transition-all">Back to Global Search</button>
            </div>
          </div>
          <div className="bg-white p-12 md:p-20 rounded-[60px] border border-slate-200 relative shadow-2xl overflow-hidden">
             <div className="relative z-10 text-center">
               <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter italic text-slate-950">Promoter Inquiry</h3>
               
               {/* INTEGRATED KIT FORM 9018896 */}
               <form action="https://app.kit.com/forms/9018896/subscriptions" method="post" data-sv-form="9018896" data-uid="33bdc59b1b" className="space-y-6">
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-bold">Your Professional Name</label>
                    <input 
                      name="fields[first_name]"
                      required
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full h-16 bg-slate-50 rounded-2xl px-6 outline-none focus:ring-2 ring-yellow-400/50 text-slate-900 font-bold border border-slate-100" 
                    />
                  </div>
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-bold">Email Address</label>
                    <input 
                      name="email_address"
                      required
                      type="email" 
                      placeholder="you@example.com" 
                      className="w-full h-16 bg-slate-50 rounded-2xl px-6 outline-none focus:ring-2 ring-yellow-400/50 text-slate-900 font-bold border border-slate-100" 
                    />
                  </div>
                  
                  {/* Hidden required Kit attributes */}
                  <div className="hidden">
                    <input type="text" name="fields[traffic_type]" value="Email" readOnly />
                  </div>

                  <ActionButton type="submit" variant="primary" className="w-full py-7 text-lg uppercase tracking-widest font-black">
                    Register Interest
                  </ActionButton>
                  
                  <div className="mt-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Securely processed by Kit • travelprox.com
                  </div>
               </form>
             </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
    <footer className="py-20 border-t border-slate-200 text-center px-6">
       <button onClick={() => setView('home')} className="mb-8 text-slate-400 hover:text-slate-950 transition-colors uppercase font-black text-[10px] tracking-[0.5em]">Return to Global Comparison Portal</button>
       <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center">
          © 2026 <a href="https://callistadigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">Callista Digital</a> and Travel Pro X. All rights reserved.
       </p>
    </footer>
  </div>
);

/**
 * APP ENTRY POINT
 */
const App = () => {
  const [view, setView] = useState('home'); 
  const [activeSearchTab, setActiveSearchTab] = useState('flights');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // DYNAMIC SCARCITY LOGIC
  const { spotsLeft } = useMemo(() => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const remaining = Math.max(100 - (dayOfMonth - 1) * 3, 2); 
    return { spotsLeft: remaining };
  }, []);

  // Script Loader for Kit
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.5.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    }
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <div className="overflow-x-hidden selection:bg-yellow-200 selection:text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />
      
      <Header setView={setView} />
      
      {view === 'home' ? (
        <HomeView 
          heroImage={OFFICIAL_HERO_IMAGE} 
          activeSearchTab={activeSearchTab} 
          setActiveSearchTab={setActiveSearchTab}
          setView={setView}
          openWaitlist={() => setIsWaitlistOpen(true)}
          spotsLeft={spotsLeft}
        />
      ) : (
        <AgencyView setView={setView} />
      )}

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Floating Spots Pill */}
      <button 
        onClick={() => setIsWaitlistOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-yellow-400 px-6 py-3.5 rounded-full border border-slate-950/10 flex items-center space-x-3 shadow-xl hover:scale-105 active:scale-95 transition-all group"
      >
        <div className="relative flex items-center justify-center">
           <Timer className="w-5 h-5 text-slate-950" />
           <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col items-start leading-none text-left">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 leading-tight">Access Status</span>
           <span className="text-[12px] font-black text-slate-950 leading-tight">{spotsLeft} Spots Left</span>
        </div>
      </button>
    </div>
  );
};

export default App;
