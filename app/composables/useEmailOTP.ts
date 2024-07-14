import { toast } from "vue-sonner";
import { isAuthApiError } from "@supabase/supabase-js";

export const useEmailOTP = (options: {
  mode: MaybeRefOrGetter<"login" | "signup">;
  clearInput: () => unknown;
  onResendSuccess: () => unknown;
}) => {
  const isVerifying = ref(false);
  const savedEmail = ref<string | undefined>();
  const pending = ref(false);

  let toastId: string | number | undefined = undefined;

  const supabase = useSupabaseClient();

  const { t } = useI18n();

  const localePath = useLocalePath();

  function getErrorMessage(error: unknown) {
    if (isAuthApiError(error)) {
      switch (error.message) {
        case "Token has expired or is invalid":
          options.clearInput();
          return t("AUTH.OTP.ERRORS.INVALID_CODE");
        default:
          return error.message;
      }
    }

    return t("COMMON.ERROR");
  }

  function showErrorToast(err?: unknown) {
    toast.error(getErrorMessage(err), { id: toastId });
    toastId = undefined;
  }

  async function prepareVerification(email: MaybeRefOrGetter<string>) {
    savedEmail.value = toValue(email);

    pending.value = true;

    const { data, error } = await supabase.auth.signInWithOtp({
      email: toValue(email),
    });

    if (error !== null || data.user !== null || data.session !== null) {
      showErrorToast(error);
      pending.value = false;
      return;
    }

    isVerifying.value = true;
    pending.value = false;
    return data;
  }

  async function handleVerification(code: MaybeRefOrGetter<string>) {
    if (!savedEmail.value) return;

    toastId = toast.loading(
      t(
        toValue(options.mode) === "login"
          ? "AUTH.ACTIONS.LOGGING_IN"
          : "AUTH.ACTIONS.SIGNING_UP",
      ),
    );

    const { error } = await supabase.auth.verifyOtp({
      email: savedEmail.value,
      token: toValue(code),
      type: "email",
    });

    if (error) {
      showErrorToast(error);
      return;
    }

    toast.success(
      t(
        toValue(options.mode) === "login"
          ? "AUTH.OTP.LOGIN_SUCCESS"
          : "AUTH.OTP.SIGNUP_SUCCESS",
      ),
      { id: toastId },
    );
    toastId = undefined;
    await navigateTo(localePath("/dashboard"));
  }

  async function resend() {
    if (!savedEmail.value) {
      showErrorToast();
      return;
    }

    options.clearInput();

    toastId = toast.loading(t("AUTH.OTP.ACTIONS.SENDING_CODE"));

    const { data, error } = await prepareVerification(savedEmail.value);

    if (error) {
      showErrorToast(error);
      return;
    }

    toast.success(t("AUTH.OTP.CODE_SENT"), { id: toastId });
    toastId = undefined;
    options.onResendSuccess();
    return data;
  }

  function retypeEmail() {
    isVerifying.value = false;
    options.clearInput();
    savedEmail.value = undefined;
  }

  return {
    isVerifying,
    savedEmail,
    pending,
    prepareVerification,
    handleVerification,
    resend,
    retypeEmail,
  };
};
