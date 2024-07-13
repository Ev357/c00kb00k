<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const menuItems: { title: string; to: string; icon: string }[] = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: "i-lucide-layout-dashboard",
  },
  {
    title: "Recepies",
    to: "/recepies",
    icon: "i-lucide-gantt-chart",
  },
  {
    title: "New Recipe",
    to: "/new-recipe",
    icon: "i-lucide-square-plus",
  },
  {
    title: "Notifications",
    to: "/notifications",
    icon: "i-lucide-bell",
  },
  {
    title: "Settings",
    to: "/settings",
    icon: "i-lucide-settings",
  },
];
</script>

<template>
  <nav class="hidden md:block">
    <aside class="flex h-full flex-col border-r p-4">
      <NuxtLinkLocale to="/" class="flex items-center gap-2 text-2xl font-bold">
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
              {{ item.title }}
            </UNavigationMenuLink>
          </UNavigationMenuItem>
        </UNavigationMenuList>
      </UNavigationMenu>
    </aside>
  </nav>
</template>
