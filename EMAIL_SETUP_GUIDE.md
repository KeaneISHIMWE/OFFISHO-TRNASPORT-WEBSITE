# Email Setup Guide for Offisho Transport

## Problem: Email Not Receiving at prospertuop@gmail.com

This guide will help you fix email delivery issues.

## ✅ What Was Fixed

1. **Updated email addresses** in `backend/src/utils/email.ts`:
   - Contact form emails now send to: `prospertuop@gmail.com` (primary)
   - Admin notifications send to: `prospertuop@gmail.com` (primary) + secondary admin

## 🔧 Required Environment Variables

Your backend needs these SMTP environment variables configured:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📧 Setting Up Gmail SMTP

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Name it: "Offisho Transport Backend"
5. Click **Generate**
6. **Copy the 16-character password** (you won't see it again!)

### Step 3: Configure Environment Variables

#### For Local Development:

Create a `.env` file in the `backend` folder:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=prospertuop@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

**Important:** Use the app password, NOT your regular Gmail password!

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `prospertuop@gmail.com`
   - `SMTP_PASS` = `your-16-character-app-password`

## 🧪 Testing Email Configuration

### Option 1: Check Server Logs

When your backend starts, you should see:
```
✅ Email server is ready to send messages
📧 Sending from: prospertuop@gmail.com
```

If you see errors, check:
- Are all SMTP variables set?
- Is the app password correct?
- Is 2-Step Verification enabled?

### Option 2: Test Contact Form

1. Go to your website's contact page
2. Fill out and submit the form
3. Check server logs for:
   ```
   ✅ Contact email sent successfully to: prospertuop@gmail.com
   ```

### Option 3: Check Email Inbox

- Check **Inbox** for new messages
- Check **Spam/Junk** folder (sometimes emails go there initially)
- Check **All Mail** folder

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid login credentials"

**Solution:**
- Make sure you're using an **App Password**, not your regular password
- Verify 2-Step Verification is enabled
- Regenerate the app password if needed

### Issue 2: "Connection timeout"

**Solution:**
- Check firewall settings
- Verify `SMTP_PORT=587` (not 465)
- Try `SMTP_PORT=465` with `secure: true` if 587 doesn't work

### Issue 3: Emails going to Spam

**Solution:**
- Mark emails as "Not Spam" in Gmail
- Add `prospertuop@gmail.com` to contacts
- Gmail will learn these are legitimate emails

### Issue 4: "Less secure app access"

**Solution:**
- This is outdated - use App Passwords instead
- Make sure 2-Step Verification is enabled

## 📝 Email Types Sent

1. **Contact Form Emails** → `prospertuop@gmail.com`
2. **Booking Request Notifications** → `prospertuop@gmail.com` + secondary admin
3. **Request Status Updates** → Customer's email
4. **Request Confirmations** → Customer's email

## 🔍 Debugging

If emails still don't work:

1. **Check backend logs** for error messages
2. **Verify environment variables** are set correctly
3. **Test SMTP connection** using a simple Node.js script:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'prospertuop@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});
```

## 📞 Need Help?

If emails still don't work after following this guide:
1. Check server logs for specific error messages
2. Verify all environment variables are set
3. Try using a different email service (SendGrid, Mailgun, etc.)

---

**Last Updated:** After fixing email addresses to use prospertuop@gmail.com
