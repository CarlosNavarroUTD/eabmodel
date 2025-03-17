import { PrismaClient } from '@prisma/client'

// Instead of using namespace, declare the type directly
declare global {
  // Change var to let in the global declaration
  let prisma: PrismaClient | undefined
}

// Use const instead of var
const globalForPrisma = global as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

