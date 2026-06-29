# 🚀 AUTOMATED DEPLOYMENT SETUP

This document provides step-by-step automation for deploying Sajana IELTS 2.0 to production.

---

## ✅ Pre-Deployment Checklist

Before starting, ensure your local environment is ready:

```bash
# Navigate to project
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"

# Verify project structure
ls -Path "next.config.ts", "package.json", "prisma/schema.prisma", "vercel.json"

# Verify Node.js is installed
node --version    # Should be v18+
npm --version     # Should be v9+
```

---

## 🗄️ Phase 1: Database Setup (Railway) - 10 Minutes

### Step 1.1: Create Railway Account

**URL**: https://railway.app/register

1. Click "Start Free"
2. Sign in with GitHub (use IT21278280)
3. Authorize Railway
4. You're now in Railway Dashboard

### Step 1.2: Create PostgreSQL Database

```
Railway Dashboard → +New → Database → PostgreSQL
```

Railway automatically:
- Creates a PostgreSQL instance
- Generates a connection URL
- Provides credentials
- Sets up networking

### Step 1.3: Get Database Connection URL

```
In Railway Dashboard:
→ Your Project → PostgreSQL → Connect
→ Copy "Postgres Connection URL"

Format: postgresql://username:password@host:port/dbname
Example: postgresql://postgres:abc123xyz@railway.railway.internal:5432/railway
```

**Save this URL** - you'll paste it into Vercel later

### Step 1.4: Test Database Connection (Local)

```powershell
# Set environment variable (temporary)
$env:DATABASE_URL = "postgresql://postgres:password@host:5432/railway"

# Test connection with Prisma
npx prisma db push

# Should output: "Your database is now in sync with your schema."
```

✅ **Database Ready** - Move to Phase 2

---

## 🔑 Phase 2: Sanity Setup - 5 Minutes

### Step 2.1: Open Sanity Dashboard

**URL**: https://sanity.io/manage

1. Log in with your Sanity account
2. Select project "cg5cn9q5"
3. Go to Settings (gear icon)

### Step 2.2: Create API Token

```
Settings → API Tokens → + Add API Token
```

Configuration:
- **Name**: `vercel-production`
- **Permissions**: `Editor` (minimum required)
- Click **"Save"**

### Step 2.3: Copy Your Token

