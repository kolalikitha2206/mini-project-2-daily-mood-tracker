# 🎓 STEP-BY-STEP WALKTHROUGH

## Part 1: Installation & Setup

### Step 1️⃣: Open Terminal
**Windows:**
- Press `Win + R`
- Type: `cmd`
- Press Enter

**Result:**
```
C:\Users\HP>
```

---

### Step 2️⃣: Navigate to Project Folder

**Command:**
```bash
cd "c:\Users\HP\OneDrive\Desktop\daily mood tracker"
```

**Result:**
```
C:\Users\HP\OneDrive\Desktop\daily mood tracker>
```

---

### Step 3️⃣: Check Node.js Installation

**Command:**
```bash
node --version
```

**Result should be:**
```
v18.x.x  (or higher - version 16+ is good)
```

If you get "command not found", install Node.js from https://nodejs.org/

---

### Step 4️⃣: Install Dependencies

**Command:**
```bash
npm install
```

**What happens:**
```
npm notice created a lockfile as package-lock.json
added 56 packages from 113 contributors
found 0 vulnerabilities
```

**Files created:**
- `node_modules/` folder (big folder)
- `package-lock.json` file

⏱️ **Takes:** 30-60 seconds

---

### Step 5️⃣: Start the Server

**Command:**
```bash
npm start
```

**Success Message:**
```
╔═══════════════════════════════════════════╗
║   🌟 Aura - Mood Tracker Server          ║
║   Running on http://localhost:3000        ║
║   Open in browser to start tracking       ║
╚═══════════════════════════════════════════╝
```

✅ **Server is running!** Keep this terminal open.

---

## Part 2: Using the Application

### Step 6️⃣: Open in Browser

1. Open your favorite browser (Chrome, Firefox, Edge, Safari)
2. Go to: `http://localhost:3000`
3. Press Enter

**You should see:**
```
🌟 Aura
Mindful Mood Tracking
[Purple & Pink gradient interface]
```

✅ **App loaded!**

---

### Step 7️⃣: Log Your First Mood

**Task:** Track today's mood with all metrics

**What to do:**

**A) Select Your Mood**
- Look at the 5 emojis: 😢 🙁 😐 🙂 😄
- Click on one (let's say 🙂 "Good")
- The box will highlight and glow

**B) Set Sleep Duration**
- Find "Sleep Duration" slider
- Drag left/right to set hours (example: 8)
- Display shows: "8 hrs"

**C) Set Energy Level**
- Find "Energy Level" slider
- Drag to 7 (example)
- Display shows: "7/10"

**D) Set Stress Level**
- Find "Stress Level" slider
- Drag to 4 (example - lower is better)
- Display shows: "4/10"

**E) Add Activities**
- Click on: [Exercise]
- It highlights (purple background)
- Click on: [Work]
- It highlights too

**F) Write Journal**
- Click in "Journal Notes" text area
- Type: "Great day! Productive morning"

**G) Save Entry**
- Click the blue **"💾 Save Entry"** button

**Result:**
```
✅ Mood logged successfully!
```

---

### Step 8️⃣: Check Dashboard

After saving, immediately:

1. **Look at Header** (top)
   - Average Mood now shows: 🙂
   - Total Logs: 1
   - Streak: 1 day

2. **Check Dashboard Tab** (right panel)
   - Should still be active (blue highlight)
   - "Mood Trend" chart might appear
   - "Mood Breakdown" shows 1 entry
   - "Top Mood Boosters" says "Log at least 3 days"

3. **Check History Tab**
   - Click: **History** button (right side)
   - See your entry listed:
   ```
   ▌ 🙂 Good - June 9, 2026
     💤 8h | ⚡ 7/10 | 😰 4/10
     [Exercise] [Work]
     "Great day! Productive morning"
   ```

---

### Step 9️⃣: Log 2 More Entries

**Log Entry #2** (Tomorrow or different mood)

1. Click a different mood (try 😐 "Meh")
2. Adjust sliders:
   - Sleep: 6.5
   - Energy: 5
   - Stress: 6
3. Select different activities: [Social] [Reading]
4. Write: "Relaxing evening after work"
5. Click **Save Entry**

**Wait for result:**
```
✅ Mood logged successfully!
```

**Log Entry #3** (Another mood)

1. Click 😄 "Rad"
2. Set sliders:
   - Sleep: 8.5
   - Energy: 9
   - Stress: 2
3. Select: [Meditation] [Exercise]
4. Write: "Amazing morning!"
5. Click **Save Entry**

---

### Step 🔟: See Charts Appear!

After 3+ entries:

**Dashboard Tab:**
- ✅ Mood Trend chart shows line connecting your moods
- ✅ Mood Breakdown shows bars for distribution
- ✅ Top Mood Boosters shows activities (Exercise: 95%, etc.)
- ✅ Metrics update: Average Mood, Streak, Total Logs

---

## Part 3: Explore Features

### 🗓️ Step 11: Calendar View

**Click:** Calendar tab

**See:**
- Current month (June 2026)
- Each day with mood emoji
- Colors: Red (bad) → Yellow (meh) → Green (good) → Purple (rad)
- Legend at bottom

**Try:**
- Click ▶ to see next month
- Click ◀ to see previous month
- Hover over dates with moods

---

### 🧘 Step 12: Breathing Exercise

**Click:** Mindfulness tab

**See:**
- Title: "Breathing Space"
- Large pulsing circle in center
- Text: "Press Start"
- Button: "Start Practice"

**Try:**
1. Click **Start Practice** button
2. Circle starts pulsing (expanding/shrinking)
3. Instructions change: "Inhale..." → "Hold..." → "Exhale..."
4. Timer counts up: 00:00 → 00:01 → etc.
5. After ~5 minutes click **End Session**
6. Check History - breathing time added!

