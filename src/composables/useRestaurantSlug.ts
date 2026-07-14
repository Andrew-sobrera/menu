import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

export function useRestaurantSlug() {
  const route = useRoute()

  const slug = computed(() =>
    resolveRestaurantSlug({
      routeSlug: route.params.slug,
      search: typeof window !== 'undefined' ? window.location.search : '',
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    }),
  )

  const isValidSlug = computed(() => slug.value.length > 0)

  return { slug, isValidSlug }
}
