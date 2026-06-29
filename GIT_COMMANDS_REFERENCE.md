# GitHub Repository Connection Commands

## Your GitHub Repository
```
Repository URL: https://github.com/IT21278280/sajana-ielts-2.0.git
Repository Name: sajana-ielts-2.0
Owner: IT21278280
Visibility: (Set during GitHub repo creation)
```

---

## Step-by-Step Connection Guide

### Step 1: Create Repository on GitHub (if not already created)

1. Go to https://github.com/new
2. Name: `sajana-ielts-2.0`
3. Description: `Premium IELTS coaching platform with reading, writing, listening, speaking, and pre-IELTS resources built with Next.js, Sanity CMS, and Prisma ORM`
4. Visibility: Public (recommended for portfolio) or Private
5. Click "Create repository"
6. **Do NOT initialize with README** (you already have code)

---

### Step 2: Add Remote and Push

**Execute these commands in order:**

```bash
# Navigate to project root
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"

# Add GitHub as remote repository
git remote add origin https://github.com/IT21278280/sajana-ielts-2.0.git

# Set default branch name to main (if not already)
git branch -M main

# Verify remote is set correctly
git remote -v
```

**Expected output from `git remote -v`:**
```
origin  https://github.com/IT21278280/sajana-ielts-2.0.git (fetch)
origin  https://github.com/IT21278280/sajana-ielts-2.0.git (push)
```

---

### Step 3: Verify Your Commits Are Ready

**Before pushing, run these verification commands:**

```bash
# Check total commit count
git log --oneline | wc -l
# Expected: 56

# View all commits in pretty format
git log --all --decorate --graph --oneline --abbrev-commit

# Verify nothing is uncommitted
git status
# Expected: "On branch main, nothing to commit, working tree clean"
```

---

### Step 4: Push to GitHub

**⚠️ IMPORTANT: WAIT FOR USER APPROVAL BEFORE RUNNING THIS**

Once approved, execute:

```bash
# Push all commits to GitHub
git push -u origin main

# Optional: Set up tracking (if needed)
git branch --set-upstream-to=origin/main main
```

**Expected output:**
```
Enumerating objects: ...
Counting objects: 100%
Compressing objects: 100%
Writing objects: 100%
remote: Creating pull request ...
To https://github.com/IT21278280/sajana-ielts-2.0.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

### Step 5: Verify on GitHub

After push completes:

1. Visit: https://github.com/IT21278280/sajana-ielts-2.0
2. Verify all 56 commits appear in the commit history
3. Check files are uploaded correctly
4. Verify branch is `main`

---

## Full Command Sequence

### All Commands at Once (Copy & Paste)

**Windows (PowerShell):**
```powershell
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"
git remote add origin https://github.com/IT21278280/sajana-ielts-2.0.git
git branch -M main
git remote -v
```

**After verification, push:**
```powershell
git push -u origin main
```

---

## Troubleshooting

### Remote Already Exists
```bash
# If you get "fatal: remote origin already exists"
git remote rm origin
git remote add origin https://github.com/IT21278280/sajana-ielts-2.0.git
```

### Wrong Remote URL
```bash
# Check current remote
git remote -v

# Update remote URL
git remote set-url origin https://github.com/IT21278280/sajana-ielts-2.0.git

# Verify change
git remote -v
```

### Authentication Issues (GitHub SSH)

If you get authentication errors, try:

```bash
# Test connection
ssh -T git@github.com

# If needed, generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Then use SSH URL
git remote set-url origin git@github.com:IT21278280/sajana-ielts-2.0.git
```

### Push Rejected

If push is rejected:

```bash
# Fetch latest from GitHub
git fetch origin

# Check for differences
git status

# Force push (only if you're sure)
git push -u origin main --force

