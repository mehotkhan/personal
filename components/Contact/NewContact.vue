<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
const { $irisSession, $irisPrivate } = useNuxtApp();

const CreateNew = async () => {
  try {
    const api: string = await $fetch("/create-contact-request", {
      method: "GET",
    });
    const response = JSON.parse(api);
    console.log(response);
    const { certs, pub } = response;
    // send contact request
    // start new chat

    $irisPrivate(pub).send("شروع مکالمه");
    //   directMessage.startChat(response);
  } catch (error) {
    //   const user = $irisSession.getKey();
    //   directMessage.startChat(user.pub);
    console.log("cant get admin pub , test area");
  }
};
</script>

<template>
  <ul class="h-100 w-full mr-5 list-disc text-2xl mt-10">
    <li>
      <button @click="CreateNew()">ایجاد پیام پشتیبانی</button>
    </li>
    <li>ایجاد پیام عمومی</li>
  </ul>
</template>
