import { Event } from "nostr-tools";
import Dexie, { Table } from "dexie";

interface DashboardNotes {
  id?: string;
  title: string;
  created_at?: number;
  updated_at?: number;
  description: string;
  poster: string;
  body: any;
  author: string;
  status: "draft" | "publish" | "published";
}

class DexieDatabase extends Dexie {
  dashboardNotes!: Table<DashboardNotes & { id: string }>;

  constructor() {
    super("dashboard");
    this.version(1).stores({
      dashboardNotes: "id, created_at, updated_at ,author ,status",
    });
  }
}

export const DexieDB = new DexieDatabase();
