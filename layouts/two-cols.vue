<template>
  <div class="slidev-layout two-cols">
    <div class="two-cols-content">
      <div class="col-left">
        <slot />
      </div>
      <div class="col-right">
        <slot name="right" />
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

<style scoped>
.two-cols-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
