const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();

export default defineNuxtRouteMiddleware(async (to, from) => {
  const api: string = await $fetch("/check-admin", {
    method: "POST",
    body: {
      pub: user.pub,
    },
  });

  if (!isDev()) {
    try {
      const response = JSON.parse(api);
      if (to.fullPath.startsWith("/dashboard") && !response) {
        return navigateTo("/");
      }
    } catch (error) {
      return navigateTo("/");
    }
  }
});
