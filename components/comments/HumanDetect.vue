<template>
  <div class="flex justify-start items-center">
    <Turnstile
      :key="key"
      v-model="token"
      class="flex w-75 h-16 bg-gray rounded-md overflow-hidden"
      :options="{ action: 'vue' }"
    />
    <button
      class="flex mr-3 text-sm h-auto cursor-pointer items-center"
      :class="validated ? 'text-green-400' : 'text-red-400'"
      @click="reRender()"
    >
      <IconMdi:reload class="ml-2 text-xl" />
    </button>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits({
  passed: (pass: boolean) => pass,
});

const key = ref(Date.now());
const token = ref("");
const validated = ref(false);

watch(token, async (newToken, oldToken) => {
  if (newToken.length > 0) {
    onSubmit();
  }
});

const reRender = () => {
  emit("passed", false);
  validated.value = false;
  key.value = Date.now();
};

const onSubmit = async () => {
  const api: string = await $fetch("/human-detect", {
    method: "POST",
    body: {
      token: token.value,
    },
  });
  try {
    const response = JSON.parse(api);
    if (response?.success) {
      emit("passed", true);
      validated.value = true;
    } else {
      emit("passed", false);
    }
  } catch (error) {
    emit("passed", false);
  }
};
onMounted(() => {
  key.value = Date.now();
});
</script>
