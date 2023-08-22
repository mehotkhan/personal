<script setup lang="ts">
const props = defineProps({
  modelValue: {
    default: {},
  },
});

const emit = defineEmits(["update:modelValue"]);
const loadEditor = () => {
  const mainElement = document.getElementById("editorJs");
  if (mainElement !== null) {
    return editorJS(props.modelValue, (data: any) => {
      emit("update:modelValue", data);
    });
  } else {
    setTimeout(() => {
      loadEditor();
    }, 50);
  }
};
onMounted(() => {
  loadEditor();
});
</script>

<template>
  <div id="editorJs"></div>
</template>
