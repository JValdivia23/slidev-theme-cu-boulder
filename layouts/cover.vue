<template>
  <div class="slidev-layout cover">
    <!-- Dark hero cover with gold accents — always dark bg regardless of mode -->
    <div class="cover-content">
      <slot />
      <!-- Author / date row -->
      <div v-if="coverAuthor || coverDate" class="cover-meta">
        <span v-if="coverAuthor">{{ coverAuthor }}</span>
        <span v-if="coverAuthor && coverDate"> · </span>
        <span v-if="coverDate">{{ coverDate }}</span>
      </div>
    </div>
    <!-- Footer with logo on cover — always dark bg, always use reversed (white) logo -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        :src="logoRevUrl"
        alt="CU Boulder"
        class="cu-logo"
      />
      <span class="cu-footer-text">{{ $slidev.themeConfigs.department || '' }}</span>
      <span class="cu-footer-page" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  coverAuthor?: string;
  coverDate?: string;
}>();

const logoRevUrl = new URL('../public/cu-logo-rev.png', import.meta.url).href;
</script>
