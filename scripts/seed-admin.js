const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function seedAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    })
    
    if (existingAdmin) {
      console.log('Admin user already exists:', adminEmail)
      return
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    
    console.log('Admin user created successfully:')
    console.log('Email:', admin.email)
    console.log('Password:', adminPassword)
    console.log('Role:', admin.role)
    
  } catch (error) {
    console.error('Error seeding admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedAdmin()


