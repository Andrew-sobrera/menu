const RESERVED_SUBDOMAINS = new Set(['www', 'admin', 'api', 'app', 'menu', 'staging', 'dev'])

const DEFAULT_SLUG = 'manu'

function getAppDomain(): string {
  return import.meta.env.VITE_APP_DOMAIN ?? 'devchat.shop'
}

function getDefaultSlug(): string {
  return import.meta.env.VITE_DEFAULT_SLUG ?? DEFAULT_SLUG
}

function isOnAppDomain(hostname: string): boolean {
  const appDomain = getAppDomain()

  return hostname === appDomain || hostname.endsWith(`.${appDomain}`)
}

function slugFromHostname(hostname: string): string {
  if (!isOnAppDomain(hostname)) {
    return ''
  }

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

  return getDefaultSlug()
}

export function resolveMenuHost(options?: {
  hostname?: string
  host?: string
}): string {
  const hostname = options?.hostname ?? window.location.hostname
  const hostnameSlug = slugFromHostname(hostname)

  if (hostnameSlug) {
    return options?.host ?? window.location.host
  }

  return `${getDefaultSlug()}.${getAppDomain()}`
}
