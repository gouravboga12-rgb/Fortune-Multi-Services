import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeToast = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast after 1.5 seconds delay on initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-3 sm:bottom-6 left-3 right-3 md:left-auto md:right-8 md:w-[380px] z-40"
        >
          <div className="bg-secondary backdrop-blur-md border border-accent/20 shadow-premium p-6 rounded-2xl relative overflow-hidden flex flex-col gap-5">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full"></div>
            
            {/* Top Row: Info & Close */}
            <div className="flex gap-4 items-start">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              </div>

              {/* Title & Body */}
              <div className="flex-1 pr-6">
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">
                  Welcome to Fortune Multi Services
                </h4>
                <p className="text-xs text-dark-gray font-semibold leading-relaxed">
                  We are glad you are here! Explore our expert corporate licensing, tax compliances, and registrations to scale your business.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-dark-gray hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Dismiss welcome message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Row: Actions */}
            <div className="flex flex-col gap-2">
              <Link
                to="/services/registrations/udyam-registration"
                onClick={handleDismiss}
                className="group flex items-center justify-between px-4 py-3 bg-accent hover:bg-accent/90 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-glow cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Check MSME Udyam Registration
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/#our-services"
                onClick={handleDismiss}
                className="flex items-center justify-center gap-1.5 py-2.5 text-dark-gray/60 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors border border-dashed border-light-gray hover:border-accent/30 rounded-xl bg-primary/50 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-accent" />
                Explore All Services
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeToast;
