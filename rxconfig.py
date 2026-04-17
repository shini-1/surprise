import os

import reflex as rx


IS_VERCEL = os.getenv("VERCEL") == "1"
IS_PROD = os.getenv("VERCEL_ENV") == "production"

# For production Vercel, use the actual deployment URL
# For local/development, use localhost
if IS_PROD:
    # On Vercel production, the frontend and API are on the same domain
    api_url = ""  # Relative path - requests go to same domain
    deploy_url = f"https://{os.getenv('VERCEL_URL', 'localhost')}"
elif IS_VERCEL:
    # On Vercel preview/development environment
    api_url = ""  # Relative path
    deploy_url = f"https://{os.getenv('VERCEL_URL', 'localhost')}"
else:
    # Local development
    api_url = "http://localhost:8000"
    deploy_url = "http://localhost:3000"

config = rx.Config(
    app_name="surprise",
    api_url=api_url,
    deploy_url=deploy_url,
    transport="polling" if IS_VERCEL else "websocket",
    plugins=[
        rx.plugins.SitemapPlugin(),
        rx.plugins.TailwindV4Plugin(),
    ],
)

