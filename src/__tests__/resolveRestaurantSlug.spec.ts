import { describe, expect, it } from 'vitest'
import { resolveMenuHost, resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

describe('resolveRestaurantSlug', () => {
  it('uses restaurant subdomain from hostname', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'outro.devchat.shop',
      }),
    ).toBe('outro')
  })

  it('falls back to default slug for reserved subdomains', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'menu.devchat.shop',
      }),
    ).toBe('manu')
  })

  it('falls back to default slug when hostname has no subdomain', () => {
    expect(
      resolveRestaurantSlug({
        hostname: 'localhost',
      }),
    ).toBe('manu')
  })
})

describe('resolveMenuHost', () => {
  it('uses current host when subdomain is valid', () => {
    expect(
      resolveMenuHost({
        hostname: 'churrascaria.devchat.shop',
        host: 'churrascaria.devchat.shop',
      }),
    ).toBe('churrascaria.devchat.shop')
  })

  it('falls back to default host when subdomain is missing', () => {
    expect(
      resolveMenuHost({
        hostname: 'localhost',
        host: 'localhost:5174',
      }),
    ).toBe('manu.devchat.shop')
  })

  it('falls back to default host for reserved subdomains', () => {
    expect(
      resolveMenuHost({
        hostname: 'menu.devchat.shop',
        host: 'menu.devchat.shop',
      }),
    ).toBe('manu.devchat.shop')
  })
})
