import { computed } from 'vue'

const RESERVED_SUBDOMAINS = new Set(['www', 'admin', 'api', 'app', 'staging', 'dev'])

export function useRestaurantSlug() {
  const slug = computed(() => {
    const override = import.meta.env.VITE_DEFAULT_SLUG
    if (override) return override

    const hostname = window.location.hostname
    const parts = hostname.split('.')

    if (parts.length < 3) {
      return ''
    }

    const subdomain = parts[0]?.toLowerCase() ?? ''

    if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) {
      return ''
    }

    return subdomain
  })

  const isValidSlug = computed(() => slug.value.length > 0)

  return { slug, isValidSlug }
}
