<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: t("C00KB00KS.TITLE"),
});

definePageMeta({
  middleware: "auth",
});

const { data, status, refresh } = await useLazyFetch("/api/c00kb00ks");

const isEmpty = computed(
  () => status.value === "success" && data.value?.length === 0,
);
</script>

<template>
  <MaxWidthWrapper class="@container">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold">{{ $t("C00KB00KS.TITLE") }}</h2>
      <C00kb00ksAddDialog v-if="!isEmpty" @refetch="refresh">
        <UButton variant="outline">
          <span class="i-lucide-plus size-4 shrink-0"></span>
        </UButton>
      </C00kb00ksAddDialog>
    </div>

    <div
      v-if="!isEmpty"
      class="grid gap-4 pt-8 @xl:grid-cols-2 @4xl:grid-cols-3"
    >
      <template v-if="data">
        <C00kb00kCard v-for="c00kb00k in data" :key="c00kb00k.id" :c00kb00k />
      </template>
      <template v-else>
        <USkeleton v-for="key in 2" :key class="h-[100px]" />
      </template>
    </div>
    <div v-else class="flex flex-col items-center gap-4 pt-32">
      <div class="flex flex-col items-center text-balance text-center">
        <h3 class="text-3xl font-bold">{{ $t("C00KB00KS.EMPTY.TITLE") }}</h3>
        <p class="text-muted-foreground">
          {{ $t("C00KB00KS.EMPTY.DESCRIPTION") }}
        </p>
      </div>
      <C00kb00ksAddDialog @refetch="refresh">
        <UButton variant="outline">
          <span class="i-lucide-plus size-4 shrink-0"></span>
        </UButton>
      </C00kb00ksAddDialog>
    </div>
  </MaxWidthWrapper>
</template>
