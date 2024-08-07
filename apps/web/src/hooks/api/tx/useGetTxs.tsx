'use client';

import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.types';
import { Sales } from '@/types/sales.types';
import { useEffect, useState } from 'react';

interface IGetTxsQueries extends IPaginationQueries {
  search?: string;
}

const useGetTxs = (query: IGetTxsQueries) => {
  const [data, setData] = useState<Sales[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);

  const getTxs = async () => {
    try {
      const { data } = await axiosInstance.get('/tx', { params: query });

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTxs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.search]);

  return { data, meta };
};

export default useGetTxs;
