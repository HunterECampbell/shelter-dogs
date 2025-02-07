import axios, { AxiosInstance } from "axios";

export function setupAxios(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: "https://frontend-take-home-service.fetch.com",
  });

  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
}
