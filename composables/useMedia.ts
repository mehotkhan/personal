export default () => {
  const uploadAvatar = async (image: string, pub: string) => {
    const mediaData = {
      image,
      pub,
    };
    await $fetch(baseApiURL() + "media/upload-avatar", {
      method: "POST",
      body: mediaData,
    });
  };
  const getAvatar = async (pub: string) => {
    try {
      const avatar = await $fetch(baseApiURL() + "media/get-user-avatar", {
        method: "GET",
        params: {
          pub,
        },
      });
      return avatar;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { uploadAvatar, getAvatar };
};
