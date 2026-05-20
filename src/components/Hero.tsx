import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import heroConsulting from '../assets/hero_consulting.png';

const trustedAvatars = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100', // Elite businesswoman / founder
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', // Professional corporate consultant
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100', // Successful tech entrepreneur
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', // Senior business executive
];

const Hero = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  useEffect(() => {
    let active = true;
    let timer1: any;
    let timer2: any;
    let timeoutId: any;

    let line1Str = "Fortune";
    let line2Str = "Multi Services";
    let i = 0;
    let j = 0;

    // Reset states initially
    setText1('');
    setText2('');
    setShowCursor1(true);
    setShowCursor2(false);

    const typeLine1 = () => {
      timer1 = setInterval(() => {
        if (!active) return;
        if (i < line1Str.length) {
          setText1(line1Str.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer1);
          if (!active) return;
          setShowCursor1(false);
          setShowCursor2(true);
          
          // Delay before starting line 2
          timeoutId = setTimeout(() => {
            if (!active) return;
            typeLine2();
          }, 300);
        }
      }, 100);
    };

    const typeLine2 = () => {
      timer2 = setInterval(() => {
        if (!active) return;
        if (j < line2Str.length) {
          setText2(line2Str.substring(0, j + 1));
          j++;
        } else {
          clearInterval(timer2);
          if (!active) return;
          // Keep cursor blinking then hide it
          timeoutId = setTimeout(() => {
            if (!active) return;
            setShowCursor2(false);
          }, 2000);
        }
      }, 80);
    };

    // Start the typing sequence
    typeLine1();

    return () => {
      active = false;
      clearInterval(timer1);
      clearInterval(timer2);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 lg:pt-20 lg:pb-0 overflow-hidden bg-primary">
      {/* Background Image with Crisp, High-Contrast Responsive Overlays */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img 
          src={heroConsulting} 
          alt="Consulting Background" 
          className="w-full h-full object-cover object-right lg:object-center"
        />
        {/* Soft protective dark blue overlay on mobile to guarantee typography readability */}
        <div className="absolute inset-0 bg-primary/80 lg:hidden"></div>
        
        {/* Advanced horizontal linear gradient on desktop: deep brand blue on the left (under text) fading completely to transparent on the right (showcasing the vibrant corporate photo) */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent hidden lg:block z-10"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="space-y-10 lg:col-span-9 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-accent-light text-[13px] font-bold tracking-widest uppercase"
            >
              <Zap className="w-4 h-4 fill-accent-light" />
              <span>India's Trusted Business Partner</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black leading-[0.95] tracking-tighter min-h-[90px] sm:min-h-[105px] lg:min-h-[180px]">
              {/* "Fortune" — Italic pearl-white; paddingRight prevents italic 'e' from clipping */}
              <span className="block" style={{ overflow: 'visible' }}>
                <span
                  className="italic"
                  style={{
                    display: 'inline-block',
                    paddingRight: '0.15em',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f5ecd4 30%, #ffffff 55%, #e8dfc8 85%, #fff8ec 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {text1}
                </span>
                {showCursor1 && (
                  <span
                    className="animate-pulse font-light not-italic"
                    style={{ color: '#D97706', WebkitTextFillColor: '#D97706' }}
                  >|</span>
                )}
              </span>

              {/* "Multi Services" — Exact brand amber gradient (#D97706 → #F59E0B) matching UI buttons & logo */}
              <span className="block relative" style={{ overflow: 'visible' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 35%, #FBBF24 60%, #F59E0B 80%, #D97706 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 24px rgba(217, 119, 6, 0.5)) drop-shadow(0 2px 10px rgba(245, 158, 11, 0.3))',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {text2}
                </span>
                {showCursor2 && (
                  <span
                    className="animate-pulse font-light"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                  >|</span>
                )}
                {/* Decorative accent underline — brand amber glow */}
                {text2.length === 14 && (
                  <span
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                    style={{
                      width: '55%',
                      background: 'linear-gradient(90deg, #D97706, #F59E0B, #FBBF24, transparent)',
                      boxShadow: '0 0 12px 2px rgba(217,119,6,0.5)',
                    }}
                  />
                )}
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
              className="text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed font-medium"
            >
              Elevate your business with elite compliance solutions. From <span className="text-white font-bold underline decoration-accent underline-offset-4">Startup Registrations</span> to <span className="text-white font-bold underline decoration-accent underline-offset-4">Global Trademarks</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact" className="btn-accent px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg shadow-glow text-center">
                Start My Business
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://wa.me/918919051513" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-white hover:bg-white/10 transition-all shadow-xl text-base sm:text-lg"
              >
                <MessageSquare className="w-5 h-5 text-green-400" />
                Expert Consultation
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 sm:gap-8 pt-8"
            >
              <div className="flex -space-x-3">
                {trustedAvatars.map((url, i) => (
                  <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary bg-slate-800 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    <img src={url} alt={`Elite Entrepreneur ${i + 1}`} />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                  <span className="text-white font-bold ml-2 text-sm">4.9/5</span>
                </div>
                <p className="text-white/50 text-xs sm:text-sm font-medium">Trusted by 5,000+ Entrepreneurs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
