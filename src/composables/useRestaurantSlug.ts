import { computed } from 'vue'
import { resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

export function useRestaurantSlug() {
  const slug = computed(() =>
    resolveRestaurantSlug({
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    }),
  )

  const isValidSlug = computed(() => slug.value.length > 0)

  return { slug, isValidSlug }
}
