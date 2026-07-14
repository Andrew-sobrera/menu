import { computed } from 'vue'

const RESERVED_SUBDOMAINS = new Set(['www', 'admin', 'api', 'app', 'menu', 'staging', 'dev'])

export function useRestaurantSlug() {
  const slug = computed(() => {
    const override = import.meta.env.VITE_DEFAULT_SLUG
    const hostname = window.location.hostname
    const parts = hostname.split('.')

    if (parts.length < 3) {
      return override ?? ''
    }

    const subdomain = parts[0]?.toLowerCase() ?? ''

    if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) {
      return override ?? ''
    }

    return subdomain
  })

  const isValidSlug = computed(() => slug.value.length > 0)

  return { slug, isValidSlug }
}
