<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { type PrimitiveProps, Primitive } from "radix-vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "@/lib/utils";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
  class: undefined,
  isLoading: false,
});
</script>

<template>
  <Primitive
    :as
    :as-child
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <slot v-if="!loading" />
    <span
      v-else
      class="i-lucide-loader-circle size-5 flex-none animate-spin"
    ></span>
  </Primitive>
</template>
