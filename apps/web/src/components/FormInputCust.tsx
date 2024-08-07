import useGetCustomers from '@/hooks/api/customer/useGetCustomers';
import { useFormContext } from './FormContext';
import { useEffect, useState } from 'react';
import useGetTxs from '@/hooks/api/tx/useGetTxs';

type Customer = {
  kode: string;
  name: string;
  telp: string;
};

const FormInputCust = () => {
  const [filteredCust, setFilteredCust] = useState<Customer[]>([]);
  const [show, setShow] = useState(false);
  const { data: customers } = useGetCustomers();
  const { data: tx } = useGetTxs({});
  const { formData, updateFormData } = useFormContext() || {
    formData: {},
    updateFormData: () => {},
  };

  const generateKodeTrans = () => {
    const lastKodeTx = tx[tx.length - 1]?.kode_transaksi;
    const numericPart = parseInt(lastKodeTx?.replace(/\D/g, ''), 10);
    const newKodeTx = `${(numericPart + 1).toString().padStart(2, '')}`;
    return newKodeTx;
  };

  useEffect(() => {
    updateFormData({
      ...formData,
      salesHeader: {
        ...formData.salesHeader,
        kode_transaksi: generateKodeTrans(),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      salesHeader: {
        ...formData.salesHeader,
        [name]: value,
      },
      cust: {
        ...formData.cust,
        [name]: value,
      },
    });

    if (name === 'kode') {
      const filtered = customers.filter((cust) =>
        cust.kode.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCust(filtered);
      setShow(true);
    }
  };

  const handleSelectCust = (cust: any) => {
    updateFormData({
      ...formData,
      cust: {
        kode: cust.kode,
        name: cust.name,
        telp: cust.telp,
      },
    });
    setShow(false);
  };

  return (
    <section className="md:max-w-[450px] max-w-[300px]">
      {/* Transaksi */}
      <div className="bg-slate-200 font-semibold">
        <span>Transaksi</span>
      </div>

      <div className="max-w-[300px]">
        <div className="flex flex-row justify-between">
          <label htmlFor="kode_transaksi">No</label>
          <input
            id="kode_transaksi"
            name="kode_transaksi"
            className="border border-black max-w-[150px] outline-none"
            type="text"
            value={formData.salesHeader.kode_transaksi}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="tgl">Tanggal</label>
          <input
            id="tgl"
            name="tgl"
            className="border border-black max-w-[150px] pl-5 outline-none"
            type="date"
            value={formData?.salesHeader.tgl}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Customer */}
      <div className="bg-slate-200 mt-4 font-semibold">
        <span>Customer</span>
      </div>

      <div className="md:max-w-[298px] max-w-[300px] relative">
        <div className="flex flex-row justify-between">
          <label htmlFor="kode">Kode</label>
          <input
            id="kode"
            name="kode"
            className="border border-black w-36 h-6 mr-0 md:mr-1 outline-none"
            value={formData?.cust?.kode}
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </div>
      </div>

      {show && filteredCust.length > 0 && (
        <div className="absolute left-36 z-10 mt-1 w-76 bg-white border border-gray-300 max-h-40 overflow-y-auto">
          {filteredCust.map((cust: any, i) => (
            <div
              key={i}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleSelectCust(cust)}
            >
              {cust.kode} - {cust.name}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-row justify-between">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="border border-black md:w-2/3 w-36 outline-none"
          type="text"
          value={formData?.cust?.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row justify-between max-w-[300px]">
        <label htmlFor="telp">Telp</label>
        <input
          id="telp"
          name="telp"
          className="border border-black md:max-w-[150px] max-w-[143px] outline-none"
          type="text"
          value={formData?.cust?.telp}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default FormInputCust;
