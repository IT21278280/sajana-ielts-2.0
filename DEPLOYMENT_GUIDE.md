# 🚀 Complete Deployment Guide: Sajana IELTS 2.0

**Estimated Time**: 30-45 minutes  
**Cost**: $0 (completely free tier)

---

## 📋 Deployment Overview

This guide walks you through deploying your Next.js + PostgreSQL + Sanity CMS application on three free platforms:
- **Frontend**: Vercel (Next.js hosting) → https://sajana-ielts-2-0.vercel.app
- **Database**: Railway or Render (PostgreSQL hosting) → Free tier with 5GB limit
- **CMS**: Sanity (already configured)

---

## Step 1️⃣: Prepare Your Local Project

### 1.1 Verify Local Build Works
```bash
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"
npm install
npm run build
npm start
```

**Expected**: App runs on http://localhost:3000 without errors

### 1.2 Update Environment Variables
Edit `.env.local` with your actual values:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=cg5cn9q5      # ✓ Already correct
NEXT_PUBLIC_SANITY_DATASET=production
DATABASE_URL=postgresql://user:pass@localhost:5432/sajana_ielts
SANITY_API_TOKEN=your_token_from_sanity
```

### 1.3 Test Database Locally
```bash
npx prisma db push
npx prisma db seed
```

**Expected**: Database tables created without errors

---

## Step 2️⃣: Set Up PostgreSQL Database (Railway)

### 2.1 Create Railway Account
1. Go to **https://railway.app**
2. Click **"Sign Up"**
3. Sign up with **GitHub** (use IT21278280)
4. Authorize Railway to access GitHub

### 2.2 Create PostgreSQL Database
1. Click **"New Project"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway creates a PostgreSQL database automatically

### 2.3 Get Database URL
1. Click **"PostgreSQL"** in your project
2. Go to **"Connect"** tab
3. Copy the **"Postgres Connection URL"** (looks like: `postgresql://user:password@host:port/railway`)
4. Save this - you'll need it for Vercel

### 2.4 Run Migrations on Railway Database
```bash
# Set environment variable temporarily
$env:DATABASE_URL="postgresql://user:password@railway-host/railway"

# Run migrations
npx prisma migrate deploy

# Create admin user (optional)
npx prisma db seed
```

✅ **Database is ready!**

---

## Step 3️⃣: Get Sanity API Token

### 3.1 Open Sanity Dashboard
1. Go to **https://sanity.io/manage**
2. Click your **"cg5cn9q5"** project
3. Go to **Settings** (gear icon)

### 3.2 Create API Token
1. Click **"API Tokens"**
2. Click **"Add API Token"**
3. Name: `Vercel-Production`
4. Permissions: Select **"Editor"** or **"Admin"**
5. Click **"Save"**
6. Copy the token (save securely)

✅ **Sanity token ready!**

---

## Step 4️⃣: Deploy to Vercel

### 4.1 Connect GitHub Repository
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with **GitHub** (use IT21278280)

### 4.2 Import Project
1. Click **"New Project"**
2. Search for **"sajana-ielts-2.0"**
3. Click **"Import"**

### 4.3 Configure Environment Variables
Before deploying, add these environment variables:

| Variable | Value | Source |
|----------|-------|--------|
| `DATABASE_URL` | `postgresql://...` | From Railway Step 2.3 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `cg5cn9q5` | Already in .env.local |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Already in .env.local |
| `SANITY_API_TOKEN` | Your token from Step 3.2 | Keep secret ✓ |

**Steps to Add:**
1. In Vercel deployment page, find **"Environment Variables"** section
2. For each variable:
   - Enter **Name** and **Value**
   - Ensure sensitive variables (SANITY_API_TOKEN) are marked as secret
3. Leave other fields default
4. Click **"Deploy"**

### 4.4 Wait for Deployment
- Vercel shows build progress
- Estimated time: 3-5 minutes
- You'll see a success message with your URL

✅ **Your app is now live!**

---

## Step 5️⃣: Verify Deployment

