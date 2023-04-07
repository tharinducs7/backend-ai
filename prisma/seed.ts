import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const leadsData: Prisma.LeadsCreateInput[] = [
    {
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '555-7890',
    company: 'Wilson Group',
    jobTitle: 'Marketing Manager',
    image: 'https://randomuser.me/api/portraits/women/36.jpg',
    country_code: 'lk',
    website: 'https://www.wilsongroup.com',
    personalizationLine: 'Hi Emma',
    isValidEmail: true,
    isApproved: true,
    comment: null,
  },
  {
    name: 'Adam Johnson',
    email: 'adam.johnson@example.com',
    phone: '555-1234',
    company: 'Johnson Consulting',
    jobTitle: 'Senior Consultant',
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
    country_code: 'nz',
    website: 'https://www.johnsonconsulting.com',
    personalizationLine: 'Hi Adam',
    isValidEmail: true,
    isApproved: true,
    comment: null,
  },
  {
    name: 'Sophie Lee',
    email: 'sophie.lee@example.com',
    phone: '555-4321',
    company: 'Lee Technologies',
    jobTitle: 'IT Director',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    country_code: 'kr',
    website: 'https://www.leetechnologies.com',
    personalizationLine: 'Hi Sophie',
    isValidEmail: true,
    isApproved: true,
    comment: null,
  },
  {
    name: 'Benjamin Chen',
    email: 'benjamin.chen@example.com',
    phone: '555-5678',
    company: 'Chen Enterprises',
    jobTitle: 'CEO',
    image: 'https://randomuser.me/api/portraits/men/92.jpg',
    country_code: 'tw',
    website: 'https://www.chenenterprises.com',
    personalizationLine: 'Hi Benjamin',
    isValidEmail: true,
    isApproved: true,
    comment: null,
  },
  {
    name: 'Amanda Rodriguez',
    email: 'amanda.rodriguez@example.com',
    phone: '555-2468',
    company: 'Rodriguez Holdings',
    jobTitle: 'Finance Director',
    image: 'https://randomuser.me/api/portraits/women/87.jpg',
    country_code: 'us',
    website: 'https://www.rodriguezholdings.com',
    personalizationLine: 'Hi Amanda',
    isValidEmail: true,
    isApproved: true,
    comment: null,
  },
  {
    name: 'Jack Smith',
    email: 'jack.smith@example.com',
    phone: '555-3698',
    company: 'Smith & Co',
    jobTitle: 'Sales Manager',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    country_code: 'gb',
    website: 'https://www.smithandco.com',
    personalizationLine: 'Hi Jack',
    isValidEmail: true,
    isApproved: true,
    comment: null,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of leadsData) {
    const lead = await prisma.leads.create({
      data: u,
    })
    console.log(`Created lead with id: ${lead.id}`)
  }
  console.log(`Seeding finished.`)
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
