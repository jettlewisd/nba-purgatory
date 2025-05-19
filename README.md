# 🏀 NBA Purgatory

**A chaotic satirical browser game simulating the psychological rollercoaster of an attending NBA game.**

Built with **Vue 3**, **Pinia**, and **TailwindCSS**, *NBA Purgatory* is an interactive comedy experience where fans chase hype, dodge regret, and maybe—just maybe—leave the arena with their soul intact.

---

## 🎮 Gameplay Overview

You're not a player. You're not a coach.  
You're **a deeply online NBA fan in the crowd**, and it's your moment to... vibe?  
Click things. Yell things. Buy beer. Moss children for t-shirts. Anything to shift the fate of the game.

### Your goals:
- 🔥 Maximize **HYPE**
- 💀 Minimize **REGRET**
- 💸 Spend your **MONEY** (wisely... or not)
- 📈 Beat the opposing team
- 💫 Survive the spectacle

---

## 🕹 Features

- 🎯 **Click-based scoring** – Spam the floating basketball to score... unless it's a *turnover window*.
- 💡 **Dynamic event buttons** – Randomly spawn wild choices with unpredictable consequences.
- 🎭 **Multiple game states** – From HOT HANDS to LUKA TRADES to BEER BLACKOUTS, chaos reigns.
- 🧠 **Emotion-based outcome system** – Your emotional stats directly influence gameplay and ending.
- 🎧 **Original sound design** – 30+ meme-infused sound clips tied to events, choices, and game states.
- 👁️‍🗨️ **Endgame analysis** – A satirical final judgment based on your choices and stats.

---

## ⚙️ Tech Stack

- [Vue 3](https://vuejs.org/) – Composition API + `<script setup>`
- [Pinia](https://pinia.vuejs.org/) – State management
- [TailwindCSS](https://tailwindcss.com/) – Styling + animation
- Custom utility logic for randomized outcomes, animation scheduling, and sound management

---

## 📂 File Structure Highlights

- `App.vue` – Core game loop, UI, visual layers, and interaction handlers
- `stores/game.js` – Global state management using Pinia
- `data/buttonEvents.js` – Event metadata including effects, tiers, and sound mapping
- `utils/sound.js` – Utility for playing and fading audio
- `assets/` – All visuals and sounds (players, celebs, SFX, background)

---

## 🚀 Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/jettlewisd/nba-purgatory.git
   cd nba-purgatory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:5173
   ```

---

## 🧠 Design Philosophy

NBA Purgatory was made to satirize:
- Modern sports fandom
- Hyper-commercialized arena experiences
- The illusion of control fans feel over games
- Our chaotic emotional attachments to players, teams, and memes

---

## 👋 Author

**Jett Drafahl**  
Full-stack developer building creative interactive experiences  
- Portfolio: [portfolio-jett-drafahls-projects.vercel.app](https://portfolio-jett-drafahls-projects.vercel.app)  
- GitHub: [@jettlewisd](https://github.com/jettlewisd)  
- LinkedIn: [@jettdrafahl](https://www.linkedin.com/in/jettdrafahl/)

---

Welcome to NBA Purgatory.  
Ball is life... until it's not.
