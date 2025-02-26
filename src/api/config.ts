import axios from 'axios';
// export const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
export const API_HOST = 'api.b8st.ru';
export const baseUrl = `https://${API_HOST}/`;
export const AXIOS_INSTANCE = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  timeout: 20000,
});
