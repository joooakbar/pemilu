import VotingPage from "@/features/voter/SuratSuaraa/components/SuratSuaraa";
import { ServerProps } from "@/features/voter/SuratSuaraa/types/surat.types";
import prisma from "@/lib/db";
import { getKandidatList } from "@/sanity/lib/fetchers";

export default async function Page({ params }: ServerProps) {
  const { id } = await params;

  const pemilihan = await prisma.pemilihan.findUnique({
    where: {
      id,
    },
  });

  if (!pemilihan) {
    return <div>Pemilihan tidak ditemukan!</div>;
  }

  const pemilih = await prisma.dPT.findFirst();

  if (!pemilih) {
    return <div>Pemilih tidak ditemukan!</div>;
  }

  const kandidatSanity = await getKandidatList();

  const kandidatPrisma = await prisma.kandidat.findMany({
    where: {
      idPemilihan: id,
      isActive: true,
    },
  });

  const kandidat = kandidatSanity.map((item) => {
    const prismaData = kandidatPrisma.find((k) => k.sanityId === item._id);

    return {
      ...item,
      prismaId: prismaData?.id,
    };
  });

  return (
    <VotingPage pemilihan={pemilihan} pemilih={pemilih} kandidat={kandidat} />
  );
}
