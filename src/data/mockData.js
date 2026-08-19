export const coursesData = [
  {
    id: 'c1',
    title: 'Full Stack Next.js & React',
    category: 'Full Stack',
    level: 'Advanced',
    rating: '4.9',
    duration: '18 Hours',
    students: '3,200 Heroes',
    progress: 75,
    status: 'in-progress',
    lastAccessed: '2 hours ago',
    desc: 'Build scalable full-stack applications with Next.js App Router, Server Actions, and Neubrutalist UI design.',
    color: 'yellow',
    thumbnail: '🚀',
    youtubeThumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/mUiY8G1S0S4',
    instructor: 'Miles Morales (Earth-1610)'
  },
  {
    id: 'c2',
    title: 'TypeScript in 1 Hour',
    category: 'Full Stack',
    level: 'Beginner',
    rating: '4.8',
    duration: '1 Hour',
    students: '5,400 Heroes',
    progress: 100,
    status: 'completed',
    lastAccessed: '1 day ago',
    desc: 'Rapid fire crash course on TypeScript generics, interface contracts, and static type safety.',
    color: 'yellow',
    thumbnail: '⚡',
    youtubeThumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/xkpcN95861U',
    instructor: 'Gwen Stacy'
  },
  {
    id: 'c3',
    title: 'React Full Course',
    category: 'Full Stack',
    level: 'Intermediate',
    rating: '5.0',
    duration: '12 Hours',
    students: '4,100 Heroes',
    progress: 40,
    status: 'in-progress',
    lastAccessed: '3 hours ago',
    desc: 'Comprehensive deep dive into React 18 hooks, custom state management, and virtual DOM rendering.',
    color: 'yellow',
    thumbnail: '⚛️',
    youtubeThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
    instructor: 'Peter B. Parker'
  },
  {
    id: 'c4',
    title: 'TS Full Tutor',
    category: 'Full Stack',
    level: 'Advanced',
    rating: '4.9',
    duration: '10 Hours',
    students: '1,890 Heroes',
    progress: 10,
    status: 'in-progress',
    lastAccessed: '2 days ago',
    desc: 'Advanced type manipulation, mapped types, conditional types, and compiler configuration.',
    color: 'yellow',
    thumbnail: '📘',
    youtubeThumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/30LWjhZR6cY',
    instructor: 'Miguel O\'Hara (2099)'
  },
  {
    id: 'c5',
    title: 'Docker Zero to Hero',
    category: 'System Design',
    level: 'Beginner',
    rating: '4.7',
    duration: '8 Hours',
    students: '2,600 Heroes',
    progress: 0,
    status: 'not-started',
    lastAccessed: 'Never',
    desc: 'Containerize microservices, write multi-stage Dockerfiles, and orchestrate with Docker Compose.',
    color: 'yellow',
    thumbnail: '🐳',
    youtubeThumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/fqMOX6JJhGo',
    instructor: 'Pavitr Prabhakar'
  },
  {
    id: 'c6',
    title: 'AI Neural Networks & Web Slinger Logic',
    category: 'AI/ML',
    level: 'Intermediate',
    rating: '4.9',
    duration: '16 Hours',
    students: '2,100 Heroes',
    progress: 0,
    status: 'not-started',
    lastAccessed: 'Never',
    desc: 'Train deep learning models to predict trajectory paths and automate intelligent hero decision loops.',
    color: 'yellow',
    thumbnail: '🧠',
    youtubeThumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    instructor: 'Spider-Man Noir'
  }
];

export const featuredMission = {
  id: 'f1',
  title: 'Quantum Portal Engine & State Machine Architecture',
  category: 'Featured Multiverse Mission',
  instructor: 'Miles Morales (Earth-1610)',
  duration: '24 Hours',
  rating: '5.0 ★★★★★',
  desc: 'Master inter-dimensional data synchronization, sub-space event loops, and state-machine transitions in high-pressure battle environments.',
  badge: 'POPULAR MISSION',
  youtubeThumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/mUiY8G1S0S4'
};

export const initialKanbanCards = [
  {
    id: 'k1',
    column: 'to-review',
    topic: 'Neubrutalist Shadow Offsets & Hard Borders',
    sourceCourse: 'Earth-1610 Neubrutalist UI/UX Craft',
    dueDate: 'Today',
    difficulty: 'Easy',
    color: 'green'
  },
  {
    id: 'k2',
    column: 'to-review',
    topic: 'Sub-space Memory Allocation in Next.js',
    sourceCourse: 'Full Stack Next.js & React',
    dueDate: 'Today',
    difficulty: 'Hard',
    color: 'red'
  },
  {
    id: 'k3',
    column: 'to-review',
    topic: 'TypeScript Generics & Mapped Types',
    sourceCourse: 'TS Full Tutor',
    dueDate: 'Tomorrow',
    difficulty: 'Medium',
    color: 'yellow'
  },
  {
    id: 'k4',
    column: 'in-progress',
    topic: 'React Router Persistent Outlets',
    sourceCourse: 'React Full Course',
    dueDate: 'In 2 days',
    difficulty: 'Medium',
    color: 'violet'
  },
  {
    id: 'k5',
    column: 'in-progress',
    topic: 'Docker Container Network Protocols',
    sourceCourse: 'Docker Zero to Hero',
    dueDate: 'In 3 days',
    difficulty: 'Easy',
    color: 'green'
  },
  {
    id: 'k6',
    column: 'mastered',
    topic: 'State Machine Transitions & Action Handlers',
    sourceCourse: 'Full Stack Next.js & React',
    dueDate: 'Completed',
    difficulty: 'Hard',
    color: 'red'
  }
];

