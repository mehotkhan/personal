import { useStorage, useStorageAsync } from "@vueuse/core";

const streamTimeLimit = useStorageAsync("stream-time-limit", timeFilter?.[1]);
const streamSorting = useStorageAsync("stream-sorting", streamOrder?.[0]);

const globalSpace = {
  title: "عمومی",
  about: "در فید عمومی قابل دسترسی است",
  spaceId: "global",
  picture: null,
  relay: defaultRelays[0],
};

const mySpaces: any = useStorage("my-spaces", [globalSpace]);
const currentSpace: any = useStorageAsync("current-space", globalSpace);

const streamLimit = ref(5);

export const useStream = () => {
  const getSince = computed(() => {
    return Math.floor(Date.now() / 1000) - streamTimeLimit.value.filter;
  });
  const getMySpaces = async () => {
    const { profile } = useUser();

    try {
      const api: any = await $fetch(baseApiURL() + "social/my-spaces", {
        method: "POST",
        body: {
          pub: profile.value.pub,
        },
      });
      const response: string[] = await JSON.parse(api);

      mySpaces.value = [globalSpace, ...response];
    } catch (error) {
      console.log(error);
    }
  };

  const changeSpace = (space: any) => {
    currentSpace.value = space;
  };

  return {
    streamTimeLimit,
    getSince,
    streamSorting,
    getMySpaces,
    changeSpace,
    mySpaces,
    currentSpace,
    streamLimit,
  };
};
