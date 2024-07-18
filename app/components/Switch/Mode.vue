<script setup lang="ts">
defineProps<{
  isDark: boolean;
}>();
</script>

<template>
  <button class="flex w-full justify-end">
    <span v-show="isDark" class="i-lucide-sun size-4 shrink-0"></span>
    <span v-show="!isDark" class="i-lucide-moon size-4 shrink-0"></span>
  </button>
</template>
