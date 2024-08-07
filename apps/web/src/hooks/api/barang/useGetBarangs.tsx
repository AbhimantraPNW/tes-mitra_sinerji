import { axiosInstance } from '@/lib/axios';
import { Barang } from '@/types/barang.types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetBarangs = () => {
  const [data, setData] = useState<Barang[]>([]);

  const getBarangs = async () => {
    try {
      const { data } = await axiosInstance.get('/barang');

      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBarangs();
  }, []);
  return { data };
};

export default useGetBarangs;
