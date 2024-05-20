const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

async function main() {
  const User = await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        username: 'alice',
        password: 'alice',
      },
      {
        name: 'Admin1',
        username: 'admin',
        password: 'admin',
      },
    ],
    skipDuplicates: true,
  });
  console.log({User });
} 

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1)
  });