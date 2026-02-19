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
        />
        <slot v-else name="right" />
        <p v-if="imageCaption" class="image-caption">{{ imageCaption }}</p>
      </div>
    </div>
    <!-- Footer -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        :src="$slidev.colorSchema === 'dark' ? '/cu-logo-rev.png' : '/cu-logo.png'"
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
.image-right-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}
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
  color: var(--cu-text-muted);
  margin-top: 0.4rem;
  text-align: center;
}
</style>
