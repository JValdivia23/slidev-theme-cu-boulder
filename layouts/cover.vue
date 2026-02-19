<template>
  <div class="slidev-layout cover">
    <!-- Dark blue cover with gold accents -->
    <div class="cover-content">
      <slot />
      <!-- Author / date row -->
      <div v-if="coverAuthor || coverDate" class="cover-meta">
        <span v-if="coverAuthor">{{ coverAuthor }}</span>
        <span v-if="coverAuthor && coverDate"> · </span>
        <span v-if="coverDate">{{ coverDate }}</span>
      </div>
    </div>
    <!-- Footer with logo on cover -->
    <div class="cu-footer">
      <img
        v-if="$slidev.themeConfigs.showLogo !== false"
        src="/cu-logo-rev.png"
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
</script>
