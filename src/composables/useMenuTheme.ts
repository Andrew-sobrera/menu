import { computed, watchEffect, type Ref } from 'vue'
import type { MenuAppearance } from '@/types/menu'

function darkenColor(hex: string, amount = 0.15): string {
  const normalized = hex.replace('#', '')
  if (normalized.length !== 6) return hex

  const r = Math.max(0, parseInt(normalized.slice(0, 2), 16) * (1 - amount))
  const g = Math.max(0, parseInt(normalized.slice(2, 4), 16) * (1 - amount))
  const b = Math.max(0, parseInt(normalized.slice(4, 6), 16) * (1 - amount))

  return `#${[r, g, b].map((value) => Math.round(value).toString(16).padStart(2, '0')).join('')}`
}

export function useMenuTheme(appearance: Ref<MenuAppearance | undefined>) {
  const themeVars = computed(() => {
    const config = appearance.value
    const primary = config?.primaryColor ?? '#0047FF'
    const accent = config?.accentColor ?? '#FF6B00'
    const isDark = config?.theme === 'dark'

    return {
      '--menu-primary': primary,
      '--menu-primary-hover': darkenColor(primary),
      '--menu-accent': accent,
      '--menu-bg': isDark ? '#12121A' : '#FFFFFF',
      '--menu-surface': isDark ? '#1C1C27' : '#F5F7FA',
      '--menu-text': isDark ? '#FFFFFF' : '#12121A',
      '--menu-muted': isDark ? '#A1A1AA' : '#6B7280',
    } as Record<string, string>
  })

  watchEffect(() => {
    const root = document.documentElement
    Object.entries(themeVars.value).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  })

  return { themeVars }
}
