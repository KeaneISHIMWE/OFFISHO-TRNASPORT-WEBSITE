# Convex Setup Instructions

## Initial Setup

1. **Install Convex CLI** (if not already installed):
```bash
npm install -g convex
```

2. **Login to Convex**:
```bash
npx convex dev --once
```
This will open your browser to login/create an account.

3. **Get your Convex URL**:
After logging in, Convex will provide a URL like:
```
https://your-project-name.convex.cloud
```

4. **Add to .env**:
Add this URL to your `backend/.env` file:
```env
CONVEX_URL=https://your-project-name.convex.cloud
```

5. **Generate Types**:
Run this to generate TypeScript types:
```bash
npx convex dev --once
```

## Development

During development, run Convex in watch mode:
```bash
npx convex dev
```

This will:
- Watch for schema changes
- Generate TypeScript types
- Deploy functions automatically
- Provide a dashboard URL

## Schema Changes

When you modify `convex/schema.ts`, Convex will automatically:
- Update the database schema
- Regenerate types
- Migrate existing data

## Production

For production, use:
```bash
npx convex deploy
```

This deploys your Convex functions to production.

## Dashboard

Access your Convex dashboard at:
```
https://dashboard.convex.dev
```

Here you can:
- View your data
- Run queries
- Monitor usage
- Manage your project
