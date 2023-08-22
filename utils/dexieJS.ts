import { Event } from "nostr-tools";
import Dexie, { Table } from "dexie";

interface ChatArchive {
  id?: string;
  other: string;
  created_at?: string;
  updated_at?: string;
  lastMessage: string;
}

interface SupportArchive {
  id?: string;
  owner?: string;
  operator?: string;
  created_at?: string;
  updated_at?: string;
  lastMessage?: string;
  topic?: string;
  status?: "open" | "close" | "on-going" | "new";
}

class DexieDatabase extends Dexie {
  events!: Table<Event & { id: string; relayUrl: string; spaceId: string }>;
  groupsEvent!: Table<
    Event & { id: string; relayUrl: string; spaceId: string }
  >;

  groups!: Table<Event & { id: string; relayUrl: string; spaceId: string }>;
  messages!: Table<
    Event & {
      id: string;
      rawMessage: string;
      relayUrl: string;
      spaceId: string;
    }
  >;

  chatArchive!: Table<
    ChatArchive & { id: string; relayUrl?: string; spaceId?: string }
  >;

  profiles!: Table<Event & { id: string; relayUrl: string; spaceId: string }>;
  contact!: Table<{ id: string; relayUrl: string; spaceId: string }>;
  supportArchive!: Table<SupportArchive & { id: string }>;
  supportMessages!: Table<
    Event & { id: string; rawMessage: string; ticketId: string }
  >;

  constructor() {
    super("alizemani.ir");
    this.version(10).stores({
      events: "id, pubkey, created_at ,relayUrl ,spaceId",
      groupsEvent: "id, pubkey, created_at ,relayUrl ,spaceId",
      groups: "id, pubkey, created_at ,relayUrl ,spaceId",
      messages:
        "id, pubkey, rawMessage, created_at, selfAuthored, seen, send, topic ,relayUrl ,spaceId",
      chatArchive:
        "id, created_at, other, lastMessage, updated_at, lastSeen, relayUrl ,spaceId",
      profiles: "id, pubkey , created_at ,relayUrl ,spaceId",
      supportArchive:
        "id, created_at, owner, lastMessage, updated_at, lastSeen, topic, status ,operator",
      supportMessages:
        "id, pubkey, rawMessage, created_at, selfAuthored, seen, send, topic, ticketId",
    });
  }
}

export const DexieDB = new DexieDatabase();
