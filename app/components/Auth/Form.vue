<script setup lang="ts">
import zod from "zod";

defineProps<{
  pending: boolean;
}>();

const emit = defineEmits<{
  submit: [email: string];
}>();

const { errors, defineField, isFieldTouched, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      email: zod.string().trim().email(),
    }),
  ),
});

const [email, emailAttrs] = defineField("email");

const onSubmit = handleSubmit((values) => {
  emit("submit", values.email);
});
</script>

<template>
  <form class="flex flex-col gap-2" @submit="onSubmit">
    <ULabel for="email">{{ $t("AUTH.EMAIL") }}</ULabel>
    <UInput
      v-bind="emailAttrs"
      id="email"
      v-model="email"
      placeholder="user@example.com"
    />
    <FormError name="email" :is-field-touched :errors />
    <UButton
      class="flex h-fit w-full gap-2 py-3"
      type="submit"
      :loading="pending"
    >
      {{ $t("COMMON.CONTINUE") }}
    </UButton>
  </form>
</template>
