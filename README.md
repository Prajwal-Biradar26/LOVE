# 🌹 Romantic "I'm Sorry" & Proposal Experience

A handcrafted, deeply personal, and highly interactive apology microsite designed to feel like an emotional digital love letter rather than a generic template.

Guided by a multi-step journey: **Playful Dilemma (with an evasive NO button)** ➔ **The Honest Apology (Typewriter letter)** ➔ **Cherished Memories (Interactive cards)** ➔ **The Handwritten Love Letter** ➔ **The Final Question (Celebration or Gracious Space)**.

---

## ✨ Features

- **Playful Evasive NO Button**: Uses pointer proximity detection (~100px) and touch physics to playfully dance away to safe viewport coordinates while cycling through funny and heartfelt responses.
- **Growing YES Prominence**: As the NO button is playfully pursued, the YES button scales up slightly and gains a warm romantic glow.
- **Respectful Boundaries & Accessibility**: Includes an accessible *"I really mean no"* option, keyboard navigation focus, and `prefers-reduced-motion` compliance.
- **Multi-Step Romantic Narrative**:
  1. **Landing Card**: "I'm Sorry ❤️" with honest opening thoughts.
  2. **Step 1 — The Apology**: Gradual typewriter animation delivering a heartfelt, non-manipulative statement with skip option.
  3. **Step 2 — Cherished Memories**: Interactive grid of cards honoring qualities and moments never taken for granted.
  4. **Step 3 — Handwritten Letter**: Full-screen parchment-styled personal letter with a glowing, beating heart seal.
  5. **Step 4 — The Final Question**: "So… can we start again? ❤️" with an elegant celebration or a pressure-free, understanding response.
- **Celebration Finale**: Gentle confetti bursts, floating rose petals, soft glowing ambiance, and romantic reassurance.
- **Resilient Music Player**:
  - Optional background music with visible play/pause button and volume control.
  - Supports custom MP3 files placed at `frontend/public/assets/music/romantic.mp3`.
  - Built-in **Web Audio API procedural ambient chord synthesizer** as a zero-setup fallback if no MP3 file is provided!
- **Anonymous Interaction Analytics & Admin Dashboard**:
  - Tracks anonymous events (`page_opened`, `yes_clicked`, `no_interaction`, `final_yes`, `needs_time`).
  - No personal data or IP addresses stored.
  - View stats by clicking the **Analytics** icon in the footer or visiting `/?admin=true`.
  - Resilient backend: works immediately out of the box with an in-memory fallback, and automatically connects to MongoDB when configured.
- **100% Centralized Personalization**: Edit all messages, memories, and partner names in a single file (`frontend/src/config/apology.js`).

---

## 🚀 1. Installation Commands

### Quick Start (Root Monorepo)

From the project root directory:

```bash
# Windows Command Prompt / PowerShell:
npm.cmd install
npm.cmd run install:all

# Linux / macOS:
npm install
npm run install:all
```

*(On Windows, you can also simply double-click `install.bat`)*.

---

## 💻 2. How to Run Frontend & Backend Together

You can launch both the Express backend and the Vite frontend simultaneously with one command from the project root:

```bash
# Windows:
npm.cmd run dev

# Linux / macOS:
npm run dev
```

*(Or simply double-click `run-dev.bat` on Windows)*.

- **Frontend**: Accessible at `http://localhost:5173`
- **Backend API**: Accessible at `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

---

## 🖥️ 3. How to Run Independently

### Running Only the Backend

```bash
cd backend
npm.cmd install     # (or npm install)
npm.cmd run dev     # (starts with auto-reloading)
```

Backend will run on `http://localhost:5000`.

### Running Only the Frontend

```bash
cd frontend
npm.cmd install     # (or npm install)
npm.cmd run dev
```

Frontend will run on `http://localhost:5173` with proxy routing to `http://localhost:5000`.

---

## 🍃 4. How to Connect MongoDB

The backend works **immediately without MongoDB** using an automatic in-memory fallback so you never get crashes.

To persist interactions permanently with MongoDB:

1. Create a `.env` file in the `backend/` directory (or copy `.env.example`):

```bash
cp .env.example backend/.env
```

2. Open `backend/.env` and provide your MongoDB connection string (e.g., MongoDB Atlas or local instance):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sorry_love?retryWrites=true&w=majority
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

3. Restart the backend server. The console will display:
```
✨ Connected to MongoDB: cluster0.mongodb.net
```

---

## ✍️ 5. How to Customize the Apology Text

All customizable text, quotes, memories, and options are located in **one single file**:

📁 `frontend/src/config/apology.js`

You can customize:
- **Partner's name** (`recipientName`) and your signature (`senderName`)
- **Landing hero copy** (`hero.title`, `hero.subtitle`, `hero.question`)
- **Runaway NO quotes** (`noButtonMessages`)
- **Step 1 Apology letter paragraphs** (`step1Apology.paragraphs`)
- **Step 2 Memories cards** (`step2Memories.cards` — change icons, titles, and descriptions)
- **Step 3 Handwritten letter** (`step3Letter.paragraphs`)
- **Step 4 Final question & compassionate response** (`step4FinalQuestion`, `needsTimeResponse`)
- **Celebration quotes** (`celebration.heading`, `celebration.promise`, `celebration.quote`)

Any changes saved in `apology.js` update live immediately via Vite Hot Module Replacement (HMR).

---

## 🎵 6. How to Add Your Own Music

1. Obtain your favorite romantic song in `.mp3` format.
2. Place the file at:
   ```
   frontend/public/assets/music/romantic.mp3
   ```
3. Refresh the page. When the partner clicks the **Music** button in the top right, your custom track will play!
4. *(If no MP3 is placed, the app automatically synthesizes gentle ambient acoustic piano/harp chords via the Web Audio API so it never feels empty).*

---

## 🌐 7. How to Deploy the Frontend

### Deploying to Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Configure the project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In Environment Variables, set:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com`)
5. Click **Deploy**.

---

## ☁️ 8. How to Deploy the Backend

### Deploying to Render / Railway / Heroku

1. In Render or Railway, create a new **Web Service**.
2. Point to your repository and set the **Root Directory** to `backend`.
3. Set build and start commands:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. In Environment Variables, set:
   - `PORT`: `5000` (or leave default for platform)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ALLOWED_ORIGINS`: `https://your-frontend.vercel.app`
5. Deploy the service.

---

## 📊 Analytics & Admin Dashboard

Click the discreet **Analytics** button at the bottom right of the footer, or open the URL with `?admin=true`:

```
http://localhost:5173/?admin=true
```

You will see real-time statistics on:
- Total visits
- First YES forgiven clicks
- NO button chase interactions
- Step progression funnel
- Final YES vs "I Need Some Time" responses

No personally identifiable information (PII) is ever collected.

---

## 🌹 License & Disclaimers

Created with love and respect. Designed for genuine accountability, empathy, and open communication.
