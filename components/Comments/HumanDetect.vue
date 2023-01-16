<template>
  <div class="flex justify-start align-middle">
    <Turnstile
      class="flex w-75 h-15 bg-gray"
      :key="key"
      v-model="token"
      :options="{ action: 'vue' }"
    />
    <button
      @click="reRender()"
      class="flex mr-3 text-xl h-auto cursor-pointer items-center"
      :class="validated ? 'text-green-400' : 'text-red-400'"
    >
    من ربات نیستم؟
    <IconMdi:reload class="mr-1"/>
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
    console.log(api);
    emit("passed", false);
  }
};
</script>