---

### 📜 Step 13: History with Filter

**Click:** History tab

**See:**
- Dropdown: "All Moods"
- Your 3 entries listed below
- Each with emoji, date, metrics, activities, notes

**Try:**
1. Click dropdown: "All Moods"
2. Select: "Good 🙂"
3. Now shows only 1 entry
4. Select: "Rad 😄"
5. Shows only Rad entries
6. Back to: "All Moods"

**Try Edit:**
1. Click **[Edit]** on an entry
2. Form fills with that entry data
3. Change something (mood or note)
4. Click **Update Entry**
5. Entry updates in History

**Try Delete:**
1. Click **[Delete]** on an entry
2. Confirm deletion
3. Entry removed

---

### 🌙 Step 14: Dark/Light Theme

**In Header:**
- Look for moon icon 🌙 (top right)

**Click:** 🌙 icon

**See:**
- Everything turns light (white/light purple)
- Text becomes dark
- All colors invert but stay coordinated

**Click:** ☀️ icon to go back to dark

---

## Part 4: Data Management

### 💾 Step 15: Export Your Data

**Bottom of page:**
- Click: **Export Data** button

**What happens:**
- Browser downloads: `aura-mood-backup-2026-06-09.json`
- File saved to Downloads folder
- Contains all your mood entries

**File contents (sample):**
```json
[
  {
    "id": "1718072800000",
    "date": "2026-06-09",
    "mood": 4,
    "sleep": 8.5,
    "energy": 9,
    "stress": 2,
    "activities": ["Exercise", "Meditation"],
    "notes": "Amazing day!",
    "timestamp": "2026-06-09T22:00:00Z",
    "breathing": 5
  }
]
```

✅ **Safe backup created!**

---

### 📤 Step 16: Import Backup Data

Scenario: You want to restore from backup

1. Click: **Import Data** button
2. File picker opens
3. Select your JSON backup file
4. Confirm import

**Result:**
```
✅ Data imported successfully!
```

All previous entries restored!

---

### 🗑️ Step 17: Clear Data (Be Careful!)

**Only if you want to start fresh:**

1. Click: **Clear Data** button
2. Warning appears:
   ```
   ⚠️ This will DELETE all your mood data. Are you sure?
   ```
3. Click OK to confirm
4. **All data deleted** ❌

**Recovery:** Import your backup file to restore!

---

## Part 5: Advanced Usage

### 📊 Step 18: Understanding Insights

**What the Dashboard Shows:**

**Mood Trend (Chart):**
- Last 7 moods as a line
- If line goes up → getting happier
- If line goes down → getting sadder
- Spiky = unstable mood

**Mood Breakdown (Bars):**
- Shows how often each mood
- Wide bar = frequent mood
- Example: If 🙂 Good has biggest bar, you're usually happy

**Top Mood Boosters:**
- Activities tied to good moods
- 95% match = this activity makes you happier
- Use to predict what helps you

---

### 💡 Step 19: Best Practices

**For Best Results:**

✅ **Log daily** at same time (e.g., bedtime)
✅ **Be honest** about mood and metrics
✅ **Add activities** you did that day
✅ **Write notes** why you feel this way
✅ **Check trends** weekly
✅ **Export backup** monthly
✅ **Review patterns** after 2-3 weeks

---

### 🎯 Step 20: Common Usage Patterns

**Morning User:**
- Logs previous night's mood
- Sets sleep hours
- Predicts today's mood

**Evening User:**
- Logs end-of-day mood
- Reflects on day's activities
- Plans tomorrow

**Therapist's Tool:**
- Track mood therapy results
- See what treatments work
- Share insights with provider

**Wellness Researcher:**
- Track activity correlations
- Find optimal sleep amount
- Experiment with stress reduction

---

## ⚡ Quick Reference

### Keyboard Shortcuts
- `Tab` - Jump between fields
- `Enter` - Submit form
- `Escape` - Cancel (sometimes)

### Common Commands (Terminal)

Stop Server:
```bash
Ctrl + C
```

Restart Server:
```bash
npm start
```

Reinstall Packages:
```bash
rm -r node_modules
npm install
npm start
```

---

## 🐛 Troubleshooting During Walkthrough

**Q: Form doesn't save?**
- A: Check browser console (F12) for errors
- Refresh page and try again
- Data saves locally automatically

**Q: Charts don't show?**
- A: Need 3+ entries minimum
- Check Dashboard tab
- Refresh page

**Q: Theme toggle not working?**
- A: Click the icon again
- Refresh page (Ctrl+F5)
- Check browser console

**Q: Export creates blank file?**
- A: Moods might not be in moods.json
- Check browser console
- Data might be in localStorage only

**Q: Server keeps stopping?**
- A: Port 3000 might be in use
- Run: `npm start` again
- Try different port: set PORT=3001

---

## 🎉 Congratulations!

You now know how to:
- ✅ Install and start the app
- ✅ Log moods with full metrics
- ✅ View charts and insights
- ✅ Track calendar and history
- ✅ Use breathing exercises
- ✅ Export and import data
- ✅ Switch themes
- ✅ Edit and delete entries

**You're a Aura expert!** 🌟

---

## 📝 Next Actions

1. **Keep logging** - Build consistent data
2. **Check patterns** - After 1 week of logs
3. **Customize** - Change colors or activities
4. **Share** - Show friends/therapist
5. **Backup** - Monthly exports
6. **Improve** - Based on insights

---

## 📚 Full Documentation

For more details:
- README.md - Complete feature guide
- PROJECT-SETUP.md - Technical setup
- OUTPUT-GUIDE.md - Visual reference

**Happy tracking! 🧘✨**
