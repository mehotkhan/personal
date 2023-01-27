<template>
  <div class="mermaid flex justify-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    import("mermaid/dist/mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
        theme: "neutral",
        fontFamily: "Farhang",
      });
      m.init();
    });
  },
};
</script>
