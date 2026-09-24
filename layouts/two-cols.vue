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
    <CuFooter :config="$slidev.themeConfigs" :page="$slidev.nav.currentPage" :total="$slidev.nav.total" />
  </div>
</template>

<script setup lang="ts">
import CuFooter from '../components/CuFooter.vue';
</script>

<style scoped>
.two-cols-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
