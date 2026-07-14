import { computed } from 'vue'
import { resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

export function useRestaurantSlug() {
  const slug = computed(() => resolveRestaurantSlug())
  const isValidSlug = computed(() => slug.value.length > 0)

  return { slug, isValidSlug }
}
