<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: t("ASIDE.DASHBOARD"),
});

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="p-4">{{ t("ASIDE.DASHBOARD") }}</div>
</template>
