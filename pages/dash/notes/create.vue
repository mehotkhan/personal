<script setup>
import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();

useHead({
  title: "یادداشت‌ها",
});

const default_data = {
  time: 1692349157454,
  blocks: [
    {
      id: "bOra4Pll7F",
      type: "header",
      data: {
        text: "به پنل اولیه خوش آمدید :)",
        level: 2,
      },
    },
    {
      id: "RvT_q8aWdI",
      type: "paragraph",
      data: {
        text: "همه چیز در حال تست و اماده سازی است .",
      },
    },
    {
      id: "_RXK_tgmUp",
      type: "paragraph",
      data: {
        text: "لذا صبور باشید .",
      },
    },
  ],
  version: "2.27.2",
};
const dat = ref(default_data);

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      shortcuts: ["D"],
      disabled: true,
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      shortcuts: ["⌘", "D"],
    },
  ],
];
const save = () => {
  const html = edjsParser.parse(dat.value);
  console.log(html);
};
</script>
<template>
  <section class="flex flex-col justify-center content-center mt-5">
    <div class="flex justify-between w-full border-b pb-5 items-center">
      <h3 class="m-0">افزودن یادداشت</h3>
      <div>
        <UButtonGroup size="xl" class="border-gray-200 border px-1">
          <UButton
            variant="soft"
            label="انتشار"
            color="white"
            @click="save()"
          />
          <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton
              class="px-3"
              variant="soft"
              :padded="false"
              :ui="{ rounded: 'rounded-0', ring: 'ring-0' }"
              icon="i-heroicons-chevron-down-20-solid"
              color="gray"
            />
          </UDropdown>
        </UButtonGroup>
      </div>
    </div>

    <DashboardEditorJs v-model="dat" />
  </section>
</template>
<style>
.codex-editor,
.ct {
  font-family: inherit !important;
}
</style>
