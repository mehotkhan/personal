<script lang="ts" setup>
const { $irisPublic, $irisPrivate, $irisSession } = useNuxtApp();

const CreateNew = async () => {
  const user = $irisSession.getKey();
  try {
    const api: string = await $fetch("/contact/new-request", {
      method: "GET",
    });
    const response = JSON.parse(api);
    const { certs, pub } = response;
    const request = {
      pub: user.pub,
      date: new Date().valueOf(),
    };
    const certificate = `SEA${JSON.stringify(certs)
      .substring(0, JSON.stringify(certs).length - 1)
      .substring(1)
      .replace(/\\/g, "")}`;
    $irisPublic(pub)
      .get("inbox")
      .get(user.pub)
      .put(request, null, {
        opt: { cert: certificate },
      });
    $irisPrivate(pub).send("شروع مکالمه");
  } catch (error) {
    console.log("cant get admin pub , test area");
  }
};
</script>

<template>
  <ul class="w-full mr-5 list-disc text-xl mt-5">
    <li>
      <button @click="CreateNew()">ایجاد پیام پشتیبانی</button>
    </li>
    <li>ایجاد پیام عمومی</li>
  </ul>
</template>
