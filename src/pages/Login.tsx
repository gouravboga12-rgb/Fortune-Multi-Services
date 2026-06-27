import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser, forgotPassword, resetPassword, loginWithGoogle, registerOtpRequest, registerVerify } from '../config/api';

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = '664816735758-opt5qk1gmm09a0dku7tmvslaaavlqrab.apps.googleusercontent.com';

const Login = () => {
  const navigate = useNavigate();
  
  // Auth Modes: 'login' | 'signup' | 'forgot' | 'reset'
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize Google Sign-in Button for both login and signup
  useEffect(() => {
    const initializeGoogle = () => {
      const g = (window as any).google;
      if (g && (authMode === 'login' || authMode === 'signup')) {
        g.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse
        });

        // Render for login page
        const loginBtn = document.getElementById('google-signin-btn');
        if (loginBtn) {
          loginBtn.innerHTML = '';
          g.accounts.id.renderButton(loginBtn, { 
            theme: 'outline', size: 'large', width: '100%',
            shape: 'rectangular', text: 'signin_with'
          });
        }

        // Render for signup page
        const signupBtn = document.getElementById('google-signup-btn');
        if (signupBtn) {
          signupBtn.innerHTML = '';
          g.accounts.id.renderButton(signupBtn, { 
            theme: 'outline', size: 'large', width: '100%',
            shape: 'rectangular', text: 'signup_with'
          });
        }
      }
    };

    const interval = setInterval(() => {
      if ((window as any).google) {
        initializeGoogle();
        clearInterval(interval);
      }
    }, 300);

    // Also try immediately in case Google script already loaded
    if ((window as any).google) initializeGoogle();

    return () => clearInterval(interval);
  }, [authMode]);

  const handleGoogleResponse = async (response: any) => {
    setError('');
    setLoading(true);
    try {
      const data = await loginWithGoogle(response.credential);
      if (data.success && data.token) {
        sessionStorage.setItem('userToken', data.token);
        sessionStorage.setItem('userEmail', data.user.email);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Google Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Connection to auth server failed. Google Sign-in could not be completed.');
    } finally {
      setLoading(false);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        // Standard email/password login
        const res = await loginUser(email, password);
        if (res.success && res.token) {
          sessionStorage.setItem('userToken', res.token);
          sessionStorage.setItem('userEmail', email.toLowerCase().trim());
          navigate('/dashboard');
        } else {
          setError(res.error || 'Invalid email or password.');
        }
      } else if (authMode === 'signup') {
        if (!otpSent) {
          // Stage 1: Send registration OTP via SMTP
          if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
          }
          if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
          }
          
          const res = await registerOtpRequest(email);
          if (res.success) {
            setOtpSent(true);
            setInfoMessage('A verification OTP code has been sent to your email.');
          } else {
            setError(res.error || 'Failed to send verification OTP.');
          }
        } else {
          // Stage 2: Verify registration OTP and create user
          if (!otpCode || otpCode.trim().length !== 6) {
            setError('Please enter a valid 6-digit verification code.');
            setLoading(false);
            return;
          }
          
          const res = await registerVerify(name, email, password, otpCode);
          if (res.success && res.token) {
            sessionStorage.setItem('userToken', res.token);
            sessionStorage.setItem('userEmail', email.toLowerCase().trim());
            setInfoMessage('Account verified and created successfully!');
            setTimeout(() => navigate('/dashboard'), 1500);
          } else {
            setError(res.error || 'Invalid or expired verification code.');
          }
        }
      } else if (authMode === 'forgot') {
        // Request OTP to reset password
        const res = await forgotPassword(email);
        if (res.success) {
          setAuthMode('reset');
          setInfoMessage('A verification OTP has been successfully sent to your email.');
        } else {
          setError(res.error || 'Failed to initiate password reset.');
        }
      } else if (authMode === 'reset') {
        // Reset password using OTP
        if (!otpCode || otpCode.trim().length !== 6) {
          setError('Please enter a valid 6-digit verification code.');
          setLoading(false);
          return;
        }
        if (newPassword.length < 6) {
          setError('New password must be at least 6 characters long.');
          setLoading(false);
          return;
        }
        
        const res = await resetPassword(email, otpCode, newPassword);
        if (res.success) {
          setAuthMode('login');
          setInfoMessage('Password reset successfully! You can now log in.');
          setOtpCode('');
          setNewPassword('');
        } else {
          setError(res.error || 'Password reset failed. Please verify your OTP code.');
        }
      }
    } catch (err) {
      setError('Connection to server failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (authMode) {
      case 'signup': return 'Create Account';
      case 'forgot': return 'Forgot Password';
      case 'reset': return 'Reset Password';
      default: return 'Welcome back!';
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case 'signup': return 'Sign up to manage your business & compliance';
      case 'forgot': return 'Enter email to receive reset code';
      case 'reset': return 'Verify OTP and create a new password';
      default: return 'Login to manage your business & compliance';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0b1329] flex flex-col items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-[#0b1329] to-[#0b1329] pointer-events-none"></div>
      
      {/* Brand Logo Header */}
      <div className="flex flex-col items-center gap-3 mb-8 relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
          <ShieldCheck className="w-7 h-7 text-accent" />
        </div>
        <span className="text-xl font-extrabold text-white tracking-widest uppercase">
          Fortune Multi Services
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 lg:p-10 relative z-10 shadow-2xl text-slate-800"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2 font-sans tracking-tight">
            {getTitle()}
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            {getSubtitle()}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {infoMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-600 text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <p>{infoMessage}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {authMode === 'signup' && !otpSent && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>
          )}

          {authMode !== 'reset' && (!otpSent || authMode === 'signup') && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  disabled={(authMode === 'forgot' && loading) || (authMode === 'signup' && otpSent)}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm disabled:opacity-50"
                />
              </div>
              {authMode === 'signup' && otpSent && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtpCode(''); }}
                    className="text-xs font-bold text-accent hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Change Email or Password
                  </button>
                </div>
              )}
            </div>
          )}

          {authMode === 'login' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {authMode === 'signup' && !otpSent && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">Create Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {((authMode === 'signup' && otpSent) || authMode === 'reset') && (
            <div className="space-y-1.5 animate-fade-in">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">Verification OTP Code</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  placeholder="Enter 6-Digit OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm tracking-wider font-mono text-center text-lg"
                />
              </div>
            </div>
          )}

          {authMode === 'reset' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type={showNewPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-accent focus:bg-white outline-none transition-all font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex items-center justify-between pt-1">
              <button 
                type="button" 
                onClick={() => { setAuthMode('forgot'); setError(''); setInfoMessage(''); }}
                className="text-xs font-bold text-accent hover:underline bg-transparent border-none cursor-pointer"
              >
                Forgot password?
              </button>
              <button 
                type="button" 
                onClick={() => setInfoMessage("If you require login support, please email support@fortunemultiservices.com")}
                className="text-xs font-medium text-slate-400 hover:underline bg-transparent border-none cursor-pointer"
              >
                Having trouble logging in?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 mt-2 shadow-[0_4px_12px_rgba(249,115,22,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Processing...' : (authMode === 'login' ? 'Login' : authMode === 'signup' ? (otpSent ? 'Verify & Register' : 'Create Account') : authMode === 'forgot' ? 'Send Reset code' : 'Reset Password')}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {authMode === 'login' && (
          <>
            <div className="text-center mt-6">
              <p className="text-sm text-slate-500 font-medium">
                Need to create an account? 
                <button 
                  type="button"
                  onClick={() => { setAuthMode('signup'); setOtpSent(false); setError(''); setInfoMessage(''); }}
                  className="text-accent font-extrabold ml-1 hover:underline bg-transparent border-none cursor-pointer"
                >
                  Sign UP
                </button>
              </p>
            </div>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Google Sign In Button */}
            <div className="mt-4">
              {/* Google Button mounting point */}
              <div className="w-full flex justify-center">
                <div id="google-signin-btn" className="w-full min-h-[44px] overflow-hidden rounded-2xl"></div>
              </div>
            </div>
          </>
        )}

        {authMode !== 'login' && (
          <div className="text-center mt-6">
            {/* Google Sign Up button — shown on signup page only */}
            {authMode === 'signup' && !otpSent && (
              <>
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <div className="w-full flex justify-center mb-4">
                  <div id="google-signup-btn" className="w-full min-h-[44px] overflow-hidden rounded-2xl"></div>
                </div>
              </>
            )}
            <button 
              type="button"
              onClick={() => { setAuthMode('login'); setOtpSent(false); setError(''); setInfoMessage(''); }}
              className="text-xs font-bold text-accent hover:underline bg-transparent border-none cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
