<script setup lang="ts">
import type { SelectC00kb00k } from "@@/server/database/schema";

defineProps<{
  c00kb00k: SelectC00kb00k;
}>();
</script>

<template>
  <NuxtLinkLocale :to="`/c00kb00ks/${c00kb00k.id}`">
    <UCard class="h-full">
      <UCardHeader>
        <UCardTitle>{{ c00kb00k.name }}</UCardTitle>
        <UCardDescription class="line-clamp-2">
          {{ c00kb00k.description }}
        </UCardDescription>
      </UCardHeader>
    </UCard>
  </NuxtLinkLocale>
</template>
