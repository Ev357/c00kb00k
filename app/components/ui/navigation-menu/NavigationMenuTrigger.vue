<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from "radix-vue";
import { navigationMenuTriggerStyle } from ".";
import { cn } from "@/lib/utils";

const props = defineProps<
  NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
  >
    <slot />
    <span
      class="i-lucide-chevron-down relative top-px ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    ></span>
  </NavigationMenuTrigger>
</template>
