const RESERVED_SUBDOMAINS = new Set(['www', 'admin', 'api', 'app', 'menu', 'staging', 'dev'])

function normalizeSlug(value: string | null | undefined): string {
  if (!value) return ''
  return value.trim().toLowerCase()
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
  hostname?: string
}): string {
  const hostname = options?.hostname ?? window.location.hostname
  const hostnameSlug = slugFromHostname(hostname)

  if (hostnameSlug) {
    return hostnameSlug
  }

  const devHost = import.meta.env.VITE_MENU_HOST

  if (import.meta.env.DEV && devHost) {
    return slugFromHostname(devHost)
  }

  return ''
}

export function resolveMenuHost(): string {
  if (import.meta.env.DEV && import.meta.env.VITE_MENU_HOST) {
    return import.meta.env.VITE_MENU_HOST
  }

  return window.location.host
}
