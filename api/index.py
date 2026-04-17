import os
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

# Import FastAPI app
from main import app

# Export the app as default for Vercel
# Vercel looks for a default export or the 'app' variable
__all__ = ["app"]

# For Vercel, make sure the app is accessible at module level
# This handler wrapper is needed for Vercel Python runtime
asgi_app = app

