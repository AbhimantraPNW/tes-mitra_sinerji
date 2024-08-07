import FormBarang from '@/components/FormBarang';
import { FormProvider } from '@/components/FormContext';
import FormCust from '@/components/FormCust';
import { SalesForm } from '@/components/SalesForm';
import TxTable from '@/components/TxTable';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <div className="flex md:flex-row padding-container md:gap-24 gap-0 max-container flex-col">
        <h1 className="text-xl font-semibold">Form Data</h1>
        <FormCust />
        <FormBarang />
      </div>
      <Separator className="border border-slate-400" />
      <FormProvider>
        <SalesForm />
      </FormProvider>
      <Separator className="border border-slate-400 mt-5 mb-10" />
      <TxTable />
    </>
  );
}
