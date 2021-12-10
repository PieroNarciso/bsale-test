import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || 'http://localhost:8080'
});

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getProducts = async (query = '', categoryId = null) => {
  const endpoint = categoryId ? `/products/${categoryId}` : '/products';
  const response = await api.get(endpoint, {
    params: {
      query: query
    }
  });
  return response.data;
};

export default api;
