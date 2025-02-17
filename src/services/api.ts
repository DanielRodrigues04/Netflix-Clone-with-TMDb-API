import axios from 'axios';

const API_KEY = '1f54bd990f1cdfb230adb312546d765d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const getMovies = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};