# 🚀 Deployment Guide

This guide covers deploying your SaaS demo to Vercel or Netlify while maintaining all integrations.

## 📋 Pre-Deployment Checklist

### ✅ What Works Out of the Box
- **NextAuth.js** - Works perfectly on both platforms
- **Stripe Integration** - Full support for webhooks
- **Middleware** - Route protection works
- **API Routes** - All endpoints functional

### ⚠️ What Needs Changes
- **Database** - SQLite → Cloud database required
- **Environment Variables** - Must be configured
- **Webhook URLs** - Must be updated

## 🗄️ Database Options

### Option 1: PlanetScale (Recommended)
```bash
# Install PlanetScale CLI
npm install -g @planetscale/cli

# Create database
pscale database create saas-demo

# Get connection string
pscale connect saas-demo main
```

### Option 2: Supabase
```bash
# Create project at supabase.com
# Get connection string from Settings > Database
```

### Option 3: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Create database
railway add postgresql
```

## 🔧 Database Migration

### 1. Update Prisma Schema

Change your `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // or "mysql" for PlanetScale
  url      = env("DATABASE_URL")
}
```

### 2. Update Environment Variables

```env
# Production Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth (Production)
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-production-secret"

# Stripe (Production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_live_key"
STRIPE_SECRET_KEY="sk_live_your_live_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App Configuration
ADMIN_EMAIL="admin@yourdomain.com"
```

### 3. Deploy Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push

# Seed admin user
npm run seed
```

## 🚀 Vercel Deployment (Recommended)

### 1. Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js

### 2. Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Update Stripe Webhook
1. Go to Stripe Dashboard → Webhooks
2. Update endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
3. Test webhook delivery

### 4. Deploy
```bash
# Push to main branch
git push origin main

# Vercel auto-deploys
```

## 🌐 Netlify Deployment

### 1. Build Configuration
Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

### 2. Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.netlify.app
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Deploy
```bash
# Connect to Netlify
netlify deploy --prod
```

## 🔐 Security Considerations

### Production Checklist
- [ ] Use production Stripe keys (not test keys)
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Use HTTPS URLs only
- [ ] Configure proper CORS
- [ ] Set up monitoring

### Environment Security
```env
# Never commit these to Git
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXTAUTH_SECRET=your-secret
```

## 🧪 Testing Production Deployment

### 1. Test Authentication
- [ ] User registration works
- [ ] Login/logout functions
- [ ] Session persistence
- [ ] Admin role assignment

### 2. Test Stripe Integration
- [ ] Checkout flow works
- [ ] Webhook receives events
- [ ] Subscription status updates
- [ ] Payment processing

### 3. Test Protected Routes
- [ ] Dashboard requires authentication
- [ ] Admin panel requires admin role
- [ ] Video library requires subscription

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection**
   ```bash
   # Check connection
   npx prisma db push
   ```

2. **Environment Variables**
   ```bash
   # Verify in deployment platform
   echo $DATABASE_URL
   ```

3. **Stripe Webhooks**
   - Check webhook URL is correct
   - Verify webhook secret matches
   - Test webhook delivery

4. **NextAuth Issues**
   - Ensure NEXTAUTH_URL matches domain
   - Check NEXTAUTH_SECRET is set
   - Verify callback URLs

### Debug Commands
```bash
# Check database connection
npx prisma db push

# Generate Prisma client
npx prisma generate

# View logs
vercel logs your-app-name
```

## 📊 Monitoring

### Recommended Tools
- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking
- **Stripe Dashboard** - Payment monitoring
- **Database monitoring** - Query performance

## 🎯 Production Checklist

- [ ] Database migrated to cloud provider
- [ ] Environment variables configured
- [ ] Stripe webhooks updated
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backup strategy in place

## 🚀 Go Live!

Once deployed, your SaaS demo will be:
- ✅ **Fully functional** with all integrations
- ✅ **Production-ready** with proper security
- ✅ **Scalable** with cloud infrastructure
- ✅ **Professional** for demonstrations

Perfect for showcasing your full-stack development skills! 🎉
