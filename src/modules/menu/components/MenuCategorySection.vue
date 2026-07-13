<script setup lang="ts">
import ProductCard from '@/modules/menu/components/ProductCard.vue'
import type { Category, Product } from '@/types/menu'

defineProps<{
  category: Category
  products: Product[]
}>()
</script>

<template>
  <section class="scroll-mt-28">
    <div class="mb-4">
      <h2 class="text-lg font-bold text-[var(--menu-text)]">
        {{ category.name }}
      </h2>
      <p v-if="category.description" class="mt-1 text-sm text-[var(--menu-muted)]">
        {{ category.description }}
      </p>
    </div>

    <div v-if="products.length === 0" class="rounded-[16px] bg-[var(--menu-surface)] p-6 text-center text-sm text-[var(--menu-muted)]">
      Nenhum produto disponível nesta categoria.
    </div>

    <div v-else class="flex flex-col gap-3">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>
