import { PrismaClient } from '@prisma/client';
import { logger } from '../shared/logger';

const prisma = new PrismaClient();

async function main() {
  const api1 = await prisma.app_api.create({
    data: {
      Api_Type: 'sandgrid',
      Api_Key: 'api_key_1',
      Api_Secret: 'secret_1',
    },
  });
  logger.info("insert:", api1)

  const api2 = await prisma.app_api.create({
    data: {
      Api_Type: 'twilio',
      Api_Key: 'api_key_2',
      Api_Secret: 'secret_2',
    },
  });
  logger.info("insert:", api2)

  // Seed the `app_user` table
  const user1 = await prisma.app_user.create({
    data: {
      Name: 'John Doe',
      Password: 'password_1',
      Email: 'john.doe@example.com',
    },
  });
  logger.info("insert:", user1)
  const user2 = await prisma.app_user.create({
    data: {
      Name: 'Jane Doe',
      Password: 'password_2',
      Email: 'jane.doe@example.com',
    },
  });
  logger.info("insert:", user2)
  
  const user3 = await prisma.app_user.create({
    data: {
      Name: 'Sam Smith',
      Password: 'password_3',
      Email: 'sam.smith@example.com',
    },
  });
  
  logger.info("insert:", user3)
  // Seed the `app_auth` table

  // Seed the `app_emailTemplates` table with related templates
  const template1 = await prisma.app_emailTemplates.create({
    data: {
      template: 'Welcome Email Template',
      app_type: { connect: { id: 1 } },  // Connect to the first `app_api` (REST)
      selected: true,
      isOrder: false,
    },
  });
  logger.info("insert:", template1)
  const template2 = await prisma.app_emailTemplates.create({
    data: {
      template: 'Reset Password Email Template',
      app_type: { connect: { id: 1 } },  // Connect to the first `app_api` (REST)
      selected: false,
      isOrder: false,
    },
  });
  logger.info("insert:", template2)
  
  const template3 = await prisma.app_emailTemplates.create({
    data: {
      template: 'Invoice Email Template',
      app_type: { connect: { id: 2 } },  // Connect to the second `app_api` (SOAP)
      selected: true,
      isOrder: true,
    },
  });
  logger.info("insert:", template3)
  
  const template4 = await prisma.app_emailTemplates.create({
    data: {
      template: 'GraphQL Query Email Template',
      app_type: { connect: { id: 3 } },  // Connect to the third `app_api` (GraphQL)
      selected: true,
      isOrder: false,
    },
  });
  
  logger.info("insert:", template4)
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
  