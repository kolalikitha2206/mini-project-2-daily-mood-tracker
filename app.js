// ================================================================
// DAILY MOOD TRACKER - Main Application Logic
// ================================================================

const API_URL = 'http://localhost:3000/api';
let allMoods = [];
let selectedTags = new Set();
let isBreathing = false;
let breathingTimer = null;
let breathingSeconds = 0;
let editingEntryId = null;

// ================================================================
// INITIALIZATION
// ================================================================
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🌟 Aura Mood Tracker Initialized');
  
  initializeTheme();
  initializeActivityTags();
  await loadMoods();
  setupEventListeners();
  updateDashboard();
  renderCalendar();
});

// ================================================================
// THEME MANAGEMENT
// ================================================================
function initializeTheme() {
  const theme = localStorage.getItem('theme') || 'dark-theme';
  document.body.className = theme;
  
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  });
}

// ================================================================
// ACTIVITY TAGS SETUP
// ================================================================
function initializeActivityTags() {
  const defaultTags = ['Exercise', 'Work', 'Social', 'Sleep', 'Meditation', 'Reading', 'Gaming', 'Cooking'];
  const tagsContainer = document.getElementById('activity-tags-pool');
  
  defaultTags.forEach(tag => {
    const tagEl = createActivityTag(tag);
    tagsContainer.appendChild(tagEl);
  });
  
  // Add custom tag functionality
  document.getElementById('add-tag-btn').addEventListener('click', () => {
    const input = document.getElementById('custom-tag-input');
    if (input.value.trim()) {
      const tagEl = createActivityTag(input.value);
      tagsContainer.appendChild(tagEl);
      input.value = '';
    }
  });
}

function createActivityTag(label) {
  const tag = document.createElement('button');
  tag.type = 'button';
  tag.className = 'activity-tag';
  tag.textContent = label;
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    tag.classList.toggle('active');
    if (tag.classList.contains('active')) {
      selectedTags.add(label);
    } else {
      selectedTags.delete(label);
    }
  });
  return tag;
}

// ================================================================
// SLIDER VALUE DISPLAYS
// ================================================================
function setupEventListeners() {
  // Sleep slider
  document.getElementById('sleep-slider').addEventListener('input', (e) => {
    document.getElementById('sleep-value').textContent = e.target.value + ' hrs';
  });
  
  // Energy slider
  document.getElementById('energy-slider').addEventListener('input', (e) => {
    document.getElementById('energy-value').textContent = e.target.value + '/10';
  });
  
  // Stress slider
  document.getElementById('stress-slider').addEventListener('input', (e) => {
    document.getElementById('stress-value').textContent = e.target.value + '/10';
  });
  
  // Form submission
  document.getElementById('mood-log-form').addEventListener('submit', saveMood);
  
  // Tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', switchTab);
  });
  
  // History filter
  document.getElementById('history-filter-mood').addEventListener('change', renderHistory);
  
  // Breathing controls
  document.getElementById('start-breathing-btn').addEventListener('click', startBreathing);
  document.getElementById('stop-breathing-btn').addEventListener('click', stopBreathing);
  
  // Data management
  document.getElementById('export-data-btn').addEventListener('click', exportData);
  document.getElementById('import-data-btn').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });
  document.getElementById('import-file-input').addEventListener('change', importData);
  document.getElementById('clear-data-btn').addEventListener('click', clearAllData);
  
  // Calendar navigation
  document.getElementById('prev-month-btn').addEventListener('click', () => previousMonth());
  document.getElementById('next-month-btn').addEventListener('click', () => nextMonth());
}

