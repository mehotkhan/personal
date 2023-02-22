const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();

export default defineNuxtRouteMiddleware(async () => {
  if (!isDev()) {
    try {
      await $fetch("/owner/check", {
        method: "POST",
        body: {
          pub: user.pub,
        },
      });
    } catch (error) {
      return navigateTo("/");
    }
  }
});