A popup appears with your token. **Copy it immediately** (you can't see it again without regenerating)

Token format: `sk_prod_xxxxxxxxxxxxxxx...`

**Save this token** - keep it secure!

✅ **Sanity Ready** - Move to Phase 3

---

## 📤 Phase 3: GitHub & Vercel Setup - 15 Minutes

### Step 3.1: Commit All Changes Locally

```powershell
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"

# Stage all new files
git add .

# Commit
git commit -m "chore: add deployment configuration files"

# Push to main branch
git push origin main
```

**Verify**: Go to https://github.com/IT21278280/sajana-ielts-2.0 → Should show recent commits

### Step 3.2: Create Vercel Account

**URL**: https://vercel.com/signup

1. Click "Sign up"
2. Choose **"Continue with GitHub"**
3. Sign in with IT21278280
4. Click **"Authorize Vercel"**

### Step 3.3: Import Repository

```
Vercel Dashboard → + Add New... → Project
→ Search "sajana-ielts-2.0"
→ Click "Import"
```

Vercel auto-detects:
- Framework: Next.js ✓
- Build command: `npm run build` ✓
- Output directory: `.next` ✓

### Step 3.4: Configure Environment Variables

Before deploying, add these variables in the Vercel form:

| Variable | Value | Secret? |
|----------|-------|---------|
| `DATABASE_URL` | From Railway Step 1.3 | ✓ Mark as secret |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `cg5cn9q5` | |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `SANITY_API_TOKEN` | From Sanity Step 2.2 | ✓ Mark as secret |

**Important**: Click the lock icon for `DATABASE_URL` and `SANITY_API_TOKEN` to mark them secret

### Step 3.5: Deploy

1. Review repository details
2. Click **"Deploy"**
3. Wait 3-5 minutes for build to complete
4. You'll see: "Congratulations! Your deployment is ready"
5. Click **"Continue to Dashboard"**
6. Your live URL: `https://sajana-ielts-2-0.vercel.app`

✅ **Website Deployed!**

---

## 🧪 Phase 4: Verification - 10 Minutes

### Step 4.1: Test Website Accessibility

```
Browser → https://sajana-ielts-2-0.vercel.app

Check:
✓ Homepage loads
✓ Navigation links work
✓ Images display
✓ No error messages
```

### Step 4.2: Test API Endpoints

Submit test lead via contact form:

```bash
curl -X POST https://sajana-ielts-2-0.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test Student",
    "phone": "1234567890",
    "email": "test@example.com",
    "targetBandScore": 7.5,
    "message": "Testing deployment"
  }'

Expected response: 200 OK
```

### Step 4.3: Check Sanity Content

1. Visit any resource page (e.g., Reading section)
2. Verify content loads from Sanity CMS
3. Check images are displayed correctly

### Step 4.4: Monitor Production

Vercel Dashboard → Your Project → **"Analytics"**

```
You can see:
• Deployment history
• Build logs
• Error tracking
• Performance metrics
```

---

## 🐛 Troubleshooting

### Build Fails: "Module not found"

**Solution**:
```powershell
npm install
git add package-lock.json
git commit -m "fix: install missing module"
git push
# Vercel auto-rebuilds
```

Check Vercel → Deployments → Recent Failed → View Logs

### Website Shows: "Connection Refused"

**Cause**: DATABASE_URL not set in Vercel
**Fix**: 
```
Vercel Dashboard → Settings → Environment Variables
→ Add DATABASE_URL from Railway
→ Redeploy
```

### Sanity Content Not Showing

**Check**:
1. SANITY_API_TOKEN is set in Vercel (Settings → Environment Variables)
2. Token has sufficient permissions (Editor or Admin)
3. NEXT_PUBLIC_SANITY_PROJECT_ID = cg5cn9q5

**Fix**:
```
Vercel → Settings → Environment Variables → Edit SANITY_API_TOKEN
→ Redeploy
```

### Database Connection Timeout

**Check**:
1. Railway database is running (Railway Dashboard → PostgreSQL)
2. DATABASE_URL is correct format
3. Network access is allowed

---

## 📊 Your Deployment Dashboard Links

Save these bookmarks for easy access:

| Service | Link |
|---------|------|
| **Website** | https://sajana-ielts-2-0.vercel.app |
| **Vercel** | https://vercel.com/dashboard |
| **Railway** | https://railway.app |
| **Sanity** | https://sanity.io/manage |
| **GitHub** | https://github.com/IT21278280/sajana-ielts-2.0 |

---

## 🔄 Updating Your Website (After Deployment)

### To Deploy New Changes:

```powershell
# Make your changes locally
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: your feature description"
git push origin main

# Vercel automatically rebuilds and deploys!
# Check deployment status: https://vercel.com/dashboard
```

Typical deployment time: **2-3 minutes**

---

## 💾 Backup & Maintenance

### Backup Your Database

Railway automatically backs up your database. To download:

```
Railway Dashboard → PostgreSQL → More → Backups
```

### Update Dependencies

```powershell
# Locally
npm update
npm run build  # Test the build
git push origin main

# Vercel auto-deploys the updated version
```

### Monitor Performance

```
Vercel Dashboard → Analytics
→ View deployment metrics
→ Check error rates
→ Monitor response times
```

---

## 🎯 Post-Deployment Checklist

- [x] Website is live at: https://sajana-ielts-2-0.vercel.app
- [ ] Custom domain configured (optional)
- [ ] Email notifications set up for leads
- [ ] Analytics configured
- [ ] SSL certificate active (Vercel provides free)
- [ ] Regular backups enabled
- [ ] Team access configured

---

## 📞 Support & Resources

| Issue | Resource |
|-------|----------|
| Vercel Issues | https://vercel.com/support |
| Railway Issues | https://docs.railway.app |
| Sanity Issues | https://sanity.io/help |
| Next.js Help | https://nextjs.org/docs |

---

## 🎉 Deployment Complete!

Your Sajana IELTS 2.0 website is now:
- ✅ Live on the internet
- ✅ Connected to PostgreSQL database
- ✅ Integrated with Sanity CMS
- ✅ Automatically backed up
- ✅ Scalable and secure
- ✅ Free tier (with generous limits)

**Total setup time**: ~40 minutes
**Ongoing cost**: $0 (free tier)
**Maintenance**: Minimal (Vercel/Railway handle updates)

---

**Questions?** Refer to the troubleshooting section or check the respective service documentation.
