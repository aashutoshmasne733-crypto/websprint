import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { User, ShieldCheck, Mail, Globe, Award, Zap, Edit3, Save, Lock, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [heroName, setHeroName] = useState('nirbhay');
  const [email, setEmail] = useState('nirbhay@gmail.com');
  const [bio, setBio] = useState('Lead Web-Slinger & Frontend Architect across Earth-1610.');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Hero Profile Configurations Saved ✓');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto select-none">
      {/* Header Banner matching Sketch #2 */}
      <Card bg="violet" shadow="hard-lg" className="border-3 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="yellow" size="sm" icon={ShieldCheck}>
              Security Protocol Enabled
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase mt-1">
              MULTIVERSE AGENT PROFILE
            </h1>
          </div>
        </div>
      </Card>

      {/* Top 4 Stat Cards matching Sketch #2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3.5 bg-cardWhite border-2 border-ink rounded-xl shadow-hard-sm text-center">
          <div className="text-2xl font-heading font-black text-violet">3</div>
          <div className="text-[10px] font-mono font-bold text-ink/70 uppercase">Courses Enrolled</div>
        </div>
        <div className="p-3.5 bg-cardWhite border-2 border-ink rounded-xl shadow-hard-sm text-center">
          <div className="text-2xl font-heading font-black text-green">2</div>
          <div className="text-[10px] font-mono font-bold text-ink/70 uppercase">Completed</div>
        </div>
        <div className="p-3.5 bg-cardWhite border-2 border-ink rounded-xl shadow-hard-sm text-center">
          <div className="text-2xl font-heading font-black text-red">12d</div>
          <div className="text-[10px] font-mono font-bold text-ink/70 uppercase">Daily Streak</div>
        </div>
        <div className="p-3.5 bg-cardWhite border-2 border-ink rounded-xl shadow-hard-sm text-center">
          <div className="text-2xl font-heading font-black text-yellow-dark">4</div>
          <div className="text-[10px] font-mono font-bold text-ink/70 uppercase">Badges</div>
        </div>
      </div>

      {/* Main Content Layout matching Sketch #2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Large Agent Card */}
        <div className="lg:col-span-5">
          <Card bg="ink" shadow="hard-lg" className="border-3 text-white text-center flex flex-col justify-between min-h-[460px]">
            <div className="p-4 flex items-center justify-between border-b border-white/20">
              <Badge variant="yellow" size="sm">cleared v</Badge>
              <Badge variant="yellow" size="sm">Active Multiverse Hero</Badge>
            </div>

            <div className="space-y-4 py-6">
              {/* [N] Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-yellow border-3 border-ink flex items-center justify-center text-ink font-heading font-black text-3xl mx-auto shadow-hard">
                N
              </div>

              {/* Spider-Man Image */}
              <img
                src="/spiderman.png"
                alt="Spider-Man"
                className="w-32 h-32 mx-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-4 border-t border-white/20">
              <Button variant="primary" size="md" fullWidth icon={LogOut} onClick={() => navigate('/login')}>
                Sign out of HQ
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Side: Specifications & Editable fields */}
        <div className="lg:col-span-7 space-y-6">
          <Card bg="cardWhite" shadow="hard-lg" badge={<Badge variant="yellow" size="sm">Encrypted</Badge>} title="Hero Telemetry Specifications" className="border-3">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="p-3 bg-background border-2 border-ink rounded-lg font-mono text-xs text-ink/75 space-y-1.5 shadow-hard-sm">
                <div>• Hero Codename: <span className="font-bold text-ink underline">{heroName}</span></div>
                <div>• Multiverse Network Email: <span className="font-bold text-ink">{email}</span></div>
              </div>

              <Input
                label="Codename / Name"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                required
              />
              <Input
                label="Portal Network Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="yellow" size="md" icon={Save}>
                  Save Specifications
                </Button>
              </div>
            </form>
          </Card>

          {/* Bottom Badges Row matching Sketch #2 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Badge variant="red" size="sm" className="justify-center">Earth-1610 Hero</Badge>
            <Badge variant="violet" size="sm" className="justify-center">Neural Explorer</Badge>
            <Badge variant="yellow" size="sm" className="justify-center">Quantum Navigator</Badge>
            <Badge variant="green" size="sm" className="justify-center">Canon Vanguard</Badge>
          </div>
        </div>

      </div>
    </div>
  );
}
