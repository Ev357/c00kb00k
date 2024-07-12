<script setup lang="ts">
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();

const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => titleChunk ?? t("APP_NAME"),
});
</script>

<template>
  <div>
    <ConfigProvider :use-id="useIdFunction">
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
  </div>
</template>
