import React, { useState, useEffect, useRef } from 'react';
import { 
  Instagram, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Layout, 
  Zap, 
  Globe,
  Camera,
  Star, 
  ShieldCheck,
  ShoppingBag,
  Timer,
  CreditCard,
  Clock,
  Mail,
  XCircle,
  Home,
  Network,
  X,
  Plane,
  Palmtree,
  Compass,
  MapPin,
  Ticket,
  Sun,
  Waves,
  Search,
  Calendar,
  Users,
  Building2,
  Umbrella,
  ArrowUpRight,
  Info,
  Navigation,
  Loader2,
  ChevronDown,
  Plus,
  Minus,
  Ship,
  Anchor
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
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)]",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20",
    outline: "bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
  };

  return (
    <button onClick={onClick} className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

/**
 * TRAVEL SEARCH WIDGET
 * Integrated with your Cruise Brothers Iframe and Travelpayouts Meta-search
 */
const TravelSearchWidget = ({ activeTab, setActiveTab }) => {
  const tpMarker = "533943";
  const cruiseBrothersUrl = "https://travelprox.cruisebrothers.com/cb/booking_engine_iframe/";

  // State for Flights/Hotels (Travelpayouts)
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
    <div className="w-full bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden border border-slate-200 transition-all duration-500">
      {/* Tab Switcher */}
      <div className="flex bg-slate-50 border-b border-slate-100">
        {[
          { id: 'cruises', label: 'Search Cruises', icon: <Ship className="w-3 h-3" /> },
          { id: 'flights', label: 'Flights', icon: <Plane className="w-3 h-3" /> },
          { id: 'hotels', label: 'Hotels', icon: <Building2 className="w-3 h-3" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-orange-500 border-r border-slate-200 shadow-[inset_0_2px_0_0_#f97316]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={`${activeTab === 'cruises' ? 'p-0' : 'p-6 md:p-10'}`}>
        {activeTab === 'cruises' ? (
          <div className="w-full h-[600px] bg-slate-100">
            <iframe 
              width="100%" 
              height="600" 
              src={cruiseBrothersUrl} 
              frameBorder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Cruise Brothers Search"
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div className="flex flex-col w-full">
                  <span className="text-[9px] font-black uppercase text-slate-400">Destination</span>
                  <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" className="bg-transparent font-bold text-slate-700 outline-none w-full placeholder:text-slate-300 text-sm" />
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div className="flex flex-col w-full">
                  <span className="text-[9px] font-black uppercase text-slate-400">Date</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent font-bold text-slate-700 outline-none w-full text-sm cursor-pointer" />
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4">
                <Users className="w-5 h-5 text-orange-500" />
                <div className="flex flex-col w-full">
                  <span className="text-[9px] font-black uppercase text-slate-400">Travelers</span>
                  <span className="font-bold text-slate-700 text-sm">1 Adult</span>
                </div>
              </div>
            </div>
            <button className="w-full lg:w-auto h-[68px] px-10 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-3 active:scale-95 shrink-0" onClick={handleSearch}>
              <Search className="w-5 h-5" />
              <span className="text-sm uppercase tracking-widest font-black">Compare Best Rates</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-slate-50 px-8 py-3 flex items-center justify-between border-t border-slate-100">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center">
          <ShieldCheck className="w-3 h-3 mr-2 text-orange-500" />
          {activeTab === 'cruises' ? 'Official Cruise Brothers Partner Portal' : 'Search 700+ sites simultaneously'}
        </span>
      </div>
    </div>
  );
};

const Header = ({ setView }) => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] px-6 py-3 shadow-2xl">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
        <div className="p-2 bg-orange-500 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
          <Plane className="w-5 h-5 text-white" />
        </div>
        <span className="font-black text-white tracking-tighter text-xl uppercase">TRAVELPRO<span className="text-orange-500 text-2xl italic drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">X</span></span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors">Cruises</button>
        <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors">Flights & Stays</button>
        <div className="w-[1px] h-4 bg-white/20 mx-2" />
        <button onClick={() => setView('agency')} className="text-[10px] font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors bg-orange-400/10 px-4 py-2 rounded-full border border-orange-400/20">Agent Brand</button>
      </div>
      <ActionButton variant="primary" className="py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest" onClick={() => {}}>Connect</ActionButton>
    </div>
  </nav>
);

/**
 * MAIN VIEWS
 */
const HomeView = ({ heroImage, destinationImages, activeSearchTab, setActiveSearchTab, setView }) => (
  <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {heroImage ? <img src={heroImage} className="w-full h-full object-cover" alt="Hero" /> : <div className="w-full h-full bg-slate-950 animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-slate-50" />
      </div>
      <div className="relative z-10 w-full max-w-6xl px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 mb-8 text-[9px] font-black tracking-[0.4em] uppercase bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md">
              <Anchor className="w-3 h-3 text-orange-500" />
              <span>Official Cruise Brothers Partner</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
              WHERE TO <span className="text-orange-500 italic drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">NEXT?</span>
            </h1>
            <p className="text-white/95 text-lg md:text-2xl font-medium drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
              Unlock exclusive cruise rates and meta-search all major booking sites simultaneously to find the absolute gold standard deal.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <TravelSearchWidget activeTab={activeSearchTab} setActiveTab={setActiveSearchTab} />
            <p className="text-center mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 drop-shadow-md">Professional Booking Engine & Comparison Hub</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-32">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-200 pb-12">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-500 mb-4">Meta-Search Savings</h2>
            <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">THE HIT LIST.</p>
          </div>
          <p className="text-slate-400 font-bold max-w-xs text-sm leading-relaxed">Top cities showing the highest price discrepancy across the web.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Florida", loc: "Miami Beach", price: "189", key: "Miami Beach Florida", tag: "Beach" },
          { name: "New York", loc: "Manhattan", price: "245", key: "New York City Skyline Night", tag: "City" },
          { name: "Las Vegas", loc: "The Strip", price: "99", key: "Las Vegas Strip Neon", tag: "Fun" },
          { name: "Cancun", loc: "Resort Zone", price: "220", key: "Cancun Mexico Beach", tag: "Tropical" }
        ].map((dest, i) => (
          <ScrollReveal key={i}>
            <div className="group cursor-pointer">
              <div className="relative h-[500px] rounded-[56px] overflow-hidden shadow-2xl shadow-slate-200 mb-8 border border-white">
                {destinationImages[dest.key] ? <img src={destinationImages[dest.key]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={dest.name} /> : <div className="w-full h-full bg-slate-200 animate-pulse" />}
                <div className="absolute top-10 left-10"><span className="px-5 py-2 bg-black/40 backdrop-blur-xl rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">{dest.tag}</span></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-12 left-12 right-12 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ActionButton variant="primary" className="w-full py-5 rounded-2xl text-[10px] uppercase tracking-widest font-black" onClick={() => window.open(`https://www.jetradar.com/searches/new?marker=533943&destination_name=${dest.name}`, '_blank')}>Compare Rates</ActionButton>
                </div>
              </div>
              <div className="flex justify-between items-start px-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{dest.name}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center italic"><MapPin className="w-3 h-3 mr-1 text-orange-500" /> {dest.loc}</p>
                </div>
                <div className="text-right"><p className="text-2xl font-black text-orange-500 leading-none">${dest.price}</p><p className="text-[10px] font-bold text-slate-400 uppercase">Best Found</p></div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    <footer className="bg-black py-24 px-6 text-center">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 text-left">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-orange-500 rounded-xl"><Plane className="w-5 h-5 text-white" /></div>
                <span className="font-black text-white text-2xl tracking-tighter uppercase">TRAVELPROX</span>
             </div>
             <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Cruise Brothers Partner • Travelpayouts ID: 533943</p>
          </div>
          <button onClick={() => setView('agency')} className="text-orange-500 font-black uppercase tracking-widest text-[11px] border border-orange-500/20 px-10 py-5 rounded-full hover:bg-orange-500 hover:text-white transition-all">Launch Your Own Agent Brand</button>
       </div>
    </footer>
  </div>
);

const AgencyView = ({ setView }) => (
  <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-orange-500/30">
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.3em] uppercase bg-orange-500/10 text-orange-500 rounded-full border border-orange-500/20">
              <Building2 className="w-3 h-3" />
              <span>AGENT PORTAL</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">DON'T <br/> JUST <br/> <span className="text-orange-500">LINK.</span> <br/> BRAND.</h1>
            <p className="text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl">We help travel reps look legit. Send your clients to a high-end booking portal instead of a messy social profile.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
               <ActionButton className="w-full sm:w-auto">Build My Site</ActionButton>
               <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">Back to Booking Hub</button>
            </div>
          </div>
          <div className="bg-slate-900 p-12 md:p-20 rounded-[60px] border border-white/5 relative shadow-3xl">
             <div className="relative z-10">
               <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter italic text-orange-500">Inquire About A Page</h3>
               <div className="space-y-8">
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label><input type="text" className="w-full h-16 bg-white/5 rounded-2xl px-6 outline-none focus:ring-2 ring-orange-500/50 text-white font-bold" /></div>
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Host Agency</label><input type="text" placeholder="e.g. Cruise Brothers" className="w-full h-16 bg-white/5 rounded-2xl px-6 outline-none focus:ring-2 ring-orange-500/50 text-white font-bold placeholder:text-slate-700" /></div>
                  <ActionButton className="w-full py-7 text-lg">Send Inquiry</ActionButton>
               </div>
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
  const [heroImage, setHeroImage] = useState(null);
  const [destinationImages, setDestinationImages] = useState({});
  const [activeSearchTab, setActiveSearchTab] = useState('cruises');

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  useEffect(() => {
    const generateAllImages = async () => {
      try {
        const heroRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
          method: "POST",
          body: JSON.stringify({ instances: [{ prompt: "Drone photography of luxury overwater bungalows, crystal clear turquoise ocean, sunset Maldives, cinematic lighting" }], parameters: { sampleCount: 1 } })
        });
        const heroData = await heroRes.json();
        if (heroData.predictions?.[0]) setHeroImage(`data:image/png;base64,${heroData.predictions[0].bytesBase64Encoded}`);

        const destinations = ["Miami Beach Florida", "New York City Skyline Night", "Las Vegas Strip Neon", "Cancun Mexico Beach"];
        const destImages = {};
        for (const dest of destinations) {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
            method: "POST",
            body: JSON.stringify({ instances: [{ prompt: `Luxury travel photography of ${dest}, 4k, vibrant colors` }], parameters: { sampleCount: 1 } })
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
    <div className="overflow-x-hidden">
      <Header setView={setView} />
      {view === 'home' ? (
        <HomeView 
          heroImage={heroImage} 
          destinationImages={destinationImages} 
          activeSearchTab={activeSearchTab} 
          setActiveSearchTab={setActiveSearchTab}
          setView={setView}
        />
      ) : (
        <AgencyView setView={setView} />
      )}
    </div>
  );
};

export default App;
