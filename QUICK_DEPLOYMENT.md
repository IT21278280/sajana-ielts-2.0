# ⚡ Quick Deployment Checklist
**Follow these steps in order to deploy your website in 30 minutes**

---

## 📋 Pre-Deployment (Local Machine)

### Step 1: Run Pre-Deployment Check
```powershell
# PowerShell
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"
.\pre-deploy-check.ps1 -Quick  # Fast check (2 min)
# or
.\pre-deploy-check.ps1         # Full check with build test (5 min)
```

**Expected**: "ALL CHECKS PASSED" ✓

---

## 🗄️ Step 2: Set Up PostgreSQL Database (Railway)

### 2.1 Create Free Railway Account
- Go to: https://railway.app
- Click: **"Start Free"**
- Sign up with GitHub (IT21278280)

### 2.2 Create PostgreSQL Database
- Click: **"+ New Project"**
- Select: **"Database"** → **"PostgreSQL"**
- Railway configures it automatically

### 2.3 Get Database Connection URL
```
Click → PostgreSQL Instance → Connect → Copy "Postgres Connection URL"

Format: postgresql://postgres:password@host:5432/railway
Save this! You'll need it next.
```

### 2.4 Test Database Connection
```powershell
# Set temporary environment variable
$env:DATABASE_URL = "postgresql://postgres:your_password@host:5432/railway"

# Run migrations (creates tables)
npx prisma migrate deploy

# Optional: Seed database with sample data
npx prisma db seed
```

✅ **Database Ready**

---

## 🎨 Step 3: Get Sanity API Token

### 3.1 Open Sanity Dashboard
- Go to: https://sanity.io/manage

### 3.2 Create API Token
- Click: Your project (cg5cn9q5)
- **Settings** → **API Tokens**
- **+ Add API Token**
- Name: `vercel-production`
- Permissions: `Editor`
- **Save**
- **Copy and save the token** (you'll need it in 3 minutes)

✅ **Sanity API Token Ready**

---

## 🚀 Step 4: Deploy to Vercel

### 4.1 Ensure GitHub is Up to Date
```powershell
cd "C:\Users\USER\Documents\Self Learning Website - IELTS\sajana-ielts-v2"
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

### 4.2 Create Vercel Account
- Go to: https://vercel.com
- **Sign Up** with GitHub (IT21278280)
- Authorize Vercel

### 4.3 Import Project
- Click: **"Add New"** → **"Project"**
- Search: **"sajana-ielts-2.0"**
- Click: **Import**

### 4.4 Add Environment Variables
**Fill in these fields** before clicking "Deploy":

```
DATABASE_URL = postgresql://postgres:password@host.railway.app:5432/railway
NEXT_PUBLIC_SANITY_PROJECT_ID = cg5cn9q5
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = your_sanity_token_from_step_3
```

**Important**: Mark `SANITY_API_TOKEN` as **"Sensitive"** (checkbox)

### 4.5 Deploy
- Click: **"Deploy"**
- Wait 3-5 minutes
- You'll get a live URL like: `https://sajana-ielts-2-0.vercel.app`

✅ **Your Website is LIVE!**

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Website
```
Open: https://sajana-ielts-2-0.vercel.app

Check:
✓ Homepage loads
✓ Navigation works
✓ Images display correctly
✓ Sanity content appears
```

### 5.2 Test Database
Fill out the contact form and verify the lead is saved

### 5.3 Check Logs (if issues)
- Vercel Dashboard → Your Project → **"Deployments"** → Latest → **"Logs"**

---

## 📊 Deployment Summary

| Component | Status | URL |
|-----------|--------|-----|
| Website | ✅ Live | https://sajana-ielts-2-0.vercel.app |
| GitHub | ✅ Connected | https://github.com/IT21278280/sajana-ielts-2.0 |
| Database | ✅ Railway | Free tier (5GB) |
| CMS | ✅ Sanity | cg5cn9q5 |

---

## 🚨 Troubleshooting

### Build Fails: "Module not found"
```powershell
npm install
git add package-lock.json
git commit -m "fix: install missing packages"
git push
# Vercel auto-rebuilds
```

### Database Connection Error
**Check**:
1. DATABASE_URL is correct in Vercel settings
2. Railway database is running (Railway Dashboard)
3. Format is: `postgresql://user:pass@host:port/dbname`

### Sanity Content Not Showing
**Check**:
1. SANITY_API_TOKEN is set in Vercel
2. Token has "Editor" permissions
3. NEXT_PUBLIC_SANITY_PROJECT_ID = cg5cn9q5

---

## 🎯 Success Checklist
- [ ] Pre-deployment check passed
- [ ] Railway PostgreSQL database created
- [ ] Database migrations ran successfully
- [ ] Sanity API token generated
- [ ] GitHub repository pushed
- [ ] Vercel deployment completed
- [ ] Website loads at https://sajana-ielts-2-0.vercel.app
- [ ] Contact form works and saves to database
- [ ] Sanity content displays on website

---

## 📞 Support Resources

| Issue | Link |
|-------|------|
| Vercel Docs | https://vercel.com/docs |
| Railway Docs | https://docs.railway.app |
| Sanity Docs | https://www.sanity.io/docs |
| Next.js Docs | https://nextjs.org/docs |

---

**🎉 Congratulations! Your website is now live and deployed!**

**Next Steps**:
1. Add custom domain (optional)
2. Set up email notifications for leads
3. Monitor analytics
4. Regularly backup Sanity content
