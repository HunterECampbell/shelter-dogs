import axios, { AxiosInstance } from "axios";

export function setupAxios(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: "",
  });

  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
}
