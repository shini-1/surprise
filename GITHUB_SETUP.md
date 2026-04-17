# Pushing to GitHub

Your local git repository is ready! Follow these steps to push to GitHub:

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/new) and create a new repository
2. Name it: `surprise`
3. Description: `A playful love letter app with blooming tulips animation`
4. Choose visibility (Public or Private)
5. **Do NOT** initialize with README, gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Configure Git User (if not done yet)

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

## Step 3: Add Remote and Push

After creating the repository on GitHub, run one of these commands:

### Option A: Using HTTPS (easier)
```bash
cd /home/shini/surprise
git remote add origin https://github.com/YOUR_USERNAME/surprise.git
git branch -M main
git push -u origin main
```

### Option B: Using SSH (recommended if you have SSH keys configured)
```bash
cd /home/shini/surprise
git remote add origin git@github.com:YOUR_USERNAME/surprise.git
git branch -M main
git push -u origin main
```

## Step 4: Verify

Check your GitHub repository to confirm all files are there!

## Future Commits

After the first push, subsequent pushes are simpler:

```bash
git add .
git commit -m "Your message here"
git push
```
