<script setup lang="ts">
import type AuthOTPComponent from "@/components/Auth/OTP.vue";

const props = withDefaults(
  defineProps<{
    mode?: "login" | "signup";
  }>(),
  {
    mode: "login",
  },
);
const { mode } = toRefs(props);

const otp = ref<InstanceType<typeof AuthOTPComponent>>();

const clearInput = () => {
  otp.value?.clearInput();
};

const onResendSuccess = () => {
  otp.value?.restart();
};

const {
  isVerifying,
  savedEmail,
  pending,
  prepareVerification,
  handleVerification,
  resend,
  retypeEmail,
} = useEmailOTP({
  mode,
  clearInput,
  onResendSuccess,
});
</script>

<template>
  <div class="flex size-full items-center justify-center">
    <UCard v-if="!isVerifying" class="w-[350px]">
      <UCardHeader>
        <UCardTitle>{{ $t("AUTH.LOGIN.TITLE") }}</UCardTitle>
        <UCardDescription as="div">
          <p class="inline">{{ $t("AUTH.LOGIN.DESCRIPTION") }}</p>
          <NuxtLinkLocale
            to="/signup"
            class="inline text-blue-500 hover:text-blue-600 hover:underline"
          >
            {{ $t("AUTH.SIGN_UP") }}.
          </NuxtLinkLocale>
        </UCardDescription>
      </UCardHeader>
      <UCardContent>
        <AuthForm :pending @submit="prepareVerification" />
      </UCardContent>
    </UCard>
    <AuthOTP
      v-else
      ref="otp"
      :email="savedEmail"
      @submit="handleVerification"
      @resend="resend"
      @retype="retypeEmail"
    />
  </div>
</template>
