'use client';

import React, { createContext, useContext, useState } from 'react';

interface SalesHeaderFormDataProps {
  kode_transaksi: string;
  tgl: string;
}

interface FormTotalDataProps {
  subtotal: string;
  diskon: string;
  ongkir: string;
  total_bayar: string;
}

interface CustDataProps {
  kode: string;
  name: string;
  telp: string;
}

interface SalesDetailProps {
  barang_id: number;
  harga_bandrol: string;
  qty: number;
  diskon_pct: string;
  diskon_nilai: string;
  harga_diskon: string;
  total: string;
}

interface FormData {
  salesHeader: SalesHeaderFormDataProps;
  cust: CustDataProps;
  totalNilai: FormTotalDataProps;
  salesDetail: SalesDetailProps[];
}

interface FormContextType {
  formData: FormData | any;
  updateFormData: (newData: Partial<FormData>) => void;
}

interface FormContextProps {
  children: React.ReactNode;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: FormContextProps) {
  const [formData, setFormData] = useState<FormData>({
    salesHeader : {
      kode_transaksi: '',
      tgl: '',
    },
    cust: {
      kode: '',
      name: '',
      telp: '',
    },
    totalNilai: {
      subtotal: '',
      diskon: '',
      ongkir: '',
      total_bayar: '',
    },
    salesDetail: [{
      barang_id: 0,
      harga_bandrol: '',
      qty: 0,
      diskon_pct: '',
      diskon_nilai: '',
      harga_diskon: '',
      total: ''
    }],
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
