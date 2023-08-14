<script setup>
const { getContactLists, contactLists, createNew } = useSupport();

onMounted(() => {
  getContactLists();
});
</script>
<template>
  <div
    class="bg-white rounded-xl w-full px-4 py-2 my-3 transition-all shadow-2xl relative text-sm"
  >
    <div
      class="flex w-full justify-between items-center border-b-2 mt-4 mb-0 border-brown"
    >
      <h3>دفترچه تماس‌ها</h3>
    </div>
    <ul class="mt-5 space-y-5 list-disc list-inside dark:text-gray-400">
      <div
        v-for="contact in contactLists"
        :key="contact.pub"
        class="flex justify-start items-center cursor-pointer border-b-2 pb-2 last:border-0 relative"
        @click="createNew(contact)"
      >
        <ProfileUserAvatar size="sm" :pub="contact.pub" class="w-10" />
        <div class="flex mr-4 flex-col">
          <span class="">
            {{ contact.name }}
          </span>
          <span class="text-xs">
            {{ contact.about }}
          </span>
        </div>
        <div
          class="absolute left-5 top-0 text-brown h-full flex items-center cursor-pointer"
        >
          <UTooltip :text="`گفتگو با ${contact.name}`">
            <IconUil:message
              class="flex text-md text-brown"
              aria-hidden="true"
            />
          </UTooltip>
        </div>
      </div>
    </ul>
  </div>
</template>
