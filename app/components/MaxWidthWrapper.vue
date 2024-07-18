<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div class="flex w-full justify-center px-4">
    <div :class="cn('w-full max-w-[1080px] pt-12', props.class)">
      <slot />
    </div>
  </div>
</template>
