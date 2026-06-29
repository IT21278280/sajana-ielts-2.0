import {PrismaPg} from '@prisma/adapter-pg'
import {PrismaClient} from '../src/generated/prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required to run Prisma seed script.')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({connectionString}),
})

type SeedStep = {
  label: string
  run: () => Promise<void>
}

async function main() {
  const steps: SeedStep[] = [
    {
      label: 'Upsert admin user',
      run: async () => {
        await prisma.user.upsert({
          where: {email: 'teacher@sajanaielts.com'},
          update: {
            name: 'Sajana IELTS Teacher',
            role: 'ADMIN',
            isActive: true,
          },
          create: {
            name: 'Sajana IELTS Teacher',
            email: 'teacher@sajanaielts.com',
            passwordHash: 'seeded-placeholder-password-hash',
            role: 'ADMIN',
            isActive: true,
          },
        })
      },
    },
    {
      label: 'Create sample lead inquiry',
      run: async () => {
        await prisma.lead.create({
          data: {
            studentName: 'Sample Student',
            phone: '+94 77 123 4567',
            email: 'student.inquiry@example.com',
            targetBandScore: 8.0,
            message: 'I need a focused study plan to reach an IELTS 8.0 within 3 months.',
          },
        })
      },
    },
    {
      label: 'Create premium student result',
      run: async () => {
        await prisma.studentResult.create({
          data: {
            studentName: 'Premium Result Candidate',
            overallBandScore: 8.5,
            listeningBandScore: 9.0,
            readingBandScore: 8.5,
            writingBandScore: 7.5,
            speakingBandScore: 8.5,
            notes: 'Demonstrated strong consistency after intensive mock test training.',
          },
        })
      },
    },
    {
      label: 'Create testimonial row',
      run: async () => {
        await prisma.testimonial.create({
          data: {
            studentName: 'Academic Track Student',
            quote:
              'The IELTS Academic program gave me a precise roadmap and constant feedback that helped me secure my dream score.',
            targetBandScore: 8.0,
            achievedBandScore: 8.5,
            isPublished: true,
          },
        })
      },
    },
  ]

  for (const step of steps) {
    try {
      await step.run()
      console.log(`Seed step completed: ${step.label}`)
    } catch (error) {
      console.error(`Seed step failed: ${step.label}`, error)
      throw error
    }
  }
}

main()
  .catch((error) => {
    console.error('Seeding failed with an unrecoverable error.', error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (prisma) {
      await prisma.$disconnect()
    }
   })
