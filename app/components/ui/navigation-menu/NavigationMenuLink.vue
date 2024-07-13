<script setup lang="ts">
import type { NuxtLinkProps } from "#app";
import {
  NavigationMenuLink,
  type NavigationMenuLinkEmits,
  type NavigationMenuLinkProps,
  useForwardPropsEmits,
} from "radix-vue";

const props = defineProps<
  NavigationMenuLinkProps &
    (NuxtLinkProps & {
      locale?: string | undefined;
    })
>();
const emits = defineEmits<NavigationMenuLinkEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const NuxtLinkLocale = resolveComponent("NuxtLinkLocale");
</script>

<template>
  <NavigationMenuLink v-bind="forwarded" :as="NuxtLinkLocale">
    <slot />
  </NavigationMenuLink>
</template>
