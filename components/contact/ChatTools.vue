<script setup lang="ts">
import { Ref } from "vue";
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});

const currentSection = ref<null | string>("");
const nuxtContent = ref(null);
const observer: Ref<IntersectionObserver | null | undefined> = ref(null);
const observerOptions = reactive({
  root: nuxtContent.value,
  threshold: 0.5,
});
const router = useRouter();
const sliderHeight = useState("sliderHeight", () => 0);
const sliderTop = useState("sliderTop", () => 0);
const tocLinksH2: Ref<Array<HTMLElement>> = ref([]);
// const tocLinksH3: Ref<Array<HTMLElement>> = ref([]);

const tocLinks = computed(() => []);

const onClick = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    router.push({ hash: `#${id}` });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        currentSection.value = id;
      }
    });
  }, observerOptions);
  document
    .querySelectorAll(".content h2[id], .content h3[id]")
    .forEach((section) => {
      observer.value?.observe(section);
    });
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div class="px-3 md:p-0 mb-5">
    <h4
      class="text-xl md:text-2xl text-bold pb-2 mb-5 border-b border-dashed border-gray-400"
    >
      ابزار ها
    </h4>
    <nav class="flex">
      <div class="relative bg-secondary w-0.5 rounded">
        <div
          class="absolute left-0 w-full transition-all duration-200 rounded bg-red-500"
          :style="{ height: `${sliderHeight}px`, top: `${sliderTop}px` }"
        ></div>
      </div>
      <ul class="max-h-150 overflow-auto">
        <li>بایگانی</li>
        <li>فایل ها</li>
        <li>مستندات</li>
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          ref="tocLinksH2"
          class="font-thin cursor-pointer text-md md:text-xl pb-3 mb-2 last:mb-0 mx-5"
          :class="{
            'font-bold': id === currentSection,
          }"
          @click="onClick(id)"
        >
          بایگانی
        </li>
      </ul>
    </nav>
  </div>
</template>
