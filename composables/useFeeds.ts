import { getEventHash, getSignature } from "nostr-tools";
let unSubscribe: null | Function = null;

export const useFeeds = () => {
  const { $publish, $relaySubscribe } = useNuxtApp();
  const { profile } = useUser();
  const { currentSpace } = useStream();

  const sendStream = (message: string) => {
    sendGlobalStream(message);
  };

  const sendGlobalStream = (message: string) => {
    const newEvent: any = {
      kind: 1,
      pubkey: profile.value.pub,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: message,
    };
    console.log(newEvent);
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = getSignature(newEvent, profile.value.priv);

    $publish(newEvent, [currentSpace.value.relay]);
  };

  const sendReplay = (message: string, parent: string) => {
    const newEvent: any = {
      kind: 1,
      pubkey: profile.value.pub,
      created_at: Math.floor(Date.now() / 1000),
      tags: [["e", parent]],
      content: message,
    };
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = getSignature(newEvent, profile.value.priv);
    $publish(newEvent, [currentSpace.value.relay]);
  };

  const startFeedStream = async () => {
    if (unSubscribe === null) {
      unSubscribe = $relaySubscribe(
        currentSpace.value.relay,
        [1],
        currentSpace.value.spaceId,
      );
    }
    // else {
    //   unSubscribe = $relaySubscribe(
    //     currentSpace.value.relay,
    //     [1],
    //     currentSpace.value.spaceId,
    //   )
    // }
  };
  onUnmounted(() => {
    console.log("unmount feeds");
    if (unSubscribe !== null) unSubscribe();
  });
  return {
    sendStream,
    sendReplay,
    startFeedStream,
  };
};
