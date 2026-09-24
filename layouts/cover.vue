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
    <CuFooter :config="$slidev.themeConfigs" :page="$slidev.nav.currentPage" :total="$slidev.nav.total" cover />
  </div>
</template>

<script setup lang="ts">
import CuFooter from '../components/CuFooter.vue';

defineProps<{
  coverAuthor?: string;
  coverDate?: string;
}>();

</script>
