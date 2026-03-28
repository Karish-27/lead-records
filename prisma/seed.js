const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEFAULTS = [
  { name: 'LinkedIn',  status: 'created',    assignee: 'Krutik',   date: '2025-03-20', url: 'https://linkedin.com/in/krutikparmar', notes: 'Profile optimized, headline updated' },
  { name: 'Behance',   status: 'created',    assignee: 'Krutik',   date: '2025-03-18', url: 'https://behance.net/krutikp',          notes: 'Portfolio live' },
  { name: 'Clutch',    status: 'progress',   assignee: 'Both',     date: '2025-03-22', url: '',                                     notes: 'Waiting for client reviews' },
  { name: 'Upwork',    status: 'progress',   assignee: 'Krutik',   date: '2025-03-24', url: '',                                     notes: 'Profile 80% complete' },
  { name: 'Apollo',    status: 'notstarted', assignee: 'Karishma', date: '2025-03-10', url: '',                                     notes: '' },
  { name: 'Contra',    status: 'created',    assignee: 'Krutik',   date: '2025-03-26', url: '',                                     notes: 'Signed up, profile done' },
  { name: 'Dribbble',  status: 'notstarted', assignee: 'Krutik',   date: '2025-03-01', url: '',                                     notes: '' },
  { name: 'Wellfound', status: 'progress',   assignee: 'Both',     date: '2025-03-25', url: '',                                     notes: 'Setting up company profile' },
];

async function main() {
  const count = await prisma.platform.count();
  if (count === 0) {
    for (const p of DEFAULTS) {
      await prisma.platform.create({ data: p });
    }
    console.log('Seeded 8 default platforms');
  } else {
    console.log(`Database already has ${count} platforms, skipping seed`);
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
