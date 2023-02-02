<script setup lang="ts">
const { $irisPublic, $irisPrivate } = useNuxtApp();
const key = ref(0);
const archive = reactive(new Map());
$irisPublic()
  .get("inbox")
  .map()
  .once((inbox: any, key: string) => {
    if (inbox && !archive.has(inbox.date)) {
      archive.set(inbox.date, { ...inbox, key });
    }
  });
const sortedChats = computed(() => OrderInbox(Array.from(archive.values())));

const AcceptInbox = async (inbox: any) => {
  const replay = " درخواست شما تایید شد";
  await $irisPrivate(inbox.pub).send(replay);
  await $irisPublic().get("inbox").get(inbox.key).put(null);
  key.value = new Date().valueOf();
};
</script>
<template>
  <div class="mt-10 latest">
    <ul :key="key" reverse class="max-h-140 overflow-x-auto">
      <li
        v-for="item in sortedChats"
        :key="item.date"
        class="h-20 items-center cursor-pointer mr-8 group"
      >
        <a class="flex items-center justify-between group-hover:font-bold">
          <div class="flex items-center">
            <SocialUserDetails :pub="item.pub" />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400 ml-10">{{
              FromNow(item.date)
            }}</span>
            <div>
              <div
                class="ml-4 text-xs inline-flex items-center font-thin px-3 py-1 bg-green-200 text-green-700 rounded-full"
              >
                پشتیبانی
              </div>

              <div
                class="ml-4 text-xs inline-flex items-center font-thin px-3 py-1 bg-orange-200 text-orange-700 rounded-full"
              >
                عمومی
              </div>
              <button
                @click="AcceptInbox(item)"
                class="ml-4 text-xs inline-flex items-center font-thin px-3 py-1 bg-green-500 text-white rounded-full"
              >
                تایید
              </button>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
