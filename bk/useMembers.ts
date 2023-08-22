import { useStorageAsync } from "@vueuse/core";
import * as Structured from "@worker-tools/structured-json";

const publicMembers = useStorageAsync("public-members", [""]);
const { profile } = useUser();
const isPublicMember = ref(false);

export default () => {
  const checkMembers = async () => {
    if (!isDev()) {
      try {
        const pub = profile.value.pub;
        await $fetch(baseApiURL() + "social/check-members", {
          method: "POST",
          body: {
            pub,
          },
        });
        isPublicMember.value = true;
        return true;
      } catch (error) {
        isPublicMember.value = false;
        return false;
      }
    } else {
      isPublicMember.value = true;
      return true;
    }
  };

  const getPublicMembers = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "social/get-members", {
        method: "GET",
      });
      const response: any[] = Structured.parse(api);
      if (response?.length) {
        publicMembers.value = response;
      }
    } catch (error) {}
  };

  return {
    getPublicMembers,
    checkMembers,
    publicMembers,
    isPublicMember,
  };
};
