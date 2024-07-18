<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: t("RECEPIES.TITLE"),
});

definePageMeta({
  middleware: "auth",
});

const { data } = await useLazyFetch("/api/c00kb00ks");
</script>

<template>
  <MaxWidthWrapper class="@container">
    <h2 class="text-3xl font-bold">{{ $t("RECEPIES.TITLE") }}</h2>
    <div class="grid gap-4 pt-8 @xl:grid-cols-2 @4xl:grid-cols-3">
      <C00kb00kCard v-for="c00kb00k in data" :key="c00kb00k.id" :c00kb00k />
    </div>
  </MaxWidthWrapper>
</template>
