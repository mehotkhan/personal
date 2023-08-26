import { RelayPool } from "nostr-relaypool";

export const defaultRelays = ["wss://nostr.alizemani.ir"];

const relay = new RelayPool(undefined, {
  useEventCache: true,
  autoReconnect: true,
  logErrorsAndNotices: true,
});
