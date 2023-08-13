<script setup lang="ts">
const toast = useToast();
let websocket: any = null;
const newMessagePrefix = "NEW-MESSAGE-ARRAY:";
onMounted(() => {
  websocket = new WebSocket(baseWebsocketURL());
  websocket.addEventListener("message", (event: any) => {
    if (event.data.startsWith(newMessagePrefix)) {
      const messages = event.data.slice(newMessagePrefix.length);
      const JsonMessages = JSON.parse(messages);
      console.log(JsonMessages);
    }
    // toast.add({ title: "Hello " + event.data });
    // console.log("Message received from server");
    // console.log(event.data);
  });
});

const sendAlert = () => {
  websocket.send("MESSAGE");
};
</script>
<template>
  <ClientOnly>
    <div class="flex">
      <UButton class="text-black" label="دینگ" @click="sendAlert()" />
    </div>
  </ClientOnly>
</template>
