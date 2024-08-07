'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useCreateBarang from '@/hooks/api/barang/useCreateBarang';
import { useFormik } from 'formik';
import FormInput from './FormInput';

const FormBarang = () => {
  const { createBarang } = useCreateBarang();
  
  const { values, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        kode: '',
        nama: '',
        harga: '',
      },
      onSubmit: async (values) => {
        createBarang(values);
      },
    });

  return (
      <div className="mb-20 md:mt-10 mt-2 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl text-slate-600">
              Create Barang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="kode"
                  onChange={handleChange}
                  placeholder=""
                  type="kode"
                  value={values.kode}
                  label="Kode"
                />
                <div>
                  <FormInput
                    name="nama"
                    onChange={handleChange}
                    placeholder=""
                    type='nama'
                    value={values.nama}
                    label="Nama"
                  />
                </div>
                <div>
                  <FormInput
                    name="harga"
                    onChange={handleChange}
                    placeholder=""
                    type='harga'
                    value={values.harga}
                    label="Harga"
                  />
                </div>
                <Button type="submit" className="mt-6 bg-lime-300 hover:bg-lime-200 w-full text-black">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default FormBarang;
