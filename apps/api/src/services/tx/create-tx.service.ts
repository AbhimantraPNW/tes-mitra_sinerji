import prisma from '@/prisma';
import { CreateTxBody } from '@/types/tx.types';
import { Prisma } from '@prisma/client';

export const createTxService = async (body: CreateTxBody) => {
  try {
    let customer = await prisma.customer.findFirst({
      where: { kode: body.cust.kode },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          kode: body.cust.kode,
          name: body.cust.name,
          telp: body.cust.telp,
        },
      });
    }

    const sales = await prisma.sales.create({
      data: {
        kode_transaksi: body.kode_transaksi,
        tgl: new Date(body.tgl),
        subtotal: new Prisma.Decimal(body.subtotal).toFixed(2),
        diskon: new Prisma.Decimal(body.diskon).toFixed(2),
        ongkir: new Prisma.Decimal(body.ongkir).toFixed(2),
        total_bayar: new Prisma.Decimal(body.total_bayar).toFixed(2),
        cust: { connect: { id: customer.id } },
      },
      include: {
        sales_detail: true,
        cust: true,
      },
    });

    const salesDetails = body.sales_detail.map((detail) => ({
      sales_id: sales.id,
      barang_id: parseInt(detail.barang_id),
      harga_bandrol: detail.harga_bandrol,
      qty: parseInt(detail.qty),
      diskon_pct: detail.diskon_pct,
      diskon_nilai: detail.diskon_nilai,
      harga_diskon: detail.harga_diskon,
      total: detail.total,
    }));

    await prisma.salesDet.createMany({
      data: salesDetails,
    });

    return { message: 'Create transaksi sukses', data: sales };
  } catch (error) {
    console.error('Error in createTxService:', error);
    throw error;
  }
};
