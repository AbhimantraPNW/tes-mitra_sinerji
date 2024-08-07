import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { Barang } from '@/types/barang.types';
import { AxiosError } from 'axios';

interface BarangBody extends Omit<Barang, 'id'> {}

const useCreateBarang = () => {
  const { toast } = useToast();

  const createBarang = async (payload: BarangBody) => {
    try {
      await axiosInstance.post('/barang', payload);

      toast({
        title: 'Sukses',
        description: 'Sukses buat barang',
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

  return { createBarang };
};

export default useCreateBarang;
