import { Event, nip04 } from "nostr-tools";
import throttle from "lodash/throttle";

import { useStorage } from "@vueuse/core";
import { WebUUID } from "web-uuid";
import dexieDb from "./dexie-tools";

const profile: any = useStorage("current-user", {});

// social Handler

export const incomingEvent = async (
  event: Event,
  relayUrl: string,
  spaceId: string,
) => {
  const existEvent = await dexieDb?.events.get(event.id);
  if (!existEvent) {
    await dexieDb?.events.add({ ...event, relayUrl, spaceId });
  }
};

export const incomingProfile = async (
  event: Event,
  relayUrl: string,
  spaceId: string,
) => {
  // console.log('profile incoming')
  const existProfile = await dexieDb?.profiles.get({ pubkey: event.pubkey });
  if (!existProfile) {
    await dexieDb?.profiles.add({ ...event, relayUrl, spaceId });
  } else {
    await dexieDb?.profiles
      .where("pubkey")
      .equals(event.pubkey)
      .modify({
        ...event,
      });
  }
};

// messenger Handler

export const chatArchive = throttle(async (event: any) => {
  let other = "";
  if (event.pubkey === profile.value.pub) {
    other = event.tags.find((tag: any) => tag[0] === "p")[1];
  } else {
    other = event.pubkey;
  }
  const existArchive = await dexieDb?.chatArchive.get({ other });

  try {
    if (!existArchive) {
      const id = String(new WebUUID());
      await dexieDb?.chatArchive.add({
        id,
        other,
        created_at: event.created_at,
        updated_at: event.created_at,
        lastMessage: event.rawMessage,
      });
    } else {
      await dexieDb?.chatArchive.where("other").equals(other).modify({
        updated_at: event.created_at,
        lastMessage: event.rawMessage,
      });
    }
  } catch (error) {}
}, 100);

export const incomingMessage = async (
  event: Event,
  relayUrl: string,
  spaceId: string,
) => {
  const existEvent = await dexieDb?.messages.get({ id: event.id });
  if (existEvent) {
    await dexieDb?.messages.where("id").equals(event.id).modify({
      send: true,
    });
  } else if (
    event.tags.some(
      (tag: any) => tag[0] === "p" && tag[1] === profile.value.pub,
    )
  ) {
    const rawMessage = await nip04.decrypt(
      profile.value.priv,
      event.pubkey,
      event.content,
    );
    await dexieDb?.messages.add({ ...event, rawMessage, relayUrl, spaceId });
    await chatArchive({ ...event, rawMessage });
  }
};

// group Handler

export const incomingGroupCreate = async (
  event: Event,
  relayUrl: string,
  spaceId: string,
) => {
  const existEvent = await dexieDb?.groups.get(event.id);
  if (!existEvent) {
    try {
      await dexieDb?.groups.add({ ...event, relayUrl, spaceId });
    } catch (error) {}
  }
};

export const incomingGroupEvent = async (
  event: Event,
  relayUrl: string,
  spaceId: string,
) => {
  const existEvent = await dexieDb?.groupsEvent.get(event.id);
  if (!existEvent) {
    await dexieDb?.groupsEvent.add({ ...event, relayUrl, spaceId });
  }
};
// Support Handler
export const incomingSupportTicket = async (event: Event) => {
  const existEvent = await dexieDb?.messages.get({ id: event.id });
  if (existEvent) {
    await dexieDb?.supportMessages.where("id").equals(event.id).modify({
      send: true,
    });
  } else {
    try {
      const ticketContent = await nip04.decrypt(
        profile.value.priv,
        event.pubkey,
        event.content,
      );
      const ticketData = await JSON.parse(ticketContent);
      await dexieDb?.supportMessages.add({
        ...event,
        rawMessage: ticketData.message,
        ticketId: ticketData.id,
      });
      await supportArchive(event, ticketData);
    } catch (error) {}
  }
};

export const supportArchive = throttle(async (event: any, ticket: any) => {
  const existArchive = await dexieDb?.supportArchive.get(ticket.id);

  try {
    if (!existArchive) {
      await dexieDb?.supportArchive.add({
        id: ticket.id,
        owner: event.pubkey,
        operator: event.tags.find((tag: any) => tag[0] === "p")[1],
        created_at: event.created_at,
        updated_at: event.created_at,
        lastMessage: ticket.message,
        topic: ticket.topic,
        status: ticket.status,
      });
    } else {
      await dexieDb?.supportArchive.where("id").equals(ticket.id).modify({
        updated_at: event.created_at,
        lastMessage: event.rawMessage,
        status: ticket.status,
      });
    }
  } catch (error) {}
}, 100);