export const projectsData = [
  {
    id: 'p1',
    title: 'Modern Portal Builder',
    tech: ['React', 'Next.js', 'Tailwind'],
    status: 'Reviewed',
    statusColor: 'green',
    level: 'Beginner Level',
    desc: 'Build an adaptive superhero portal with hard-bordered Neubrutalist UI cards and interactive route switching.',
    grade: 'A+ (98%)',
    date: '2026-08-15'
  },
  {
    id: 'p2',
    title: 'RESTful Task API',
    tech: ['Node.js', 'Express', 'PostgreSQL'],
    status: 'Submitted',
    statusColor: 'violet',
    level: 'Intermediate Level',
    desc: 'Design a resilient sub-space REST API for task management with JWT authentication and rate limiting.',
    grade: 'Under Review',
    date: '2026-08-17'
  },
  {
    id: 'p3',
    title: 'Single Page App Dashboard',
    tech: ['Vite', 'React', 'Recharts'],
    status: 'In Progress',
    statusColor: 'yellow',
    level: 'Advanced Level',
    desc: 'Real-time telemetry dashboard visualizing learning velocity, streak energy, and task completion metrics.',
    grade: 'Drafting',
    date: '2026-08-18'
  }
];

export const interviewSimulations = [
  {
    id: 'i1',
    category: 'System Design',
    title: 'Earth-1610 Multiverse Portal Load Balancer',
    difficulty: 'Hard',
    questionsCount: 5,
    duration: '45 mins',
    desc: 'Architect a global low-latency gateway that routes 10,000 superhero telemetry connections per second.',
    color: 'red'
  },
  {
    id: 'i2',
    category: 'Coding',
    title: 'Quantum Sub-graph Path Pruning (LeetCode Hard)',
    difficulty: 'Hard',
    questionsCount: 3,
    duration: '60 mins',
    desc: 'Implement Dijkstra algorithm with timeline jump constraints to find the shortest path through 100 dimensions.',
    color: 'violet'
  }
];

export const recentInterviewAttempts = [
  { id: 'att1', title: 'Neubrutalist Frontend Performance', date: '2026-08-16', score: '94/100', status: 'Passed', color: 'green' },
  { id: 'att2', title: 'Multiverse Portal Load Balancer', date: '2026-08-12', score: '88/100', status: 'Passed', color: 'green' }
];

export const analyticsData = {
  totalHours: '142.5',
  coursesCompleted: '14',
  currentStreak: '12 Days',
  avgQuizScore: '94%',
  
  activity30Days: [
    { day: 'Day 1', hours: 2.5 },
    { day: 'Day 5', hours: 4.0 },
    { day: 'Day 10', hours: 3.2 },
    { day: 'Day 15', hours: 6.5 },
    { day: 'Day 20', hours: 5.0 },
    { day: 'Day 25', hours: 7.8 },
    { day: 'Day 30', hours: 8.2 },
  ],

  categoryDistribution: [
    { name: 'Full Stack', hours: 65, color: '#7C3AED' },
    { name: 'AI/ML', hours: 35, color: '#F4B400' },
    { name: 'Design', hours: 25, color: '#8BC34A' },
    { name: 'System Design', hours: 17.5, color: '#E63946' }
  ],

  weeklyComparison: [
    { day: 'Mon', thisWeek: 4.2, lastWeek: 3.0 },
    { day: 'Tue', thisWeek: 5.8, lastWeek: 4.5 },
    { day: 'Wed', thisWeek: 3.5, lastWeek: 4.0 },
    { day: 'Thu', thisWeek: 7.0, lastWeek: 5.2 },
    { day: 'Fri', thisWeek: 6.2, lastWeek: 5.0 },
    { day: 'Sat', thisWeek: 8.5, lastWeek: 6.8 },
    { day: 'Sun', thisWeek: 7.3, lastWeek: 6.0 },
  ]
};

export const achievementsData = [
  { id: 'a1', title: 'Spider-Sense Master', desc: 'Maintained a 10-day active learning streak.', icon: '⚡', category: 'Streak', earned: true, date: 'Unlocked Aug 10' },
  { id: 'a2', title: 'Multiverse Architect', desc: 'Completed 5 Advanced Technical Quests.', icon: '🏗️', category: 'Quests', earned: true, date: 'Unlocked Aug 14' },
  { id: 'a3', title: 'Neubrutal Legend', desc: 'Scored 100% on Earth-1610 UI/UX Exam.', icon: '🎨', category: 'Design', earned: true, date: 'Unlocked Aug 16' },
  { id: 'a4', title: 'Sub-space Navigator', desc: 'Solved 10 Quantum Algorithm Drills.', icon: '⚛️', category: 'Coding', earned: true, date: 'Unlocked Aug 17' }
];
