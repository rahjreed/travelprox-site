import MembershipPlans from '../../components/public/MembershipPlans';
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
import ScrollReveal from '../../components/public/ScrollReveal';
import ActionButton from '../../components/public/ActionButton';
import TravelerQuiz from '../../components/public/TravelerQuiz';
import * as assets from '../../config/publicAssets';
const {OFFICIAL_HERO_IMAGE,ALTERNATIVE_HERO_IMAGE,TESTIMONIAL_VIDEO_URL,PERKS_VIDEO_URL,DIAGNOSTIC_VIDEO_URL,ROGER_PROFILE_IMAGE,DESTINATION_ASSETS,SAVINGS_FEED}=assets;
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
              
              <p className="text-white text-xl sm:text-3xl md:text-4xl font-black max-w-4xl mx-auto leading-tight drop-shadow-lg opacity-95">
                Congratulations! You just found the last travel marketing software you'll ever need.
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
              <a href="/login/" className="rounded-xl border border-slate-300 px-6 py-4 text-slate-950 font-black uppercase text-xs tracking-widest">Member Login</a>
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
            {[['01','Capture attention','Create short-form social content that earns the next few seconds.',Camera],['02','Spark curiosity','Give viewers a compelling reason to visit your website.',Sparkles],['03','Invite participation','Use easy quiz questions to turn passive viewers into active participants.',CheckCircle2],['04','Personalize','Show relevant information based on their answers.',MapPin],['05','Connect','Invite interested prospects to share their details and continue the conversation.',Users]].map(([n,title,desc,Icon])=><div key={n} className="group relative overflow-hidden rounded-3xl bg-slate-950 border border-amber-400/30 p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent pointer-events-none"/>
              <div className="relative">
                <div className="flex items-center justify-between mb-6"><span className="text-amber-300 font-black text-xs tracking-widest">STEP {n}</span><Plane aria-hidden="true" className="w-4 h-4 text-amber-400/60 rotate-45"/></div>
                <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.15)] group-hover:scale-105 transition-transform"><Icon aria-hidden="true" className="w-10 h-10 text-amber-300" strokeWidth={1.6}/><span aria-hidden="true" className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-950"/></span></div>
                <h3 className="text-xl font-black uppercase text-white mb-3">{title}</h3><p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>)}
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
          <a href="/#pricing" className="inline-flex mt-9 rounded-xl bg-slate-950 text-amber-400 font-black uppercase text-xs tracking-widest px-8 py-5">Explore Memberships →</a>
        </div>
      </section>

      <MembershipPlans/>
      <footer className="bg-white border-t border-slate-200 py-12 px-5 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-5 text-xs uppercase font-black tracking-widest text-slate-700"><a href="/#pricing">Memberships</a><a href="/login/">Member Login</a></div>
        <p className="text-xs text-slate-500">© 2026 Travel Pro X · <a href="https://www.callistadigital.com/">A Callista Digital Company</a></p>
      </footer>
    </div>
  );
};

export default HomeView;