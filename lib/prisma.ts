import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

type PrismaGlobal = typeof globalThis & { prisma?: PrismaClient };
const prismaGlobal = globalThis as PrismaGlobal;

let prisma: PrismaClient;

const adapter = new PrismaPg({ connectionString });
if (connectionString) {
  prisma = prismaGlobal.prisma ?? new PrismaClient({ adapter });
} else {
  prisma = (prismaGlobal.prisma ?? new PrismaClient({adapter})) as PrismaClient;
}

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}

export { prisma };
