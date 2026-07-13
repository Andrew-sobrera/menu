import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/constants/app'
import type { ApiResponse, PublicMenuData } from '@/types/menu'

export class PublicMenuService {
  static async getBySlug(slug: string): Promise<PublicMenuData> {
    const { data } = await apiClient.get<ApiResponse<PublicMenuData>>(
      API_ENDPOINTS.publicMenu(slug),
    )
    return data.data
  }
}
