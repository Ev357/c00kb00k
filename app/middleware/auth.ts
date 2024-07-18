export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  const localePath = useLocalePath();
  const getRouteBaseName = useRouteBaseName();
  const routeBaseName = getRouteBaseName(to);

  const isAuthPath = ["login", "signup"].some((path) => path === routeBaseName);

  if (user.value) {
    if (isAuthPath) {
      return navigateTo(localePath("/"));
    }

    return;
  }

  if (isAuthPath) return;

  return navigateTo(localePath("/login"));
});
