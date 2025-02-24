import axios, { AxiosError, type AxiosRequestConfig } from "axios";


export const AXIOS_INSTANCE = axios.create({
  baseURL: "https://api.b8st.ru/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const promise = AXIOS_INSTANCE(config).then(({ data }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;