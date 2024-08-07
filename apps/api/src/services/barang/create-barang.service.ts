import prisma from '@/prisma';
import { Barang, Prisma } from '@prisma/client';

interface CreateBarangBody extends Omit<Barang, 'id'> {
    harga: Prisma.Decimal
}

export const createBarangService = async (body: CreateBarangBody) => {
  try {
    const { kode, nama, harga } = body;

    const barang = await prisma.barang.findFirst({
      where: { kode, nama },
    });

    if (barang) {
        throw new Error('Barang sudah tersedia')
    }

    const createBarang = await prisma.barang.create({
        data : {
            ...body,
            harga : new Prisma.Decimal(harga)
        }
    })

    return {message: 'Create barang sukses', data: createBarang}
  } catch (error) {
    throw error;
  }
};
