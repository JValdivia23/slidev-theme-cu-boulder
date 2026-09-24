<template>
  <div class="slidev-layout default">
    <slot />
    <CuFooter :config="$slidev.themeConfigs" :page="$slidev.nav.currentPage" :total="$slidev.nav.total" />
  </div>
</template>

<script setup lang="ts">
import CuFooter from '../components/CuFooter.vue';
</script>