// ================================================================
// SAVE MOOD ENTRY
// ================================================================
async function saveMood(e) {
  e.preventDefault();
  
  const mood = document.querySelector('input[name="mood"]:checked')?.value;
  if (!mood) {
    alert('Please select a mood');
    return;
  }
  
  const entry = {
    id: editingEntryId || Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    mood: parseInt(mood),
    sleep: parseFloat(document.getElementById('sleep-slider').value),
    energy: parseInt(document.getElementById('energy-slider').value),
    stress: parseInt(document.getElementById('stress-slider').value),
    activities: Array.from(selectedTags),
    notes: document.getElementById('journal-textarea').value,
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch(`${API_URL}/moods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    
    if (response.ok) {
      alert(editingEntryId ? '✅ Entry updated!' : '✅ Mood logged successfully!');
      resetForm();
      await loadMoods();
      updateDashboard();
      renderCalendar();
      renderHistory();
      editingEntryId = null;
    }
  } catch (error) {
    console.error('Error saving mood:', error);
    alert('Error saving mood. Using local storage.');
    // Fallback to localStorage
    allMoods = allMoods.filter(m => m.id !== entry.id);
    allMoods.push(entry);
    localStorage.setItem('moods', JSON.stringify(allMoods));
    alert('✅ Mood logged locally!');
    resetForm();
    updateDashboard();
    renderCalendar();
    renderHistory();
  }
}

function resetForm() {
  document.getElementById('mood-log-form').reset();
  document.querySelectorAll('.activity-tag').forEach(tag => tag.classList.remove('active'));
  selectedTags.clear();
  document.getElementById('sleep-slider').value = 7.5;
  document.getElementById('energy-slider').value = 5;
  document.getElementById('stress-slider').value = 5;
  document.getElementById('sleep-value').textContent = '7.5 hrs';
  document.getElementById('energy-value').textContent = '5/10';
  document.getElementById('stress-value').textContent = '5/10';
  document.getElementById('cancel-edit-btn').classList.add('hidden-element');
  document.getElementById('submit-log-btn').innerHTML = '<span>Save Entry</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
}

// ================================================================
// LOAD MOODS
// ================================================================
async function loadMoods() {
  try {
    const response = await fetch(`${API_URL}/moods`);
    if (response.ok) {
      allMoods = await response.json();
      localStorage.setItem('moods', JSON.stringify(allMoods));
    }
  } catch (error) {
    console.warn('Using local storage for moods');
    allMoods = JSON.parse(localStorage.getItem('moods')) || [];
  }
}

// ================================================================
// DASHBOARD UPDATES
// ================================================================
function updateDashboard() {
  if (allMoods.length === 0) {
    document.getElementById('val-avg-mood').textContent = '—';
    document.getElementById('val-streak').textContent = '0 days';
    document.getElementById('val-logs').textContent = '0';
    document.getElementById('val-breathing').textContent = '0m';
    return;
  }
  
  // Average mood
  const avgMood = (allMoods.reduce((sum, m) => sum + m.mood, 0) / allMoods.length).toFixed(1);
  const moodEmojis = ['', '😢', '🙁', '😐', '🙂', '😄'];
  document.getElementById('val-avg-mood').textContent = moodEmojis[Math.round(avgMood)];
  
  // Streak
  const streak = calculateStreak();
  document.getElementById('val-streak').textContent = streak + ' days';
  
  // Total logs
  document.getElementById('val-logs').textContent = allMoods.length;
  
  // Breathing minutes
  const breathingMinutes = allMoods.reduce((sum, m) => sum + (m.breathing || 0), 0);
  document.getElementById('val-breathing').textContent = breathingMinutes + 'm';
  
  // Update charts
  updateMoodTrendChart();
  updateMoodDistribution();
  updateInsights();
}

function calculateStreak() {
  if (allMoods.length === 0) return 0;
  
  let streak = 1;
  const sortedMoods = [...allMoods].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  for (let i = 1; i < sortedMoods.length; i++) {
    const current = new Date(sortedMoods[i - 1].date);
    const previous = new Date(sortedMoods[i].date);
    const diffDays = (current - previous) / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

// ================================================================
// MOOD TREND CHART
// ================================================================
function updateMoodTrendChart() {
  const last7 = allMoods.slice(-7);
  if (last7.length === 0) return;
  
  const svg = document.getElementById('trend-svg');
  svg.innerHTML = '';
  
  const width = 600;
  const height = 240;
  const padding = 40;
  const points = [];
  
  // Create gradient
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', 'chart-stroke-gradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', '100%');
  gradient.setAttribute('y2', '0%');
  
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', 'hsl(260, 80%, 65%)');
  
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', 'hsl(0, 84%, 60%)');
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);
  
  // Plot points
  last7.forEach((mood, i) => {
    const x = (i / (last7.length - 1)) * (width - 2 * padding) + padding;
    const y = height - ((mood.mood - 1) / 4 * (height - 2 * padding) + padding);
    points.push({ x, y, mood: mood.mood });
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', '5');
    circle.setAttribute('class', 'chart-point');
    circle.setAttribute('fill', 'white');
    circle.setAttribute('stroke', '#8b5cf6');
    circle.setAttribute('stroke-width', '2');
    circle.style.cursor = 'pointer';
    
    circle.addEventListener('mouseenter', () => {
      circle.setAttribute('r', '7');
      circle.setAttribute('stroke-width', '3');
    });
    circle.addEventListener('mouseleave', () => {
      circle.setAttribute('r', '5');
      circle.setAttribute('stroke-width', '2');
    });
    
    svg.appendChild(circle);
  });
  
  // Draw line
  if (points.length > 1) {
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#chart-stroke-gradient)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
  }
}

// ================================================================
// MOOD DISTRIBUTION
// ================================================================
function updateMoodDistribution() {
  const distribution = [0, 0, 0, 0, 0];
  allMoods.forEach(m => {
    distribution[m.mood - 1]++;
  });
  
  const container = document.getElementById('distribution-bars-wrapper');
  container.innerHTML = '';
  
  const labels = ['Awful 😢', 'Bad 🙁', 'Meh 😐', 'Good 🙂', 'Rad 😄'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#a855f7'];
  const total = allMoods.length || 1;
  
  labels.forEach((label, i) => {
    const percentage = (distribution[i] / total) * 100;
    const row = document.createElement('div');
    row.className = 'dist-bar-row';
    row.innerHTML = `
      <span class="dist-label">${label}</span>
      <div class="dist-bar-track">
        <div class="dist-bar-fill m-${i + 1}" style="width: ${percentage}%; background-color: ${colors[i]}"></div>
      </div>
      <span class="dist-count">${distribution[i]}</span>
    `;
    container.appendChild(row);
  });
}

// ================================================================
// INSIGHTS & CORRELATIONS
// ================================================================
function updateInsights() {
  if (allMoods.length < 3) {
    document.getElementById('insights-wrapper').innerHTML = 
      '<p class="empty-state-text">Log at least 3 days of metrics to discover activity correlations.</p>';
    return;
  }
  
  const activities = {};
  allMoods.forEach(m => {
    m.activities?.forEach(activity => {
      if (!activities[activity]) {
        activities[activity] = [];
      }
      activities[activity].push(m.mood);
    });
  });
  
  const boosters = Object.entries(activities)
    .map(([activity, moods]) => ({
      activity,
      avgMood: moods.reduce((a, b) => a + b, 0) / moods.length,
      count: moods.length
    }))
    .sort((a, b) => b.avgMood - a.avgMood)
    .slice(0, 5);
  
  const container = document.getElementById('insights-wrapper');
  container.innerHTML = '';
  
  if (boosters.length === 0) {
    container.innerHTML = '<p class="empty-state-text">Add activities to discover mood correlations!</p>';
    return;
  }
  
  boosters.forEach(booster => {
    const item = document.createElement('div');
    item.className = 'booster-item';
    const score = (booster.avgMood / 5 * 100).toFixed(0);
    item.innerHTML = `
      <span class="booster-tag">${booster.activity}</span>
      <span class="booster-score">${score}% match</span>
    `;
    container.appendChild(item);
  });
}

// ================================================================
// HISTORY RENDERING
// ================================================================
function renderHistory() {
  const filter = document.getElementById('history-filter-mood').value;
  const filtered = filter === 'all' 
    ? allMoods 
    : allMoods.filter(m => m.mood === parseInt(filter));
  
  const container = document.getElementById('history-logs-list');
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state-text">No entries found.</p>';
    return;
  }
  
  container.innerHTML = '';
  
  const moodEmojis = ['', '😢', '🙁', '😐', '🙂', '😄'];
  const moodNames = ['', 'Awful', 'Bad', 'Meh', 'Good', 'Rad'];
  
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(mood => {
    const logItem = document.createElement('div');
    logItem.className = 'history-log-item';
    logItem.innerHTML = `
      <div class="log-item-header">
        <span class="log-mood-badge" data-mood="${mood.mood}">
          ${moodEmojis[mood.mood]}
        </span>
        <div class="log-item-meta">
          <h4>${moodNames[mood.mood]} - ${new Date(mood.date).toLocaleDateString()}</h4>
          <p class="log-metrics">💤 ${mood.sleep}h | ⚡ ${mood.energy}/10 | 😰 ${mood.stress}/10</p>
        </div>
      </div>
      ${mood.activities?.length > 0 ? `
        <div class="log-tags">
          ${mood.activities.map(tag => `<span class="log-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
      ${mood.notes ? `<p class="log-notes">"${mood.notes}"</p>` : ''}
      <div class="log-actions">
        <button class="log-edit-btn" onclick="editMood('${mood.id}')">Edit</button>
        <button class="log-delete-btn" onclick="deleteMood('${mood.id}')">Delete</button>
      </div>
    `;
    container.appendChild(logItem);
  });
}

function editMood(id) {
  const mood = allMoods.find(m => m.id === id);
  if (!mood) return;
  
  editingEntryId = id;
  
  document.getElementById(`mood-${mood.mood === 5 ? 'rad' : mood.mood === 4 ? 'good' : mood.mood === 3 ? 'meh' : mood.mood === 2 ? 'bad' : 'awful'}`).checked = true;
  document.getElementById('sleep-slider').value = mood.sleep;
  document.getElementById('energy-slider').value = mood.energy;
  document.getElementById('stress-slider').value = mood.stress;
  document.getElementById('journal-textarea').value = mood.notes || '';
  
  // Update displays
  document.getElementById('sleep-value').textContent = mood.sleep + ' hrs';
  document.getElementById('energy-value').textContent = mood.energy + '/10';
  document.getElementById('stress-value').textContent = mood.stress + '/10';
  
  // Select activities
  document.querySelectorAll('.activity-tag').forEach(tag => {
    if (mood.activities?.includes(tag.textContent)) {
      tag.classList.add('active');
      selectedTags.add(tag.textContent);
    } else {
      tag.classList.remove('active');
    }
  });
  
  // Update button
  document.getElementById('cancel-edit-btn').classList.remove('hidden-element');
  document.getElementById('submit-log-btn').innerHTML = '<span>Update Entry</span>';
  
  // Scroll to form
  document.querySelector('.log-panel').scrollIntoView({ behavior: 'smooth' });
}

async function deleteMood(id) {
  if (!confirm('Are you sure you want to delete this entry?')) return;
  
  try {
    const response = await fetch(`${API_URL}/moods/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      await loadMoods();
      updateDashboard();
      renderCalendar();
      renderHistory();
    }
  } catch (error) {
    console.error('Error deleting mood:', error);
    allMoods = allMoods.filter(m => m.id !== id);
    localStorage.setItem('moods', JSON.stringify(allMoods));
    updateDashboard();
    renderCalendar();
    renderHistory();
  }
}

// ================================================================
// CALENDAR VIEW
// ================================================================
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const container = document.getElementById('calendar-days');
  container.innerHTML = '';
  
  // Month title
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('calendar-month-title').textContent = 
    `${monthNames[currentMonth]} ${currentYear}`;
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day-cell empty';
    container.appendChild(emptyCell);
  }
  
  // Days
  const moodEmojis = ['', '😢', '🙁', '😐', '🙂', '😄'];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayMood = allMoods.find(m => m.date === dateStr);
    
    cell.className = 'calendar-day-cell';
    if (dayMood) {
      cell.classList.add(`m-${dayMood.mood}`);
      cell.innerHTML = `
        <span class="day-number">${day}</span>
        <span class="day-emoji">${moodEmojis[dayMood.mood]}</span>
      `;
      cell.style.backgroundColor = `hsla(var(--mood-${dayMood.mood}-hsl), 0.3)`;
      cell.style.borderColor = `hsl(var(--mood-${dayMood.mood}-hsl))`;
    } else {
      cell.innerHTML = `<span class="day-number">${day}</span>`;
    }
    
    container.appendChild(cell);
  }
}

