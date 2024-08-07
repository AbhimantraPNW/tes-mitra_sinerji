import { appConfig } from '@/utils/config';
import axios, { AxiosInstance } from 'axios';

const { baseUrl } = appConfig;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});
