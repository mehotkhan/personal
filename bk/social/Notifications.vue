<script setup lang="ts">
const { getSince, currentSpace } = useStream();
const { startPersonChat } = useMessages();
const { $dexieDb } = useNuxtApp();

const unSeenCount: any = useLiveQuery(
  async () =>
    await $dexieDb?.messages
      .orderBy("created_at")
      .filter(
        (message: any) => !message.seen && message.created_at > getSince.value,
      )
      .count(),

  [currentSpace, getSince],
);
const latestMessages: any = useLiveQuery(
  async () =>
    await $dexieDb?.messages
      .orderBy("created_at")
      .filter(
        (message: any) => !message.seen && message.created_at > getSince.value,
      )
      .reverse()
      .toArray(),

  [currentSpace, getSince],
);

let groupedItems: any[] = [];
let items: any[] = [];

const newItems = computed(() => {
  latestMessages?.value?.forEach((message: any) => {
    if (!groupedItems.includes(message.pubkey)) {
      groupedItems.push(message.pubkey);
      items.push([
        {
          pubkey: message.pubkey,
          lastMessage: message.rawMessage,
          date: message.created_at,
          count: 1,
          click: () => {
            seenAll(message.pubkey);
          },
        },
      ]);
    } else {
      items = items.map((item: any) =>
        item[0].pubkey === message.pubkey
          ? [
              {
                ...item[0],
                count: item[0].count + 1,
              },
            ]
          : item,
      );
    }
  });
  return items;
});

const seenAll = async (pubkey: string) => {
  groupedItems = [...groupedItems.filter((item: string) => item !== pubkey)];
  items = [...items.filter((item: any) => item[0].pubkey !== pubkey)];
  await $dexieDb?.messages.where("pubkey").equals(pubkey).modify({
    seen: true,
  });
  startPersonChat(pubkey);
};
</script>

<template>
  <UDropdown
    :key="unSeenCount"
    :items="newItems"
    :ui="{ width: 'w-[27rem]' }"
    :popper="{ placement: 'bottom-start' }"
  >
    <IconUil:bell
      class="text-lg mx-2 cursor-pointer z-5 relative"
      aria-hidden="true"
    />
    <UBadge
      v-if="unSeenCount > 0"
      :label="String(unSeenCount)"
      :ui="{ rounded: 'rounded-full', padding: 'padding-1' }"
      class="absolute left-4 bottom-3 z-3"
    />

    <template #item="{ item }">
      <div class="w-full flex justify-between items-center">
        <div class="flex justify-start gap-3 items-center">
          <ProfileUserAvatar :pub="item.pubkey" size="xs" />
          <div class="mr-2">
            <ProfileUserName :pub="item.pubkey" :support="true" />
          </div>
          <div class="mr-2">{{ item.lastMessage }}</div>
        </div>
        <div class="text-[.5rem]">
          {{ FromNow(item.date * 1000) }}
          <UBadge
            :label="String(item.count)"
            size="xs"
            :ui="{ rounded: 'rounded-full', padding: 'padding-1' }"
            class="mr-3"
          />
        </div>
      </div>
    </template>
  </UDropdown>
</template>
