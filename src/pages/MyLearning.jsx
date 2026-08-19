import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { PlayCircle, Clock, Award, Sparkles, BookOpen, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyLearning() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Banner matching Sketch #1 */}
      <Card bg="violet" shadow="hard-lg" className="border-3 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="yellow" size="sm" icon={Sparkles}>
              learning vault
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase mt-1">
              YOUR MULTIVERSE HISTORY
            </h1>
            <p className="text-xs md:text-sm font-mono text-white/90">
              Review your dimension quests, enrolled missions, and completed telemetry.
            </p>
          </div>
        </div>
      </Card>

      {/* Main Section matching Sketch #1 */}
      <div className="space-y-3">
        <div className="font-heading text-lg font-bold text-ink uppercase flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-red" />
          Enrolling & completed missions (0)
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Card: "you haven't enrolled in any" */}
          <div className="lg:col-span-8">
            <Card bg="cardWhite" shadow="hard-lg" className="border-3 text-center py-12 h-full flex flex-col justify-center">
              <div className="p-8 border-2 border-dashed border-ink rounded-xl max-w-md mx-auto space-y-4">
                <div className="text-4xl">🦸‍♂️</div>
                <h3 className="font-heading text-xl font-bold text-ink">You haven't enrolled in any</h3>
                <p className="text-xs font-mono text-ink/70">Explore the multiverse vault to initiate your first mission slinger!</p>
                <div className="pt-2">
                  <Button variant="primary" size="md" onClick={() => navigate('/courses')}>
                    Explore multiverse courses
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Card: Telemetry Overview */}
          <div className="lg:col-span-4">
            <Card
              bg="cardWhite"
              shadow="hard-lg"
              badge={<Badge variant="yellow" size="sm">Stats</Badge>}
              title="Telemetry overview"
              className="border-3 h-full flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-background border-2 border-ink rounded-lg text-center shadow-hard-sm">
                    <div className="text-2xl font-heading font-black text-ink">0</div>
                    <div className="text-[10px] font-mono font-bold text-ink/60 uppercase">Missions</div>
                  </div>
                  <div className="p-3 bg-background border-2 border-ink rounded-lg text-center shadow-hard-sm">
                    <div className="text-2xl font-heading font-black text-ink">0</div>
                    <div className="text-[10px] font-mono font-bold text-ink/60 uppercase">Quizzes</div>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="p-3 bg-background border-2 border-ink rounded-lg space-y-2 shadow-hard-sm">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span>Dimension Accuracy</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-white border border-ink h-3 rounded-full overflow-hidden p-0.5">
                    <div className="bg-red h-full rounded-full transition-all duration-300 w-0" />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-ink/15">
                <Button variant="secondary" size="md" fullWidth icon={BarChart2} onClick={() => navigate('/analytics')}>
                  View Full Telemetry
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
