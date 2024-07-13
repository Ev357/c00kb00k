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
  <div class="flex size-full items-center justify-center">
    <UCard class="w-[350px]">
      <UCardHeader>
        <UCardTitle>{{ t("AUTH.LOGIN.TITLE") }}</UCardTitle>
        <UCardDescription as="div">
          <p class="inline">{{ t("AUTH.LOGIN.DESCRIPTION") }}</p>
          {{ " " }}
          <NuxtLinkLocale
            to="/signup"
            class="inline text-blue-500 hover:text-blue-600"
          >
            {{ t("AUTH.SIGN_UP") }}.
          </NuxtLinkLocale>
        </UCardDescription>
      </UCardHeader>
      <UCardContent>
        <form>
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <ULabel for="email">{{ t("AUTH.EMAIL") }}</ULabel>
              <UInput id="email" placeholder="user@example.com" />
            </div>
          </div>
        </form>
      </UCardContent>
    </UCard>
  </div>
</template>
