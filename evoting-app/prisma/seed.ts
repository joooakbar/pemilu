import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database E-VOTIS...");

  // ── Users ────────────────────────────────────────────
  const adminPass = await bcrypt.hash("Admin@2025!", 12);
  // const panitiaPass = await bcrypt.hash("Panitia@2025!", 12);
  // const saksiPass = await bcrypt.hash("Saksi@2025!", 12);

  await Promise.all([
    prisma.user.upsert({
      where: { email: "johanakbarp@gmail.com" },
      update: {},
      create: {
        nama: "Johan Akbar Prakoso",
        username: "jooo",
        email: "johanakbarp@gmail.com",
        passwordHash: adminPass,
        role: Role.ADMIN,
      },
    }),

    prisma.user.upsert({
      where: { email: "nandafii28@gmail.com" },
      update: {},
      create: {
        nama: "Mohammad Aditya Nanda Saputra",
        username: "ndaakuy",
        email: "nandafii28@gmail.com",
        passwordHash: adminPass,
        role: Role.ADMIN,
      },
    }),
  ]);

  console.log("✅ Seed selesai!");
  console.log("\n🔑 Demo credentials:");
  console.log("   Admin   : admin@gmail.com    / Admin@2025!");
  console.log("   Panitia : panitia@gmail.com  / Panitia@2025!");
  console.log("   Saksi   : saksi@gmail.com    / Saksi@2025!");
  console.log("\n📋 NIK Test: 3518010101800001");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
