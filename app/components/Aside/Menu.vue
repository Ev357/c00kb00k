<script setup lang="ts">
import { toast } from "vue-sonner";

const supabase = useSupabaseClient();

const localePath = useLocalePath();

const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error(getSupabaseError(error));
    return;
  }

  navigateTo(localePath("/login"));
};

const { Shift_Ctrl_Q } = useMagicKeys();

if (Shift_Ctrl_Q) {
  whenever(Shift_Ctrl_Q, () => {
    logOut();
  });
}
</script>

<template>
  <UDropdownMenu>
    <UDropdownMenuTrigger as-child>
      <slot />
    </UDropdownMenuTrigger>
    <UDropdownMenuContent class="w-52">
      <UDropdownMenuItem @mousedown="logOut">
        <span class="i-lucide-log-out mr-2 size-4"></span>
        <span>{{ $t("AUTH.LOG_OUT") }}</span>
        <UDropdownMenuShortcut>⇧⌘Q</UDropdownMenuShortcut>
      </UDropdownMenuItem>
    </UDropdownMenuContent>
  </UDropdownMenu>
</template>
