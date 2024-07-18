<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const menuItems: { title: string; to: string; icon: string }[] = [
  {
    title: "ASIDE.DASHBOARD",
    to: "/dashboard",
    icon: "i-lucide-layout-dashboard",
  },
  {
    title: "RECEPIES.TITLE",
    to: "/recepies",
    icon: "i-lucide-gantt-chart",
  },
  {
    title: "ASIDE.NEW_RECEPIE",
    to: "/new-recipe",
    icon: "i-lucide-square-plus",
  },
  {
    title: "ASIDE.NOTIFICATIONS",
    to: "/notifications",
    icon: "i-lucide-bell",
  },
  {
    title: "ASIDE.SETTINGS",
    to: "/settings",
    icon: "i-lucide-settings",
  },
];

const user = useSupabaseUser();

const userInitial = computed(() => user.value.email.slice(0, 1).toUpperCase());
</script>

<template>
  <nav class="hidden lg:block">
    <aside class="flex h-full w-64 flex-col border-r p-4">
      <NuxtLinkLocale
        to="/dashboard"
        class="flex items-center justify-center gap-2 text-2xl font-bold"
      >
        <span class="i-lucide-chef-hat size-8 shrink-0"></span>
        <h1>{{ $t("APP_NAME") }}</h1>
      </NuxtLinkLocale>
      <UNavigationMenu
        class="max-w-none items-start pt-6 [&>div]:w-full"
        orientation="vertical"
      >
        <UNavigationMenuList class="flex-col gap-1">
          <UNavigationMenuItem
            v-for="item in menuItems"
            :key="item.to"
            class="w-full"
          >
            <UNavigationMenuLink
              :class="
                cn(navigationMenuTriggerStyle(), 'w-full justify-start gap-2')
              "
              :to="item.to"
            >
              <span class="size-5 shrink-0" :class="item.icon"></span>
              {{ $t(item.title) }}
            </UNavigationMenuLink>
          </UNavigationMenuItem>
        </UNavigationMenuList>
      </UNavigationMenu>
      <AsideMenu>
        <UButton class="flex items-center gap-2" variant="ghost" size="sm">
          <UAvatar class="border" size="xs">
            <UAvatarImage :src="user.profile_picture ?? ''" :alt="user.email" />
            <UAvatarFallback class="dark:text-black">
              {{ userInitial }}
            </UAvatarFallback>
          </UAvatar>
          <p class="truncate font-bold">{{ user.email }}</p>
          <span class="i-lucide-ellipsis size-4 shrink-0"></span>
        </UButton>
      </AsideMenu>
    </aside>
  </nav>
</template>
