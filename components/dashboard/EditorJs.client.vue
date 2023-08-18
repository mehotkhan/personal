<script setup>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const props = defineProps({
  modelValue: {
    default: {},
  },
});

const emit = defineEmits(["update:modelValue"]);
let editor = null;
const loadEditor = () => {
  const mainElement = document.getElementById("editorJs");
  if (!editor && mainElement !== null) {
    editor = new EditorJS({
      holder: "editorJs",
      minHeight: 0,
      tools: {
        header: Header,
        list: List,
      },
      onChange: (api, event) => {
        api.saver.save().then(async (data) => {
          emit("update:modelValue", data);
        });
      },
      data: props.modelValue,
      logLevel: "ERROR",
      i18n: {
        /**
         * Text direction
         */
        direction: "rtl",
      },
    });
  }
};
onMounted(() => {
  loadEditor();
});
onUpdated(() => {
  loadEditor();
});
</script>

<template>
  <div id="editorJs"></div>
</template>
