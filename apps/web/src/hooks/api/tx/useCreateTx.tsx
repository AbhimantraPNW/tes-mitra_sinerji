import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axios";
import { IFormTx, Sales } from "@/types/sales.types";
import { AxiosError } from "axios";

const useCreateTx = () => {
  const { toast } = useToast();

  const createTx = async (payload: IFormTx) => {
    try {
      const {
        kode_transaksi,
        tgl,
        subtotal,
        diskon,
        ongkir,
        total_bayar,
        cust,
        sales_detail,
      } = payload;

      await axiosInstance.post<Sales>('/tx', {
        kode_transaksi,
        tgl,
        subtotal,
        diskon,
        ongkir,
        total_bayar,
        cust, 
        sales_detail,
      });

      toast({
        title: 'Sukses',
        description: 'Sukses buat transaksi',
        duration: 5000,
      });

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          duration: 5000,
        });
      }
    }
  };

  return { createTx };
};

export default useCreateTx;
