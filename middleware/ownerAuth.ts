const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();

export default defineNuxtRouteMiddleware(async (to, _) => {
  if (!isDev()) {
    try {
      const api: string = await $fetch("/check-admin", {
        method: "POST",
        body: {
          pub: user.pub,
        },
      });
      const response = JSON.parse(api);
      if (!response) {
        return navigateTo("/");
      }
    } catch (error) {}
  }
});
