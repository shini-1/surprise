import os
import sys

# Set FastAPI to production mode
os.environ.setdefault("ENVIRONMENT", "production")

# Import the FastAPI app instance from backend
sys.path.insert(0, '/var/task/backend')
from main import app

# Export for Vercel serverless function