### 5.1 Access Your Live URL
1. Vercel shows your live URL: **https://sajana-ielts-2-0.vercel.app**
2. Click it or open in browser
3. Verify:
   - ✓ Home page loads
   - ✓ Navigation works
   - ✓ Images load correctly
   - ✓ Sanity CMS content appears

### 5.2 Test API Endpoints
```bash
# Test lead submission API
curl -X POST https://sajana-ielts-2-0.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test User",
    "phone": "1234567890",
    "email": "test@example.com",
    "targetBandScore": 7.5,
    "message": "Test message"
  }'
```

### 5.3 Test Database Connection
Visit: **https://sajana-ielts-2-0.vercel.app/api/admin** (if you have an admin page)

---

## Step 6️⃣: Set Up Custom Domain (Optional)

### 6.1 Add Domain to Vercel
1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `sajana-ielts.com`)
4. Follow DNS instructions
5. Wait 24 hours for propagation

### 6.2 Update Environment Variable
Update `NEXT_PUBLIC_APP_URL` in Vercel:
```
NEXT_PUBLIC_APP_URL=https://sajana-ielts.com
```

---

## 📊 Deployment Status Checklist

- [ ] Local build works: `npm run build && npm start`
- [ ] PostgreSQL database created on Railway
- [ ] Database URL obtained and tested with Prisma
- [ ] Sanity API token created
- [ ] GitHub repository pushed (already done ✓)
- [ ] Vercel project created
- [ ] Environment variables configured in Vercel
- [ ] Deployment successful
- [ ] Live URL accessible
- [ ] Database connected (leads can be submitted)
- [ ] Sanity CMS content loading

---

## 🚨 Troubleshooting

### Build Fails: "Cannot find module '@sanity/client'"
**Solution**: 
```bash
npm install @sanity/client
git push
# Vercel auto-rebuilds
```

### Database Connection Error
**Check**:
1. DATABASE_URL format is correct
2. Railway database is running (check Railway dashboard)
3. Network access is allowed (Railway allows Vercel by default)

### Sanity Content Not Loading
**Check**:
1. SANITY_API_TOKEN is set in Vercel
2. Token has correct permissions (Editor or Admin)
3. NEXT_PUBLIC_SANITY_PROJECT_ID is correct (cg5cn9q5)

### Vercel Deployment Stuck
**Solution**:
1. Go to Vercel Dashboard
2. Click **"Deployments"**
3. Click **"Redeploy"** on latest deployment
4. Check build logs for errors

---

## 📚 Free Tier Limits Reference

| Service | Free Tier | Limit |
|---------|-----------|-------|
| **Vercel** | 100GB bandwidth/month | Sufficient for most sites |
| **Railway** | $5 free credit/month (≈ $5-10 worth) | After that: pay-as-you-go |
| **Sanity** | Unlimited API calls | Generous limits |

---

## 🔐 Security Best Practices

✅ **Do**:
- Keep `SANITY_API_TOKEN` secret (only in Vercel, not in git)
- Use strong admin passwords
- Enable 2FA on GitHub, Vercel, Sanity, Railway

❌ **Don't**:
- Commit `.env` files to GitHub
- Share API tokens
- Use `ADMIN` token for public APIs

---

## 📞 After Deployment

Your website is now **LIVE**! 🎉

**Next steps**:
1. **Test thoroughly** - Fill out forms, browse content
2. **Monitor logs** - Check Vercel and Railway dashboards
3. **Buy domain** - Use Vercel Domains or external registrar
4. **Set up email** - Configure contact form notifications
5. **Backup data** - Regular Sanity backups (automatic)

---

## 🎯 Your Deployment URLs

| Component | URL |
|-----------|-----|
| **Website** | https://sajana-ielts-2-0.vercel.app |
| **GitHub Repo** | https://github.com/IT21278280/sajana-ielts-2.0 |
| **Sanity Studio** | https://sanity.io/manage → cg5cn9q5 |
| **Railway DB** | https://railway.app |
| **Vercel Dashboard** | https://vercel.com/dashboard |

---

**Questions?** Check the troubleshooting section or contact Railway/Vercel support.
