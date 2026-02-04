import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
      role: 'superadmin',
    },
  })

  console.log({ admin })

  // Seed categories
  const categories = [
    { name: 'Sofas', slug: 'sofas', description: 'Luxury Sofas' },
    { name: 'Dining', slug: 'dining', description: 'Elegant Dining Tables' },
    { name: 'Bedroom', slug: 'bedroom', description: 'Comfortable Bedroom Sets' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log('Categories seeded')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
