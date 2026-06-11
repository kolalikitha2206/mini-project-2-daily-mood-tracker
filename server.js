// ================================================================
// DAILY MOOD TRACKER - Express Backend Server
// ================================================================

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const MOODS_FILE = path.join(__dirname, 'moods.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ================================================================
// HELPER FUNCTIONS
// ================================================================

function readMoods() {
  try {
    if (fs.existsSync(MOODS_FILE)) {
      const data = fs.readFileSync(MOODS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading moods file:', error);
  }
  return [];
}

function writeMoods(moods) {
  try {
    fs.writeFileSync(MOODS_FILE, JSON.stringify(moods, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing moods file:', error);
    return false;
  }
}

// ================================================================
// API ROUTES
// ================================================================

// GET all moods
app.get('/api/moods', (req, res) => {
  const moods = readMoods();
  res.json(moods);
});

// GET monthly aggregate counts for a given year and month
// Returns counts for moods 1..5 and total entries in that month
app.get('/api/moods/aggregate/:year/:month', (req, res) => {
  const { year, month } = req.params;
  const moods = readMoods();

  // Ensure numeric month/year
  const y = parseInt(year, 10);
  const m = parseInt(month, 10); // 1-based month
  if (Number.isNaN(y) || Number.isNaN(m) || m < 1 || m > 12) {
    return res.status(400).json({ success: false, message: 'Invalid year or month' });
  }

  const counts = { total: 0, byMood: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } };

  moods.forEach(entry => {
    const d = new Date(entry.date);
    if (d.getFullYear() === y && (d.getMonth() + 1) === m) {
      counts.total += 1;
      const key = String(entry.mood || '3');
      if (counts.byMood[key] !== undefined) counts.byMood[key]++;
    }
  });

  // Add percentages for convenience
  const byMoodPercent = {};
  Object.keys(counts.byMood).forEach(k => {
    byMoodPercent[k] = counts.total ? +(counts.byMood[k] / counts.total * 100).toFixed(1) : 0;
  });

  res.json({ success: true, year: y, month: m, counts, percentages: byMoodPercent });
});

// POST new mood entry
app.post('/api/moods', (req, res) => {
  const moods = readMoods();
  const newMood = req.body;

  // Upsert behavior:
  // 1) If `id` provided and matches an existing entry, update by id.
  // 2) Else, try to find an entry for the same `date` and replace it (one entry per day).
  // 3) Otherwise create a new entry.
  let updated = false;

  if (newMood.id) {
    const idx = moods.findIndex(m => m.id === newMood.id);
    if (idx >= 0) {
      moods[idx] = newMood;
      updated = true;
    }
  }

  if (!updated) {
    const idxDate = moods.findIndex(m => m.date === newMood.date);
    if (idxDate >= 0) {
      // preserve existing id if any
      newMood.id = moods[idxDate].id || newMood.id || Date.now().toString();
      moods[idxDate] = newMood;
      updated = true;
    }
  }

  if (!updated) {
    newMood.id = newMood.id || Date.now().toString();
    moods.push(newMood);
  }

  if (writeMoods(moods)) {
    res.status(updated ? 200 : 201).json({ 
      success: true,
      message: updated ? 'Mood updated successfully' : 'Mood logged successfully',
      mood: newMood
    });
  } else {
    res.status(500).json({ success: false, message: 'Error saving mood' });
  }
});

// DELETE mood entry
app.delete('/api/moods/:id', (req, res) => {
  const moods = readMoods();
  const filteredMoods = moods.filter(m => m.id !== req.params.id);
  
  if (writeMoods(filteredMoods)) {
    res.json({ success: true, message: 'Mood deleted successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Error deleting mood' });
  }
});

// POST import moods (batch)
app.post('/api/moods/import', (req, res) => {
  const moods = req.body;
  
  if (Array.isArray(moods) && writeMoods(moods)) {
    res.json({ success: true, message: 'Data imported successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data format' });
  }
});

// DELETE all moods
app.delete('/api/moods/clear', (req, res) => {
  if (writeMoods([])) {
    res.json({ success: true, message: 'All data cleared' });
  } else {
    res.status(500).json({ success: false, message: 'Error clearing data' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ================================================================
// START SERVER
// ================================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════════╗
    ║   🌟 Aura - Mood Tracker Server          ║
    ║   Running on http://localhost:${PORT}       ║
    ║   Open in browser to start tracking       ║
    ╚═══════════════════════════════════════════╝
  `);
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
