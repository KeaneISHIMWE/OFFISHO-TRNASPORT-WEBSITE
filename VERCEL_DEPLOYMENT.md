# Vercel Deployment Guide

This guide will help you deploy the Offisho Transport frontend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Your backend API deployed and accessible (you'll need the API URL)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Import your repository

3. **Configure Project Settings**
   - **Root Directory**: Set to `frontend` (or leave blank if deploying from root)
   - **Framework Preset**: Leave as "Other" or "Vite" (Vercel will auto-detect)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   Click on "Environment Variables" and add:
   ```
   REACT_APP_API_URL=https://your-backend-api-url.com/api
   ```
   Replace `https://your-backend-api-url.com/api` with your actual backend API URL.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (for first deployment)
   - Project name? Enter a name or press Enter for default
   - Directory? Press Enter (current directory)
   - Override settings? **No**

5. **Set Environment Variables**
   ```bash
   vercel env add REACT_APP_API_URL
   ```
   Enter your backend API URL when prompted (e.g., `https://your-backend-api-url.com/api`)

6. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

## Important Notes

### Backend Deployment
The backend needs to be deployed separately. Options include:
- **Railway**: https://railway.app (recommended for Node.js apps)
- **Render**: https://render.com
- **Heroku**: https://heroku.com
- **DigitalOcean App Platform**: https://www.digitalocean.com/products/app-platform

After deploying the backend, update the `REACT_APP_API_URL` environment variable in Vercel.

### Environment Variables Required

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
REACT_APP_API_URL=https://your-backend-api-url.com/api
```

### CORS Configuration
Make sure your backend has CORS configured to allow requests from your Vercel domain:
```javascript
// In your backend server.ts
app.use(cors({
  origin: ['https://your-project.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (check `engines` in package.json)
- Review build logs in Vercel dashboard

### API Calls Fail
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings on backend
- Ensure backend is deployed and accessible

### Routing Issues (404 on refresh)
- The `vercel.json` file includes rewrites to handle React Router
- If issues persist, check that `vercel.json` is in the correct location

## Custom Domain

To add a custom domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

## Continuous Deployment

Vercel automatically deploys on every push to your main branch. To disable:
- Go to Project Settings → Git
- Configure deployment settings

---

**Your deployed app will be available at:** `https://your-project-name.vercel.app`
