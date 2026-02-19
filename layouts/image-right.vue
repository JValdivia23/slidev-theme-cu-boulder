<template>
  <div class="slidev-layout image-right">
    <div class="content">
      <slot />
    </div>
    <div class="image-container">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || ''"
        class="slide-image"
      />
      <slot v-else name="right" />
      <p v-if="imageCaption" class="image-caption">{{ imageCaption }}</p>
    </div>
    <!-- Footer -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        src="/cu-logo-rev.png"
        alt="CU Boulder"
        class="cu-logo"
      />
      <span class="cu-footer-text">{{ $slidev.themeConfigs.department || '' }}</span>
      <span class="cu-footer-page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}>();
</script>

<style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.slide-image {
  max-width: 100%;
  max-height: 70%;
  object-fit: contain;
  border-radius: 4px;
}
.image-caption {
  font-size: 0.7rem;
  color: var(--cu-dark-gray);
  margin-top: 0.4rem;
  text-align: center;
}
</style>
