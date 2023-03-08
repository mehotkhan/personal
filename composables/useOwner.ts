export default async () => {
  const { $irisSession } = useNuxtApp();
  try {
    const user = await $irisSession.getKey();
    await $fetch("/owner/check", {
      method: "POST",
      body: {
        pub: user.pub,
      },
    });
    // console.log(api);
    return true;
  } catch (error) {
    // console.log("guest");
    return false;
  }
};
