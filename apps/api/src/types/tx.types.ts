import { Prisma } from "@prisma/client";

export interface CreateTxBody {
    kode_transaksi: string;
    tgl: Date;
    subtotal: Prisma.Decimal;
    diskon: Prisma.Decimal;
    ongkir: Prisma.Decimal;
    total_bayar: Prisma.Decimal;
    cust: {
      kode: string;
      name: string;
      telp: string;
    };
    sales_detail: Array<{
      barang_id: any;
      harga_bandrol: Prisma.Decimal;
      qty: any;
      diskon_pct?: Prisma.Decimal;
      diskon_nilai?: Prisma.Decimal;
      harga_diskon?: Prisma.Decimal;
      total: Prisma.Decimal;
    }>;
  }