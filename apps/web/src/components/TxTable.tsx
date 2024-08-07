'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetTxs from '@/hooks/api/tx/useGetTxs';
import { format } from 'date-fns';
import { useState } from 'react';
import Pagination from './Pagination';

const TxTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: tx, meta } = useGetTxs({ page, take: 5 });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const filteredData = tx.filter((trans) =>
    trans.kode_transaksi.includes(search),
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const formatNumber = (number: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const totalQty = (salesDetail: any[]) => {
   return salesDetail.reduce((total, transaction) => total + transaction.qty, 0)
  }

  return (
    <section className="padding-container max-container">
      {/* Fitur Search */}

      <div className="flex flex-row justify-between mb-5 mt-5">
        <h1 className="text-left font-semibold">DAFTAR TRANSAKSI</h1>
        <div className="flex justify-end gap-2 ">
          <label htmlFor="name" className="mt-3 md:mt-0">Cari</label>
          <input
            id="search"
            name="name"
            className="border border-black md:w-72 w-44 outline-none"
            placeholder="INPUT NO.TRANSAKSI"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-amber-100">
          <TableRow className="divide-x divide-y divide-black border border-black">
            <TableHead className="w-[80px] font-semibold">No</TableHead>
            <TableHead className="w-[200px] font-semibold">
              No Transaksi
            </TableHead>
            <TableHead className="w-[200px] font-semibold">Tanggal</TableHead>
            <TableHead className="w-[200px] font-semibold">
              Nama Customer
            </TableHead>
            <TableHead className="w-[200px] font-semibold">
              Jumlah Barang
            </TableHead>
            <TableHead className="w-[200px] font-semibold">Sub Total</TableHead>
            <TableHead className="w-[200px] font-semibold">Diskon</TableHead>
            <TableHead className="w-[200px] font-semibold">Ongkir</TableHead>
            <TableHead className="w-[200px] font-semibold">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-x divide-y divide-black border border-black">
          {filteredData.map((trans, i) => (
            <TableRow
              className="divide-x divide-y divide-black border border-black"
              key={i}
            >
              <TableCell className="font-medium">{trans.id}</TableCell>
              <TableCell>{trans.kode_transaksi}</TableCell>
              <TableCell>
                {format(new Date(trans.tgl), 'dd MMMM yyyy')}
              </TableCell>
              <TableCell>{trans.cust?.name}</TableCell>
              <TableCell>
                {totalQty(trans.sales_detail)}
              </TableCell>
              <TableCell>{formatNumber(trans.subtotal)}</TableCell>
              <TableCell>{formatNumber(trans.diskon)}</TableCell>
              <TableCell>{formatNumber(trans.ongkir)}</TableCell>
              <TableCell>{formatNumber(trans.total_bayar)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-20 text-right w-full bg-slate-200">
        <h1 className="font-semibold md:mr-36 mr-20 whitespace-nowrap">
          Grand Total
        </h1>
        <h1 className="md:mr-28 mr-3 font-semibold">
          {formatNumber(meta?.totalBayar)}
        </h1>
      </div>

      <div className="w-10">
        <Pagination
          total={meta?.total as number}
          take={meta?.take as number}
          onChangePage={handleChangePaginate}
        />
      </div>
    </section>
  );
};

export default TxTable;
