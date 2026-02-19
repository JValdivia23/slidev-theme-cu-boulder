<template>
  <!-- Section divider — always dark hero bg, always reversed logo -->
  <div class="slidev-layout section">
    <div>
      <slot />
    </div>
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        :src="$slidev.themeConfigs.logoRevUrl || defaultLogoRev"
        alt="CU Boulder"
        class="cu-logo"
      />
      <span class="cu-footer-text">{{ $slidev.themeConfigs.department || '' }}</span>
      <span class="cu-footer-page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cuLogoRev } from '../setup/logos';

const defaultLogoRev = cuLogoRev;
</script>
