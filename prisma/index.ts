import { PrismaClient } from '@prisma/client';
import { logger } from '../shared/logger';

const prisma = new PrismaClient();


  
  // Method to test Prisma DB connection
export const connectToPostgres = async() => {
  try {
    // Try to connect to the database
    await prisma.$connect();
    logger.info("Successfully connected to the PostgreSQL database via Prisma.");
  } catch (error) {
    logger.error("Error connecting to the PostgreSQL database via Prisma:", error);
  } finally {
    // Ensure the Prisma client disconnects after use
    await prisma.$disconnect();
  }
}
