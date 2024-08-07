import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.types';
import { Prisma } from '@prisma/client';

interface GetTxQuery extends PaginationQueryParams {
  search: string;
}

export const getTxService = async (query: GetTxQuery) => {
  const { take, page, sortBy, sortOrder, search } = query;

  const whereClause: Prisma.SalesWhereInput = {
    kode_transaksi: { contains: search },
  };

  const tx = await prisma.sales.findMany({
    where: whereClause,
    skip: (page - 1) * take,
    take: take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: { cust: true, sales_detail: true }
  })

  const txPageCount = await prisma.sales.count({
    where: whereClause,
  });

  const txTotalBayarCount = await prisma.sales.aggregate({
    _sum: {
      total_bayar: true,
    },
    where: whereClause,
  });

  return {
    data: tx,
    meta: {
      page,
      take,
      total: txPageCount,
      totalBayar: txTotalBayarCount._sum.total_bayar,
    },
  };
};
