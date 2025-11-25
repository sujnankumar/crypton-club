# Vercel Deployment Guide

## Prerequisites

✅ MongoDB Atlas connection string (you have this!)  
✅ GitHub repository with your code  
✅ Vercel account (free)

---

## Step 1: Push Your Code to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "Add MongoDB Atlas integration for Vercel"
git push origin main
```

---

## Step 2: Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

---

## Step 3: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `crypton-club/website-main`
3. Click **"Import"**

---

## Step 4: Configure Project Settings

### Framework Preset
- Vercel should auto-detect **Vite**
- If not, select **"Vite"** from dropdown

### Root Directory
- Leave as **`./`** (root)

### Build Settings
Vercel auto-detects from `package.json`:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**DO NOT change these unless needed!**

---

## Step 5: Add Environment Variable ⚠️ CRITICAL

Before deploying, add your MongoDB connection string:

1. Click **"Environment Variables"**
2. Add:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://smh01:mnbvcx12@cluster0.amgq0s8.mongodb.net/`
   - **Environments:** Check all 3 boxes (Production, Preview, Development)
3. Click **"Add"**

---

## Step 6: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll see: ✅ **"Congratulations! Your project has been deployed"**

---

## Step 7: Get Your Live URL

Your site will be available at:
- `https://your-project-name.vercel.app`

Example: `https://crypton-club-website.vercel.app`

---

## Step 8: Test Your Deployment

Visit these URLs to verify everything works:

```
https://your-app.vercel.app/api/members
https://your-app.vercel.app/api/achievements
https://your-app.vercel.app
```

You should see:
- API endpoints return your data from MongoDB
- Website loads correctly
- Admin CRUD operations work ✅

---

## Common Issues & Fixes

### ❌ "Module not found: 'mongodb'"
**Fix:** Make sure `mongodb` is in `server/package.json` dependencies (already done ✅)

### ❌ "Cannot connect to MongoDB"
**Fix:** Check that `MONGODB_URI` is set in Vercel environment variables

### ❌ "Authentication failed"
**Fix:** 
- Verify your MongoDB username/password in connection string
- Check Network Access in MongoDB Atlas allows `0.0.0.0/0`

### ❌ Build fails
**Fix:** Check build logs in Vercel dashboard for specific errors

---

## Automatic Deployments

Once set up, **every push to GitHub automatically deploys**:

```bash
git add .
git commit -m "Update website"
git push
```

Vercel will:
1. Detect the push
2. Build your project
3. Deploy to production
4. Update your live site 🚀

---

## Custom Domain (Optional)

To use your own domain:

1. Go to Vercel project → **Settings** → **Domains**
2. Enter your domain (e.g., `cryptonclub.com`)
3. Follow DNS configuration steps
4. Wait for DNS propagation (5-60 minutes)

---

## That's It! 🎉

Your website is now:
- ✅ Live on Vercel
- ✅ Using MongoDB Atlas for data storage
- ✅ Auto-deploying on every Git push
- ✅ Completely free (Vercel + MongoDB free tiers)

**Your live URL:** Check Vercel dashboard after deployment completes!
