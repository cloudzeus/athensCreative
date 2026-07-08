import { prisma } from "../src/lib/prisma";
import { LESSONS, PROGRAMS, SCHEDULE } from "../src/lib/content";

async function main() {
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
    `Seeded ${PROGRAMS.length} programs, ${SCHEDULE.length} schedule slots, ${LESSONS.length} lessons.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
