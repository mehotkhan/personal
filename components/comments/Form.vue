<script setup lang="ts">
import { useComment } from "~/stores/comments";
const { $irisSession, $irisPublic } = useNuxtApp();
const route = useRoute();

const comments = useComment();
const commentMessage = ref("");
const isHuman = ref(true);
const isJoined = ref(false);
const members = ref(0);

const passHuman = (pass: boolean) => {
  isHuman.value = pass;
};
watch(isHuman, async (newHuman, oldHuman) => {
  if (newHuman) {
    isJoinedConversation();
  }
});
watch(isJoined, async (newJoined, oldJoined) => {
  if (newJoined) {
    isJoinedConversation();
  }
});
const isJoinedConversation = async () => {
  const api: string = await $fetch("/is-joined-conversation", {
    method: "POST",
    body: {
      pub: $irisSession.getKey().pub,
      path: route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path,
    },
  });
  try {
    const response = JSON.parse(api);
    if (response) {
      isJoined.value = true;
    } else {
      isJoined.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const joinConversations = async () => {
  const api: string = await $fetch("/join-conversations", {
    method: "POST",
    body: {
      pub: $irisSession.getKey().pub,
      path: route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path,
    },
  });
  try {
    const response = JSON.parse(api);
    if (response) {
      getMembers();
      isJoined.value = true;
      response?.forEach((newPub: string) => {
        $irisPublic().get("follow").get(newPub).put(true);
      });
    } else {
      isJoined.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMembers = async () => {
  const api: string = await $fetch("/members-conversations", {
    method: "POST",
    body: {
      path: route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path,
    },
  });
  try {
    const response: string[] = JSON.parse(api);
    console.log(response);
    if (response?.length > 0) {
      response.forEach((newPub: string) => {
        $irisPublic().get("follow").get(newPub).put(true);
      });
      members.value = response.length;
    }
  } catch (error) {
    console.log(error);
  }
};

const sendComment = () => {
  if (isHuman && commentMessage?.value.length >= 3) {
    comments.send(commentMessage.value, route?.path);
    commentMessage.value = "";
  }
};

onMounted(() => {
  getMembers();
});
</script>

<template>
  <div class="mb-6 p-3 pb-7">
    <header
      class="flex justify-between items-center border-b border-gray-200 pb-2 mb-2"
    >
      <div class="flex text-sm items-center">
        <IconUil:commentShare class="ml-2 text-md flex" aria-hidden="true" />
        <span class="block pt-2"> {{ members }} شرکت کننده </span>
      </div>
    </header>

    <textarea
      v-model="commentMessage"
      name="message"
      type="text"
      placeholder="چیزی بنویسید ..."
      class="w-full min-h-40 rounded-md p-2 text-lg bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
      @keyup.enter="isHuman && commentMessage?.length >= 3 ? sendComment : null"
    ></textarea>
    <footer class="flex justify-between mt-2 items-center">
      <CommentsHumanDetect v-if="!isDev()" @passed="passHuman" />

      <button
        v-if="isDev() || isJoined"
        :class="isHuman && commentMessage?.length >= 3 ? 'flex' : 'disabled'"
        class="flex items-center py-1 px-5 rounded-md text-lg bg-black text-white h-10"
        @click="sendComment"
      >
        ارسال دیدگاه
        <IconMdi:send
          class="text-white text-lg cursor-pointer mr-2"
          aria-hidden="true"
        />
      </button>
      <button
        v-else=""
        :class="isHuman ? 'flex' : 'disabled'"
        class="flex items-center py-1 px-5 rounded-md text-lg bg-green-600 text-white h-10"
        @click="joinConversations"
      >
        عضویت در این بحث
        <IconUil:comment-verify
          class="text-white text-lg cursor-pointer mr-2"
          aria-hidden="true"
        />
      </button>
    </footer>
  </div>
</template>
<style lang="scss">
button.disabled {
  opacity: 0.4;
  cursor: no-drop;
}
</style>
