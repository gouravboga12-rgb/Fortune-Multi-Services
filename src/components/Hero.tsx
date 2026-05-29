import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import heroConsulting from '../assets/hero_consulting.png';

const trustedAvatars = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
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
          timeoutId = setTimeout(() => {
            if (!active) return;
            setShowCursor2(false);
          }, 2000);
        }
      }, 80);
    };

    typeLine1();

    return () => {
      active = false;
      clearInterval(timer1);
      clearInterval(timer2);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 sm:pt-24 lg:pt-20 lg:pb-0 overflow-x-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src={heroConsulting}
          alt="Consulting Background"
          className="w-full h-full object-cover object-right lg:object-center"
        />
        {/* Dark overlay on mobile for text readability */}
        <div className="absolute inset-0 bg-primary/85 lg:hidden" />
        {/* Gradient on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent hidden lg:block z-10" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/15 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="w-full relative z-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-8">
          <div className="max-w-3xl lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-9 lg:pr-8 space-y-5 sm:space-y-7 lg:space-y-10">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-accent-light text-[11px] sm:text-[13px] font-bold tracking-wider uppercase"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent-light shrink-0" />
                <span>India's Trusted Business Partner</span>
              </motion.div>

              {/* Heading */}
              <h1 className="text-[2.75rem] sm:text-5xl lg:text-8xl font-black leading-[1.05] tracking-tighter overflow-visible">
                <span className="block pb-2 pr-6 overflow-visible">
                  <span
                    className="italic"
                    style={{
                      display: 'inline-block',
                      paddingRight: '0.18em',
                      marginRight: '-0.15em',
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
                      style={{ color: 'var(--color-accent-light)', WebkitTextFillColor: 'var(--color-accent-light)' }}
                    >|</span>
                  )}
                </span>

                <span className="block relative mt-1">
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 35%, #38BDF8 60%, #0EA5E9 80%, #0284C7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 24px rgba(14, 165, 233, 0.4))',
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
                  {text2.length === 14 && (
                    <span
                      className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                      style={{
                        width: '55%',
                        background: 'linear-gradient(90deg, #0284C7, #0EA5E9, #38BDF8, transparent)',
                        boxShadow: '0 0 12px 2px rgba(14, 165, 233, 0.5)',
                      }}
                    />
                  )}
                </span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
                className="text-sm sm:text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed font-medium"
              >
                Elevate your business with elite compliance solutions. From{' '}
                <span className="text-white font-bold underline decoration-accent underline-offset-4">Startup Registrations</span>{' '}
                to{' '}
                <span className="text-white font-bold underline decoration-accent underline-offset-4">Global Trademarks</span>.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/contact"
                  className="btn-accent px-7 py-4 text-sm sm:text-base shadow-glow text-center"
                >
                  Start My Business
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918919051513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-white hover:bg-white/10 transition-all text-sm sm:text-base"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  Expert Consultation
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-4 sm:gap-8"
              >
                <div className="flex -space-x-3">
                  {trustedAvatars.map((url, idx) => (
                    <div
                      key={idx}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-primary bg-slate-800 overflow-hidden"
                    >
                      <img src={url} alt={`Entrepreneur ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-accent text-accent" />
                    ))}
                    <span className="text-white font-bold ml-1.5 text-xs sm:text-sm">4.9/5</span>
                  </div>
                  <p className="text-white/50 text-xs font-medium">Trusted by 5,000+ Entrepreneurs</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
