'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useCreateCustomer from '@/hooks/api/customer/useCreateCustomer';
import { useFormik } from 'formik';
import FormInput from './FormInput';

const FormCust = () => {
  const { createCustomer } = useCreateCustomer();
  
  const { values, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        kode: '',
        name: '',
        telp: '',
      },
      onSubmit: async (values) => {
        createCustomer(values);
      },
    });

  return (
      <div className="mb-20 mt-10 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl text-slate-600">
              Create Data Customer
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
                    name="name"
                    onChange={handleChange}
                    placeholder=""
                    type='nama'
                    value={values.name}
                    label="Nama"
                  />
                </div>
                <div>
                  <FormInput
                    name="telp"
                    onChange={handleChange}
                    placeholder=""
                    type='notelp'
                    value={values.telp}
                    label="No. Telp"
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

export default FormCust;