# Conservative approach: Pull and merge
git pull origin main
git push -u origin main
```

---

## After Push: Next Steps

### 1. Verify Remote Tracking
```bash
git branch -vv
# Should show: main -> origin/main
```

### 2. Set Up Local Tracking (Optional)
```bash
git branch --set-upstream-to=origin/main main
```

### 3. Clone Verification (Optional)
```bash
# In a different directory, test cloning
git clone https://github.com/IT21278280/sajana-ielts-2.0.git test-clone
cd test-clone
git log --oneline | wc -l
# Should show: 56
```

---

## GitHub Repository Management

### View Your Repository
- https://github.com/IT21278280/sajana-ielts-2.0
- https://github.com/IT21278280/sajana-ielts-2.0/commits/main

### Common GitHub Tasks

**Add collaborators:**
1. Go to Settings → Collaborators
2. Click "Add people"
3. Enter username

**Enable GitHub Actions:**
1. Go to Actions tab
2. Select workflow (or create custom)

**Create .github/workflows for CI/CD:**
```bash
mkdir -p .github/workflows
# Create workflow files as needed
```

**Add GitHub Pages:**
1. Go to Settings → Pages
2. Select source branch (main)
3. Select folder (/root or /docs)

---

## Branch Management

### View Branches
```bash
# Local branches
git branch -a

# Remote branches
git branch -r
```

### Create Feature Branches
```bash
# From main branch
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: your feature"
git push -u origin feature/your-feature

# Create pull request on GitHub web interface
```

### Merge Branches
```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature/your-feature

# Push to remote
git push origin main

# Delete local branch
git branch -d feature/your-feature

# Delete remote branch
git push origin --delete feature/your-feature
```

---

## Recommended .gitignore Additions

Your project should use the `.gitignore.new` file created with this guide. Key entries:

```
# Never commit
node_modules/
.env.local
.env.production.local
.next/
.cache/

# IDE files
.vscode/
.idea/
*.iml

# OS
.DS_Store
Thumbs.db
```

---

## Security Best Practices

### Protect Sensitive Data
```bash
# Add environment template (not actual values)
cp .env.local .env.example
git add .env.example
git commit -m "docs: add environment variables template"

# Ensure .env.local is ignored
echo ".env.local" >> .gitignore
```

### (Optional) Sign Commits
```bash
# Generate GPG key
gpg --full-gen-key

# List keys
gpg --list-secret-keys --keyid-format=long

# Configure Git
git config --global user.signingkey <KEY_ID>

# Sign commits
git commit -S -m "your message"

# Auto-sign all commits
git config --global commit.gpgsign true
```

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Add remote | `git remote add origin https://github.com/IT21278280/sajana-ielts-2.0.git` |
| Set branch | `git branch -M main` |
| Check remote | `git remote -v` |
| View commits | `git log --oneline` |
| Count commits | `git log --oneline \| wc -l` |
| Check status | `git status` |
| Push code | `git push -u origin main` |
| Pull updates | `git pull origin main` |
| Clone repo | `git clone https://github.com/IT21278280/sajana-ielts-2.0.git` |

---

## Support Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Help**: https://docs.github.com
- **GitHub Actions**: https://docs.github.com/en/actions
- **SSH Setup Guide**: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## Checklist Before Push

- [ ] All 56 commits created locally
- [ ] `git status` shows "nothing to commit"
- [ ] `git log --oneline | wc -l` returns 56
- [ ] GitHub repository created at https://github.com/IT21278280/sajana-ielts-2.0
- [ ] Remote added correctly: `git remote add origin https://...`
- [ ] Branch set to main: `git branch -M main`
- [ ] Remote verified: `git remote -v` shows correct URL
- [ ] **USER APPROVAL RECEIVED** for push
- [ ] Ready to execute: `git push -u origin main`

---

**Status**: ✅ Ready for Push (Await User Approval)  
**Project**: Sajana IELTS 2.0  
**Repository**: https://github.com/IT21278280/sajana-ielts-2.0.git  
**Date Generated**: June 29, 2026
