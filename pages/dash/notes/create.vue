<script setup>
import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();
definePageMeta({
  layout: "dashboard",
});
useHead({
  title: "یادداشت‌ها",
});

const default_data = {
  time: 1692536739790,
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
    {
      id: "wlWN1zbKXJ",
      type: "paragraph",
      data: {
        text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      },
    },
    {
      id: "B2BwISSymX",
      type: "header",
      data: {
        text: "تیتر دوم",
        level: 2,
      },
    },
    {
      id: "xJVm7YikGp",
      type: "paragraph",
      data: {
        text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      },
    },
    {
      id: "CYrv0oiHK0",
      type: "header",
      data: {
        text: "تیتر سوم",
        level: 2,
      },
    },
    {
      id: "eN1ojPwuSa",
      type: "paragraph",
      data: {
        text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
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
  // const html = edjsParser.parse(dat.value);
  console.log(dat.value);
};
</script>
<template>
  <UCard class="w-full">
    <template #header>
      <div class="flex justify-between w-full items-center">
        <h2 class="text-xl">افزودن یادداشت</h2>
        <div>
          <UButtonGroup size="xl" class="border-gray-200 border px-1">
            <UButton
              variant="soft"
              label="انتشار"
              color="green"
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
    </template>

    <DashboardEditorJs v-model="dat" class="prose-xl px-20" />
  </UCard>
</template>
<style>
.codex-editor,
.ct {
  font-family: inherit !important;
}
.ce-block__content,
.ce-toolbar__content {
  max-width: 100%;
}
</style>
