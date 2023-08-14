/* eslint-disable no-console */
import { Event, getEventHash, getSignature } from "nostr-tools";
import { useStorage } from "@vueuse/core";

const myGroups: any = useStorage("my-Groups", []);
const currentGroup = useStorage("current-Group", {});
let unSubscribe: null | Function = null;

export default () => {
  const { $publish, $dexieDb, $relaySubscribe } = useNuxtApp();
  const { profile } = useUser();
  const { currentSpace } = useStream();

  const createPublicGroup = (groupDetails: any) => {
    const content = JSON.stringify({ ...groupDetails });

    const newEvent: any = {
      kind: 40,
      content,
      pubkey: profile.value.pub,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
    };
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = getSignature(newEvent, profile.value.priv);
    $publish(newEvent, [currentSpace.value.relay]);
    return newEvent;
    // saveToCloud(newEvent)
  };
  const sendGroupStream = (message: string, groupId: string) => {
    const newEvent: any = {
      kind: 42,
      pubkey: profile.value.pub,
      created_at: Math.floor(Date.now() / 1000),
      content: message,
      tags: [["e", groupId]],
    };
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = getSignature(newEvent, profile.value.priv);

    $publish(newEvent, [currentSpace.value.relay]);
  };
  const sendGroupReplay = (
    message: string,
    parent: string,
    groupId: String,
  ) => {
    console.log(message, parent, groupId);
    const newEvent: any = {
      kind: 42,
      pubkey: profile.value.pub,
      created_at: Math.floor(Date.now() / 1000),
      content: message,
      tags: [
        ["e", groupId],
        ["e", parent],
      ],
    };
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = getSignature(newEvent, profile.value.priv);
    $publish(newEvent, [currentSpace.value.relay]);
  };
  // const saveToCloud = async (group: Event) => {
  //   const groupData = {
  //     groupId: group.id,
  //   }
  //   try {
  //     await $fetch(baseApiURL() + 'social/create-new-group', {
  //       method: 'POST',
  //       body: groupData,
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const getMyGroups = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "social/my-groups", {
        method: "POST",
        body: {
          pub: profile.value.pub,
        },
      });
      const response: string[] = await JSON.parse(api);

      myGroups.value = [globalChanel];

      response.forEach(async (groupId: string) => {
        const chanelData = await $dexieDb?.groups.get(groupId);
        if (chanelData) {
          const content = JSON.parse(chanelData?.content);
          myGroups.value.push({
            groupName: content?.name ?? "بدون نام",
            groupAbout: content?.about ?? "--",
            groupPicture: content?.picture ?? "--",
            date: chanelData?.created_at,
            groupId: groupId ?? "no",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const JoinGroup = async (groupId: string) => {
    try {
      await $fetch(baseApiURL() + "social/join-group", {
        method: "POST",
        body: {
          pub: profile.value.pub,
          groupId,
        },
      });
      getMyGroups();
    } catch (error) {
      console.log(error);
    }
  };
  const changeGroup = (Group: any) => {
    currentGroup.value = Group;
  };

  const startGroupStream = async () => {
    if (unSubscribe === null) {
      unSubscribe = $relaySubscribe(
        currentSpace.value.relay,
        [40, 41, 42, 43, 44],
        currentSpace.value.spaceId,
      );
    }
    //  else {
    //   unSubscribe = $relaySubscribe(
    //     currentSpace.value.relay,
    //     [40, 41, 42, 43, 44],
    //     currentSpace.value.spaceId,
    //   )
    // }
  };
  onUnmounted(() => {
    console.log("unmount groups");
    if (unSubscribe !== null) unSubscribe();
  });
  return {
    createPublicGroup,
    getMyGroups,
    myGroups,
    changeGroup,
    currentGroup,
    startGroupStream,
    JoinGroup,
    sendGroupStream,
    sendGroupReplay,
  };
};
