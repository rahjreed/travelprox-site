import React, { useState, useEffect, useRef } from 'react';
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
  UserPlus,
  X,
  AlertCircle
} from 'lucide-react';

const apiKey = "";

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

const ActionButton = ({ onClick, children, className = "", variant = "primary" }) => {
  const styles = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-slate-950", 
    secondary: "bg-slate-950 hover:bg-black text-white",
    waitlist: "bg-amber-600 hover:bg-amber-700 text-white shadow-sm",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-yellow-500 hover:text-yellow-600"
  };

  return (
    <button onClick={onClick} className={`px-8 py-4 rounded-2xl font-black transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

/**
 * WAITLIST MODAL
 * Triggered when users want to "See Member Rates"
 */
const WaitlistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-slate-950/40">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-10 relative shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">
            PRIVATE ACCESS <br/> REQUIRED.
          </h3>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Our unlisted rates are protected by member-only agreements. Join the waitlist to be notified when a spot opens in the club.
          </p>
          <div className="space-y-4">
             <input type="email" placeholder="Your Email Address" className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 outline-none focus:ring-2 ring-yellow-400/50 text-slate-900 font-bold" />
             <ActionButton variant="waitlist" className="w-full py-5">Request Member Invite</ActionButton>
          </div>
          <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 mr-2" />
            100% Private • No Spam
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * TRAVEL SEARCH WIDGET
 * Provides the "Inspiration baseline" search
 */
const TravelSearchWidget = ({ activeTab, setActiveTab }) => {
  const tpMarker = "533943";
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!destination) return;
    const url = activeTab === 'flights' 
      ? `https://www.jetradar.com/searches/new?marker=${tpMarker}&destination_name=${encodeURIComponent(destination)}&depart_date=${date}`
      : `https://search.hotellook.com/hotels?marker=${tpMarker}&location=${encodeURIComponent(destination)}&checkIn=${date}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full bg-white rounded-[32px] md:rounded-[40px] overflow-hidden border border-slate-200 shadow-xl">
      <div className="flex bg-slate-50 border-b border-slate-100">
        {[
          { id: 'flights', label: 'Inspiration Search', icon: <Plane className="w-3 h-3" /> },
          { id: 'hotels', label: 'Compare Stays', icon: <Building2 className="w-3 h-3" /> },
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
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4">
              <MapPin className="w-5 h-5 text-amber-600" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] font-black uppercase text-slate-400">Destination</span>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" className="bg-transparent font-bold text-slate-700 outline-none w-full text-sm" />
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-amber-600" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] font-black uppercase text-slate-400">Add Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent font-bold text-slate-700 outline-none w-full text-sm cursor-pointer" />
              </div>
            </div>
          </div>
          <button className="w-full lg:w-auto h-[68px] px-10 bg-slate-950 hover:bg-black text-yellow-400 font-black rounded-2xl transition-all flex items-center justify-center space-x-3 active:scale-95 shrink-0" onClick={handleSearch}>
            <Search className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest font-black">Search Market Rates</span>
          </button>
        </div>
      </div>
      
      <div className="bg-slate-50 px-8 py-3 flex items-center justify-between border-t border-slate-100">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center">
          <Lock className="w-3 h-3 mr-2 text-amber-600" />
          Join the waitlist for unlisted member-only pricing
        </span>
      </div>
    </div>
  );
};

const Header = ({ setView }) => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-md border border-slate-200 rounded-[32px] px-6 py-3 shadow-sm">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
        <div className="p-2 bg-yellow-400 rounded-xl group-hover:rotate-12 transition-transform">
          <Plane className="w-5 h-5 text-slate-950" />
        </div>
        <span className="font-black text-slate-950 tracking-tighter text-xl uppercase">TRAVELPRO<span className="text-amber-600 text-2xl italic">X</span></span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">The Club</button>
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors">Public Search</button>
        <div className="w-[1px] h-4 bg-slate-200 mx-2" />
        <button onClick={() => setView('agency')} className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors px-4 py-2 bg-amber-50 rounded-full border border-amber-100">For Promoters</button>
      </div>
      <ActionButton variant="primary" className="py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest" onClick={() => setView('agency')}>Partner</ActionButton>
    </div>
  </nav>
);

/**
 * MAIN VIEWS
 */
const HomeView = ({ heroImage, destinationImages, activeSearchTab, setActiveSearchTab, setView, openWaitlist }) => {
  const [spotsLeft, setSpotsLeft] = useState(7);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {heroImage ? <img src={heroImage} className="w-full h-full object-cover" alt="Hero" /> : <div className="w-full h-full bg-slate-100 animate-pulse" />}
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>
        <div className="relative z-10 w-full max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-4 px-5 py-2 mb-10 text-[10px] font-black tracking-[0.2em] uppercase bg-white/90 backdrop-blur-md text-slate-950 rounded-full border border-slate-200 shadow-lg">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Only {spotsLeft} Access Spots Left for January</span>
                </span>
              </div>
              <h1 className="text-5xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-[0.8] uppercase">
                UNLISTED <br/> <span className="text-yellow-400 italic">PORTAL.</span>
              </h1>
              <p className="text-white text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow-md">
                We negotiate exclusive group rates with wholesalers and cruise lines. Access is restricted to ensure these private prices remain unlisted.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <ActionButton variant="primary" className="w-full md:w-auto px-12 py-6 text-lg" onClick={openWaitlist}>
                  Request Private Access
                </ActionButton>
                <button 
                  onClick={() => document.getElementById('engine').scrollIntoView({ behavior: 'smooth' })} 
                  className="group text-white font-black text-[11px] uppercase tracking-[0.4em] flex items-center hover:text-yellow-400 transition-colors"
                >
                  Use Public Search First <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
            <div className="max-w-5xl mx-auto" id="engine">
              <TravelSearchWidget activeTab={activeSearchTab} setActiveTab={setActiveSearchTab} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-12">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-600 mb-4">Member Favorites</h2>
              <p className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">THE HIT LIST.</p>
            </div>
            <p className="text-slate-400 font-bold max-w-xs text-sm leading-relaxed">Public baseline rates shown below. Private rates available to members only.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Florida", loc: "Miami Beach", price: "189", key: "Miami Beach Florida", tag: "Coastline" },
            { name: "New York", loc: "Manhattan", price: "245", key: "New York City Skyline Night", tag: "Metropolis" },
            { name: "Las Vegas", loc: "The Strip", price: "99", key: "Las Vegas Strip Neon", tag: "Entertainment" },
            { name: "Cancun", loc: "Resort Zone", price: "220", key: "Cancun Mexico Beach", tag: "Retreat" }
          ].map((dest, i) => (
            <ScrollReveal key={i}>
              <div className="group cursor-pointer">
                <div className="relative h-[480px] rounded-[48px] overflow-hidden mb-8 border border-slate-100 shadow-sm">
                  {destinationImages[dest.key] ? <img src={destinationImages[dest.key]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={dest.name} /> : <div className="w-full h-full bg-slate-100 animate-pulse" />}
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
                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Market baseline</p>
                     <p className="text-xl font-black text-amber-700 leading-none">${dest.price}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Scarcity / Process Section */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="text-center">
               <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-950 mx-auto mb-8"><AlertCircle className="w-8 h-8" /></div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Why Access is Limited</h4>
               <p className="text-slate-500 font-medium leading-relaxed">Our wholesalers provide unlisted rates on the condition that they are not publicly visible to the entire internet.</p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-yellow-400 mx-auto mb-8"><Clock className="w-8 h-8" /></div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">The Monthly Reset</h4>
               <p className="text-slate-500 font-medium leading-relaxed">We release 50 new membership tokens on the 1st of every month. Once they are gone, the list remains closed.</p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mx-auto mb-8"><ShieldCheck className="w-8 h-8" /></div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Verified Invite Only</h4>
               <p className="text-slate-500 font-medium leading-relaxed">Membership isn't for everyone. We prioritize high-intent travelers who value core memories over simple discount-hunting.</p>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-[0.9]">
               DON'T MISS THE <br/> <span className="text-amber-600 italic underline decoration-yellow-400 decoration-4">NEXT OPENING.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto">
               Join 12,000+ others currently on the waitlist. You will receive an SMS invitation when your spot becomes available.
            </p>
            <ActionButton variant="secondary" className="mx-auto px-16 py-6" onClick={openWaitlist}>
               Secure My Waitlist Position
            </ActionButton>
         </div>
      </section>

      <footer className="bg-white py-24 px-6 text-center border-t border-slate-100">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 text-left">
            <div className="flex flex-col items-center md:items-start">
               <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-yellow-400 rounded-xl"><Plane className="w-5 h-5 text-slate-950" /></div>
                  <span className="font-black text-slate-950 text-2xl tracking-tighter uppercase">TRAVELPRO<span className="text-amber-600">X</span></span>
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Curiosity • Scarcity • Influence • Est. 2014</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
               <button onClick={() => setView('agency')} className="text-slate-950 font-black uppercase tracking-widest text-[11px] border-2 border-slate-950 px-10 py-5 rounded-full hover:bg-slate-950 hover:text-white transition-all">Promoters Apply Here</button>
            </div>
         </div>
      </footer>
    </div>
  );
};

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
              Are you a travel agent or promoter? We build professional booking portals and group scaling funnels designed specifically for high-volume travel professionals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
               <ActionButton className="w-full sm:w-auto px-12" onClick={() => {}}>View Partner Guide</ActionButton>
               <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-950 transition-all">Back to Global Search</button>
            </div>
          </div>
          <div className="bg-white p-12 md:p-20 rounded-[60px] border border-slate-200 relative shadow-2xl">
             <div className="relative z-10 text-center">
               <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter italic text-slate-950">Promoter Inquiry</h3>
               <p className="text-slate-400 mb-8 font-medium">Use the placeholder fields below to register your interest in a custom build.</p>
               <div className="space-y-8">
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-bold">Your Professional Name</label>
                    <input type="text" className="w-full h-16 bg-slate-50 rounded-2xl px-6 outline-none focus:ring-2 ring-yellow-400/50 text-slate-900 font-bold border border-slate-100" />
                  </div>
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-bold">Traffic Type / Agency</label>
                    <input type="text" placeholder="Influencer, Agent, Host..." className="w-full h-16 bg-slate-50 rounded-2xl px-6 outline-none focus:ring-2 ring-yellow-400/50 text-slate-900 font-bold border border-slate-100 placeholder:text-slate-300" />
                  </div>
                  <ActionButton className="w-full py-7 text-lg uppercase tracking-widest font-black">Register Interest</ActionButton>
               </div>
             </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
    <footer className="py-20 border-t border-slate-200 text-center px-6">
       <button onClick={() => setView('home')} className="text-slate-400 hover:text-slate-950 transition-colors uppercase font-black text-[10px] tracking-[0.5em]">Return to Main Portal</button>
    </footer>
  </div>
);

/**
 * APP ENTRY POINT
 */
const App = () => {
  const [view, setView] = useState('home'); 
  const [heroImage, setHeroImage] = useState(null);
  const [destinationImages, setDestinationImages] = useState({});
  const [activeSearchTab, setActiveSearchTab] = useState('flights');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  useEffect(() => {
    const generateAllImages = async () => {
      try {
        const heroRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
          method: "POST",
          body: JSON.stringify({ instances: [{ prompt: "High-end luxury travel aesthetics, Maldives overwater villas, drone shot, golden hour, yellow and gold tones, cinematic photography" }], parameters: { sampleCount: 1 } })
        });
        const heroData = await heroRes.json();
        if (heroData.predictions?.[0]) setHeroImage(`data:image/png;base64,${heroData.predictions[0].bytesBase64Encoded}`);

        const destinations = ["Miami Beach Florida", "New York City Skyline Night", "Las Vegas Strip Neon", "Cancun Mexico Beach"];
        const destImages = {};
        for (const dest of destinations) {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
            method: "POST",
            body: JSON.stringify({ instances: [{ prompt: `Premium travel shot of ${dest}, cinematic lighting, vibrant yellow highlights` }], parameters: { sampleCount: 1 } })
          });
          const data = await res.json();
          if (data.predictions?.[0]) destImages[dest] = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
        }
        setDestinationImages(destImages);
      } catch (e) { console.error(e); }
    };
    generateAllImages();
  }, []);

  return (
    <div className="overflow-x-hidden selection:bg-yellow-200 selection:text-slate-900">
      <Header setView={setView} />
      {view === 'home' ? (
        <HomeView 
          heroImage={heroImage} 
          destinationImages={destinationImages} 
          activeSearchTab={activeSearchTab} 
          setActiveSearchTab={setActiveSearchTab}
          setView={setView}
          openWaitlist={() => setIsWaitlistOpen(true)}
        />
      ) : (
        <AgencyView setView={setView} />
      )}

      {/* Waitlist Funnel Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Floating Pill: Build by Callista */}
      <a 
        href="https://callistadigital.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-slate-950 px-5 py-2.5 rounded-full border border-white/10 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer group shadow-xl"
      >
        <Code className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
          build by <span className="text-yellow-400">callista</span>
        </span>
      </a>
    </div>
  );
};

export default App;
