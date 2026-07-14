import { describe, expect, it } from 'vitest'
import { resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

describe('resolveRestaurantSlug', () => {
  it('uses route slug when present', () => {
    expect(
      resolveRestaurantSlug({
        routeSlug: 'churrascaria-gaucha',
        hostname: 'menu.devchat.shop',
        defaultSlug: '',
      }),
    ).toBe('churrascaria-gaucha')
  })

  it('ignores reserved subdomains from hostname', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'menu.devchat.shop',
        defaultSlug: 'churrascaria-gaucha',
      }),
    ).toBe('churrascaria-gaucha')
  })

  it('uses restaurant subdomain from hostname', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'churrascaria-gaucha.devchat.shop',
        defaultSlug: '',
      }),
    ).toBe('churrascaria-gaucha')
  })

  it('returns empty when no slug can be resolved', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'menu.devchat.shop',
        defaultSlug: '',
      }),
    ).toBe('')
  })

  it('ignores reserved route slugs and falls back to default', () => {
    expect(
      resolveRestaurantSlug({
        routeSlug: 'menu',
        hostname: 'localhost',
        defaultSlug: 'menu',
      }),
    ).toBe('menu')
  })
})
