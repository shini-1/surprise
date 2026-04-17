from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import os

app = FastAPI()

# Enable CORS for frontend
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load poem
POEM_PATH = Path(__file__).resolve().parent.parent / "poem.txt"

def get_poem_stanzas():
    """Parse poem file into stanzas."""
    poem_text = POEM_PATH.read_text(encoding="utf-8").strip()
    stanzas = [
        [line.strip() for line in stanza.splitlines() if line.strip()]
        for stanza in poem_text.split("\n\n")
    ]
    if len(stanzas) != 5:
        raise ValueError("poem.txt must contain exactly 5 stanzas separated by blank lines.")
    return stanzas


@app.get("/")
def health_check():
    """Health check endpoint."""
    return {"status": "ok", "message": "FastAPI backend is running"}


@app.get("/api/poem")
def get_poem():
    """Get poem stanzas."""
    try:
        stanzas = get_poem_stanzas()
        return {
            "success": True,
            "stanzas": stanzas,
            "stanza_count": len(stanzas)
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# Add more endpoints as needed for app state management
@app.post("/api/event")
def handle_event(event: dict):
    """
    Handle frontend events (placeholder for future state management).
    Currently all state is client-side, but can be extended.
    """
    return {
        "success": True,
        "message": "Event received"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
