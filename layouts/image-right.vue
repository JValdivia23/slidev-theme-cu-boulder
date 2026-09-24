<template>
  <div class="slidev-layout image-right">
    <div class="image-right-content">
      <div class="content">
        <slot />
      </div>
      <div class="image-container">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          class="slide-image"
          :style="{ backgroundColor: imageBackground, padding: imageBackground ? '1rem' : undefined }"
        />
        <slot v-else name="right" />
        <p v-if="imageCaption" class="image-caption">{{ imageCaption }}</p>
      </div>
    </div>
    <CuFooter :config="$slidev.themeConfigs" :page="$slidev.nav.currentPage" :total="$slidev.nav.total" />
  </div>
</template>

<script setup lang="ts">
import CuFooter from '../components/CuFooter.vue';

defineProps<{
  image?: string;
  imageAlt?: string;
  imageBackground?: string;
  imageCaption?: string;
}>();

</script>

<style scoped>
.image-right-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  height: 100%;
  gap: 2rem;
  align-items: start;
}
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  min-height: 0;
}
.slide-image {
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  flex: 0 1 auto;
  object-fit: contain;
  border-radius: 4px;
}
.image-caption {
  flex-shrink: 0;
  font-size: 0.7rem;
  color: var(--cu-text-muted);
  margin-top: 0.4rem;
  text-align: center;
}
</style>
