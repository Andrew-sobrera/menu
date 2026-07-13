export type Status = 'active' | 'inactive'

export interface ApiResponse<T> {
  data: T
  message?: string
}

export type MenuTheme = 'light' | 'dark'

export interface MenuAppearance {
  theme: MenuTheme
  primaryColor: string
  accentColor: string
  headerText?: string | null
  showPoweredBy: boolean
}

export interface OpeningHour {
  dayOfWeek: number
  open: string
  close: string
  closed?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image?: string
  sortOrder: number
  status: Status
  restaurantId: string
}

export interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  price: number
  promotionalPrice?: number
  image?: string
  status: Status
  prepTime: number
  ingredients: string[]
  notes?: string
  restaurantId: string
  sortOrder?: number
}

export interface MenuRestaurantProfile {
  id: string
  name: string
  slug: string
  logo?: string | null
  phone?: string | null
  whatsapp?: string | null
  openingHours: OpeningHour[]
  appearance: MenuAppearance
}

export interface PublicMenuData {
  restaurant: MenuRestaurantProfile
  categories: Category[]
  products: Product[]
}
