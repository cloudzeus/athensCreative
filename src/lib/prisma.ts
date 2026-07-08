import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function makeClient() {
  const url = new URL(
    process.env.DATABASE_URL ?? "postgres://postgres@localhost:5432/athenscreative"
  );
  // pg doesn't understand Prisma's ?schema= param — pass it separately.
  const schema = url.searchParams.get("schema") ?? "public";
  url.searchParams.delete("schema");

  const adapter = new PrismaPg(
    {
      connectionString: url.toString(),
      max: 5,
      // Fail fast so the static-content fallback kicks in quickly when Postgres is down.
      connectionTimeoutMillis: 2_500,
    },
    { schema }
  );
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
