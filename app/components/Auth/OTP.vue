<script setup lang="ts">
defineProps<{
  email?: string;
}>();

defineEmits<{
  resend: [value: MouseEvent];
  retype: [value: MouseEvent];
  submit: [code: string];
}>();

const value = ref<string[]>([]);

const pinInputs = ref<{ $el: HTMLInputElement }[]>([]);
const inputs = computed(() => pinInputs.value.map((i) => i.$el));

const placeholder = "○";

const clearInput = () => {
  value.value = [];
  for (const input of inputs.value) {
    input.placeholder = placeholder;
  }
  setTimeout(() => {
    inputs.value[0]?.focus();
  });
};

const { timer, restart, isActive } = useTimer(60);

defineExpose({
  clearInput,
  restart,
});
</script>

<template>
  <UCard class="w-[350px]">
    <UCardHeader>
      <UCardTitle>{{ $t("AUTH.OTP.CHECK_EMAIL") }}</UCardTitle>
      <UCardDescription as="div">
        <p class="inline">{{ $t("AUTH.OTP.ENTER_CODE") }}</p>
        <div class="inline-flex items-center gap-2">
          <p>{{ email }}</p>
          <button
            class="i-lucide-pencil-line size-4 shrink-0 text-blue-500 hover:underline dark:text-blue-300"
            @mousedown="$emit('retype', $event)"
          ></button>
        </div>
      </UCardDescription>
    </UCardHeader>
    <UCardContent class="flex justify-center">
      <UPinInput
        v-model="value"
        :placeholder
        class="pt-4"
        :otp="true"
        type="number"
        @complete="$emit('submit', $event.join(''))"
      >
        <UPinInputGroup>
          <UPinInputInput
            v-for="(key, index) in 6"
            ref="pinInputs"
            :key
            :index
          />
        </UPinInputGroup>
      </UPinInput>
    </UCardContent>
    <UCardFooter class="flex-wrap gap-1">
      {{ $t("AUTH.OTP.DID_NOT_RECEIVE_CODE") }}
      <button
        class="text-blue-500 disabled:text-muted-foreground dark:text-blue-300"
        :disabled="isActive"
        @mousedown="$emit('resend', $event)"
      >
        {{ $t("AUTH.OTP.RESEND_CODE") }}
        <template v-if="isActive">({{ timer }})</template>
      </button>
    </UCardFooter>
  </UCard>
</template>
