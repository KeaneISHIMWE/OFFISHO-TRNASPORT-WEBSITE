# 📧 Vercel Email Configuration

## Quick Setup for prospertuop@gmail.com

Your Gmail App Password has been configured locally. Now set it up in Vercel:

### Step 1: Go to Vercel Dashboard

1. Visit your Vercel project: https://vercel.com/dashboard
2. Select your **backend** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add/Update Email Variables

Add or update these variables (use the **exact names** shown):

```
Name: SMTP_HOST
Value: smtp.gmail.com
Environment: Production, Preview, Development (select all)

Name: SMTP_PORT
Value: 587
Environment: Production, Preview, Development

Name: SMTP_USER
Value: prospertuop@gmail.com
Environment: Production, Preview, Development

Name: SMTP_PASS
Value: zrrz efqi fofu eudj
Environment: Production, Preview, Development
```

**Important:** 
- Use `SMTP_*` variable names (NOT `EMAIL_*`)
- The app password should be entered **without spaces**: `zrrzefqifofueudj`
- Or keep it with spaces: `zrrz efqi fofu eudj` (both formats work)

### Step 3: Redeploy

After adding/updating variables:

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**

Or run from command line:
```powershell
cd backend
vercel --prod
```

### Step 4: Test Email

1. Check server logs after redeploy for:
   ```
   ✅ Email server is ready to send messages
   📧 Sending from: prospertuop@gmail.com
   ```

2. Submit a contact form on your website

3. Check your email inbox (and spam folder) at `prospertuop@gmail.com`

## 🔍 Troubleshooting

### If emails still don't work:

1. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for email-related errors

2. **Verify variables are set:**
   - Make sure all 4 SMTP variables are present
   - Check they're set for the correct environment (Production)

3. **Test SMTP connection:**
   - The backend will log connection errors on startup
   - Look for: `❌ Email transporter configuration error`

4. **Common issues:**
   - **"Invalid login"**: Make sure you're using the App Password, not your regular Gmail password
   - **"Connection timeout"**: Check firewall/VPN settings
   - **Emails in spam**: Mark as "Not Spam" in Gmail

## ✅ Success Indicators

You'll know it's working when you see:
- ✅ `Email server is ready to send messages` in logs
- ✅ `Contact email sent successfully to: prospertuop@gmail.com` after form submission
- ✅ Emails arrive in your inbox at `prospertuop@gmail.com`

---

**Note:** Your `.env` file is already configured locally. This guide is for Vercel deployment.
