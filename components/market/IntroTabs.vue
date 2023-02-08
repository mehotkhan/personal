<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";

const products = ref();
products.value = await queryContent("market").find();
</script>

<template>
  <h3 class="text-4xl bold border-b-1 py-8">نمایی کلی</h3>
  <br />
  <TabGroup>
    <TabList class="flex w-full">
      <Tab key="latest -mt-4" v-slot="{ selected }" as="template">
        <button
          :class="[
            'w-full py-2.5 text-2xl',
            selected
              ? 'bg-gray-300 text-black-300 rounded-sm '
              : 'hover:bg-gray-200 hover:text-black',
          ]"
        >
          جدیدترین محصولات
        </button>
      </Tab>
      <Tab key="most-selling" v-slot="{ selected }" as="template">
        <button
          :class="[
            'w-full py-2.5 text-2xl',
            selected
              ? 'bg-gray-300 text-black-300 rounded-sm '
              : 'hover:bg-gray-200 hover:text-black',
          ]"
        >
          پرفروش ترین محصولات
        </button>
      </Tab>
      <Tab key="latest -mt-4-comment" v-slot="{ selected }" as="template">
        <button
          :class="[
            'w-full py-2.5 text-2xl',
            selected
              ? 'bg-gray-300 text-black-300 rounded-sm '
              : 'hover:bg-gray-200 hover:text-black',
          ]"
        >
          جدیدترین نظرات
        </button>
      </Tab>
    </TabList>

    <TabPanels class="mt-2">
      <TabPanel key="latest -mt-4" :class="['rounded-xl bg-white p-3']">
        <div class="latest -mt-4 text-2xl">
          <ul>
            <li
              v-for="{ _path: slug, title, date, category } in orderByDate(
                products
              )"
              :key="slug"
              class="mb-2"
            >
              <NuxtLink :to="slug">
                {{ title }}
                <span class="font-thin"> / {{ JalaliDate(date) }} </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </TabPanel>
      <TabPanel key="most-selling" :class="['rounded-xl bg-white p-3']">
        <div class="latest -mt-4 text-2xl">
          <ul>
            <li
              v-for="{ _path: slug, title, date, category } in orderByDate(
                products
              )"
              :key="slug"
              class="mb-2"
            >
              <NuxtLink :to="slug">
                {{ title }}
                <span class="font-thin"> / {{ JalaliDate(date) }} </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </TabPanel>
      <TabPanel key="latest -mt-4-comment" :class="['rounded-xl bg-white p-3']">
        <br />
        <p class="text-xl">آخرین نظرات و دیدگاه های فروشگاه</p>
      </TabPanel>
    </TabPanels>
  </TabGroup>
  <br />
  <br />
</template>
