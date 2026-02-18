import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;


function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token');
    return data;
  }
  return null;
}

let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

Api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    console.log("API Request Config:", {
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      token: token
    });
    if (token !== null && token !== "null" && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("API Request Error Details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export default Api;
