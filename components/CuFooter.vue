<template>
  <div class="cu-footer">
    <img
      v-if="config.showLogo !== false"
      :src="config.logoRevUrl || config.logoUrl || cuLogoRev"
      alt="CU Boulder"
      class="cu-logo"
    />
    <nav v-if="!coverLogoOnly && sections.length && activeIndex >= 0" class="cu-footer-nav" aria-label="Presentation sections">
      <ol>
        <li
          v-for="(section, index) in sections"
          :key="`${section.start}-${section.end}-${section.label}`"
          :class="{ 'is-current': index === activeIndex, 'is-complete': page > section.end }"
        >
          <button
            type="button"
            :aria-current="index === activeIndex ? 'step' : undefined"
            :aria-label="`Go to ${section.label}, slide ${section.start}`"
            @click.stop="goTo(section.start)"
          >{{ section.label }}</button>
        </li>
      </ol>
    </nav>
    <span v-else-if="!coverLogoOnly" class="cu-footer-text">
      {{ sections.length ? config.footerNav?.outsideLabel || config.department || '' : config.department || '' }}
    </span>
    <span v-if="!coverLogoOnly" class="cu-footer-page">{{ pageText }}</span>
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
    hideOnCover?: boolean;
  };
}

const props = withDefaults(defineProps<{
  config: FooterConfig;
  page: number;
  total: number;
  goTo: (no: number) => void | Promise<void>;
  cover?: boolean;
}>(), { cover: false });

const sections = computed(() => props.config.footerNav?.sections || []);
const coverLogoOnly = computed(() => props.cover && props.config.footerNav?.hideOnCover === true);
const activeIndex = computed(() => sections.value.findIndex(
  section => props.page >= section.start && props.page <= section.end,
));
const pageText = computed(() => {
  if (props.config.footerNav?.pageNumberOnly) return String(props.page);
  return props.cover ? '' : `${props.page} / ${props.total}`;
});
</script>
