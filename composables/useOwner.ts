const { $irisSession } = useNuxtApp();

export default async () => {
  try {
    const user = await $irisSession.getKey();
    await $fetch("/owner/check", {
      method: "POST",
      body: {
        pub: user.pub,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
