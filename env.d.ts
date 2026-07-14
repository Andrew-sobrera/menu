/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_DOMAIN: string
  readonly VITE_MENU_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
