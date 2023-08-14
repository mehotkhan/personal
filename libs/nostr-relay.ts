import { RelayPool } from "nostr-relaypool";

const defaultRelays = ["wss://nostr.alizemani.ir"];

const relay = new RelayPool(undefined, {
  useEventCache: true,
  autoReconnect: true,
  logErrorsAndNotices: true,
});

export { relay, defaultRelays };
