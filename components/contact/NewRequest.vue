<script lang="ts" setup>
const { $irisPublic, $irisPrivate, $irisSession } = useNuxtApp();

const CreateNew = async () => {
  const user = $irisSession.getKey();
  try {
    const api: string = await $fetch("/create-contact-request", {
      method: "GET",
    });
    const response = JSON.parse(api);
    console.log(response);
    const { certs, pub } = response;
    // send contact request
    // start new chat
    const request = {
      pub: user.pub,
      date: new Date().valueOf(),
    };
    $irisPublic(pub)
      .get("inbox")
      .get(user.pub)
      .put(request, null, {
        opt: { cert: certs },
      });
    $irisPrivate(pub).send("شروع مکالمه");
  } catch (error) {
    console.log("cant get admin pub , test area");
  }
};
</script>

<template>
  <ul class="w-full mr-5 list-disc text-2xl mt-10">
    <li>
      <button @click="CreateNew()">ایجاد پیام پشتیبانی</button>
    </li>
    <li>ایجاد پیام عمومی</li>
  </ul>
</template>
