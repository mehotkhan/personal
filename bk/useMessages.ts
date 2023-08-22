import { useStorage } from "@vueuse/core";

const currentReceiver = useStorage("chatbox-current_receiver", "");

export default () => {
  const { $publishMessage } = useNuxtApp();

  const startPersonChat = (pub: string) => {
    const route = useRoute();
    currentReceiver.value = pub;

    if (route.path !== "/social/chats") {
      navigateTo("/social/chats");
    }
  };
  const sendMessage = async (message: string) => {
    if (!message.length) return;
    const { profile } = useUser();

    $publishMessage(message, profile.value, currentReceiver.value);
  };

  return {
    startPersonChat,
    sendMessage,
    currentReceiver,
  };
};
