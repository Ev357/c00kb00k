<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from "radix-vue";

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <DialogClose v-bind="props">
    <slot>
      <span class="i-lucide-x size-4 shrink-0"></span>
      <span class="sr-only">{{ $t("COMMON.CLOSE") }}</span>
    </slot>
  </DialogClose>
</template>
