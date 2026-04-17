# Surprise

A romantic five-step interactive site built with Reflex and prepared for Vercel deployment.

## What You Can Edit Easily

- Replace the top image by overwriting `assets/custom_image.png`.
- Replace the poem by editing `poem.txt`.
- Change the button labels or headings in [surprise.py](/home/shini/surprise/surprise/surprise.py).

`poem.txt` must always have exactly 5 stanzas, separated by a blank line between each stanza.

## Local Development

1. Create or activate a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the app:

```bash
reflex run
```

The local Reflex dev server uses the normal websocket transport.

## Deploying To Vercel

This project is configured to:

- export the Reflex frontend as static files during the Vercel build
- serve Reflex event handling from `api/index.py`
- switch Reflex to HTTP polling on Vercel because Vercel Functions do not support acting as a WebSocket server

Deploy with either:

```bash
vercel
```

or connect the repository to Vercel and deploy by pushing to Git.

## Project Structure

- `surprise/surprise.py`: main Reflex app and page flow
- `poem.txt`: editable 5-stanza poem
- `assets/custom_image.png`: replaceable image shown on layout 2
- `assets/bouquet.js`: bouquet canvas drawing
- `assets/styles.css`: visual styling
- `api/index.py`: Vercel Python function entrypoint
- `vercel.json`: Vercel build and output configuration
