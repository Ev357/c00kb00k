<script setup lang="ts">
defineProps<{
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldTouched: (path: any) => boolean;
  errors: Partial<Record<string, string | undefined>>;
}>();
</script>

<template>
  <span
    v-if="isFieldTouched(name) && errors[name]"
    role="alert"
    class="text-sm text-red-500"
  >
    {{ errors[name] }}
  </span>
</template>
