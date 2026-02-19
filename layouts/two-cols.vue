<template>
  <div class="slidev-layout two-cols">
    <div class="col-left">
      <slot />
    </div>
    <div class="col-right">
      <slot name="right" />
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
