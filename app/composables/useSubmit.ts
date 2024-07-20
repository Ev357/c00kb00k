import { toast } from "vue-sonner";

type SonnerOptions = {
  loading: string;
  success: string;
  error: string;
};

type SubmitOptions = {
  loading?: Ref<boolean>;
  method?: "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown> | BodyInit;
  sonner?: SonnerOptions;
  onSuccess?: () => unknown;
};

export const useSubmit = () => {
  let toastId: string | number | undefined;

  const { t } = useI18n();

  function getSetLoading(loading?: Ref<boolean>) {
    function setLoading(value: boolean) {
      if (!loading) return;
      loading.value = value;
    }

    return { setLoading };
  }

  async function send(request: string, opts: SubmitOptions) {
    await $fetch(request, {
      method: opts.method ?? "POST",
      body: opts.body,
    });
  }

  function showError(sonnerOptions?: SonnerOptions) {
    if (!sonnerOptions) return;
    toast.error(t(sonnerOptions?.error), { id: toastId });
  }

  function showSuccess(sonnerOptions?: SonnerOptions) {
    if (!sonnerOptions) return;
    toast.success(t(sonnerOptions.success), { id: toastId });
  }

  async function submit(request: string, opts: SubmitOptions = {}) {
    const { setLoading } = getSetLoading(opts.loading);

    setLoading(true);
    if (opts.sonner) {
      toastId = toast.loading(t(opts.sonner.loading));
    }
    try {
      await send(request, opts);

      setLoading(false);
      opts.onSuccess?.();
      showSuccess(opts.sonner);
    } catch (_) {
      console.log(_);
      setLoading(false);
      showError(opts.sonner);
    }
  }

  return { submit };
};
