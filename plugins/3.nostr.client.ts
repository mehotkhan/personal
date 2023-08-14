import { useStorage } from "@vueuse/core";
import { Event, getEventHash, getSignature, nip04 } from "nostr-tools";

import { relay, defaultRelays } from "../libs/nostr-relay";
import dexieDb from "../libs/dexie-tools";

import {
  incomingProfile,
  incomingEvent,
  incomingMessage,
  incomingGroupCreate,
  incomingGroupEvent,
  chatArchive,
  supportArchive,
  incomingSupportTicket,
} from "../libs/nostr-tools";

let lastResubscribed = Date.now();
const profile: any = useStorage("current-user", {});
// const lastOpened = useStorage('relay-last-opened', 0)

const reconnect = () => {
  if (Date.now() - lastResubscribed > 60 * 1000 * 1) {
    lastResubscribed = Date.now();
    // lastOpened.value = Math.floor(Date.now() / 1000)
    relay.reconnect();
  }
};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    reconnect();
  }
});
document.addEventListener("online", () => {
  reconnect();
});

relay.subscribe(
  [
    {
      kinds: [4],
      "#p": [profile.value.pub],
    },
    { kinds: [4], authors: [profile.value.pub] },
  ],
  defaultRelays,
  async (event: any, isAfterEose: any, relayURL: any) => {
    if (
      event.tags.find((tag: any) => tag[0] === "type" && tag[1] === "support")
    ) {
      await incomingSupportTicket(event);
    } else {
      await incomingMessage(event, relayURL, "public");
    }
  },
  undefined,
  undefined,
);

relay.onerror((err: any, relayUrl: any) => {
  console.log("RelayPool error", err, " from relay ", relayUrl);
});

relay.onnotice((relayUrl: any, notice: any) => {
  console.log("RelayPool notice", notice, " from relay ", relayUrl);
});

const incomingEvents = async (event: Event, relayURL: any, spaceId: string) => {
  switch (event.kind) {
    case 1:
      await incomingEvent(event, relayURL, spaceId);
      break;
    case 40:
      await incomingGroupCreate(event, relayURL, spaceId);
      break;
    case 42:
      await incomingGroupEvent(event, relayURL, spaceId);
      break;
  }
};

const publish = (event: any, relayUrl: string[]) => {
  relay.publish(event, relayUrl);
};

const publishMessage = async (
  message: string,
  sender: any,
  receiver: string,
) => {
  const encText = await nip04.encrypt(sender.priv, receiver, message);

  const newMessage: any = {
    kind: 4,
    content: encText,
    pubkey: sender.pub,
    created_at: Math.floor(Date.now() / 1000),
    tags: [["p", receiver]],
  };
  newMessage.id = getEventHash(newMessage);
  newMessage.sig = getSignature(newMessage, sender.priv);

  relay.publish(newMessage, defaultRelays);

  const newMessageDb = {
    ...newMessage,
    rawMessage: message,
    selfAuthored: true,
    send: true,
    seen: true,
  };
  await dexieDb?.messages.add(newMessageDb);
  await chatArchive(newMessageDb);
};
const publishSupportTicket = async (
  message: string,
  sender: any,
  ticketBody?: any,
) => {
  let receiver = "";
  if (profile.value.pub === ticketBody.operator) {
    receiver = ticketBody.owner;
  } else {
    receiver = ticketBody.operator;
  }
  const encText = await nip04.encrypt(
    sender.priv,
    receiver,
    JSON.stringify({
      message,
      ...ticketBody,
    }),
  );

  const newMessage: any = {
    kind: 4,
    content: encText,
    pubkey: sender.pub,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["p", receiver],
      ["type", "support"],
    ],
  };
  newMessage.id = getEventHash(newMessage);
  newMessage.sig = getSignature(newMessage, sender.priv);

  relay.publish(newMessage, defaultRelays);

  const newMessageDb = {
    ...newMessage,
    rawMessage: message,
    selfAuthored: true,
    send: false,
    seen: false,
    ticketId: ticketBody.id,
  };
  await dexieDb?.supportMessages.add(newMessageDb);
  await supportArchive(newMessageDb, ticketBody);
};

const relaySubscribe = (relayUrl: string, kinds: number[], spaceId: string) => {
  console.log("nostr", relayUrl, kinds);
  relay.logSubscriptions = true;

  const sub = relay.subscribe(
    [
      {
        kinds,
      },
    ],
    [relayUrl],
    (event: any, isAfterEose: any, relayURL: any) => {
      incomingEvents(event, relayURL, spaceId);
    },
    undefined,
    (events, relayURL) => {
      console.log(events, relayURL);
    },
  );
  return sub;
};
const relaySubscribeUser = (
  relayUrl: string[],
  users: string[],
  spaceId: string,
) => {
  const sub = relay.subscribe(
    [
      {
        kinds: [0],
        authors: users,
      },
    ],
    relayUrl,
    (event: any, isAfterEose: any, relayURL: any) => {
      incomingProfile(event, relayURL, spaceId);
    },
    undefined,
    undefined,
  );
  return sub;
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      relay,
      publish,
      publishSupportTicket,
      relaySubscribe,
      relaySubscribeUser,
      publishMessage,
    },
  };
});
