# Vercel Deployment Guide

## ⚠️ Before Deploying

### 1. Local Node Version Issue
Your local Node.js v24.11.0 is too new. For local development, use Node.js 18.x or 20.x:

**Download Node.js 20 LTS**: https://nodejs.org/

**Check your version**:
```bash
node -v
```

Should show v18.x.x or v20.x.x

### 2. Ensure Environment Variables Are Ready
Have these ready from your `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID`
- `DONORBOX_WEBHOOK_SECRET`

---

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sponsor a Child system"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "jasperschools")
   - Don't initialize with README (you already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/jasperschools.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. Vercel will auto-detect Next.js settings

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://onwvmfdvzseidwnwyobj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud3ZtZmR2enNlaWR3bnd5b2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODcwODcsImV4cCI6MjA3NTg2MzA4N30.qItyWqz6HQEARSZYM4VK9RT2x3aQwqLQiu2hlreAmug
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud3ZtZmR2enNlaWR3bnd5b2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI4NzA4NywiZXhwIjoyMDc1ODYzMDg3fQ.Obm67RIHjY84qhmhRKqCHehDKNZZ4SVtp7U_ImbJMuY
ADMIN_PASSWORD=thisisforjasper@uganda
NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID=jasper-primary-school-sponsor-a-student
DONORBOX_WEBHOOK_SECRET=your-random-webhook-secret-123
```

**Important**: Make sure to select **"Production", "Preview", and "Development"** for all variables!

### Step 4: Deploy

Click **"Deploy"** button. Vercel will:
1. Build your application (using Node 18.x or 20.x automatically)
2. Deploy to production
3. Give you a live URL like: `https://jasperschools.vercel.app`

---

## 🔧 After Deployment

### 1. Update DonorBox Webhook URL

In DonorBox dashboard:
- Go to Settings → Webhooks
- Update webhook URL to: `https://your-vercel-url.vercel.app/api/donorbox-webhook`
- Save

### 2. Test Your Live Site

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ `/sponsor` page shows children
- ✅ `/admin` login works
- ✅ Admin dashboard CRUD operations work
- ✅ Sponsor button opens DonorBox

### 3. Custom Domain (Optional)

In Vercel:
1. Go to Settings → Domains
2. Add your custom domain (e.g., `jasperschools.org`)
3. Follow Vercel's DNS instructions
4. Update DonorBox webhook to use custom domain

---

## 🐛 Common Deployment Errors

### Error: "Build Failed"
**Cause**: TypeScript errors or missing dependencies  
**Fix**: Run `npm run build` locally to see errors

### Error: "Module not found"
**Cause**: Missing dependency in package.json  
**Fix**: Run `npm install` and commit package.json

### Error: "Environment variable undefined"
**Cause**: Environment variables not set in Vercel  
**Fix**: Double-check all env vars in Vercel dashboard

### Error: "API route returns 500"
**Cause**: Database connection or env vars  
**Fix**: Check Vercel logs (Dashboard → Deployments → View Function Logs)

---

## 📊 Monitoring

### View Logs
Vercel Dashboard → Your Project → Deployments → Click on deployment → View Function Logs

### Check Performance
Vercel provides:
- Analytics
- Speed Insights
- Error tracking

---

## 🔄 Updating After Deployment

Every time you push to GitHub:
1. Make changes locally
2. Commit: `git add . && git commit -m "Description"`
3. Push: `git push`
4. Vercel automatically rebuilds and deploys!

---

## ✅ Deployment Checklist

Before marking as "live":

- [ ] All environment variables added in Vercel
- [ ] Build successful
- [ ] Homepage works
- [ ] Sponsor page loads children
- [ ] Admin login works
- [ ] Can add/edit/delete children
- [ ] DonorBox webhook updated to production URL
- [ ] Test a real donation (small amount)
- [ ] Verify webhook updates database
- [ ] Mobile responsive (test on phone)
- [ ] All images load
- [ ] No console errors

---

## 🆘 If Deployment Still Fails

1. **Check Vercel build logs** for exact error
2. **Run locally with Node 18 or 20** (not 24)
3. **Ensure all files are committed** to Git
4. **Verify package.json** has all dependencies
5. **Check Supabase** is accessible from Vercel IPs

---

**Your site should now be live!** 🎉

Production URL example: `https://jasperschools.vercel.app`

