<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();

useSeoMeta({
  title: t("AUTH.LOGIN"),
});
</script>

<template>
  <Auth />
</template>
