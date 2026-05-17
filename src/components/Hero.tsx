import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  useEffect(() => {
    let line1Str = "Fortune";
    let line2Str = "Multi Services";
    let i = 0;
    let j = 0;

    // Type Line 1
    const interval1 = setInterval(() => {
      if (i < line1Str.length) {
        setText1((prev) => prev + line1Str.charAt(i));
        i++;
      } else {
        clearInterval(interval1);
        setShowCursor1(false);
        setShowCursor2(true);
        
        // Start Type Line 2 after a small delay
        setTimeout(() => {
          const interval2 = setInterval(() => {
            if (j < line2Str.length) {
              setText2((prev) => prev + line2Str.charAt(j));
              j++;
            } else {
              clearInterval(interval2);
              // Keep cursor blinking for a bit then fade out
              setTimeout(() => {
                setShowCursor2(false);
              }, 2000);
            }
          }, 80);
        }, 200);
      }
    }, 100);

    return () => {
      clearInterval(interval1);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 lg:pt-20 lg:pb-0 overflow-hidden bg-primary">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient opacity-80"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-accent-light text-[13px] font-bold tracking-widest uppercase">
              <Zap className="w-4 h-4 fill-accent-light" />
              <span>India's Trusted Business Partner</span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-black leading-[0.95] text-white tracking-tighter min-h-[105px] lg:min-h-[160px]">
              {text1}
              {showCursor1 && <span className="text-accent animate-pulse font-light">|</span>}
              <br />
              <span className="text-accent">
                {text2}
              </span>
              {showCursor2 && <span className="text-white animate-pulse font-light">|</span>}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
              className="text-xl text-white/70 max-w-xl leading-relaxed font-medium"
            >
              Elevate your business with elite compliance solutions. From <span className="text-white font-bold underline decoration-accent underline-offset-4">Startup Registrations</span> to <span className="text-white font-bold underline decoration-accent underline-offset-4">Global Trademarks</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link to="/contact" className="btn-accent px-10 py-5 text-lg shadow-glow">
                Start My Business
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://wa.me/918919051513" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-white hover:bg-white/10 transition-all shadow-xl"
              >
                <MessageSquare className="w-5 h-5 text-green-400" />
                Expert Consultation
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-8 pt-8"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-primary bg-slate-800 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                  <span className="text-white font-bold ml-2">4.9/5</span>
                </div>
                <p className="text-white/50 text-sm font-medium">Trusted by 5,000+ Entrepreneurs</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white/5 group">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Business Office" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="glass-card p-6 bg-white/10 border-white/20">
                  <p className="text-white font-bold">"Precision in every filing, growth in every step."</p>
                </div>
              </div>
            </div>

            {/* Float Cards */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 glass-card p-6 border-accent/30 bg-accent/10 backdrop-blur-2xl z-20 hidden xl:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[10px] text-accent-light font-bold uppercase tracking-widest">Compliance Guaranteed</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass-card p-6 bg-white/10 backdrop-blur-2xl z-20 border-white/20 hidden xl:block"
            >
              <div className="text-3xl font-black text-white">5k+</div>
              <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Satisfied Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
