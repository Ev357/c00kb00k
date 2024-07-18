export const useModeToggle = () => {
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === "dark");

  function toggleDark() {
    colorMode.preference = isDark.value ? "light" : "dark";
  }

  return { toggleDark, isDark };
};
