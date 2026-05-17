import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-soft-white flex items-center justify-center px-4">
      <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-8 lg:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/10">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-primary mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-dark-gray/60 font-medium text-sm">
            {isLogin 
              ? 'Access your business dashboard and compliance status.' 
              : 'Join Fortune Multi Services to streamline your business.'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-primary/60 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-light-gray focus:border-accent outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary/60 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-light-gray focus:border-accent outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary/60 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-light-gray focus:border-accent outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <button className="text-xs font-bold text-accent hover:underline">Forgot Password?</button>
            </div>
          )}

          <button className="btn-primary w-full py-4 rounded-xl text-sm flex items-center justify-center gap-3 group">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-light-gray text-center">
          <p className="text-sm text-dark-gray font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent font-bold ml-2 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">
          <ShieldCheck className="w-3 h-3" />
          Secure Enterprise Authentication
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
