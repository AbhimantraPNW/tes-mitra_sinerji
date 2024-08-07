'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetBarangs from '@/hooks/api/barang/useGetBarangs';
import useCreateTx from '@/hooks/api/tx/useCreateTx';
import { IFormTx } from '@/types/sales.types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useFormContext } from './FormContext';
import FormInputCust from './FormInputCust';
import FormTotalHarga from './FormTotalHarga';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function SalesForm() {
  const { formData, updateFormData } = useFormContext() || {
    formData: {},
    updateFormData: () => {},
  };
  const { createTx } = useCreateTx();
  const { data: barang } = useGetBarangs();
  const [edit, setEdit] = useState<string | null>(null);

  const kodeBarangOptions = barang?.map((item, i) => (
    <option key={i} value={item.id}>
      {item.kode}
    </option>
  ));

  const namaBarangOptions = barang?.map((item, i) => (
    <option key={i} value={item.id}>
      {item.nama}
    </option>
  ));

  const formatNumber = (number: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const [rows, setRows] = useState([
    { no: '1', kodeBarang: '', barang_id: 0, qty: 1, harga_bandrol: '', diskon_pct: '', diskon_nilai: '', harga_diskon: '', total: '' },
  ]);

  const addRows = () => {
    setRows([ ...rows, { no: (rows.length + 1).toString(),  kodeBarang: '',  barang_id: 0, qty: 1, harga_bandrol: '', diskon_pct: '', diskon_nilai: '', harga_diskon: '',    total: '' }]);
  };

  const resetRow = () => {
    resetForm();
    setRows([{ no: '1', kodeBarang: '', barang_id: 0, qty: 1, harga_bandrol: '', diskon_pct: '', diskon_nilai: '', harga_diskon: '', total: '' }]);
    window.location.reload();
  };

  const editRow = (id: string) => {
    setEdit(edit === id ? null : id);
  };

  const deleteRow = (id: string) => {
    setRows((prevRow) => prevRow.filter((row) => row.no !== id));
  };

  const handleRowChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };

    // Cek apakah kode barang atau barang id sesuai dengan harga
    if (
      field === 'kodeBarang' ||
      field === 'namaBarang' ||
      field === 'barang_id'
    ) {
      const selectedBarang = barang.find((item) => item.id === Number(value));
      if (selectedBarang) {
        newRows[index].harga_bandrol = selectedBarang.harga.toString();
        newRows[index].barang_id = selectedBarang.id;
        setFieldValue(
          `sales_detail.${index}.harga_bandrol`,
          selectedBarang.harga,
        );
      }
    }

    // Akumulasi diskon nilai
    if (field === 'diskon_pct') {
      const diskonPersen = Number(value) / 100;
      const hargaBandrol = Number(newRows[index].harga_bandrol);
      const diskonNilai = diskonPersen * hargaBandrol;
      newRows[index].diskon_nilai = diskonNilai.toString();
      setFieldValue(`sales_detail.${index}.diskon_nilai`, diskonNilai);

      if (diskonPersen === 0) {
        newRows[index].diskon_nilai = '0';
        setFieldValue(`sales_detail.${index}.diskon_nilai`, '0');
      }

      const qty = newRows[index].qty

      // Harga diskon
      let hargaDiskon = hargaBandrol - diskonNilai;
      newRows[index].harga_diskon = hargaDiskon.toString();
      let total = hargaDiskon * qty
      newRows[index].total = total.toString();  
      setFieldValue(`sales_detail.${index}.harga_diskon`, hargaDiskon);
      setFieldValue(`sales_detail.${index}.total`, total);
    }

    // Total harga
    if (field === 'qty') {
      let qty = Number(value);
      if (qty < 1) {
        qty = 1;
      }
      const hargaDiskon = Number(newRows[index].harga_diskon);
      const totalHarga = hargaDiskon * qty;
      newRows[index].total = totalHarga.toString();
      setFieldValue(`sales_detail.${index}.total`, totalHarga);
      setFieldValue(`sales_detail.${index}.qty`, qty);
    }

    setRows(newRows);
    setFieldValue(`sales_detail.${index}.${field}`, value);
  };

  const handleInputChange =
    (index: number, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleRowChange(index, field, e.target.value);
    };

  // Submit tx state
  const { values, handleSubmit, setFieldValue, resetForm } = useFormik<IFormTx>(
    {
      initialValues: {
        kode_transaksi: formData?.salesHeader?.kode_transaksi || '',
        tgl: formData?.salesHeader?.tgl || '',
        subtotal: formData?.totalNilai?.subtotal || '',
        diskon: formData?.totalNilai?.diskon || '',
        ongkir: formData?.totalNilai?.ongkir || '',
        total_bayar: formData?.totalNilai?.total_bayar || '',
        cust: {
          kode: formData?.cust?.kode || '',
          name: formData?.cust?.name || '',
          telp: formData?.cust?.telp || '',
        },
        sales_detail: rows,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        createTx({ ...values });
      },
    },
  );  

  // Save dependency sales_detail values
  useEffect(() => {
    setFieldValue(`sales_detail`, rows);
  }, [rows, formData, setFieldValue]);


  // Save dependency diskon, total, ongkir & subtotal
  useEffect(() => {
    const subtotal = rows.reduce((sum, row) => sum + Number(row.total), 0);
    const diskon = Number(formData.totalNilai.diskon)
    const ongkir = Number(formData.totalNilai.ongkir)
    const total_bayar = subtotal - diskon + ongkir;

    if (
      subtotal !== Number(formData?.totalNilai?.subtotal) ||
      diskon !== Number(formData?.totalNilai?.diskon) ||
      ongkir !== Number(formData?.totalNilai?.ongkir) ||
      total_bayar !== Number(formData?.totalNilai?.total_bayar)
    ) {
      updateFormData({
        ...formData,
        totalNilai: {
          subtotal: subtotal.toString(),
          diskon: diskon.toString(),
          ongkir: ongkir.toString(),
          total_bayar: total_bayar.toString(),
        },
      });
    }
  }, [rows, formData, updateFormData]);

  return (
    <section className='mt-5 padding-container max-container'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-xl font-semibold mb-5'>Form Input</h1>
        <FormInputCust />
        <Table className="border boder-black mt-10">
          <TableHeader>
            <TableRow className="divide-x divide-y divide-black">
              <TableHead
                className="bg-slate-200 border border-black text-center cursor-pointer hover:bg-slate-300"
                onClick={addRows}
              >
                Tambah
              </TableHead>
              <TableHead className="text-center font-semibold">No</TableHead>
              <TableHead className="text-center max-w-[100px] font-semibold">
                Kode Barang
              </TableHead>
              <TableHead className="text-center font-semibold">Nama Barang</TableHead>
              <TableHead className="text-center text-red-500 font-semibold">
                Qty
              </TableHead>
              <TableHead className="text-center font-semibold">Harga Bandrol</TableHead>
              <TableHead className="text-center px-0 relative font-semibold">
                Diskon
                <Separator className="border-t border-black w-full" />
                <div className="flex divide-x divide-black md:h-5 h-6">
                  <div className="md:w-1/3 w-12 md:ml-0 ml-2">
                    <span className="flex-1 text-center text-red-500 font-semibold">
                      %
                    </span>
                  </div>
                  <div className="flex1 w-2/3 mr-3 h-7">
                    <span className="flex-1 mr-4 text-center h-12">Rp</span>
                  </div>
                </div>
              </TableHead>
              <TableHead className="text-center font-semibold">Harga Diskon</TableHead>
              <TableHead className="text-center font-semibold">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border border-black text-center">
            {rows.map((row, i) => (
              <TableRow key={i} className="divide-x divide-black divide-y">
                <TableCell className="bg-slate-200 cursor-pointer relative w-32 ">
                  <div className="flex flex-row items-center divide-x divide-black ">
                    <div className="flex-1 text-center left-0 absolute h-14 mt-1 mb-1 w-1/2">
                      {edit === row.no? (
                        <span
                          className="absolute top-4 md:left-2 left-0 text-xs md:text-sm hover:underline"
                          onClick={() => editRow(row.no)}
                        >
                          Simpan
                        </span>
                      ) : (
                        <span
                          className="absolute top-4 md:left-3 left-1 text-xs md:text-sm hover:underline"
                          onClick={() => editRow(row.no)}
                        >
                          Ubah
                        </span>
                      )}
                      <Separator className="border-t border-black" />
                    </div>
                    <div
                      className="flex-1 text-center right-0 absolute h-14 mt-1 mb-1 w-1/2"
                      onClick={() => deleteRow(row.no)}
                    >
                      <span className="absolute top-4 md:right-3 right-1 text-xs md:text-sm hover:underline">
                        Hapus
                      </span>
                      <Separator className="border-t border-black" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-10">{row.no}</TableCell>
                <TableCell className="w-48">
                  {edit !== row.no ? (
                    <input
                      className="w-full"
                      value={
                        barang.find((item) => item.id === row.barang_id)?.kode
                      }
                      disabled
                    />
                  ) : (
                    <select
                      className="w-full"
                      value={row.kodeBarang}
                      onChange={handleInputChange(i, 'kodeBarang')}
                    >
                      <option value="">Pilih Kode Barang</option>
                      {kodeBarangOptions}
                    </select>
                  )}
                </TableCell>
                <TableCell className="w-48 px-10 md:px-0">
                  {edit !== row.no ? (
                    <select className="md:w-full w-32 text-center" value={row.barang_id} disabled>
                      <option value="">Nama Barang</option>
                      {namaBarangOptions}
                    </select>
                  ) : (
                    <input
                      className="md:w-full w-20 text-center"
                      value={
                        barang.find((item) => item.id === row.barang_id)?.nama
                      }
                      disabled
                    />
                  )}
                </TableCell>
                <TableCell className="w-10">
                  <input
                    type="number"
                    className="w-10 text-center outline-none"
                    value={row.qty}
                    onChange={handleInputChange(i, 'qty')}
                    min={1}
                  />
                </TableCell>
                <TableCell className="w-10">
                  <input
                    type="text"
                    className="max-w-[100px] text-center outline-none"
                    value={formatNumber(row.harga_bandrol)}
                    readOnly
                  />
                </TableCell>
                <TableCell className="px-0 w-32 relative">
                  {/* Column Discount */}
                  <div className="divide-x divide-black">
                    <div className="flex-1 absolute top-0 md:left-0 text-left h-20 items-center">
                      {edit !== row.no ? (
                        <input
                          className="absolute top-4 max-w-[50px] outline-none text-center"
                          type="number"
                          value={row.diskon_pct}
                          disabled
                        />
                      ) : (
                        <input
                          className="absolute top-4 md:left-2 left-2 max-w-[30px] outline-none text-center"
                          type="number"
                          placeholder="%"
                          min={0}
                          max={100}
                          value={row.diskon_pct}
                          onChange={handleInputChange(i, 'diskon_pct')}
                        />
                      )}
                    </div>
                    <div className="flex-1 text-center absolute top-0 right-1 md:w-2/3 w-14 h-full">
                      <input
                        className="absolute top-4 md:left-2 left-1 max-w-[50px] md:max-w-[70px] text-center outline-none"
                        type="text"
                        value={formatNumber(row.diskon_nilai)}
                        readOnly
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-10">
                  <input
                    type="text"
                    className="max-w-[100px] text-center outline-none"
                    value={formatNumber(row.harga_diskon)}
                    readOnly
                  />
                </TableCell>
                <TableCell className="w-5">
                  <input
                    type="text"
                    className="max-w-[150px] text-center outline-none"
                    value={formatNumber(row.total)}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Transaksi */}
        <FormTotalHarga />

        {/* Handle Save or Cancel */}
        <div className="flex justify-center md:gap-36 gap-16 mt-16">
          <Button
            className="rounded-none bg-lime-300 border-black border"
            type="submit"
          >
            Simpan
          </Button>
          <Button
            type="button"
            className="rounded-none bg-slate-300 border-black border px-6"
            onClick={resetRow}
          >
            Batal
          </Button>
        </div>
      </form>
    </section>
  );
}
