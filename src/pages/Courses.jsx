import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import ProgressBar from '../components/ui/ProgressBar';
import { coursesData, featuredMission } from '../data/mockData';
import { BookOpen, Star, Clock, Users, ArrowRight, Search, Sparkles, CheckCircle2, Rocket, PlayCircle, ArrowLeft, Terminal, CheckSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [coursesList, setCoursesList] = useState(coursesData);
  
  // Embedded YouTube Video Player states
  const [activePlayCourse, setActivePlayCourse] = useState(null);

  // Check URL params to automatically trigger play (e.g. ?play=c1)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const playId = params.get('play');
    if (playId) {
      const course = coursesList.find(c => c.id === playId);
      if (course) {
        setActivePlayCourse(course);
      }
    }
  }, [location.search, coursesList]);

  const categories = ['ALL', 'AI/ML', 'Full Stack', 'System Design', 'Design'];

  const handleEnrollToggle = (id) => {
    setCoursesList(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'not-started' ? 'in-progress' : (c.status === 'in-progress' ? 'completed' : 'in-progress');
        const nextProgress = nextStatus === 'completed' ? 100 : (nextStatus === 'in-progress' ? 25 : 0);
        return { ...c, status: nextStatus, progress: nextProgress };
      }
      return c;
    }));
  };

  const filteredCourses = coursesList.filter((c) => {
    const matchesCategory = activeCategory === 'ALL' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          c.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render the Multiverse Video Player Interface if a course is chosen
  if (activePlayCourse) {
    return (
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => {
              setActivePlayCourse(null);
              navigate('/courses');
            }}
          >
            Back to Catalog
          </Button>

          <Badge variant="yellow" size="md">Dimension Play Session Active</Badge>
        </div>

        {/* Video Player Main View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Side: YouTube Embed Player */}
          <div className="lg:col-span-8 space-y-4">
            <Card
              bg="cardWhite"
              shadow="hard-lg"
              badge={<Badge variant="red" size="sm">Video Stream</Badge>}
              title={activePlayCourse.title}
              className="border-3 overflow-hidden"
              bodyClassName="p-0"
            >
              {/* YouTube Iframe Embed wrapper */}
              <div className="relative w-full aspect-video border-b-3 border-ink bg-black">
                <iframe
                  src={`${activePlayCourse.youtubeEmbedUrl}?autoplay=1&mute=0`}
                  title={activePlayCourse.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Course Detail Section */}
              <div className="p-5 md:p-6 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Badge variant="yellow" size="sm">{activePlayCourse.category}</Badge>
                  <span className="text-xs font-mono text-ink/75 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Duration: {activePlayCourse.duration}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-mono text-ink/80 leading-relaxed">
                  {activePlayCourse.desc}
                </p>
              </div>
            </Card>
          </div>

          {/* Right Side: Telemetry details, checkpoints & lessons */}
          <div className="lg:col-span-4 space-y-6">
            <Card
              bg="cardWhite"
              shadow="hard-lg"
              badge={<Badge variant="violet" size="sm">Checkpoints</Badge>}
              title="Mission Tasks"
              className="border-3"
            >
              <div className="space-y-3.5 font-mono text-xs md:text-sm">
                <div className="p-3 bg-background border-2 border-ink rounded-lg space-y-1">
                  <div className="font-bold text-ink">Instructor:</div>
                  <div className="text-violet font-bold">{activePlayCourse.instructor}</div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold uppercase text-[10px] text-ink/60">Slinger Checkpoints</div>
                  {[
                    'Initialize Webpack or Vite config',
                    'Implement solid Neubrutalist borders',
                    'Integrate custom Recharts parameters',
                    'Hardening state machine endpoints'
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2 rounded border border-ink bg-white shadow-hard-sm">
                      <input type="checkbox" className="accent-red cursor-pointer" defaultChecked={idx < 2} />
                      <span className="text-xs text-ink/85">{task}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    variant="green"
                    size="md"
                    fullWidth
                    icon={CheckCircle2}
                    onClick={() => {
                      handleEnrollToggle(activePlayCourse.id);
                      triggerToast('🎉 Quest Progress Saved! Dimension telemetry synced.');
                      setActivePlayCourse(null);
                      navigate('/courses');
                    }}
                  >
                    Complete Quest (Green)
                  </Button>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <Card bg="red" shadow="hard-lg" className="border-3 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="yellow" size="sm" icon={Sparkles}>
              Multiverse Academy
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase mt-1">
              Multiverse Learning Vault
            </h1>
            <p className="text-xs md:text-sm font-mono text-white/90 max-w-xl">
              Master Full Stack Next.js, TypeScript, System Architecture, & AI/ML across dimensions.
            </p>
          </div>
          <Button variant="yellow" size="md" icon={BookOpen} onClick={() => navigate('/my-learning')}>
            My Active Quests
          </Button>
        </div>
      </Card>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-cardWhite border-3 border-ink rounded-xl shadow-hard-md space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink/70">
            Search Multiverse Missions
          </label>
          <Input
            placeholder="Search Full Stack, TypeScript, Docker, System Design..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            icon={Search}
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-xl font-heading text-xs md:text-sm font-bold border-2 border-ink transition-all select-none
                ${activeCategory === cat
                  ? 'bg-red text-white shadow-hard translate-x-0 -translate-y-0.5'
                  : 'bg-background text-ink hover:bg-white hover:shadow-hard-sm'}
              `}
            >
              [{cat}]
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Featured Multiverse Mission */}
      <div className="space-y-2">
        <div className="font-heading text-lg font-bold text-ink uppercase flex items-center gap-2">
          <Rocket className="w-5 h-5 text-red" />
          Featured Multiverse Mission
        </div>

        <Card bg="yellow" shadow="hard-lg" className="border-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-2">
            <div className="flex flex-col md:flex-row items-center gap-4 flex-1">
              <div className="w-full md:w-48 h-32 rounded-xl border-3 border-ink overflow-hidden shadow-hard-sm flex-shrink-0 relative bg-black">
                <img
                  src={featuredMission.youtubeThumbnail}
                  alt="YouTube Thumbnail"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1 rounded">24:00</span>
              </div>
              <div className="space-y-1">
                <Badge variant="red" size="sm">{featuredMission.badge}</Badge>
                <h3 className="font-heading text-xl md:text-2xl font-black text-ink">
                  {featuredMission.title}
                </h3>
                <p className="text-xs font-mono text-ink/80 max-w-2xl leading-relaxed">
                  {featuredMission.desc}
                </p>
                <div className="text-xs font-mono font-bold text-violet pt-1">
                  Instructor: {featuredMission.instructor}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={PlayCircle}
                onClick={() => {
                  const featured = {
                    id: featuredMission.id,
                    title: featuredMission.title,
                    category: 'System Design',
                    youtubeEmbedUrl: featuredMission.youtubeEmbedUrl,
                    desc: featuredMission.desc,
                    instructor: featuredMission.instructor,
                    duration: featuredMission.duration
                  };
                  setActivePlayCourse(featured);
                }}
              >
                Launch Mission
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 2: Multiverse Recommendations (Grid of EXACTLY 3 courses per row) */}
      <div className="space-y-3 pt-2">
        <div className="font-heading text-lg font-bold text-ink uppercase flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet" />
          Multiverse Recommendations (Yellow Accent Scheme)
        </div>

        {/* 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <Card
              key={c.id}
              bg="cardWhite"
              shadow="hard-md"
              className="border-3 flex flex-col justify-between hover:-translate-y-1 transition-transform"
              headerClassName="bg-background"
              badge={
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">{c.thumbnail}</span>
                  <Badge variant="yellow" size="sm">{c.category}</Badge>
                </div>
              }
              title={c.title}
            >
              <div className="space-y-3">
                <div className="w-full h-40 rounded-xl border-2 border-ink overflow-hidden shadow-hard-sm relative bg-black">
                  <img
                    src={c.youtubeThumbnail}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1 rounded">Video Lesson</span>
                </div>

                <p className="text-xs font-mono text-ink/80 line-clamp-2 leading-relaxed">
                  {c.desc}
                </p>

                <div className="text-[11px] font-mono text-ink/70 space-y-1">
                  <div className="font-bold text-violet">Instructor: {c.instructor}</div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 stroke-[2.5]" /> {c.duration}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-yellow-dark">
                      <Star className="w-3.5 h-3.5 fill-yellow text-yellow-dark" /> {c.rating}
                    </span>
                  </div>
                </div>

                <ProgressBar progress={c.progress} color="yellow" height="h-3" />
              </div>

              {/* Yellow Start Mission Button */}
              <div className="pt-4 mt-4 border-t-2 border-ink/15 flex items-center justify-between gap-2">
                {c.status === 'completed' ? (
                  <Badge variant="yellow" size="sm" icon={CheckCircle2}>Completed ✓</Badge>
                ) : (
                  <Badge variant="outline" size="sm">{c.level}</Badge>
                )}

                <Button
                  variant="yellow"
                  size="sm"
                  icon={ArrowRight}
                  onClick={() => setActivePlayCourse(c)}
                >
                  {c.status === 'completed' ? 'Review' : 'Start Mission'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
