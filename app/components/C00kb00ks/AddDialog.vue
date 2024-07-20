<script setup lang="ts">
import { addC00kb00kSchema } from "@/schemas/addC00kb00k";
import { VisuallyHidden } from "radix-vue";

const emit = defineEmits<{
  refetch: [value: undefined];
}>();

const { errors, defineField, isFieldTouched, handleSubmit, resetForm } =
  useForm({
    validationSchema: toTypedSchema(addC00kb00kSchema),
  });

const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");

const open = ref(false);

const loading = ref(false);

const { submit } = useSubmit();

const onSubmit = handleSubmit((body) => {
  submit("/api/c00kb00ks", {
    loading,
    sonner: {
      loading: "COMMON.ACTIONS.ADDING",
      success: "C00KB00KS.DIALOG.ADD.SUCCESS",
      error: "C00KB00KS.DIALOG.ADD.ERROR",
    },
    body,
    onSuccess: () => {
      open.value = false;
      resetForm();
      emit("refetch", undefined);
    },
  });
});

watch(open, () => {
  if (!open.value) return;

  resetForm();
});
</script>

<template>
  <UDialog v-model:open="open">
    <UDialogTrigger as-child>
      <slot />
    </UDialogTrigger>
    <UDialogContent as-child>
      <form @submit="onSubmit">
        <UDialogHeader>
          <UDialogTitle>{{ $t("C00KB00KS.DIALOG.ADD.TITLE") }}</UDialogTitle>
          <VisuallyHidden as-child>
            <UDialogDescription>
              {{ $t("C00KB00KS.DIALOG.ADD.TITLE") }}
            </UDialogDescription>
          </VisuallyHidden>
        </UDialogHeader>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <ULabel for="name" required>{{ $t("COMMON.NAME") }}</ULabel>
            <UInput id="name" v-bind="nameAttrs" v-model="name" />
            <FormError name="name" :is-field-touched :errors />
          </div>
          <div class="flex flex-col gap-2">
            <ULabel for="description">{{ $t("COMMON.DESCRIPTION") }}</ULabel>
            <UInput
              id="description"
              v-bind="descriptionAttrs"
              v-model="description"
            />
            <FormError name="description" :is-field-touched :errors />
          </div>
        </div>
        <UDialogFooter>
          <UButton type="submit" :loading>{{ $t("COMMON.ADD") }}</UButton>
        </UDialogFooter>
        <UDialogClose
          class="absolute right-4 top-4 flex rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        />
      </form>
    </UDialogContent>
  </UDialog>
</template>
