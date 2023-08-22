<template>
  <div class="mermaid flex justify-center">
    <slot></slot>
  </div>
</template>

<script setup>
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "neutral",
  fontFamily: "Farhang",
});
onMounted(() => {
  mermaid.init();
});
</script>
