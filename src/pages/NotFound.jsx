import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Home, Sparkles, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col items-center justify-center p-4 font-mono select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-spider-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-halftone pointer-events-none" />

      <Card
        bg="cardWhite"
        shadow="hard-xl"
        className="border-3 md:border-4 max-w-lg w-full text-center space-y-6 p-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red text-white text-xs font-bold font-heading border-2 border-ink">
          <AlertTriangle className="w-4 h-4" /> Dimension Anomaly
        </div>

        {/* Big 404 in Archivo Black */}
        <div className="font-heading text-7xl md:text-9xl font-black text-ink tracking-tighter leading-none select-none">
          4<span className="text-violet">0</span><span className="text-red">4</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-ink uppercase">
            This universe doesn't exist... yet.
          </h2>
          <p className="text-xs md:text-sm font-mono text-ink/70 max-w-sm mx-auto">
            You've glitched into an uncharted dimension outside Earth-1610 HQ telemetry.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <Button
            variant="yellow"
            size="lg"
            icon={Home}
            onClick={() => navigate('/dashboard')}
          >
            Back to HQ Portal
          </Button>
        </div>
      </Card>
    </div>
  );
}
