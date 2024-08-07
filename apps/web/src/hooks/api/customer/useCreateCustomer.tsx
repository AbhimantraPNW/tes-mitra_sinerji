import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { Customer } from '@/types/customer.types';
import { AxiosError } from 'axios';

interface CustomerBody extends Omit<Customer, 'id'> {
    kode: string;
    name: string;
    telp: string
}

const useCreateCustomer = () => {
  const { toast } = useToast();

  const createCustomer = async (payload: CustomerBody) => {
    try {
      await axiosInstance.post('/customer', payload);

      toast({
        title: 'Sukses',
        description: 'Sukses buat data customer',
        duration: 5000,
      });

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: error.response?.data,
          duration: 5000,
        });
      }
    }
  };

  return { createCustomer };
};

export default useCreateCustomer;
