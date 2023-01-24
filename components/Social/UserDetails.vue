<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const { $irisPublic } = useNuxtApp();
const userName = ref("نام کاربری");
if ($irisPublic) {
  $irisPublic(props.pub)
    .get("profile")
    .get("name")
    .on((name: string) => {
      userName.value = name;
    });
}
</script>

<template>
  <!-- <img
              class="w-6 h-6 rounded-full"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              alt="Avatar of Jonathan Reinink"
            /> -->
  <span class="mr-2 text-lg font-normal">{{ userName }} </span>
</template>
