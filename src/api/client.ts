import axios, { type AxiosInstance } from 'axios'
import { resolveMenuHost } from '@/utils/resolveRestaurantSlug'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config
  }

  config.headers['X-Menu-Host'] = resolveMenuHost()

  return config
})
