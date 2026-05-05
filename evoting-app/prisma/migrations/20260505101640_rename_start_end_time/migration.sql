-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PANITIA', 'SAKSI');

-- CreateEnum
CREATE TYPE "StatusPemilihan" AS ENUM ('DRAFT', 'ACTIVE', 'SUSPENDED', 'ENDED');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(36) NOT NULL,
    "nama" VARCHAR(191) NOT NULL,
    "username" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otpLogin" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "otpHash" VARCHAR(255) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otpLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemilihan" (
    "id" VARCHAR(36) NOT NULL,
    "sanityId" VARCHAR(191),
    "nama" VARCHAR(255) NOT NULL,
    "status" "StatusPemilihan" NOT NULL DEFAULT 'DRAFT',
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "tempatVoting" VARCHAR(255),
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pemilihan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kandidat" (
    "id" VARCHAR(36) NOT NULL,
    "noUrut" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "sanityId" VARCHAR(191) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kandidat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dpt" (
    "id" VARCHAR(36) NOT NULL,
    "nik" CHAR(16) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "kodeWilayah" CHAR(6) NOT NULL,
    "noHP" VARCHAR(20),
    "email" VARCHAR(191),
    "hasVoted" BOOLEAN NOT NULL DEFAULT false,
    "votedAt" TIMESTAMP(3),
    "importedBy" VARCHAR(36),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dpt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voteToken" (
    "id" VARCHAR(36) NOT NULL,
    "dptId" VARCHAR(36) NOT NULL,
    "idPemilihan" VARCHAR(36) NOT NULL,
    "tokenHash" VARCHAR(255) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "sentViaWA" BOOLEAN NOT NULL DEFAULT false,
    "sentViaEmail" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voteToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" VARCHAR(36) NOT NULL,
    "idPemilihan" VARCHAR(36) NOT NULL,
    "idKandidat" VARCHAR(36) NOT NULL,
    "nikHash" VARCHAR(64) NOT NULL,
    "kodeWilayah" CHAR(6) NOT NULL,
    "voteReference" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAktivitas" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "role" VARCHAR(20),
    "action" VARCHAR(100) NOT NULL,
    "entity" VARCHAR(100) NOT NULL,
    "entityId" VARCHAR(36),
    "ipAddress" VARCHAR(45),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAktivitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "otpLogin_userId_idx" ON "otpLogin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pemilihan_sanityId_key" ON "pemilihan"("sanityId");

-- CreateIndex
CREATE UNIQUE INDEX "kandidat_noUrut_key" ON "kandidat"("noUrut");

-- CreateIndex
CREATE UNIQUE INDEX "kandidat_sanityId_key" ON "kandidat"("sanityId");

-- CreateIndex
CREATE UNIQUE INDEX "dpt_nik_key" ON "dpt"("nik");

-- CreateIndex
CREATE INDEX "dpt_kodeWilayah_idx" ON "dpt"("kodeWilayah");

-- CreateIndex
CREATE UNIQUE INDEX "voteToken_dptId_idPemilihan_key" ON "voteToken"("dptId", "idPemilihan");

-- CreateIndex
CREATE UNIQUE INDEX "votes_voteReference_key" ON "votes"("voteReference");

-- CreateIndex
CREATE INDEX "votes_idPemilihan_idx" ON "votes"("idPemilihan");

-- CreateIndex
CREATE INDEX "votes_kodeWilayah_idx" ON "votes"("kodeWilayah");

-- CreateIndex
CREATE UNIQUE INDEX "votes_idPemilihan_nikHash_key" ON "votes"("idPemilihan", "nikHash");

-- CreateIndex
CREATE INDEX "LogAktivitas_createdAt_idx" ON "LogAktivitas"("createdAt");

-- CreateIndex
CREATE INDEX "LogAktivitas_action_idx" ON "LogAktivitas"("action");

-- AddForeignKey
ALTER TABLE "otpLogin" ADD CONSTRAINT "otpLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voteToken" ADD CONSTRAINT "voteToken_dptId_fkey" FOREIGN KEY ("dptId") REFERENCES "dpt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voteToken" ADD CONSTRAINT "voteToken_idPemilihan_fkey" FOREIGN KEY ("idPemilihan") REFERENCES "pemilihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_idPemilihan_fkey" FOREIGN KEY ("idPemilihan") REFERENCES "pemilihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_idKandidat_fkey" FOREIGN KEY ("idKandidat") REFERENCES "kandidat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAktivitas" ADD CONSTRAINT "LogAktivitas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
