<script setup lang="ts">
import { computed } from 'vue'
import { Phone, MessageCircle } from '@lucide/vue'
import type { MenuRestaurantProfile } from '@/types/menu'

const props = defineProps<{
  restaurant: MenuRestaurantProfile
}>()

const headerTitle = computed(
  () => props.restaurant.appearance.headerText || props.restaurant.name,
)

const whatsappLink = computed(() => {
  if (!props.restaurant.whatsapp) return null
  const digits = props.restaurant.whatsapp.replace(/\D/g, '')
  return `https://wa.me/55${digits}`
})
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-border shadow-[var(--shadow-card)]"
    :style="{ backgroundColor: 'var(--menu-primary)' }"
  >
    <div class="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4 sm:px-6">
      <img
        v-if="restaurant.logo"
        :src="restaurant.logo"
        :alt="restaurant.name"
        class="size-12 rounded-[12px] border border-white/20 object-cover"
      >
      <div
        v-else
        class="flex size-12 items-center justify-center rounded-[12px] bg-white/15 text-lg font-bold text-white"
      >
        {{ restaurant.name.charAt(0) }}
      </div>

      <div class="min-w-0 flex-1">
        <h1 class="truncate text-lg font-bold text-white">
          {{ headerTitle }}
        </h1>
        <p class="truncate text-sm text-white/80">
          {{ restaurant.name }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <a
          v-if="restaurant.phone"
          :href="`tel:${restaurant.phone}`"
          class="flex size-10 items-center justify-center rounded-[12px] bg-white/15 text-white transition-default hover:bg-white/25"
          aria-label="Ligar para o restaurante"
        >
          <Phone class="size-4" />
        </a>
        <a
          v-if="whatsappLink"
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-10 items-center justify-center rounded-[12px] bg-white/15 text-white transition-default hover:bg-white/25"
          aria-label="WhatsApp do restaurante"
        >
          <MessageCircle class="size-4" />
        </a>
      </div>
    </div>
  </header>
</template>
