import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const FILES = {
  events: path.join(DATA_DIR, 'events.json'),
  members: path.join(DATA_DIR, 'members.json'),
  achievements: path.join(DATA_DIR, 'achievements.json'),
  blog: path.join(DATA_DIR, 'blog.json')
};

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
  
  // Initialize empty files if they don't exist
  for (const [key, filePath] of Object.entries(FILES)) {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify([]));
    }
  }
}

// Helper functions
async function readData(type) {
  try {
    const data = await fs.readFile(FILES[type], 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${type}:`, error);
    return [];
  }
}

async function writeData(type, data) {
  try {
    await fs.writeFile(FILES[type], JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${type}:`, error);
    return false;
  }
}

// ===== EVENTS ENDPOINTS =====
app.get('/api/events', async (req, res) => {
  const data = await readData('events');
  res.json(data);
});

app.post('/api/events', async (req, res) => {
  const data = await readData('events');
  const newEvent = req.body;
  data.push(newEvent);
  const success = await writeData('events', data);
  res.status(success ? 201 : 500).json(success ? newEvent : { error: 'Failed to save' });
});

app.put('/api/events/:id', async (req, res) => {
  const data = await readData('events');
  const index = data.findIndex(item => item.id === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    const success = await writeData('events', data);
    res.json(success ? req.body : { error: 'Failed to update' });
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const data = await readData('events');
  const filtered = data.filter(item => item.id !== req.params.id);
  const success = await writeData('events', filtered);
  res.json({ success });
});

// ===== MEMBERS ENDPOINTS =====
app.get('/api/members', async (req, res) => {
  const data = await readData('members');
  res.json(data);
});

app.post('/api/members', async (req, res) => {
  const data = await readData('members');
  const newMember = req.body;
  data.push(newMember);
  const success = await writeData('members', data);
  res.status(success ? 201 : 500).json(success ? newMember : { error: 'Failed to save' });
});

app.put('/api/members/:id', async (req, res) => {
  const data = await readData('members');
  const index = data.findIndex(item => item.id === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    const success = await writeData('members', data);
    res.json(success ? req.body : { error: 'Failed to update' });
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  const data = await readData('members');
  const filtered = data.filter(item => item.id !== req.params.id);
  const success = await writeData('members', filtered);
  res.json({ success });
});

// ===== ACHIEVEMENTS ENDPOINTS =====
app.get('/api/achievements', async (req, res) => {
  const data = await readData('achievements');
  res.json(data);
});

app.post('/api/achievements', async (req, res) => {
  const data = await readData('achievements');
  const newAchievement = req.body;
  data.push(newAchievement);
  const success = await writeData('achievements', data);
  res.status(success ? 201 : 500).json(success ? newAchievement : { error: 'Failed to save' });
});

app.put('/api/achievements/:id', async (req, res) => {
  const data = await readData('achievements');
  const index = data.findIndex(item => item.id === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    const success = await writeData('achievements', data);
    res.json(success ? req.body : { error: 'Failed to update' });
  } else {
    res.status(404).json({ error: 'Achievement not found' });
  }
});

app.delete('/api/achievements/:id', async (req, res) => {
  const data = await readData('achievements');
  const filtered = data.filter(item => item.id !== req.params.id);
  const success = await writeData('achievements', filtered);
  res.json({ success });
});

// ===== BLOG ENDPOINTS =====
app.get('/api/blog', async (req, res) => {
  const data = await readData('blog');
  res.json(data);
});

app.post('/api/blog', async (req, res) => {
  const data = await readData('blog');
  const newPost = req.body;
  data.unshift(newPost); // Add to beginning
  const success = await writeData('blog', data);
  res.status(success ? 201 : 500).json(success ? newPost : { error: 'Failed to save' });
});

app.put('/api/blog/:id', async (req, res) => {
  const data = await readData('blog');
  const index = data.findIndex(item => item.id === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    const success = await writeData('blog', data);
    res.json(success ? req.body : { error: 'Failed to update' });
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  const data = await readData('blog');
  const filtered = data.filter(item => item.id !== req.params.id);
  const success = await writeData('blog', filtered);
  res.json({ success });
});

// Start server if running directly
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

export default app;
