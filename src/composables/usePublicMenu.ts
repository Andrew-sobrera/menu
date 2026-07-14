import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { PublicMenuService } from '@/services/PublicMenuService'
import { useRestaurantSlug } from '@/composables/useRestaurantSlug'

export const publicMenuKeys = {
  all: (slug: string) => ['public-menu', slug] as const,
}

export function usePublicMenu() {
  const { slug, isValidSlug } = useRestaurantSlug()

  const menuQuery = useQuery({
    queryKey: computed(() => publicMenuKeys.all(slug.value || 'unknown')),
    queryFn: () => PublicMenuService.getBySlug(slug.value),
    enabled: computed(() => slug.value.length > 0),
    retry: 1,
  })

  const sections = computed(() => {
    const data = menuQuery.data.value
    if (!data) return []

    return [...data.categories]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => ({
        category,
        products: data.products
          .filter((product) => product.categoryId === category.id)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
      }))
  })

  return {
    slug,
    isValidSlug,
    menuQuery,
    sections,
  }
}
