import { describe, expect, it, vi } from 'vitest'
import { resolveMenuHost, resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

describe('resolveRestaurantSlug', () => {
  it('uses restaurant subdomain from hostname', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'teste.devchat.shop',
      }),
    ).toBe('teste')
  })

  it('ignores reserved subdomains from hostname', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'menu.devchat.shop',
      }),
    ).toBe('')
  })

  it('uses VITE_MENU_HOST in development when hostname is localhost', () => {
    vi.stubEnv('DEV', true)
    vi.stubEnv('VITE_MENU_HOST', 'teste.devchat.shop')

    expect(
      resolveRestaurantSlug({
        hostname: 'localhost',
      }),
    ).toBe('teste')

    vi.unstubAllEnvs()
  })
})

describe('resolveMenuHost', () => {
  it('uses VITE_MENU_HOST in development', () => {
    vi.stubEnv('DEV', true)
    vi.stubEnv('VITE_MENU_HOST', 'teste.devchat.shop')

    expect(resolveMenuHost()).toBe('teste.devchat.shop')

    vi.unstubAllEnvs()
  })
})
