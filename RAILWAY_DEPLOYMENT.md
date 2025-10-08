# 🚀 Railway Deployment (SQLite Compatible)

Deploy your SaaS demo to Railway while keeping your SQLite database.

## 📋 Prerequisites

1. **Railway Account** - [railway.app](https://railway.app)
2. **GitHub Repository** - Your code must be on GitHub
3. **Railway CLI** (optional but recommended)

## 🚀 Quick Deployment

### Method 1: Railway Dashboard (Easiest)

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Railway auto-detects Next.js**

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## 🔧 Environment Variables

In Railway dashboard → Variables tab, add:

```env
# Database (Railway will provide this automatically)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="https://your-app.railway.app"
NEXTAUTH_SECRET="your-production-secret"

# Stripe (Test mode - keep your test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App Configuration
ADMIN_EMAIL="admin@example.com"
```

## 🗄️ Database Setup

### 1. Railway Auto-Setup
Railway will automatically:
- Create persistent storage for your SQLite database
- Keep your `dev.db` file between deployments
- Handle database migrations

### 2. Manual Database Setup (if needed)
```bash
# Connect to Railway console
railway shell

# Run database commands
npx prisma db push
npm run seed
```

## 🔗 Stripe Webhook Setup

1. **Get your Railway URL** from the dashboard
2. **Go to Stripe Dashboard** → Webhooks
3. **Update webhook URL** to: `https://your-app.railway.app/api/stripe/webhook`
4. **Test webhook delivery**

## 🧪 Testing Your Deployment

### 1. Test Authentication
- Visit your Railway URL
- Sign up with a new account
- Verify login/logout works

### 2. Test Stripe Integration
- Try the subscription flow
- Use test card: `4242 4242 4242 4242`
- Check if webhook updates subscription status

### 3. Test Admin Panel
- Sign in as admin: `admin@example.com` / `admin123`
- Verify admin panel access

## 🔍 Troubleshooting

### Common Issues

1. **Database not found**
   ```bash
   # Connect to Railway console
   railway shell
   
   # Initialize database
   npx prisma db push
   npm run seed
   ```

2. **Environment variables not set**
   - Check Railway dashboard → Variables
   - Ensure all required variables are set

3. **Stripe webhook not working**
   - Verify webhook URL is correct
   - Check webhook secret matches
   - Test webhook delivery in Stripe dashboard

### Debug Commands
```bash
# View logs
railway logs

# Connect to console
railway shell

# Check environment
railway variables
```

## 💰 Pricing

**Railway Free Tier:**
- ✅ $5 credit monthly
- ✅ SQLite database support
- ✅ Persistent storage
- ✅ Custom domains
- ✅ Perfect for demos

## 🎯 Benefits of Railway

- ✅ **No database migration needed**
- ✅ **Keeps your SQLite setup**
- ✅ **Persistent storage**
- ✅ **Easy deployment**
- ✅ **Free tier available**
- ✅ **All integrations work**

## 🚀 Go Live!

Once deployed:
1. **Test all features** on your Railway URL
2. **Share the link** for demonstrations
3. **Monitor usage** in Railway dashboard
4. **Scale as needed**

Your SaaS demo will be fully functional with all integrations working! 🎉

## 📞 Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Community support
- **GitHub Issues**: For code-related problems
