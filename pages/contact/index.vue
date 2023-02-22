<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const isOwner = await useOwner();

useHead({
  title: "پیام‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center mt-10">
      <div class="flex items-start flex-col">
        <h3 class="flex text-5xl">صندوق ورودی</h3>
        <p class="text-red-600 text-md font-bo">
          این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد!
        </p>
      </div>
    </div>
    <div class="flex relative">
      <TabGroup
        as="div"
        class="content basis-3/4 ml-10 rtl p-0 relative flex flex-col"
      >
        <TabList class="border-b-1 pb-1 pt-4 w-full h-23 sticky top-0 bg-white">
          <Tab
            v-if="isDev() || isOwner"
            v-slot="{ selected }"
            as="template"
            class="pl-10 cursor-pointer"
          >
            <span
              :class="{
                'font-bold': selected,
              }"
            >
              پیام های جدید
            </span>
          </Tab>

          <Tab v-slot="{ selected }" as="template" class="pl-10 cursor-pointer">
            <span
              :class="{
                'font-bold': selected,
              }"
              >بایگانی
            </span></Tab
          >
        </TabList>
        <TabPanels>
          <TabPanel v-if="isDev() || isOwner"> <ContactOwnerInbox /></TabPanel>
          <TabPanel> <ContactArchive /> </TabPanel>
        </TabPanels>
      </TabGroup>
      <div class="relative basis-1/4">
        <ContactQuickTools class="left-0 sticky top-10" />
      </div>
    </div>
  </section>
</template>
