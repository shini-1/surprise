import os

import reflex as rx


IS_VERCEL = os.getenv("VERCEL") == "1"


config = rx.Config(
    app_name="surprise",
    api_url="http://localhost/api" if IS_VERCEL else "http://localhost:8000",
    deploy_url="http://localhost" if IS_VERCEL else "http://localhost:3000",
    transport="polling" if IS_VERCEL else "websocket",
    plugins=[
        rx.plugins.SitemapPlugin(),
        rx.plugins.TailwindV4Plugin(),
    ],
)
