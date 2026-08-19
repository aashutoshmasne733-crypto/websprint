import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { BarChart3, Clock, Zap, Award, Sparkles, PieChart as PieIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function Analytics() {
  const learningTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 3.0 },
    { day: 'Thu', hours: 5.8 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 7.2 },
  ];

  const accuracyData = [
    { day: 'Week 1', score: 70 },
    { day: 'Week 2', score: 85 },
    { day: 'Week 3', score: 78 },
    { day: 'Week 4', score: 92 },
    { day: 'Week 5', score: 88 },
  ];

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner matching Sketch #3 */}
      <Card bg="red" shadow="hard-lg" className="border-3 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="yellow" size="sm" icon={BarChart3}>Telemetry HQ</Badge>
            <h1 className="font-heading text-2xl md:text-3xl font-black uppercase mt-1">
              MULTIVERSE COGNITIVE TELEMETRY
            </h1>
            <p className="text-xs md:text-sm font-mono text-white/90">
              Live tracking of your learning outputs, test accuracies, and cognitive capacity.
            </p>
          </div>
        </div>
      </Card>

      {/* 4 Stat Cards matching Sketch #3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Daily Time */}
        <Card bg="cardWhite" shadow="hard-sm" className="border-2 text-center p-4">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-violet" />
            <span className="text-[10px] font-bold text-green bg-green/20 px-1.5 rounded border border-ink">+10%</span>
          </div>
          <div className="font-heading text-xl font-black text-ink mt-2">2.7h</div>
          <div className="text-[10px] font-bold uppercase text-ink/60 mt-1">Avg Daily Time</div>
        </Card>

        {/* Card 2: Quiz Accuracy */}
        <Card bg="cardWhite" shadow="hard-sm" className="border-2 text-center p-4">
          <div className="flex items-center justify-between">
            <Award className="w-5 h-5 text-yellow-dark" />
            <span className="text-[10px] font-bold text-green bg-green/20 px-1.5 rounded border border-ink">+8%</span>
          </div>
          <div className="font-heading text-xl font-black text-ink mt-2">88%</div>
          <div className="text-[10px] font-bold uppercase text-ink/60 mt-1">Quiz Accuracy</div>
        </Card>

        {/* Card 3: Conceptual Mastered */}
        <Card bg="cardWhite" shadow="hard-sm" className="border-2 text-center p-4">
          <div className="flex items-center justify-between">
            <Sparkles className="w-5 h-5 text-red" />
            <span className="text-[10px] font-bold text-green bg-green/20 px-1.5 rounded border border-ink">+5</span>
          </div>
          <div className="font-heading text-xl font-black text-ink mt-2">47</div>
          <div className="text-[10px] font-bold uppercase text-ink/60 mt-1">Conceptual Mastered</div>
        </Card>

        {/* Card 4: Weekly Progress */}
        <Card bg="cardWhite" shadow="hard-sm" className="border-2 text-center p-4">
          <div className="flex items-center justify-between">
            <Zap className="w-5 h-5 text-green-dark" />
            <span className="text-[10px] font-bold text-green bg-green/20 px-1.5 rounded border border-ink">+12%</span>
          </div>
          <div className="font-heading text-xl font-black text-ink mt-2">92%</div>
          <div className="text-[10px] font-bold uppercase text-ink/60 mt-1">Weekly Progress</div>
        </Card>

      </div>

      {/* Bottom 2 Charts matching Sketch #3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Learning Time Bar Chart */}
        <div className="lg:col-span-6">
          <Card bg="cardWhite" shadow="hard-lg" badge={<Badge variant="violet" size="sm">Output</Badge>} title="Learning Time Breakdown" className="border-3">
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={learningTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111111" opacity={0.15} />
                  <XAxis dataKey="day" stroke="#111111" fontFamily="Space Mono" fontSize={11} />
                  <YAxis stroke="#111111" fontFamily="Space Mono" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#7C3AED" stroke="#111111" strokeWidth={2} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Chart: Accuracy Line Chart */}
        <div className="lg:col-span-6">
          <Card bg="cardWhite" shadow="hard-lg" badge={<Badge variant="yellow" size="sm">Accuracy</Badge>} title="Accuracy Telemetry (Weekly Trend)" className="border-3">
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111111" opacity={0.15} />
                  <XAxis dataKey="day" stroke="#111111" fontFamily="Space Mono" fontSize={11} />
                  <YAxis stroke="#111111" fontFamily="Space Mono" fontSize={11} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#E63946"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#F4B400', stroke: '#111111', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
