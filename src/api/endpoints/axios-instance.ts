import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { AXIOS_INSTANCE } from '../config';


let stopRequests = false;
AXIOS_INSTANCE.interceptors.request.use(async function (config) {
  if (stopRequests) {
    return Promise.reject(
      new axios.Cancel('Requests stopped due to 426 status code.'),
    );
  }
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 426) {
      stopRequests = true;
      console.debug('Received 426 status code. Stopping further requests.');
    }
    return Promise.reject(error);
  },
);

export const requestInstance = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }: { data: any }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;