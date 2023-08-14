import dexieDb from "../libs/dexie-tools";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dexieDb,
    },
  };
});
