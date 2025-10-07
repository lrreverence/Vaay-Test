const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up SaaS Demo Platform...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-nextauth-key-change-this-in-production"

# Stripe (Test Mode Only)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App Configuration
ADMIN_EMAIL="admin@example.com"
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created');
} else {
  console.log('✅ .env.local already exists');
}

// Generate NextAuth secret
console.log('\n🔐 Generating NextAuth secret...');
try {
  const secret = execSync('openssl rand -base64 32', { encoding: 'utf8' }).trim();
  console.log(`Generated secret: ${secret}`);
  console.log('⚠️  Please update NEXTAUTH_SECRET in .env.local with this value');
} catch (error) {
  console.log('⚠️  Could not generate secret automatically. Please run: openssl rand -base64 32');
}

console.log('\n📊 Setting up database...');
try {
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema created');
} catch (error) {
  console.log('❌ Database setup failed:', error.message);
}

console.log('\n👤 Creating admin user...');
try {
  execSync('npm run seed', { stdio: 'inherit' });
  console.log('✅ Admin user created');
} catch (error) {
  console.log('❌ Admin user creation failed:', error.message);
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update your Stripe keys in .env.local');
console.log('2. Update NEXTAUTH_SECRET in .env.local');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');
console.log('\n🔑 Admin credentials:');
console.log('Email: admin@example.com');
console.log('Password: admin123');
console.log('\n💳 Test Stripe card: 4242 4242 4242 4242');
console.log('\n📚 See README.md for detailed setup instructions');