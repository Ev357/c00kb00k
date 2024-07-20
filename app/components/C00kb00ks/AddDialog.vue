<template>
  <UDialog>
    <UDialogTrigger as-child>
      <slot />
    </UDialogTrigger>
    <UDialogContent class="sm:max-w-[425px]">
      <UDialogHeader>
        <UDialogTitle>Edit profile</UDialogTitle>
        <UDialogDescription>
          Make changes to your profile here. Click save when you're done.
        </UDialogDescription>
      </UDialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <ULabel for="name" class="text-right">Name</ULabel>
          <UInput id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <ULabel for="username" class="text-right">Username</ULabel>
          <UInput id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <UDialogFooter>
        <UButton type="submit">Save changes</UButton>
      </UDialogFooter>
    </UDialogContent>
  </UDialog>
</template>
