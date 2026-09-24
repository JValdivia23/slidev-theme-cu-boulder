<template>
  <!-- Section divider — always dark hero bg, always reversed logo -->
  <div class="slidev-layout section">
    <div>
      <slot />
    </div>
    <CuFooter :config="$slidev.themeConfigs" :page="$slidev.nav.currentPage" :total="$slidev.nav.total" :go-to="$slidev.nav.go" />
  </div>
</template>

<script setup lang="ts">
import CuFooter from '../components/CuFooter.vue';
</script>
