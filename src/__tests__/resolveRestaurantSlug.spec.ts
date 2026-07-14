import { describe, expect, it } from 'vitest'
import { MENU_HOST, RESTAURANT_SLUG } from '@/constants/app'
import { resolveMenuHost, resolveRestaurantSlug } from '@/utils/resolveRestaurantSlug'

describe('resolveRestaurantSlug', () => {
  it('always returns the fixed restaurant slug', () => {
    expect(resolveRestaurantSlug()).toBe(RESTAURANT_SLUG)
    expect(resolveRestaurantSlug()).toBe('manu')
  })
})

describe('resolveMenuHost', () => {
  it('always returns the fixed menu host', () => {
    expect(resolveMenuHost()).toBe(MENU_HOST)
    expect(resolveMenuHost()).toBe('manu.devchat.shop')
  })
})
