<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: t("APP_NAME"),
});
</script>

<template>
  <NuxtWelcome />
</template>
