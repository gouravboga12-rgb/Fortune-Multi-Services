import { useState } from 'react';
import { Percent, Landmark, Sparkles } from 'lucide-react';

const GstCalculator = () => {
  const [activeTab, setActiveTab] = useState<'gst' | 'startup'>('gst');

  // GST Calculator State
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [taxType, setTaxType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [locationType, setLocationType] = useState<'intra' | 'inter'>('intra');

  // Startup Cost Estimator State
  const [selectedEntity, setSelectedEntity] = useState<'pvt' | 'llp' | 'opc'>('pvt');
  const [includeGst, setIncludeGst] = useState(true);
  const [includeMsme, setIncludeMsme] = useState(true);
  const [includeTrademark, setIncludeTrademark] = useState(false);

  // GST Calculations
  const calculateGst = () => {
    let gstAmt = 0;
    let netAmt = 0;
    let totalAmt = 0;

    if (taxType === 'exclusive') {
      netAmt = amount;
      gstAmt = (amount * gstRate) / 100;
      totalAmt = amount + gstAmt;
    } else {
      totalAmt = amount;
      netAmt = (amount * 100) / (100 + gstRate);
      gstAmt = amount - netAmt;
    }

    return {
      netAmount: Math.round(netAmt * 100) / 100,
      gstAmount: Math.round(gstAmt * 100) / 100,
      totalAmount: Math.round(totalAmt * 100) / 100,
      cgst: Math.round((gstAmt / 2) * 100) / 100,
      sgst: Math.round((gstAmt / 2) * 100) / 100,
      igst: Math.round(gstAmt * 100) / 100,
    };
  };

  const gstResults = calculateGst();

  // Startup Estimator Calculations
  const calculateStartupCosts = () => {
    const baseFees = {
      pvt: { gov: 2500, professional: 5000, desc: 'Private Limited Company setup' },
      llp: { gov: 1500, professional: 4000, desc: 'Limited Liability Partnership' },
      opc: { gov: 2000, professional: 4500, desc: 'One Person Company' }
    };

    const currentBase = baseFees[selectedEntity];
    let totalGov = currentBase.gov;
    let totalProf = currentBase.professional;

    const addons = [];

    if (includeGst) {
      totalProf += 1999;
      addons.push({ name: 'GST Setup', cost: 1999, type: 'Professional' });
    }
    if (includeMsme) {
      addons.push({ name: 'MSME Registration', cost: 0, type: 'Complimentary' });
    }
    if (includeTrademark) {
      totalGov += 4500;
      totalProf += 3500;
      addons.push({ name: 'Trademark Search & Filing', cost: 8000, type: 'Gov + Prof' });
    }

    return {
      baseDesc: currentBase.desc,
      govFees: totalGov,
      profFees: totalProf,
      totalCost: totalGov + totalProf,
      addons
    };
  };

  const startupResults = calculateStartupCosts();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-24 bg-soft-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-primary/5 blur-[150px] rounded-full"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-primary leading-tight tracking-tight">
              Corporate <span className="text-accent">Compliance Tools</span> & Calculators
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
            <p className="text-dark-gray/70 text-sm font-semibold leading-relaxed">
              Plan your corporate finances and legal budgets securely with our automated calculations panels.
            </p>

            {/* Selector Tabs */}
            <div className="flex w-full max-w-md mx-auto p-1 bg-primary/5 rounded-2xl border border-primary/10 mt-6">
              <button
                onClick={() => setActiveTab('gst')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                  activeTab === 'gst' ? 'bg-primary text-white shadow-md' : 'text-primary/60 hover:text-primary'
                }`}
              >
                GST Calculator
              </button>
              <button
                onClick={() => setActiveTab('startup')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                  activeTab === 'startup' ? 'bg-primary text-white shadow-md' : 'text-primary/60 hover:text-primary'
                }`}
              >
                Startup Cost Estimator
              </button>
            </div>
          </div>

          {/* Calculator Layout */}
          <div className="bg-white border border-light-gray rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative overflow-hidden">
            {activeTab === 'gst' ? (
              <>
                {/* GST LEFT INPUTS */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <Percent className="w-4 h-4 text-accent" />
                      Transaction Amount (INR)
                    </label>
                    <input
                      type="number"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-16 px-6 bg-soft-white border border-light-gray focus:border-accent rounded-2xl outline-none text-xl font-black text-primary transition-colors shadow-sm"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[5000, 10000, 25000, 50000, 100000].map((val) => (
                        <button
                          key={val}
                          onClick={() => setAmount(val)}
                          className="px-4 py-2 bg-soft-white hover:bg-primary/5 border border-light-gray hover:border-primary/20 text-xs font-bold text-dark-gray hover:text-primary rounded-xl transition-all cursor-pointer"
                        >
                          {formatCurrency(val)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-primary uppercase tracking-widest">Tax Inclusion Type</label>
                      <div className="grid grid-cols-2 p-1 bg-soft-white rounded-xl border border-light-gray">
                        <button
                          onClick={() => setTaxType('exclusive')}
                          className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                            taxType === 'exclusive' ? 'bg-primary text-white shadow-sm' : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          GST Exclusive
                        </button>
                        <button
                          onClick={() => setTaxType('inclusive')}
                          className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                            taxType === 'inclusive' ? 'bg-primary text-white shadow-sm' : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          GST Inclusive
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-primary uppercase tracking-widest">Transaction Scope</label>
                      <div className="grid grid-cols-2 p-1 bg-soft-white rounded-xl border border-light-gray">
                        <button
                          onClick={() => setLocationType('intra')}
                          className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                            locationType === 'intra' ? 'bg-primary text-white shadow-sm' : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          Intra-State
                        </button>
                        <button
                          onClick={() => setLocationType('inter')}
                          className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                            locationType === 'inter' ? 'bg-primary text-white shadow-sm' : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          Inter-State
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">GST Rate Slab</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 12, 18, 28].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setGstRate(rate)}
                          className={`py-4 rounded-xl text-sm font-black border transition-all cursor-pointer ${
                            gstRate === rate
                              ? 'bg-accent text-white border-accent shadow-glow'
                              : 'bg-soft-white border-light-gray hover:border-accent/40 text-primary'
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* GST RIGHT OUTPUTS */}
                <div className="lg:col-span-5 bg-primary text-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none"></div>

                  <div className="space-y-6 relative z-10">
                    <div className="pb-4 border-b border-white/10 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Calculation Sheet</span>
                      <span className="text-[10px] font-black bg-accent text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                        {taxType === 'exclusive' ? 'Exclusive' : 'Inclusive'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-white/60">Net Base Price:</span>
                        <span className="text-sm font-bold">{formatCurrency(gstResults.netAmount)}</span>
                      </div>

                      {locationType === 'intra' ? (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-white/60">CGST ({gstRate / 2}%):</span>
                            <span className="text-sm font-bold text-accent-light">{formatCurrency(gstResults.cgst)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-white/60">SGST ({gstRate / 2}%):</span>
                            <span className="text-sm font-bold text-accent-light">{formatCurrency(gstResults.sgst)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-white/60">IGST ({gstRate}%):</span>
                          <span className="text-sm font-bold text-accent-light">{formatCurrency(gstResults.igst)}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-3 border-t border-white/10">
                        <span className="text-xs font-semibold text-white/60">Tax Component:</span>
                        <span className="text-sm font-bold text-accent-light">{formatCurrency(gstResults.gstAmount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-white/60 uppercase tracking-widest pb-1">Gross Total:</span>
                      <span className="text-3xl font-black tracking-tight text-white">{formatCurrency(gstResults.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* STARTUP LEFT INPUTS */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-accent" />
                      Select Legal Entity
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'pvt', label: 'Private Limited', desc: 'VC & Scale ready' },
                        { id: 'llp', label: 'LLP Partnership', desc: 'Minimal compliance' },
                        { id: 'opc', label: 'One Person Company', desc: 'Single promoter' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedEntity(item.id as any)}
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${
                            selectedEntity === item.id
                              ? 'bg-accent/5 border-accent shadow-sm'
                              : 'bg-soft-white border-light-gray hover:border-accent/40'
                          }`}
                        >
                          <div className={`text-xs font-black ${selectedEntity === item.id ? 'text-accent-dark' : 'text-primary'}`}>{item.label}</div>
                          <div className="text-[10px] text-dark-gray/50 font-medium leading-none pt-2">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      Incorporate Add-Ons
                    </label>
                    <div className="space-y-3">
                      {[
                        { id: 'gst', label: 'GSTIN Registration', cost: '₹1,999', desc: 'Mandatory for interstate supply and immediate ITC claims.', active: includeGst, set: setIncludeGst },
                        { id: 'msme', label: 'MSME Udyam Certificate', cost: 'Complimentary', desc: 'Unlocks micro-lending programs, corporate discounts, and 45-day payment protections.', active: includeMsme, set: setIncludeMsme },
                        { id: 'tm', label: 'Trademark filing & Class Search', cost: '₹8,000', desc: 'Includes deep database query search and formal USP/Journal filing fees.', active: includeTrademark, set: setIncludeTrademark }
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => item.set(!item.active)}
                          className={`p-4 rounded-2xl border flex items-start gap-4 transition-all cursor-pointer ${
                            item.active ? 'bg-accent/5 border-accent' : 'bg-soft-white border-light-gray hover:border-accent/30'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={item.active}
                            onChange={() => {}} // Controlled via parent click
                            className="mt-1 accent-accent"
                          />
                          <div className="text-left min-w-0 flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-primary">{item.label}</span>
                              <span className="text-xs font-black text-accent-dark">{item.cost}</span>
                            </div>
                            <p className="text-[10px] text-dark-gray/60 font-semibold leading-relaxed mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STARTUP RIGHT OUTPUTS */}
                <div className="lg:col-span-5 bg-primary text-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none"></div>

                  <div className="space-y-6 relative z-10">
                    <div className="pb-4 border-b border-white/10 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Budget Breakdown</span>
                      <span className="text-[10px] font-black bg-accent text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                        Estimate
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Entity Base</div>
                        <div className="text-sm font-bold text-accent-light">{startupResults.baseDesc}</div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-semibold text-white/60">Government Stamping & Stamp Duty:</span>
                        <span className="text-sm font-bold">{formatCurrency(startupResults.govFees)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-white/60">Professional Filing Fees:</span>
                        <span className="text-sm font-bold">{formatCurrency(startupResults.profFees)}</span>
                      </div>

                      {startupResults.addons.length > 0 && (
                        <div className="pt-3 border-t border-white/10 space-y-2">
                          <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Included Add-ons</div>
                          {startupResults.addons.map((add) => (
                            <div key={add.name} className="flex justify-between items-center">
                              <span className="text-xs text-white/60 truncate max-w-[200px]">{add.name}:</span>
                              <span className="text-xs font-semibold text-accent-light">{add.cost === 0 ? 'FREE' : formatCurrency(add.cost)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-white/60 uppercase tracking-widest pb-1">Estimated Setup:</span>
                      <span className="text-3xl font-black tracking-tight text-white">{formatCurrency(startupResults.totalCost)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GstCalculator;
