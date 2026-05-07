# SafeDrive Analyzer

A modern web application that predicts accident severity based on weather conditions using Flask API integration.

## Features

- **Real-time Weather Analysis**: Input temperature, visibility, and humidity to assess road safety risks
- **Smart Predictions**: Three-tier severity classification (Low, Medium, High)
- **Intuitive UX**: Clean, accessible interface with helpful input validation
- **Responsive Design**: Works seamlessly on all device sizes
- **Smooth Animations**: Engaging micro-interactions and animated backgrounds

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: Flask API (separate repository)

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm
- Your Flask API running (or update API URL)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Update the `VITE_API_URL` in `.env` to point to your Flask API endpoint

5. Start the development server:
   ```bash
   pnpm run dev
   ```

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `VITE_API_URL` with your Flask API endpoint

### Build Command

Vercel will automatically detect Vite and use:
- **Build Command**: `vite build`
- **Output Directory**: `dist`

## API Integration

The app expects your Flask API to accept POST requests at `/predict` with the following structure:

**Request:**
```json
{
  "temperature": 32.0,
  "visibility": 5.0,
  "humidity": 65.0
}
```

**Response:**
```json
{
  "severity": "Low"
}
```

The `severity` field should return one of: `"Low"`, `"Medium"`, or `"High"`

## Environment Variables

- `VITE_API_URL`: Your Flask API endpoint URL (default: `http://localhost:5000/predict`)

## License

MIT
