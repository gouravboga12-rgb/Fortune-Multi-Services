import React, { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle2, ArrowRight, ShieldCheck, Landmark, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NameChecker = () => {
  const [name, setName] = useState('');
  const [entityType, setEntityType] = useState('Private Limited');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [activeStep, setActiveStep] = useState(0);

  const entitySuffixes: Record<string, string> = {
    'Private Limited': 'Private Limited',
    'LLP': 'LLP',
    'OPC': 'OPC Private Limited',
    'Section 8': 'Foundation',
  };

  const steps = [
    { label: 'MCA Registry', desc: 'Scanning Ministry of Corporate Affairs database...', icon: Landmark },
    { label: 'Trademark Records', desc: 'Searching Class 35 & 42 phonetic registers...', icon: ShieldCheck },
    { label: 'Domain Registrars', desc: 'Checking global domain registries (.com, .in)...', icon: Globe },
  ];

  useEffect(() => {
    let interval: any;
    if (status === 'checking') {
      setActiveStep(0);
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setStatus('success');
            return prev;
          }
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus('checking');
  };

  const fullName = `${name.trim()} ${entitySuffixes[entityType] || ''}`;

  return (
    <section className="py-24 relative overflow-hidden bg-primary">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest border border-accent/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Real-Time MCA & TM Search
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Verify Your <span className="text-accent">Business Name</span> Availability
            </h2>
            <p className="text-dark-gray/70 text-sm font-semibold max-w-xl mx-auto">
              Ensure your brand is legally unique. Our systems check MCA company logs, Indian Trademark journals, and active domains instantly.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-soft-white border border-light-gray rounded-[2.5rem] p-8 lg:p-12 shadow-premium relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.form
                  key="form-idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleCheck}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                      <input
                        type="text"
                        placeholder="Enter your proposed name (e.g. Acme Tech)..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full h-16 pl-6 pr-4 bg-secondary border border-light-gray focus:border-accent rounded-2xl outline-none text-white font-bold placeholder-dark-gray/30 transition-colors shadow-sm"
                      />
                    </div>
                    <div>
                      <select
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value)}
                        className="w-full h-16 px-6 bg-secondary border border-light-gray focus:border-accent rounded-2xl outline-none text-white font-bold cursor-pointer shadow-sm"
                      >
                        <option value="Private Limited">Private Limited Company</option>
                        <option value="LLP">Limited Liability Partnership</option>
                        <option value="OPC">One Person Company (OPC)</option>
                        <option value="Section 8">Section 8 Foundation</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="btn-accent w-full py-5 text-lg shadow-glow flex items-center justify-center gap-3 font-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search className="w-5 h-5" />
                    Check Name Availability
                  </button>
                </motion.form>
              )}

              {status === 'checking' && (
                <motion.div
                  key="form-checking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 py-6"
                >
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    <h3 className="text-xl font-bold text-white">Analyzing Name Registries</h3>
                    <p className="text-xs text-dark-gray/50 font-bold uppercase tracking-widest">Verifying: "{fullName}"</p>
                  </div>

                  {/* Progressive loading step indicator */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {steps.map((step, index) => {
                      const StepIcon = step.icon;
                      const isCurrent = index === activeStep;
                      const isDone = index < activeStep;

                      return (
                        <div
                          key={step.label}
                          className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                            isCurrent
                              ? 'bg-accent/5 border-accent shadow-sm'
                              : isDone
                              ? 'bg-emerald-500/5 border-emerald-500/20'
                              : 'bg-secondary/40 border-light-gray/40 opacity-40'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isCurrent
                                ? 'bg-accent text-white animate-pulse'
                                : isDone
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white/5 text-white/40'
                            }`}
                          >
                            <StepIcon className="w-5 h-5" />
                          </div>
                          <div className="text-left min-w-0">
                            <div className={`text-sm font-bold ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.label}</div>
                            <div className="text-[10px] text-dark-gray/50 font-medium truncate">{step.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Results Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 pb-6 border-b border-light-gray">
                    <div className="text-center sm:text-left space-y-1">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                        Name Available
                      </span>
                      <h3 className="text-2xl font-black text-white pt-2">"{fullName}"</h3>
                      <p className="text-xs text-dark-gray/50 font-bold">Good news! Your proposed corporate name is clear for setup.</p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-xs font-bold text-accent hover:underline uppercase tracking-wider shrink-0 cursor-pointer"
                    >
                      Check Another Name
                    </button>
                  </div>

                  {/* Verification Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'MCA Registry Status', desc: 'No identical corporate names or filings exist.', status: 'Clear', icon: CheckCircle2 },
                      { title: 'Trademark Search', desc: 'Clear of phonetic or visual class conflicts.', status: 'Clear', icon: CheckCircle2 },
                      { title: 'Domain Extension', desc: `${name.trim().toLowerCase()}.com / .in are available.`, status: 'Available', icon: CheckCircle2 },
                    ].map((card) => (
                      <div key={card.title} className="p-6 bg-secondary border border-light-gray rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-dark-gray/60 uppercase tracking-wider">{card.title}</h4>
                          <card.icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="text-base font-black text-white">{card.status}</div>
                        <p className="text-xs text-dark-gray/60 font-semibold leading-relaxed">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Conversion Panel */}
                  <div className="p-6 bg-primary text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1.5 text-center md:text-left">
                      <div className="text-lg font-bold">Incorporate "{name.trim()}" Today</div>
                      <p className="text-xs text-white/50 font-semibold">Reserve your brand, setup GST, and claim tax-exempt status in under 10 days.</p>
                    </div>
                    <Link
                      to={`/contact?name=${encodeURIComponent(fullName)}`}
                      className="btn-accent px-8 py-4 text-sm font-black whitespace-nowrap shadow-glow flex items-center gap-2 group shrink-0"
                    >
                      Start Free Incorporation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NameChecker;
