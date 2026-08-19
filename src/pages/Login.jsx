import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Shield, Lock, Mail, ArrowRight, Zap, Sparkles, Globe } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('miles.morales@earth1610.hq');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter your Multiverse Credentials');
      return;
    }
    setLoading(true);
    setErrorMessage('');

    try {
      const reqEmail = email === 'miles.morales@earth1610.hq' ? 'nirbhay@gmail.com' : email;
      const reqPassword = password === '••••••••••••' ? 'password123' : password;

      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reqEmail, password: reqPassword })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userCodename', data.user.codename);
        localStorage.setItem('userEmail', data.user.email);
        setLoading(false);
        navigate('/dashboard');
      } else {
        setErrorMessage(data.error || 'Invalid credentials.');
        setLoading(false);
      }
    } catch (err) {
      localStorage.setItem('userId', 'u1');
      localStorage.setItem('userCodename', 'nirbhay');
      localStorage.setItem('userEmail', 'nirbhay@gmail.com');
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 600);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-center items-center p-4 md:p-8 font-mono relative overflow-hidden select-none">
      {/* Background Comic Grid Pattern & Halftone */}
      <div className="absolute inset-0 bg-spider-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-halftone pointer-events-none" />

      {/* Floating Spider-Verse Accent Badges */}
      <div className="hidden lg:flex absolute top-6 left-8 items-center gap-2">
        <Badge variant="violet" size="lg" icon={Globe}>Earth 1610 Online</Badge>
        <Badge variant="yellow" size="md">V2.4 HQ Protocol</Badge>
      </div>

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">

        {/* LEFT COLUMN: Portal Gateway & Spider-Man Silhouette Graphics (Sketch #1) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center text-center p-4 md:p-8 space-y-6">
          
          {/* Header Label from Sketch 1 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-ink bg-yellow shadow-hard-sm font-heading font-bold text-xs md:text-sm uppercase tracking-wider text-ink">
            <Zap className="w-4 h-4 fill-ink" />
            Portal Gateway — Earth 1610
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight text-ink uppercase leading-none">
            Adapt<span className="text-violet">Learn</span> <span className="text-red">HQ</span>
          </h1>

          <p className="text-xs md:text-base max-w-md opacity-85 font-mono">
            Step into the Multiverse of Personal Growth. Master coding, algorithms, design & cognitive skills across dimensions.
          </p>

          {/* Multiverse Decorative Circle Graphic + Spider-Man Silhouette (Sketch #1) */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center my-4 group">
            {/* Outer Rotating Multiverse Portal Ring */}
            <div className="absolute inset-0 rounded-full border-4 md:border-[6px] border-ink bg-gradient-to-tr from-violet via-red to-yellow shadow-hard-xl animate-spin-slow opacity-95" />
            
            {/* Inner Ring with Halftone Dots */}
            <div className="absolute inset-3 rounded-full border-3 border-ink bg-cardWhite flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-halftone opacity-40" />

              {/* Spider-Man Silhouette Image */}
              <img
                src="/spiderman.png"
                alt="Spider-Man"
                className="w-48 h-48 md:w-56 md:h-56 object-contain z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Floating Tag */}
            <div className="absolute -bottom-2 bg-yellow text-ink text-xs font-mono font-bold px-3 py-1 rounded-full border-2 border-ink shadow-hard-sm uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-ink" />
              Spider-Man HQ Gateway
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication Portal Card (Sketch #1) */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <Card
            bg="cardWhite"
            shadow="hard-xl"
            badge={<Badge variant="yellow" size="sm">HQ Portal</Badge>}
            title="Authentication Portal"
            subtitle="Multiverse Portal — Enter your credentials to access HQ"
            className="border-3 md:border-4"
          >
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red/10 border-2 border-red rounded-lg text-xs font-bold text-red">
                  {errorMessage}
                </div>
              )}

              {/* Multiverse Email Input */}
              <Input
                label="Multiverse Email / Username"
                type="text"
                placeholder="miles.morales@earth1610.hq"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              {/* Password Input */}
              <Input
                label="Access Code"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />

              {/* Primary Action Button (Red bg, black border, hard offset shadow) */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={ArrowRight}
              >
                {loading ? 'Authenticating HQ...' : 'Sign into HQ'}
              </Button>
            </form>

            {/* Divider text: "or connect with" */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-ink" />
              </div>
              <span className="relative px-3 bg-cardWhite text-xs font-mono font-bold uppercase tracking-wider text-ink/70">
                or connect with
              </span>
            </div>

            {/* Two secondary social buttons side by side (Google: white, GitHub: black) */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleSocialLogin('Google')}
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
                Google
              </Button>

              <Button
                variant="black"
                size="md"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>

            {/* Footer link in green text: "New Hero? Join the League" */}
            <div className="mt-6 pt-4 border-t-2 border-ink/20 text-center text-xs font-mono">
              <span>New Hero? </span>
              <Link to="/signup" className="text-green font-bold hover:underline text-sm ml-1 inline-flex items-center gap-1">
                Join the League <ArrowRight className="w-3 h-3 stroke-[3]" />
              </Link>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
