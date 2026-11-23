import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API || 'https://movie-catalog-system-64ez.onrender.com',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
