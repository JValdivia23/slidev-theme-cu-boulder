<template>
  <div class="cu-footer">
    <img
      v-if="config.showLogo !== false"
      :src="config.logoRevUrl || config.logoUrl || cuLogoRev"
      alt="CU Boulder"
      class="cu-logo"
    />
    <nav v-if="sections.length && activeIndex >= 0" class="cu-footer-nav" aria-label="Presentation sections">
      <ol>
        <li
          v-for="(section, index) in sections"
          :key="`${section.start}-${section.end}-${section.label}`"
          :class="{ 'is-current': index === activeIndex, 'is-complete': page > section.end }"
          :aria-current="index === activeIndex ? 'step' : undefined"
        >
          {{ section.label }}
        </li>
      </ol>
    </nav>
    <span v-else class="cu-footer-text">
      {{ sections.length ? config.footerNav?.outsideLabel || config.department || '' : config.department || '' }}
    </span>
    <span class="cu-footer-page">{{ pageText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cuLogoRev } from '../setup/logos';

interface FooterSection {
  label: string;
  start: number;
  end: number;
}

interface FooterConfig {
  showLogo?: boolean;
  logoRevUrl?: string;
  logoUrl?: string;
  department?: string;
  footerNav?: {
    sections: FooterSection[];
    outsideLabel?: string;
    pageNumberOnly?: boolean;
  };
}

const props = withDefaults(defineProps<{
  config: FooterConfig;
  page: number;
  total: number;
  cover?: boolean;
}>(), { cover: false });

const sections = computed(() => props.config.footerNav?.sections || []);
const activeIndex = computed(() => sections.value.findIndex(
  section => props.page >= section.start && props.page <= section.end,
));
const pageText = computed(() => {
  if (props.config.footerNav?.pageNumberOnly) return String(props.page);
  return props.cover ? '' : `${props.page} / ${props.total}`;
});
</script>
