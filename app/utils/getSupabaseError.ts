import { isAuthApiError } from "@supabase/supabase-js";

export const getSupabaseError = (error: unknown) => {
  if (isAuthApiError(error)) {
    return error.message;
  }

  const { t } = useI18n();

  return t("COMMON.ERROR");
};