function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// ================================================================
// TAB NAVIGATION
// ================================================================
function switchTab(e) {
  const target = e.target.closest('.tab-btn');
  const panelId = target.dataset.target;
  
  // Update active button
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  
  // Update active panel
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  document.getElementById(panelId).classList.add('active');
}

// ================================================================
// BREATHING EXERCISE
// ================================================================
function startBreathing() {
  isBreathing = true;
  breathingSeconds = 0;
  document.getElementById('start-breathing-btn').classList.add('hidden-element');
  document.getElementById('stop-breathing-btn').classList.remove('hidden-element');
  document.getElementById('breathing-sphere').classList.add('breathing-animation');
  
  const phases = ['Inhale...', 'Hold...', 'Exhale...'];
  let phase = 0;
  let count = 0;
  
  breathingTimer = setInterval(() => {
    breathingSeconds++;
    const minutes = Math.floor(breathingSeconds / 60);
    const seconds = breathingSeconds % 60;
    document.getElementById('breathing-timer-display').textContent = 
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    count++;
    if (count % 4 === 0) {
      phase = (phase + 1) % 3;
      document.getElementById('breathing-instruction').textContent = phases[phase];
    }
  }, 1000);
}

function stopBreathing() {
  isBreathing = false;
  clearInterval(breathingTimer);
  document.getElementById('start-breathing-btn').classList.remove('hidden-element');
  document.getElementById('stop-breathing-btn').classList.add('hidden-element');
  document.getElementById('breathing-sphere').classList.remove('breathing-animation');
  document.getElementById('breathing-instruction').textContent = 'Press Start';
  
  // Save breathing session
  const today = new Date().toISOString().split('T')[0];
  let todayEntry = allMoods.find(m => m.date === today);
  if (todayEntry) {
    todayEntry.breathing = (todayEntry.breathing || 0) + Math.floor(breathingSeconds / 60);
  }
  updateDashboard();
  document.getElementById('breathing-timer-display').textContent = '00:00';
}

// ================================================================
// DATA EXPORT/IMPORT
// ================================================================
function exportData() {
  const dataStr = JSON.stringify(allMoods, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `aura-mood-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        allMoods = [...allMoods, ...imported];
        const response = await fetch(`${API_URL}/moods/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allMoods)
        });
        
        if (response.ok) {
          localStorage.setItem('moods', JSON.stringify(allMoods));
          alert('✅ Data imported successfully!');
          updateDashboard();
          renderCalendar();
          renderHistory();
        }
      }
    } catch (error) {
      alert('Error importing data: ' + error.message);
    }
  };
  reader.readAsText(file);
}

function clearAllData() {
  if (!confirm('⚠️ This will DELETE all your mood data. Are you sure?')) return;
  
  fetch(`${API_URL}/moods/clear`, { method: 'DELETE' })
    .catch(() => {
      localStorage.removeItem('moods');
    })
    .finally(() => {
      allMoods = [];
      localStorage.setItem('moods', JSON.stringify(allMoods));
      updateDashboard();
      renderCalendar();
      renderHistory();
      alert('Data cleared');
    });
}

// Global functions for inline onclick handlers
window.editMood = editMood;
window.deleteMood = deleteMood;
