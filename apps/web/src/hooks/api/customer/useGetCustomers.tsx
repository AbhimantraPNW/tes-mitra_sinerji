'use client'

import { axiosInstance } from '@/lib/axios';
import { Customer } from '@/types/customer.types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetCustomers = () => {
  const [data, setData] = useState<Customer[]>([]);

  const getCustomers = async () => {
    try {
      const { data } = await axiosInstance.get('/customer');

      setData(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
       console.log(error.response?.data)
      }
    }
  };

  useEffect(() => {
    getCustomers()
  }, [])
  return { data };
};

export default useGetCustomers;
