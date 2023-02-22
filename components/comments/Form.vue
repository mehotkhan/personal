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
watch(isHuman, async (newHuman, _) => {
  if (newHuman) {
    isJoinedConversation();
  }
});
watch(isJoined, async (newJoined, _) => {
  if (newJoined) {
    isJoinedConversation();
  }
});
const isJoinedConversation = async () => {
  try {
    await $fetch("/conversation/is-joined", {
      method: "POST",
      body: {
        pub: $irisSession.getKey().pub,
        path: route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path,
      },
    });
    isJoined.value = true;
  } catch (error) {
    isJoined.value = false;
  }
};

const joinConversations = async () => {
  try {
    await $fetch("/conversation/join", {
      method: "POST",
      body: {
        pub: $irisSession.getKey().pub,
        path: route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path,
      },
    });
    if (await followMembers()) {
      isJoined.value = true;
    } else {
      isJoined.value = false;
    }
  } catch (error) {
    isJoined.value = false;
  }
};

const followMembers = async () => {
  try {
    const api: string = await $fetch("/conversation/members", {
      method: "POST",
      body: {
        path: route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path,
      },
    });
    const response: string[] = JSON.parse(api);
    if (response?.length > 0) {
      response.forEach((newPub: string) => {
        $irisPublic().get("follow").get(newPub).put(true);
      });
      members.value = response.length;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const sendComment = () => {
  if (isHuman && commentMessage?.value.length >= 3) {
    comments.send(commentMessage.value, route?.path);
    commentMessage.value = "";
  }
};

onMounted(() => {
  followMembers();
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
