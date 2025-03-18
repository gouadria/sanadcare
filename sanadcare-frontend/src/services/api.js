import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5001', // doit être la bonne URL, ex: https://localhost:5001
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});

// Intercepteur pour supprimer le header Content-Type si les données sont un FormData
apiClient.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    // Axios définira automatiquement le Content-Type avec le boundary approprié
    delete config.headers['Content-Type'];
  }
  return config;
});

const api = {
  get: (endpoint) => apiClient.get(endpoint),
  post: (endpoint, data) => apiClient.post(endpoint, data),
  put: (endpoint, data) => apiClient.put(endpoint, data),
  delete: (endpoint) => apiClient.delete(endpoint)
};

export default api;

