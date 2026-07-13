<script setup lang="ts">
import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types/menu'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article
    class="flex gap-4 rounded-[16px] border border-border bg-[var(--menu-surface)] p-4 shadow-[var(--shadow-card)]"
  >
    <div
      class="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white"
    >
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="size-full object-cover"
      >
      <span
        v-else
        class="text-xl font-bold"
        :style="{ color: 'var(--menu-primary)' }"
      >
        {{ product.name.charAt(0) }}
      </span>
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-base font-semibold text-[var(--menu-text)]">
          {{ product.name }}
        </h3>
        <div class="text-right">
          <p class="text-sm font-bold" :style="{ color: 'var(--menu-primary)' }">
            {{ formatCurrency(product.promotionalPrice ?? product.price) }}
          </p>
          <p
            v-if="product.promotionalPrice != null && product.promotionalPrice < product.price"
            class="text-xs text-[var(--menu-muted)] line-through"
          >
            {{ formatCurrency(product.price) }}
          </p>
        </div>
      </div>

      <p class="mt-1 line-clamp-2 text-sm text-[var(--menu-muted)]">
        {{ product.description }}
      </p>

      <p
        v-if="product.ingredients.length"
        class="mt-2 text-xs text-[var(--menu-muted)]"
      >
        {{ product.ingredients.join(' · ') }}
      </p>
    </div>
  </article>
</template>
