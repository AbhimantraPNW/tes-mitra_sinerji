import React, { useEffect } from 'react';
import { useFormContext } from './FormContext';

const FormTotalHarga = () => {
  const { formData, updateFormData } = useFormContext() || {
    formData: {},
    updateFormData: () => {},
  };

  const formatNumber = (number: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      totalNilai: {
        ...formData.totalNilai,
        [name]: value
      },
    });
  };

  useEffect(() => {
  }, [formData, updateFormData])
  
  return (
    <div className="flex flex-row gap-10 font-semibold mt-10 justify-end md:mr-40 mr-12">
      <div className="flex flex-col">
        <span>Subtotal</span>
        <span>Diskon</span>
        <span>Ongkir</span>
        <span>Bayar</span>
      </div>

      <div className="flex flex-col">
        <span>
          <input
            id="subTotal"
            type="text"
            name="subtotal"
            className="border border-black outline-none text-right"
            value={formatNumber(formData?.totalNilai?.subtotal)}
            onChange={handleChange}
          />
        </span>
        <span>
          <input
            id="diskon"
            type="text"
            name="diskon"
            className="border border-black outline-none text-right"
            value={formData.totalNilai?.diskon}
            onChange={handleChange}
          />
        </span>
        <span>
          <input
            id="ongkir"
            type="text"
            name="ongkir"
            className="border border-black outline-none text-right"
            value={formData.totalNilai?.ongkir}
            onChange={handleChange}
          />
        </span>
        <span>
          <input
            id="totalHarga"
            type="text"
            name="total_bayar"
            className="border border-black outline-none text-right"
            value={formatNumber(formData.totalNilai?.total_bayar)}
            onChange={handleChange}
          />
        </span>
      </div>
    </div>
  );
};

export default FormTotalHarga;
