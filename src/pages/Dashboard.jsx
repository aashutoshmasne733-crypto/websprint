import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { coursesData } from '../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import {
  Rocket,
  CheckCircle,
  Hourglass,
  Zap,
  Award,
  Sparkles,
  ArrowUpRight,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Flame,
  CheckSquare,
  Cpu,
  BookOpenCheck,
  PlayCircle
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cardWhite border-2 border-ink p-2.5 rounded-lg shadow-hard font-mono text-xs space-y-1">
        <p className="font-heading font-bold text-ink">{label}</p>
        <p className="text-violet font-bold">
          Neural Output: <span className="text-ink">{payload[0].value} XP</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeCourseId, setActiveCourseId] = useState('c1');
  const [queueCount, setQueueCount] = useState(5);
  const [queueCleared, setQueueCleared] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const userId = localStorage.getItem('userId') || 'u1';

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchCards = () => {
    fetch(`http://localhost:3001/api/revision/${userId}`)
      .then(res => res.json())
      .then(cards => {
        if (Array.isArray(cards)) {
          const toReview = cards.filter(c => c.column === 'to-review').length;
          setQueueCount(toReview);
          setQueueCleared(toReview === 0);
        }
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    fetchCards();
  }, [userId]);

  const handleQueueClear = async () => {
    if (queueCount > 0) {
      try {
        const res = await fetch(`http://localhost:3001/api/revision/${userId}/clear`, { method: 'POST' });
        if (res.ok) {
          setQueueCount(0);
          setQueueCleared(true);
          triggerToast('🎉 Superhero Revision Queue Cleared! +50 XP Gained!');
        }
      } catch (err) {
        setQueueCount(0);
        setQueueCleared(true);
      }
    } else {
      // Re-initialize queue on backend
      fetchCards();
    }
  };

  // Recharts Bar Chart Data matching G, G, G, R, G, G, R layout from user prompt
  const weeklyNeuralOutput = [
    { day: 'Mon', output: 18, color: '#8BC34A' }, // Green (G)
    { day: 'Tue', output: 24, color: '#8BC34A' }, // Green (G)
    { day: 'Wed', output: 15, color: '#8BC34A' }, // Green (G)
    { day: 'Thu', output: 28, color: '#E63946' }, // Red (R)
    { day: 'Fri', output: 20, color: '#8BC34A' }, // Green (G)
    { day: 'Sat', output: 22, color: '#8BC34A' }, // Green (G)
    { day: 'Sun', output: 26, color: '#E63946' }  // Red (R)
  ];

  const currentCourse = coursesData.find(c => c.id === activeCourseId) || coursesData[0];

  return (
    <div className="space-y-6">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-yellow text-ink font-heading font-bold px-4 py-3 rounded-xl border-3 border-ink shadow-hard-lg animate-bounce flex items-center gap-2">
          <Sparkles className="w-5 h-5 fill-ink" />
          {toastMessage}
        </div>
      )}

      {/* TOP ROW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* HEADER CARD: Spider-Man Purple & Red Gradient Blend (from-#7C3AED via-#9333EA to-#E63946) */}
        <div className="lg:col-span-8">
          <Card
            bg="violet"
            shadow="hard-lg"
            className="h-full border-3 relative overflow-hidden bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#E63946]"
            bodyClassName="flex flex-col justify-between h-full p-6 md:p-8 space-y-6"
          >
            <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="yellow" size="sm" icon={Rocket}>Earth-1610 HQ Active</Badge>
                <Badge variant="white" size="sm">Level 14 Hero</Badge>
              </div>

              <h1 className="font-heading text-2xl md:text-4xl font-black tracking-tight text-white uppercase leading-tight">
                MULTIVERSE LEARNING HQ
              </h1>

              <p className="text-xs md:text-base font-mono text-white/90 max-w-xl">
                Ready to start your first course today? Level up your cognitive superhero stats across Web Dev, AI Systems, & Quantum Logic.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="yellow"
                size="lg"
                icon={BookOpen}
                onClick={() => navigate(`/courses?play=${currentCourse.id}`)}
              >
                Start Mission
              </Button>
            </div>
          </Card>
        </div>

        {/* "REVISION QUEUE" CARD */}
        <div className="lg:col-span-4">
          <Card
            bg="cardWhite"
            shadow="hard-lg"
            accentBorder={true}
            accentColor="purpleRed"
            badge={<Badge variant="red" size="sm">Action Items</Badge>}
            title="Revision Queue"
            subtitle="Spaced Repetition Flashcards"
            className="h-full border-3 flex flex-col justify-between"
            bodyClassName="flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background border-2 border-ink shadow-hard-sm">
                <div>
                  <div className="text-xs font-mono text-ink/70 uppercase">Queue Items</div>
                  <div className="font-heading text-2xl font-black text-ink">
                    {queueCount} Flashcards
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-yellow border-2 border-ink flex items-center justify-center font-heading font-black text-lg">
                  ⚡
                </div>
              </div>

              <p className="text-xs font-mono text-ink/80">
                {queueCleared
                  ? 'All superhero flashcards cleared for today! Awesome work!'
                  : '5 high-priority concepts ready for quick multiverse recall.'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Button
                variant={queueCleared ? 'green' : 'primary'}
                size="md"
                fullWidth
                icon={queueCleared ? CheckCircle : CheckSquare}
                onClick={handleQueueClear}
              >
                {queueCleared ? 'Queue Cleared (Reset)' : 'Queue Clear (-5)'}
              </Button>
            </div>
          </Card>
        </div>

      </div>

      {/* THREE-COLUMN SINGLE ROW GRID: Weekly Neural Output, Current Learning Course, Your Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Weekly Neural Output Bar Chart */}
        <Card
          bg="cardWhite"
          shadow="hard-lg"
          badge={<Badge variant="red" size="sm" icon={Cpu}>Telemetry</Badge>}
          title="⚡ WEEKLY NEURAL OUTPUT"
          subtitle="G, G, G, R, G, G, R colors"
          className="border-3 flex flex-col justify-between"
          bodyClassName="p-4 flex-1 flex flex-col justify-between"
        >
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyNeuralOutput} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111111" opacity={0.15} />
                <XAxis
                  dataKey="day"
                  stroke="#111111"
                  fontFamily="Space Mono"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#111111"
                  fontFamily="Space Mono"
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="output" radius={[4, 4, 0, 0]} stroke="#111111" strokeWidth={2}>
                  {weeklyNeuralOutput.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Column 2: Current Learning Course (Yellow background) */}
        <Card
          bg="yellow"
          shadow="hard-lg"
          badge={<Badge variant="red" size="sm" icon={BookOpenCheck}>Active Quest</Badge>}
          title="Current Learning Course"
          subtitle="Pick access mission"
          className="border-3 flex flex-col justify-between"
          bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            {/* Course Selector Dropdown */}
            <div className="space-y-1 font-mono">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink/70">
                Select Multiverse Mission
              </label>
              <select
                value={activeCourseId}
                onChange={(e) => setActiveCourseId(e.target.value)}
                className="w-full border-2 border-ink rounded-lg bg-white px-3 py-2 text-xs font-mono text-ink shadow-hard-sm focus:outline-none"
              >
                {coursesData.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Course Briefing Card */}
            <div className="p-3 bg-white border-2 border-ink rounded-lg shadow-hard-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xl">{currentCourse.thumbnail}</span>
                <Badge variant="violet" size="sm">Active</Badge>
              </div>
              <h4 className="font-heading text-xs font-bold text-ink leading-tight">
                {currentCourse.title}
              </h4>
              <p className="text-[10px] font-mono text-ink/80 leading-relaxed line-clamp-2">
                {currentCourse.desc}
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            icon={PlayCircle}
            onClick={() => navigate(`/courses?play=${currentCourse.id}`)}
          >
            Launch Mission (Red)
          </Button>
        </Card>

        {/* Column 3: Your Progress Card */}
        <Card
          bg="cardWhite"
          shadow="hard-lg"
          badge={<Badge variant="green" size="sm">Stats</Badge>}
          title="Your Progress"
          subtitle="Hero metrics & energy level"
          className="border-3 flex flex-col justify-between"
          bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-3"
        >
          <div className="space-y-3">
            {/* Hourglass */}
            <div className="p-3 rounded-xl border-2 border-ink bg-background shadow-hard-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow border-2 border-ink flex items-center justify-center text-ink shadow-xs">
                <Hourglass className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-ink/70">Time Spent</div>
                <div className="font-heading text-xs font-bold text-ink">42.5 Hours Total</div>
              </div>
            </div>

            {/* Lightning Bolt */}
            <div className="p-3 rounded-xl border-2 border-ink bg-background shadow-hard-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red border-2 border-ink flex items-center justify-center text-white shadow-xs">
                <Zap className="w-5 h-5 fill-yellow text-red stroke-[2]" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-ink/70">Streak Energy</div>
                <div className="font-heading text-xs font-bold text-ink">98% Supercharged</div>
              </div>
            </div>
          </div>

          <Button
            variant="yellow"
            size="sm"
            fullWidth
            icon={Flame}
            onClick={() => triggerToast('🔥 Supercharge Boost Activated!')}
          >
            Supercharge Energy
          </Button>
        </Card>

      </div>
    </div>
  );
}
export { CustomTooltip };
