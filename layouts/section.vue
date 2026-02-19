<template>
  <!-- Section divider slide — dark hero background, gold heading (always dark regardless of mode) -->
  <div class="slidev-layout section">
    <div>
      <slot />
    </div>
    <!-- Footer -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        :src="logoRevUrl"
        alt="CU Boulder"
        class="cu-logo"
      />
      <span class="cu-footer-text">{{ $slidev.themeConfigs.department || '' }}</span>
      <span class="cu-footer-page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const logoRevUrl = new URL('../public/cu-logo-rev.png', import.meta.url).href;
</script>
