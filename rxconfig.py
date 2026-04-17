import os

import reflex as rx


IS_VERCEL = os.getenv("VERCEL") == "1"
IS_PROD = os.getenv("VERCEL_ENV") == "production"

# Determine the correct API URL based on environment
if IS_PROD:
    # Production: use environment variable or derive from VERCEL_URL
    vercel_url = os.getenv("VERCEL_URL", "")
    if vercel_url:
        # Use HTTPS for production
        api_url = f"https://{vercel_url}"
    else:
        api_url = "http://localhost:3000"
    deploy_url = f"https://{vercel_url}" if vercel_url else "http://localhost:3000"
elif IS_VERCEL:
    # Preview/staging environments on Vercel
    vercel_url = os.getenv("VERCEL_URL", "")
    if vercel_url:
        api_url = f"https://{vercel_url}"
        deploy_url = f"https://{vercel_url}"
    else:
        api_url = "http://localhost:3000"
        deploy_url = "http://localhost:3000"
else:
    # Local development
    api_url = "http://localhost:3000"
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

