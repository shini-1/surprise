# Surprise

A romantic five-step interactive site built with React (frontend) and FastAPI (backend), deployed on Vercel.

## Architecture

- **Frontend**: React + Vite + TypeScript (deployed to Vercel)
- **Backend**: FastAPI + Python (deployed to Vercel as serverless function)
- **Styling**: Custom CSS with cursive fonts (Great Vibes)

## What You Can Edit Easily

- Replace the top image by overwriting `frontend/public/custom_image.png`.
- Replace the poem by editing `poem.txt` (must have exactly 5 stanzas, separated by blank lines).
- Change button labels or headings in the React components under `frontend/src/components/`.

## Local Development

### Prerequisites
- Node.js 20+
- Python 3.9+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or 'venv\Scripts\activate' on Windows
pip install -r requirements.txt
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and proxy API requests to `http://localhost:8000`

## Deploying to Vercel

### Option 1: Frontend and Backend on Same Vercel Project

1. Push to GitHub
2. Import repository to Vercel
3. Set environment variables:
   - `VITE_API_URL`: The backend API URL (e.g., `https://your-domain.vercel.app/api`)

### Option 2: Separate Vercel Projects

Deploy frontend and backend to separate Vercel projects:

**Backend:**
```bash
cd backend
vercel deploy
```

**Frontend:**
```bash
cd frontend
export VITE_API_URL=https://your-backend-domain.vercel.app
npm run build
vercel deploy
```

## Project Structure

```
.
├── backend/
│   ├── main.py          # FastAPI app with poem endpoint
│   ├── requirements.txt  # Python dependencies
│   └── .vercelignore
├── frontend/
│   ├── src/
│   │   ├── App.tsx       # Main React component
│   │   ├── components/   # Page components (Greeting, Choice, etc.)
│   │   ├── index.css     # Global styles
│   │   └── main.tsx      # React entry point
│   ├── public/
│   │   ├── styles.css    # Custom styles
│   │   ├── bouquet.js    # Bouquet canvas drawer
│   │   └── custom_image.png  # Replaceable image
│   ├── package.json      # Node dependencies
│   └── index.html        # HTML entry point
├── poem.txt              # 5-stanza poem
├── api/
│   └── index.py          # Vercel wrapper for FastAPI
├── vercel.json           # Vercel configuration
└── requirements.txt      # Root Python dependencies
```

## API Endpoints

- `GET /` - Health check
- `GET /api/poem` - Get poem stanzas as JSON
- `POST /api/event` - Handle events (extensible for future logic)

## Technologies Used

- **React 19.2** - UI framework
- **Vite 8.0** - Build tool
- **FastAPI 0.104** - Backend API
- **TypeScript 6.0** - Type safety
- **Vercel** - Deployment platform
- `assets/bouquet.js`: bouquet canvas drawing
- `assets/styles.css`: visual styling
- `api/index.py`: Vercel Python function entrypoint
- `vercel.json`: Vercel build and output configuration
