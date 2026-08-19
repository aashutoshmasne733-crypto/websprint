import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;
const DB_FILE = path.resolve('db.json');

app.use(cors());
app.use(express.json());

// Initialize Database file if not exists
const defaultDb = {
  users: [
    { id: 'u1', codename: 'nirbhay', email: 'nirbhay@gmail.com', password: 'password123' }
  ],
  userProgress: {
    u1: {
      streak: 12,
      completed: 2,
      enrolled: 3,
      badges: 4,
      dailyHours: 2.7,
      accuracy: 88,
      mastered: 47,
      weeklyProgress: 92
    }
  },
  userCourses: {
    u1: [
      { id: 'c1', progress: 75, status: 'in-progress' },
      { id: 'c2', progress: 100, status: 'completed' },
      { id: 'c3', progress: 40, status: 'in-progress' }
    ]
  },
  revisionCards: {
    u1: [
      { id: 'k1', column: 'to-review', topic: 'Neubrutalist Shadow Offsets & Hard Borders', sourceCourse: 'Earth-1610 Neubrutalist UI/UX Craft', dueDate: 'Today', difficulty: 'Easy', color: 'green' },
      { id: 'k2', column: 'to-review', topic: 'Sub-space Memory Allocation in Next.js', sourceCourse: 'Full Stack Next.js & React', dueDate: 'Today', difficulty: 'Hard', color: 'red' },
      { id: 'k3', column: 'to-review', topic: 'TypeScript Generics & Mapped Types', sourceCourse: 'TS Full Tutor', dueDate: 'Tomorrow', difficulty: 'Medium', color: 'yellow' },
      { id: 'k4', column: 'in-progress', topic: 'React Router Persistent Outlets', sourceCourse: 'React Full Course', dueDate: 'In 2 days', difficulty: 'Medium', color: 'violet' },
      { id: 'k5', column: 'in-progress', topic: 'Docker Container Network Protocols', sourceCourse: 'Docker Zero to Hero', dueDate: 'In 3 days', difficulty: 'Easy', color: 'green' },
      { id: 'k6', column: 'mastered', topic: 'State Machine Transitions & Action Handlers', sourceCourse: 'Full Stack Next.js & React', dueDate: 'Completed', difficulty: 'Hard', color: 'red' }
    ]
  },
  chatSessions: {
    u1: [
      { sender: 'ai', text: "Welcome to your multiverse AI mock interview! I've analyzed progress in 0 courses, let's test your perception." }
    ]
  }
};

const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2));
    return defaultDb;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (error) {
    return defaultDb;
  }
};

const writeDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- AUTH ENDPOINTS ---
app.post('/api/auth/register', (req, res) => {
  const { codename, email, password } = req.body;
  const db = readDb();
  
  if (db.users.find(u => u.email === email || u.codename === codename)) {
    return res.status(400).json({ error: 'Hero specifications already exist in HQ.' });
  }

  const newUser = { id: `u_${Date.now()}`, codename, email, password };
  db.users.push(newUser);

  // Set default settings
  db.userProgress[newUser.id] = { streak: 1, completed: 0, enrolled: 0, badges: 0, dailyHours: 0.1, accuracy: 0, mastered: 0, weeklyProgress: 0 };
  db.userCourses[newUser.id] = [];
  db.revisionCards[newUser.id] = [];
  db.chatSessions[newUser.id] = [
    { sender: 'ai', text: "Welcome to your multiverse AI mock interview! I've analyzed progress in 0 courses, let's test your perception." }
  ];

  writeDb(db);
  res.json({ message: 'Registration complete.', user: { id: newUser.id, codename, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid portal credentials.' });
  }
  
  res.json({ user: { id: user.id, codename: user.codename, email: user.email } });
});

// --- USER PROGRESS ---
app.get('/api/progress/:userId', (req, res) => {
  const db = readDb();
  const prog = db.userProgress[req.params.userId] || { streak: 0, completed: 0, enrolled: 0, badges: 0, dailyHours: 0, accuracy: 0, mastered: 0, weeklyProgress: 0 };
  res.json(prog);
});

app.post('/api/progress/:userId/streak', (req, res) => {
  const db = readDb();
  if (db.userProgress[req.params.userId]) {
    db.userProgress[req.params.userId].streak += 1;
    writeDb(db);
    return res.json(db.userProgress[req.params.userId]);
  }
  res.status(404).json({ error: 'User not found.' });
});

// --- COURSES ---
app.get('/api/courses/:userId', (req, res) => {
  const db = readDb();
  const courses = db.userCourses[req.params.userId] || [];
  res.json(courses);
});

app.post('/api/courses/:userId/enroll', (req, res) => {
  const { courseId, status, progress } = req.body;
  const { userId } = req.params;
  const db = readDb();

  if (!db.userCourses[userId]) {
    db.userCourses[userId] = [];
  }

  const existing = db.userCourses[userId].find(c => c.id === courseId);
  if (existing) {
    existing.status = status;
    existing.progress = progress;
  } else {
    db.userCourses[userId].push({ id: courseId, status, progress });
  }

  // Recalculate global counts
  const enrolledCount = db.userCourses[userId].filter(c => c.status === 'in-progress').length;
  const completedCount = db.userCourses[userId].filter(c => c.status === 'completed').length;
  if (db.userProgress[userId]) {
    db.userProgress[userId].enrolled = enrolledCount;
    db.userProgress[userId].completed = completedCount;
  }

  writeDb(db);
  res.json({ courses: db.userCourses[userId], stats: db.userProgress[userId] });
});

// --- REVISION QUEUE (KANBAN) ---
app.get('/api/revision/:userId', (req, res) => {
  const db = readDb();
  const cards = db.revisionCards[req.params.userId] || [];
  res.json(cards);
});

app.put('/api/revision/:userId/move', (req, res) => {
  const { cardId, newColumn } = req.body;
  const { userId } = req.params;
  const db = readDb();

  const cards = db.revisionCards[userId] || [];
  const card = cards.find(c => c.id === cardId);
  if (card) {
    card.column = newColumn;
    writeDb(db);
  }
  res.json(cards);
});

app.post('/api/revision/:userId/clear', (req, res) => {
  const { userId } = req.params;
  const db = readDb();

  const cards = db.revisionCards[userId] || [];
  // Set all 'to-review' cards to 'mastered'
  cards.forEach(c => {
    if (c.column === 'to-review') {
      c.column = 'mastered';
    }
  });

  writeDb(db);
  res.json(cards);
});

// --- AI INTERVIEW CHATBOT ---
app.get('/api/chat/:userId', (req, res) => {
  const db = readDb();
  const messages = db.chatSessions[req.params.userId] || [];
  res.json(messages);
});

app.post('/api/chat/:userId/ask', (req, res) => {
  const { text } = req.body;
  const { userId } = req.params;
  const db = readDb();

  if (!db.chatSessions[userId]) {
    db.chatSessions[userId] = [];
  }

  // Push user msg
  db.chatSessions[userId].push({ sender: 'user', text });

  // Generate responsive mock answer
  let aiReplyText = `Multiverse telemetry analysis complete for response "${text}". Correctly linked core structures! Let's move to the next coding test.`;
  if (text.toLowerCase().includes('react') || text.toLowerCase().includes('jsx')) {
    aiReplyText = `Interesting. Web client component state rendering is verified. Explain how you would prevent unnecessary DOM re-renders inside this custom layout context?`;
  } else if (text.toLowerCase().includes('docker')) {
    aiReplyText = `Correct. Docker image layout initialized. Next step: Explain container rate limiting strategies in inter-dimensional networks.`;
  }

  const aiReply = { sender: 'ai', text: aiReplyText };
  db.chatSessions[userId].push(aiReply);

  writeDb(db);
  res.json(db.chatSessions[userId]);
});

// --- PROFILE ENDPOINTS ---
app.get('/api/profile/:userId', (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u.id === req.params.userId);
  if (!user) return res.status(404).json({ error: 'User specs not found.' });
  res.json({ codename: user.codename, email: user.email });
});

app.put('/api/profile/:userId', (req, res) => {
  const { codename, email } = req.body;
  const { userId } = req.params;
  const db = readDb();

  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.codename = codename;
    user.email = email;
    writeDb(db);
    res.json({ codename, email });
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AdaptLearn database backend server running on http://localhost:${PORT}`);
});
