<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();

useSeoMeta({
  title: t("AUTH.SIGN_UP"),
});
</script>

<template>
  <Auth mode="signup" />
</template>
