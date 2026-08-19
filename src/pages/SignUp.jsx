import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Shield, Lock, Mail, User, ArrowRight, Sparkles } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [heroName, setHeroName] = useState('');
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-center items-center p-4 md:p-8 font-mono relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-spider-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-halftone pointer-events-none" />

      <div className="w-full max-w-md z-10 my-auto">
        <Card
          bg="cardWhite"
          shadow="hard-xl"
          badge={<Badge variant="green" size="sm">New Hero Registration</Badge>}
          title="Join the Superhero League"
          subtitle="Initialize your Earth-1610 Multiverse Credentials"
          className="border-3 md:border-4"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Hero Alias"
              placeholder="e.g. Gwen Stacy"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              icon={User}
              required
            />
            <Input
              label="Multiverse Email"
              type="email"
              placeholder="gwen@earth65.hq"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />
            <Input
              label="Create Access Code"
              type="password"
              placeholder="••••••••••••"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              icon={Lock}
              required
            />

            <Button
              type="submit"
              variant="green"
              size="lg"
              fullWidth
              icon={ArrowRight}
            >
              Initialize HQ Account
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t-2 border-ink/20 text-center text-xs font-mono">
            <span>Already have an access code? </span>
            <Link to="/login" className="text-violet font-bold hover:underline ml-1">
              Sign in to HQ →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
