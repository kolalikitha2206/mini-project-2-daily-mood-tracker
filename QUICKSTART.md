# 🚀 QUICK START GUIDE - Aura Mood Tracker

## ⚡ Get Running in 3 Minutes

### STEP 1: Open Terminal/Command Prompt
- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac**: Press `Cmd + Space`, type `terminal`, press Enter
- **Linux**: Press `Ctrl + Alt + T`

### STEP 2: Navigate to Project Folder
Copy and paste this command:

**Windows (PowerShell or CMD):**
```bash
cd "c:\Users\HP\OneDrive\Desktop\daily mood tracker"
```

**Mac/Linux:**
```bash
cd ~/Desktop/"daily mood tracker"
```

### STEP 3: Install Dependencies
Copy and paste this command:

```bash
npm install
```

**What happens:**
- Downloads Express.js and CORS packages
- Creates `node_modules` folder
- Takes 30-60 seconds

### STEP 4: Start the Server
Copy and paste this command:

```bash
npm start
```

**Success! You should see:**
```
╔═══════════════════════════════════════════╗
║   🌟 Aura - Mood Tracker Server          ║
║   Running on http://localhost:3000        ║
║   Open in browser to start tracking       ║
╚═══════════════════════════════════════════╝
```

### STEP 5: Open in Browser
- Open your web browser (Chrome, Firefox, Safari, Edge)
- Go to: `http://localhost:3000`
- **You're in!** 🎉

---

## 📋 First Time Setup Checklist

- [ ] Terminal/CMD window is open
- [ ] You're in the project folder
- [ ] `npm install` completed successfully
- [ ] `npm start` server is running
- [ ] Browser is open at http://localhost:3000
- [ ] You see the Aura interface with the logo

---

## 🎯 First Entry (Try This)

1. **Select Mood**: Click the 😄 (Good) emoji
2. **Set Sleep**: Slide to 8 hours
3. **Set Energy**: Slide to 7/10
4. **Set Stress**: Slide to 4/10
5. **Add Activities**: Click "Exercise" and "Work"
6. **Add Notes**: Type "First mood entry!"
7. **Save**: Click "Save Entry"
8. **See Dashboard**: Check the charts on the right!

---

## 💡 Common Commands

### Stop the Server (When Done)
Press in terminal: `Ctrl + C`

Then confirm: `Y` and `Enter`

### Restart the Server
- Press `Ctrl + C` to stop
- Run `npm start` again

### Troubleshooting Commands

**Check Node.js installed:**
```bash
node --version
npm --version
```

**Delete node_modules and reinstall:**
```bash
rm -r node_modules
npm install
```

---

## 🎨 Quick Features to Try

✅ **Log Your Mood** - Select emoji, set metrics, save
✅ **View Dashboard** - See charts after 3+ entries
✅ **Calendar** - Click Calendar tab to see mood heatmap
✅ **Breathing** - Click Mindfulness tab, start 5-min session
✅ **History** - Click History tab to see all entries
✅ **Dark Mode** - Click moon icon in header
✅ **Export Data** - Click "Export Data" button at bottom

---

## 📞 Help!

**Server won't start?**
- Make sure port 3000 is not in use
- Try: `npm start` again
- Check terminal for errors

**Nothing appears in browser?**
- Refresh page (Ctrl + R or Cmd + R)
- Check URL is exactly: http://localhost:3000
- Open browser console (F12) for errors

**Entries not saving?**
- Check browser console (F12)
- Data saves locally automatically
- Try export/import to verify

**Server stopped running?**
- Look for error messages in terminal
- Run `npm start` again
- Restart terminal window

---

## 📚 Full Documentation

For complete guide, features, customization, and tips:
👉 Read **README.md** in the project folder

---

## 🎯 Your Next Steps

1. **Now**: Start the server with `npm start`
2. **Today**: Log your current mood
3. **Tomorrow**: Log mood again (builds streak!)
4. **Next Week**: Review trends in Dashboard
5. **Weekly**: Export backup of your data

---

## 🌟 Ready? Let's Go!

```bash
cd "c:\Users\HP\OneDrive\Desktop\daily mood tracker"
npm install
npm start
```

Then open: **http://localhost:3000**

Enjoy tracking your moods! ✨🧘
