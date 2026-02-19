<template>
  <div class="slidev-layout default">
    <slot />
    <!-- Footer -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        :src="$slidev.colorSchema === 'dark' ? logoRevUrl : logoUrl"
        alt="CU Boulder"
        class="cu-logo"
      />
      <span class="cu-footer-text">{{ $slidev.themeConfigs.department || '' }}</span>
      <span class="cu-footer-page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const logoUrl = new URL('../public/cu-logo.png', import.meta.url).href;
const logoRevUrl = new URL('../public/cu-logo-rev.png', import.meta.url).href;
</script>
