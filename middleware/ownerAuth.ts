export default defineNuxtRouteMiddleware(async (to, _) => {
  const isOwner = await useOwner();
  if (!isDev() && to.path === "/dashboard") {
    if (!isOwner) {
      return navigateTo("/");
    }
  }
});
