import prisma from '@/prisma';

export const getBarangsService = async () => {
  try {
    const barangs = await prisma.barang.findMany({});

    if (barangs.length === 0) {
      throw new Error('Tidak ada barang');
    }
    return barangs;
  } catch (error) {
    throw error;
  }
};
