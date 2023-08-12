<script setup lang="ts">
const toast = useToast();
let websocket: any = null;
onMounted(() => {
  websocket = new WebSocket(baseWebsocketURL());
  websocket.addEventListener("message", (event: any) => {
    toast.add({ title: "Hello " + event.data });
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
