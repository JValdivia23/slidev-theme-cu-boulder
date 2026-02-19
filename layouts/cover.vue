<template>
  <div class="slidev-layout cover">
    <div class="cover-content">
      <slot />
      <div v-if="coverAuthor || coverDate" class="cover-meta">
        <span v-if="coverAuthor">{{ coverAuthor }}</span>
        <span v-if="coverAuthor && coverDate"> &middot; </span>
        <span v-if="coverDate">{{ coverDate }}</span>
      </div>
    </div>
    <!-- Footer — cover is always dark bg, so always use reversed logo -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        :src="$slidev.themeConfigs.logoRevUrl || defaultLogoRev"
        alt="CU Boulder"
        class="cu-logo"
      />
      <span class="cu-footer-text">{{ $slidev.themeConfigs.department || '' }}</span>
      <span class="cu-footer-page" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cuLogoRev } from '../setup/logos';

defineProps<{
  coverAuthor?: string;
  coverDate?: string;
}>();

const defaultLogoRev = cuLogoRev;
</script>
