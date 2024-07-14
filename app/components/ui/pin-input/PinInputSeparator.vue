<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from "radix-vue";

const props = defineProps<PrimitiveProps>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <span class="i-lucide-dot size-4 shrink-0"></span>
    </slot>
  </Primitive>
</template>
