
import React, { useState } from 'react';
import { MoveRight, MapPin, AlertCircle, CalendarDays, ShieldCheck, Plane } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ActionButton } from '../components/ActionButton';
import { TravelSearchWidget } from '../components/TravelSearchWidget';
import { ImageData, SearchTab, ViewState } from '../types';

interface HomeViewProps {
  images: ImageData;
  activeSearchTab: SearchTab;
  setActiveSearchTab: (tab: SearchTab) => void;
  setView: (view: ViewState) => void;
  openWaitlist: () => void;
  spotsRemaining: number;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  images, 
  activeSearchTab,
  setActiveSearchTab,
  setView, 
  openWaitlist,
  spotsRemaining
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleRequestAccess = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
      openWaitlist();
    }, 500);
  };

  const destinations = [
    { name: "Florida", loc: "Miami Beach", price: "189", key: "Miami Beach Florida", tag: "Coastline" },
    { name: "New York", loc: "Manhattan", price: "245", key: "New York City Skyline Night", tag: "Metropolis" },
    { name: "Las Vegas", loc: "The Strip", price: "99", key: "Las Vegas Strip Neon", tag: "Entertainment" },
    { name: "Cancun", loc: "Resort Zone", price: "220", key: "Cancun Mexico Beach", tag: "Retreat" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-40">
        <div className="absolute inset-0 z-0">
          {images.hero ? (
            <img src={images.hero} className="w-full h-full object-cover" alt="Hero" />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl px-6 text-center">
          <ScrollReveal>
            <div className="mb-16">
              <h1 className="text-6xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-[0.8] uppercase drop-shadow-2xl">
                UNLISTED <br/> <span className="text-yellow-400 italic">PORTAL.</span>
              </h1>
              <p className="text-white text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow-md">
                Experience the world's most exclusive destinations with private member rates. Wholesale travel pricing, hidden from the public market.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <ActionButton 
                  variant="primary" 
                  className={`w-full md:w-auto px-12 py-6 text-lg ${isBouncing ? 'animate-bounce-click' : ''}`} 
                  onClick={handleRequestAccess}
                >
                  {spotsRemaining > 0 ? 'Request Membership Invitation' : 'Join Membership Queue'}
                </ActionButton>
                <button 
                  onClick={() => document.getElementById('search-engine')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="group text-white font-black text-[11px] uppercase tracking-[0.4em] flex items-center hover:text-yellow-400 transition-colors"
                >
                  Explore Public Rates <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
            <div className="max-w-6xl mx-auto relative z-20" id="search-engine">
              <TravelSearchWidget 
                activeTab={activeSearchTab} 
                setActiveTab={setActiveSearchTab} 
                onSearchAttempt={openWaitlist}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-12">
            <div className="text-left">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-600 mb-4">Current Availability</h2>
              <p className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">THE HIT LIST.</p>
            </div>
            <p className="text-slate-400 font-bold max-w-xs text-sm leading-relaxed text-right">
              Public market baseline shown below. Member-only wholesale rates available through the unlisted portal.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, i) => (
            <ScrollReveal key={i}>
              <div className="group cursor-pointer">
                <div className="relative h-[480px] rounded-[48px] overflow-hidden mb-8 border border-slate-100 shadow-sm bg-slate-100">
                  {images.destinations[dest.key] ? (
                    <img 
                      src={images.destinations[dest.key]} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={dest.name} 
                    />
                  ) : (
                    <div className="w-full h-full animate-pulse bg-slate-200" />
                  )}
                  <div className="absolute top-10 left-10">
                    <span className="px-5 py-2 bg-yellow-400/90 backdrop-blur-xl rounded-full text-[10px] font-black text-slate-950 uppercase tracking-widest">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute bottom-12 left-12 right-12 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <ActionButton variant="waitlist" className="w-full py-4 rounded-2xl text-[10px] uppercase tracking-widest font-black" onClick={openWaitlist}>
                      Unlock Private Rate
                    </ActionButton>
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{dest.name}</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center italic">
                      <MapPin className="w-3 h-3 mr-1 text-amber-600" /> {dest.loc}
                    </p>
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
               <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-950 mx-auto mb-8">
                <AlertCircle className="w-8 h-8" />
               </div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Boutique Access</h4>
               <p className="text-slate-500 font-medium leading-relaxed">
                Wholesale providers mandate private access to protect their retail brand parity. We only release limited allotments.
               </p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-yellow-400 mx-auto mb-8">
                <CalendarDays className="w-8 h-8" />
               </div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">The Monthly Release</h4>
               <p className="text-slate-500 font-medium leading-relaxed">
                Exactly 100 new membership invitations are minted on the 1st of every month. Once claimed, the portal closes.
               </p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mx-auto mb-8">
                <ShieldCheck className="w-8 h-8" />
               </div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Verified Member Only</h4>
               <p className="text-slate-500 font-medium leading-relaxed">
                Once admitted, you get direct access to the wholesaler backbone. No middleman markups, ever.
               </p>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-white text-center">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-[0.9]">
               DON'T MISS THE <br/> <span className="text-amber-600 italic underline decoration-yellow-400 decoration-8 underline-offset-8">NEXT COHORT.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto">
               Join 12,000+ applicants currently in the queue. New invitations are released at the start of each month.
            </p>
            <ActionButton variant="secondary" className="mx-auto px-16 py-6" onClick={openWaitlist}>
               Submit My Invitation Request
            </ActionButton>
         </div>
      </section>

      <footer className="bg-white py-24 px-6 border-t border-slate-100">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
            <div className="flex flex-col items-center md:items-start">
               <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-yellow-400 rounded-xl">
                    <Plane className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="font-black text-slate-950 text-2xl tracking-tighter uppercase">
                    TRAVELPRO<span className="text-amber-600">X</span>
                  </span>
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                Private Wholesale • Global Portals • Unlisted Search • Est. 2014
               </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
               <ActionButton 
                variant="secondary"
                onClick={() => setView('agency')} 
                className="px-10 py-5 rounded-full text-[11px]"
               >
                Promoters Apply Here
               </ActionButton>
            </div>
         </div>
      </footer>
    </div>
  );
};
