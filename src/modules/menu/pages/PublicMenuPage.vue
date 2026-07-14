<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MenuHeader from '@/modules/menu/components/MenuHeader.vue'
import MenuCategorySection from '@/modules/menu/components/MenuCategorySection.vue'
import { usePublicMenu } from '@/composables/usePublicMenu'
import { useMenuTheme } from '@/composables/useMenuTheme'
import { APP_DOMAIN, APP_NAME } from '@/constants/app'

const { slug, isValidSlug, menuQuery, sections } = usePublicMenu()

const isLoading = computed(() => menuQuery.isLoading.value)
const isError = computed(() => menuQuery.isError.value)
const data = computed(() => menuQuery.data.value)
const appDomain = APP_DOMAIN

const appearance = computed(() => data.value?.restaurant.appearance)
useMenuTheme(appearance)

const activeCategoryId = ref<string | null>(null)

watch(
  sections,
  (value) => {
    if (!activeCategoryId.value && value[0]) {
      activeCategoryId.value = value[0].category.id
    }
  },
  { immediate: true },
)

function scrollToCategory(categoryId: string): void {
  activeCategoryId.value = categoryId
  document.getElementById(`category-${categoryId}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <div class="min-h-screen bg-[var(--menu-bg)]">
    <div v-if="!isValidSlug" class="flex min-h-screen items-center justify-center px-6">
      <div class="max-w-md text-center">
        <img src="/logo_1.svg" alt="CardaTche" class="mx-auto mb-6 size-16">
        <h1 class="text-2xl font-bold text-secondary">
          Cardápio não encontrado
        </h1>
        <p class="mt-2 text-sm text-muted">
          Acesse pelo subdomínio do restaurante, por exemplo:
          <span class="font-medium">nome-do-restaurante.{{ appDomain }}</span>
        </p>
      </div>
    </div>

    <div v-else-if="isLoading" class="flex min-h-screen items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div class="size-10 animate-spin rounded-full border-4 border-gray border-t-primary" />
        <p class="text-sm text-muted">Carregando cardápio...</p>
      </div>
    </div>

    <div v-else-if="isError || !data" class="flex min-h-screen items-center justify-center px-6">
      <div class="max-w-md text-center">
        <h1 class="text-2xl font-bold text-secondary">
          Restaurante não encontrado
        </h1>
        <p class="mt-2 text-sm text-muted">
          O endereço <span class="font-medium">{{ slug }}.{{ appDomain }}</span> não corresponde a nenhum restaurante cadastrado.
        </p>
      </div>
    </div>

    <template v-else>
      <MenuHeader :restaurant="data.restaurant" />

      <nav
        v-if="sections.length > 1"
        class="sticky top-[72px] z-10 border-b border-border bg-[var(--menu-bg)]/95 backdrop-blur"
      >
        <div class="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <button
            v-for="section in sections"
            :key="section.category.id"
            type="button"
            class="shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-default"
            :class="activeCategoryId === section.category.id
              ? 'text-white'
              : 'bg-[var(--menu-surface)] text-[var(--menu-text)]'"
            :style="activeCategoryId === section.category.id
              ? { backgroundColor: 'var(--menu-primary)' }
              : undefined"
            @click="scrollToCategory(section.category.id)"
          >
            {{ section.category.name }}
          </button>
        </div>
      </nav>

      <main class="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div class="flex flex-col gap-8">
          <MenuCategorySection
            v-for="section in sections"
            :id="`category-${section.category.id}`"
            :key="section.category.id"
            :category="section.category"
            :products="section.products"
          />
        </div>
      </main>

      <footer
        v-if="data.restaurant.appearance.showPoweredBy"
        class="border-t border-border py-6 text-center text-xs text-[var(--menu-muted)]"
      >
        Powered by {{ APP_NAME }}
      </footer>
    </template>
  </div>
</template>
