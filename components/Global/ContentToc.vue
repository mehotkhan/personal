<!-- eslint-disable vue/require-v-for-key -->
<script setup lang="ts">
import { Ref } from "vue";
// import { useContent } from "~/stores/content";

const content = useContent();
const route = useRoute();
const router = useRouter();

const sliderHeight = useState("sliderHeight", () => 0);
const sliderTop = useState("sliderTop", () => 0);
const tocLinksH2: Ref<Array<HTMLElement>> = ref([]);
const tocLinksH3: Ref<Array<HTMLElement>> = ref([]);

const { data: blogPost } = await useAsyncData(`blogToc`, () =>
  queryContent(
    route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path
  ).findOne()
);
const tocLinks = computed(() => blogPost.value?.body.toc.links ?? []);
const dir = computed(() => blogPost.value?.dir);
const tocTags = computed(() => blogPost.value?.tags ?? []);

const onClick = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    router.push({ hash: `#${id}` });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
</script>

<template>
  <div class="px-3 md:p-0 mb-5">
    <h4
      class="text-xl md:text-2xl text-bold pb-2 mb-5 border-b border-dashed border-gray-400"
    >
      سرفصل‌ها
    </h4>
    <nav class="flex" :class="dir === 'ltr' ? 'ltr' : 'rtl'">
      <div class="relative bg-secondary w-0.5 rounded">
        <div
          class="absolute left-0 w-full transition-all duration-200 rounded bg-red-500"
          :style="{ height: `${sliderHeight}px`, top: `${sliderTop}px` }"
        ></div>
      </div>
      <ul class="max-h-150 overflow-auto">
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          ref="tocLinksH2"
          class="font-regular cursor-pointer text-md md:text-xl pb-3 mb-2 last:mb-0 mx-5"
          :class="{
            'font-normal':
              id ===
              (content.currentSection.length > 0
                ? content.currentSection
                : route.hash.replace('#', '')),
          }"
          @click="onClick(id)"
        >
          {{ text }}
          <ul v-if="children" class="ml-3 my-2">
            <li
              v-for="{ id: childId, text: childText } in children"
              :id="`toc-${childId}`"
              :key="childId"
              ref="tocLinksH3"
              class="cursor-pointer font-thin text-sm md:text-lg list-none ml-0 mb-2 last:mb-0"
              :class="{
                'font-normal':
                  childId ===
                  (content.currentSection.length > 0
                    ? content.currentSection
                    : route.hash.replace('#', '')),
              }"
              @click.stop="onClick(childId)"
            >
              {{ childText }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div v-if="tocTags?.length > 0">
      <h4
        class="text-xl md:text-2xl text-bold pb-2 my-5 border-b border-dashed border-gray-400"
      >
        برچسب‌ها
      </h4>
      <ol class="mb-10" :class="dir === 'ltr' ? 'ltr text-left' : 'rtl'">
        <li
          v-for="tag in tocTags"
          :key="tag"
          class="text-md md:text-xl pb-3 mx-"
        >
          <span class="font-thin text-2xl">#</span> {{ tag }}
        </li>
      </ol>
    </div>
  </div>
</template>
