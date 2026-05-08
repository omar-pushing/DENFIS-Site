# DENFIS — Accident Severity Prediction

A modern React web app that predicts road accident severity based on weather conditions (temperature, visibility, humidity) using a ML-powered backend.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React + MUI Icons
- **UI Components**: shadcn/ui (Radix UI)
- **Backend**: Python Flask API (separate deployment — see below)

---

## Project Structure

```
denfis-vercel/
├── src/
│   ├── app/
│   │   ├── App.tsx                      # Main app component
│   │   └── components/
│   │       ├── AnimatedBackground.tsx   # Mouse-tracking gradient bg
│   │       ├── InputField.tsx           # Animated numeric input
│   │       ├── PredictionCard.tsx       # Result display card
│   │       ├── figma/
│   │       │   └── ImageWithFallback.tsx
│   │       └── ui/                      # shadcn/ui components
│   ├── main.tsx
│   └── styles/
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css                    # CSS variables / dark theme
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vercel.json                          # Vercel deployment config
├── .env.example                         # Environment variable template
└── .gitignore
```

---

## Local Development

### Prerequisites
- Node.js 18+

### Setup

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env

# Edit .env — set your Flask API URL
# VITE_API_URL=https://your-flask-api.com/predict

# Start dev server
npm run dev
```

The app falls back to mock predictions if the API is unreachable, so it works offline for UI development.

---

## Deploying to Vercel

### One-click (after pushing to GitHub)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repo — Vercel auto-detects Vite
4. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-flask-api-url.com/predict`
5. Deploy ✅

### CLI deploy

```bash
npm i -g vercel
vercel login
vercel --prod
```

Set the env var in the Vercel dashboard under **Project → Settings → Environment Variables**.

---

## Backend API (Flask)

The frontend calls `VITE_API_URL` (default: `http://localhost:5000/predict`).

**POST** `/predict`

Request:
```json
{ "temperature": 32.0, "visibility": 5.0, "humidity": 65.0 }
```

Response:
```json
{ "severity": "Low" }
```

`severity` must be one of: `"Low"`, `"Medium"`, `"High"`

The Python backend requires:
```
numpy==1.26.4
scikit-learn==1.4.2
flask
flask-cors
```

> Deploy the Flask API to [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io), then set the URL in Vercel env vars.

---

## Input Ranges

| Parameter   | Min    | Max    |
|-------------|--------|--------|
| Temperature | -60 °F | 160 °F |
| Visibility  | 0 mi   | 10 mi  |
| Humidity    | 0 %    | 100 %  |

---

## License

MIT
