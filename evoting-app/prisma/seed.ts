import { PrismaClient, Role, StatusPemilihan } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  console.log('🌱 Seeding database E-VOTIS...')

  // ── Users ────────────────────────────────────────────
  const adminPass   = await bcrypt.hash('Admin@2025!',   12)
  const panitiaPass = await bcrypt.hash('Panitia@2025!', 12)
  const saksiPass   = await bcrypt.hash('Saksi@2025!',   12)

  await Promise.all([
    prisma.user.upsert({
      where: { email: 'johanakbarp@gmail.com' },
      update: {},
      create: {
        nama: 'Johan Akbar Prakoso',
        username: 'jooo',
        email: 'johanakbarp@gmail.com',
        passwordHash: adminPass,
        role: Role.ADMIN,
      },
    }),

    prisma.user.upsert({
      where: { email: 'nandafii28@gmail.com' },
      update: {},
      create: {
        nama: 'Mohammad Aditya Nanda Saputra',
        username: 'ndaakuy',
        email: 'nandafii28@gmail.com',
        passwordHash: adminPass,
        role: Role.ADMIN,
      },
    }),
  ])

  await prisma.user.upsert({
    where: { email: 'ratihsulistianingsih5@gmail.com' },
    update: {},
    create: {
      nama: 'Ratih Sulistia Ningsih',
      username:     'ratihh',
      email:        'ratihsulistianingsih5@gmail.com',
      passwordHash: panitiaPass,
      role:         Role.PANITIA,
    },
  })

  await prisma.user.upsert({
    where: { email: 'nasywaalyasuhadi25@gmail.com' },
    update: {},
    create: {
      nama: 'Nasywa Alya Suhadi',
      username:     'nasywaaa',
      email:        'nasywaalyasuhadi25@gmail.com',
      passwordHash: saksiPass,
      role:         Role.SAKSI,
    },
  })

  // ── DPT Sample ────────────────────────────────────────
  const dptSamples = [
    { nik: '3518182511030001', nama: 'Johan Akbar Prakoso',   noHP: '081234567890', email: 'johanakbarp@gmail.com' },
    { nik: '3506051011030002', nama: 'Mohammad Aditya Nanda Saputra',    noHP: '081234567891', email: 'nandafii28@gmail.com' },
    { nik: '3518010101800003', nama: 'Ahmad Fauzi',    noHP: '081234567892', email: 'ahmad@example.com' },
    { nik: '3578010101800001', nama: 'Dewi Lestari',   noHP: '081234567893', email: 'dewi@example.com' },
    { nik: '3578010101800002', nama: 'Eko Prasetyo',   noHP: '081234567894', email: 'eko@example.com' },
  ]

  for (const d of dptSamples) {
    await prisma.dPT.upsert({
      where: { nik: d.nik },
      update: {},
      create: {
        ...d,
        kodeWilayah: d.nik.slice(0, 6),
        importedBy: 'seed',
      },
    })
  }

  // ── Pemilihan Sample ─────────────────────────────────────
const pemilihanSamples = [
  {
    nama: 'Pemilihan Ketua BEM 2026',
    sanityId: 'bem-2026',
    status: StatusPemilihan.ACTIVE,
    startTime: new Date('2026-05-20T08:00:00Z'),
    endTime: new Date('2026-05-20T15:00:00Z'),
    tempatVoting: 'Universitas Nusantara PGRI Kediri',
    deskripsi: 'Pemilihan Ketua BEM periode 2026',
  },
  {
    nama: 'Pemilihan Ketua HIMA TI 2026',
    sanityId: 'hima-ti-2026',
    status: StatusPemilihan.DRAFT,
    startTime: new Date('2026-06-10T08:00:00Z'),
    endTime: new Date('2026-06-10T15:00:00Z'),
    tempatVoting: 'Gedung Fakultas Teknik',
    deskripsi: 'Pemilihan Ketua Himpunan Mahasiswa Teknik Informatika',
  },
  {
    nama: 'Pemilihan Ketua Organisasi Mahasiswa',
    sanityId: 'ormawa-2025',
    status: StatusPemilihan.ENDED,
    startTime: new Date('2025-12-01T08:00:00Z'),
    endTime: new Date('2025-12-01T15:00:00Z'),
    tempatVoting: 'Aula Kampus',
    deskripsi: 'Pemilihan periode sebelumnya',
  },
]

for (const p of pemilihanSamples) {
  await prisma.pemilihan.upsert({
    where: {
      sanityId: p.sanityId,
    },
    update: {},
    create: p,
  })
}

  console.log('✅ Seed selesai!')
  console.log('\n🔑 Demo credentials:')
  console.log('   Admin   : admin@gmail.com    / Admin@2025!')
  console.log('   Panitia : panitia@gmail.com  / Panitia@2025!')
  console.log('   Saksi   : saksi@gmail.com    / Saksi@2025!')
  console.log('\n📋 NIK Test: 3518010101800001')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
