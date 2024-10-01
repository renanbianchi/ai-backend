import { PrismaClient } from "@prisma/client";

const promise: Promise<{
  prisma: PrismaClient;
  readOnlyInstance: PrismaClient;
}> = new Promise(resolve => {

  const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@host.docker.internal:5432/postgres'

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  resolve({ prisma, readOnlyInstance: prisma });
});

export const startPrisma = async () => promise;

export const getPrisma = async () => {
  const { prisma } = await promise;

  return prisma;
};
