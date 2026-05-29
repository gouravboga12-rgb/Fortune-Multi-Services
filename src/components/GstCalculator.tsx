import { useState } from 'react';
import { Percent } from 'lucide-react';

const GstCalculator = () => {
  // GST Calculator State
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [taxType, setTaxType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [locationType, setLocationType] = useState<'intra' | 'inter'>('intra');

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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-16 sm:py-24 bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-accent/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              GST <span className="text-accent">Calculator</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-dark-gray text-sm font-semibold leading-relaxed">
              Instantly calculate GST-exclusive and GST-inclusive amounts for any transaction.
            </p>
          </div>

          {/* Calculator Layout */}
          <div className="bg-secondary border border-light-gray rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 relative overflow-hidden">

            {/* LEFT INPUTS */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black text-dark-gray uppercase tracking-widest flex items-center gap-2">
                  <Percent className="w-4 h-4 text-accent" />
                  Transaction Amount (INR)
                </label>
                <input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-14 sm:h-16 px-5 sm:px-6 bg-primary border border-light-gray focus:border-accent rounded-2xl outline-none text-lg sm:text-xl font-black text-white transition-colors shadow-sm"
                />
                <div className="flex flex-wrap gap-2">
                  {[5000, 10000, 25000, 50000, 100000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className="px-3 sm:px-4 py-2 bg-primary hover:bg-accent/10 border border-light-gray hover:border-accent/40 text-xs font-bold text-dark-gray hover:text-white rounded-xl transition-all cursor-pointer"
                    >
                      {formatCurrency(val)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-dark-gray uppercase tracking-widest">Tax Inclusion Type</label>
                  <div className="grid grid-cols-2 p-1 bg-primary rounded-xl border border-light-gray">
                    <button
                      onClick={() => setTaxType('exclusive')}
                      className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        taxType === 'exclusive' ? 'bg-accent text-white shadow-sm' : 'text-dark-gray hover:text-white'
                      }`}
                    >
                      Exclusive
                    </button>
                    <button
                      onClick={() => setTaxType('inclusive')}
                      className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        taxType === 'inclusive' ? 'bg-accent text-white shadow-sm' : 'text-dark-gray hover:text-white'
                      }`}
                    >
                      Inclusive
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-dark-gray uppercase tracking-widest">Transaction Scope</label>
                  <div className="grid grid-cols-2 p-1 bg-primary rounded-xl border border-light-gray">
                    <button
                      onClick={() => setLocationType('intra')}
                      className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        locationType === 'intra' ? 'bg-accent text-white shadow-sm' : 'text-dark-gray hover:text-white'
                      }`}
                    >
                      Intra-State
                    </button>
                    <button
                      onClick={() => setLocationType('inter')}
                      className={`py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        locationType === 'inter' ? 'bg-accent text-white shadow-sm' : 'text-dark-gray hover:text-white'
                      }`}
                    >
                      Inter-State
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-dark-gray uppercase tracking-widest">GST Rate Slab</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={`py-4 rounded-xl text-sm font-black border transition-all cursor-pointer ${
                        gstRate === rate
                          ? 'bg-accent text-white border-accent shadow-glow'
                          : 'bg-primary border-light-gray hover:border-accent/40 text-dark-gray'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT OUTPUTS */}
            <div className="lg:col-span-5 bg-primary text-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none" />

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

          </div>
        </div>
      </div>
    </section>
  );
};

export default GstCalculator;
