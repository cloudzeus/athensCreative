import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { LESSONS, PROGRAMS, SCHEDULE } from "../src/lib/content";

const ADMIN_EMAIL = "gkozyris@i4ria.com";

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD ?? "1f1femsk", 12);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { passwordHash },
    create: { email: ADMIN_EMAIL, name: "George Kozyris", passwordHash, role: "admin" },
  });

  for (const p of PROGRAMS) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: { ...p },
      create: { ...p },
    });
  }
  await prisma.scheduleSlot.deleteMany();
  await prisma.scheduleSlot.createMany({ data: SCHEDULE });
  await prisma.lesson.deleteMany();
  await prisma.lesson.createMany({ data: LESSONS });
  console.log(
    `Seeded admin user ${ADMIN_EMAIL}, ${PROGRAMS.length} programs, ${SCHEDULE.length} schedule slots, ${LESSONS.length} lessons.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
