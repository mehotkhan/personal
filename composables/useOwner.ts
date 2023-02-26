const { $irisSession } = useNuxtApp();

export default async () => {
  const user = await $irisSession.getKey();
  try {
    const api = await $fetch("/owner/check", {
      method: "POST",
      body: {
        pub: user.pub,
      },
    });
    console.log(api);
    return true;
  } catch (error) {
    console.log("guest");
    return false;
  }
};
