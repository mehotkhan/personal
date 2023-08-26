<script setup lang="ts">
import { useStorageAsync } from "@vueuse/core";

const props = defineProps({
  userId: { type: String, required: true, default: "" },
});

const activeTab = useStorageAsync("profile-active-tab", "posts");
const tabLists = [
  {
    title: "پست ها",
    key: "posts",
  },
  {
    title: "گروه ها",
    key: "groups",
  },
];
const changeTab = (tab: string) => {
  activeTab.value = tab;
};
</script>
<template>
  <div class="">
    <div class="border-b border-gray-300 dark:border-gray-700 mb-4">
      <ul class="flex flex-wrap -mb-px">
        <li
          v-for="tab in tabLists"
          :key="tab.key"
          class="mr-2"
          role="presentation"
        >
          <button
            :class="
              activeTab === tab.key ? 'border-orange' : 'border-transparent'
            "
            class="inline-block text-gray-500 hover:text-gray-600 hover:border-orange rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
            type="button"
            role="tab"
            @click="changeTab(tab.key)"
          >
            {{ tab.title }}
          </button>
        </li>
      </ul>
    </div>
    <ProfilePostTimeline v-if="activeTab === 'posts'" :user-id="props.userId" />
    <ProfileGroupsTimeline
      v-if="activeTab === 'groups'"
      :user-id="props.userId"
    />
  </div>
</template>
