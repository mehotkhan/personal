<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";

const products = ref();
products.value = await queryContent("market").find();
</script>

<template>
  <br />
  <TabGroup>
    <TabList class="flex w-full">
      <Tab as="template" key="nfts" v-slot="{ selected }">
        <button
          :class="[
            'w-full py-2.5 text-xl',
            selected
              ? 'bg-gray-300 text-black-300 rounded-sm '
              : 'hover:bg-gray-200 hover:text-black',
          ]"
        >
          محصولات مرتبط
        </button>
      </Tab>
      <Tab as="template" key="comments" v-slot="{ selected }">
        <button
          :class="[
            'w-full py-2.5 text-xl',
            selected
              ? 'bg-gray-300 text-black-300 rounded-sm '
              : 'hover:bg-gray-200 hover:text-black',
          ]"
        >
          دیدگاه ‌ها
        </button>
      </Tab>
      <Tab as="template" key="selling" v-slot="{ selected }">
        <button
          :class="[
            'w-full py-2.5 text-xl',
            selected
              ? 'bg-gray-300 text-black-300 rounded-sm '
              : 'hover:bg-gray-200 hover:text-black',
          ]"
        >
          وضعیت فروش
        </button>
      </Tab>
    </TabList>

    <TabPanels class="mt-2">
      <TabPanel key="nft" :class="['rounded-xl bg-white p-3']">
        <div class="latest my-10 text-2xl">محصولات فروشگاه مربوط</div>
      </TabPanel>
      <TabPanel key="comments" :class="['rounded-xl bg-white p-3']">
        <Comments />
      </TabPanel>
      <TabPanel key="selling" :class="['rounded-xl bg-white p-3']">
        چارت ها
      </TabPanel>
    </TabPanels>
  </TabGroup>
  <br />
  <br />
</template>
