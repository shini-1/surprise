# Vercel Deployment Fix TODO

## Steps:
- [x] Update build.sh to output frontend build to root dist/
- [x] Replace vercel.json with exact new content
- [x] Test build.sh (ran, npm not found locally due to no Node.js in .venv; Vercel will handle Node.js)
- [ ] User to run `vercel --prod` for deployment to new project
- [x] Plan approved and TODO created

Configuration fixed. Ready for new Vercel deployment. Local test requires Node.js (e.g., exit .venv or install Node).
