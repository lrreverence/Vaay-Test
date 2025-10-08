# 🚀 Render Deployment (SQLite Compatible)

Deploy your SaaS demo to Render while keeping your SQLite database.

## 📋 Prerequisites

1. **Render Account** - [render.com](https://render.com)
2. **GitHub Repository** - Your code must be on GitHub
3. **GitHub connected to Render**

## 🚀 Quick Deployment

### Step 1: Connect to Render

1. **Go to [render.com](https://render.com)**
2. **Sign in with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Select your `saas-demo` repository**

### Step 2: Configure Build Settings

Render will auto-detect Next.js, but verify these settings:

**Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

**Start Command:**
```bash
npm start
```

**Node Version:**
```
18
```

### Step 3: Environment Variables

In Render dashboard → Environment tab, add:

```env
# Database (Render supports SQLite)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="https://your-app.onrender.com"
NEXTAUTH_SECRET="your-production-secret"

# Stripe (Test mode - keep your test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App Configuration
ADMIN_EMAIL="admin@example.com"
```

## 🗄️ Database Setup

### 1. Render Persistent Storage
Render provides persistent storage for your SQLite database:
- ✅ Your `dev.db` file persists between deployments
- ✅ Data survives app restarts
- ✅ No database migration needed

### 2. Initialize Database (First Deploy)
After first deployment, you may need to initialize:

```bash
# Connect to Render shell (if available)
# Or add to build command:
npx prisma db push && npm run seed
```

## 🔗 Stripe Webhook Setup

1. **Get your Render URL** from the dashboard
2. **Go to Stripe Dashboard** → Webhooks
3. **Update webhook URL** to: `https://your-app.onrender.com/api/stripe/webhook`
4. **Test webhook delivery**

## 🧪 Testing Your Deployment

### 1. Test Authentication
- Visit your Render URL
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

1. **Build fails**
   ```bash
   # Check build logs in Render dashboard
   # Ensure all dependencies are in package.json
   ```

2. **Database not found**
   - Add to build command: `npx prisma db push && npm run seed`
   - Check if DATABASE_URL is set correctly

3. **Environment variables not working**
   - Verify all variables are set in Render dashboard
   - Check for typos in variable names

4. **Stripe webhook not working**
   - Verify webhook URL is correct
   - Check webhook secret matches
   - Test webhook delivery in Stripe dashboard

### Debug Steps
1. **Check build logs** in Render dashboard
2. **Verify environment variables** are set
3. **Test webhook delivery** in Stripe dashboard
4. **Check app is running** on Render URL

## 💰 Pricing

**Render Free Tier:**
- ✅ 750 hours/month free
- ✅ SQLite database support
- ✅ Persistent storage
- ✅ Custom domains
- ✅ Perfect for demos
- ✅ Auto-sleep after 15 minutes of inactivity

**Note:** Free tier apps sleep after 15 minutes of inactivity, but wake up quickly when accessed.

## 🎯 Benefits of Render

- ✅ **No database migration needed**
- ✅ **Keeps your SQLite setup**
- ✅ **Persistent storage**
- ✅ **Easy deployment**
- ✅ **Free tier available**
- ✅ **All integrations work**
- ✅ **Auto-deploy from GitHub**

## 🚀 Deployment Steps Summary

1. **Connect GitHub** to Render
2. **Configure build settings** (auto-detected)
3. **Add environment variables**
4. **Deploy!**
5. **Update Stripe webhook URL**
6. **Test all features**

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. **Go to Render dashboard** → Your service
2. **Click "Settings"** → "Custom Domains"
3. **Add your domain**
4. **Update DNS records**

### Auto-Deploy
- ✅ **Automatic deployments** on git push
- ✅ **Build status** in GitHub
- ✅ **Deploy previews** for pull requests

## 🎯 Go Live!

Once deployed:
1. **Test all features** on your Render URL
2. **Share the link** for demonstrations
3. **Monitor usage** in Render dashboard
4. **Scale as needed**

Your SaaS demo will be fully functional with all integrations working! 🎉

## 📞 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Render Community**: Community support
- **GitHub Issues**: For code-related problems
