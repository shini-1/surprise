import os
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

# Import FastAPI app
from main import app

# Export the app for Vercel serverless function
__all__ = ["app"]

