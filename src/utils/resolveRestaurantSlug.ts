const RESERVED_SUBDOMAINS = new Set(['www', 'admin', 'api', 'app', 'menu', 'staging', 'dev'])

function normalizeSlug(value: string | null | undefined): string {
  if (!value) return ''
  return value.trim().toLowerCase()
}

function isReservedSlug(value: string): boolean {
  return RESERVED_SUBDOMAINS.has(value)
}

function slugFromRouteOrQuery(value: string | null | undefined): string {
  const slug = normalizeSlug(value)
  if (!slug || isReservedSlug(slug)) {
    return ''
  }
  return slug
}

function slugFromHostname(hostname: string): string {
  const parts = hostname.split('.')

  if (parts.length < 3) {
    return ''
  }

  const subdomain = parts[0]?.toLowerCase() ?? ''

  if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) {
    return ''
  }

  return subdomain
}

export function resolveRestaurantSlug(options?: {
  routeSlug?: string | string[] | null
  search?: string
  hostname?: string
  defaultSlug?: string
}): string {
  const routeSlug = Array.isArray(options?.routeSlug)
    ? options?.routeSlug[0]
    : options?.routeSlug

  const querySlug = new URLSearchParams(options?.search ?? window.location.search).get('slug')
  const hostnameSlug = slugFromHostname(options?.hostname ?? window.location.hostname)
  const defaultSlug = options?.defaultSlug ?? import.meta.env.VITE_DEFAULT_SLUG

  return (
    slugFromRouteOrQuery(routeSlug)
    || slugFromRouteOrQuery(querySlug)
    || hostnameSlug
    || slugFromRouteOrQuery(defaultSlug)
  )
}
