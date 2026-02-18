import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_RENDER_BASE_URL;


function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token');
    return data;
  }
  return null;
}



let RenderApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

RenderApi.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default RenderApi;
