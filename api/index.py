import os
import sys

# Set Reflex to production mode and skip recompilation
os.environ.setdefault("REFLEX_SKIP_COMPILE", "true")
os.environ.setdefault("REFLEX_ENV_MODE", "prod")

# Import the Reflex app instance
from surprise.surprise import app as reflex_app  # noqa: E402

# Export the ASGI application for Vercel serverless function
app = reflex_app()

