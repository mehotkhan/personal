<script setup lang="ts">
const { sendTicket, supportTimeLine, currentTicket, changeTicketStatus } =
  userSupportAdmin();

const chatMessage = ref("");
const conversation = ref();

const send = () => {
  sendTicket(chatMessage.value);
  chatMessage.value = "";
};

onUpdated(() => {
  if (supportTimeLine?.value?.length > 0 && conversation?.value) {
    conversation.value.scrollTop = conversation?.value?.scrollHeight - 20;
  }
});
const statusSelector = [
  [
    {
      label: "جدید",
      click: () => {
        const messageBody = `وضعیت تیکت به ${ticketStatus.find(
          (item: any) => item.id === "new",
        )?.label} تغییر کرد!`;
        changeTicketStatus(messageBody, "new");
      },
    },
    {
      label: "باز",
      click: () => {
        const messageBody = `وضعیت تیکت به ${ticketStatus.find(
          (item: any) => item.id === "open",
        )?.label} تغییر کرد!`;
        changeTicketStatus(messageBody, "open");
      },
    },
    {
      label: "درحال بررسی",
      click: () => {
        const messageBody = `وضعیت تیکت به ${ticketStatus.find(
          (item): any => item.id === "on-going",
        )?.label} تغییر کرد!`;
        changeTicketStatus(messageBody, "on-going");
      },
    },
    {
      label: "بسته",
      click: () => {
        const messageBody = `وضعیت تیکت به ${ticketStatus.find(
          (item: any) => item.id === "close",
        )?.label} تغییر کرد!`;
        changeTicketStatus(messageBody, "close");
      },
    },
  ],
];
</script>
<template>
  <UCard
    :key="currentTicket.id"
    :ui="{
      body: {
        base: 'h-full border-0   flex w-full',
        padding: 'p-0',
      },
      rounded: 'rounded-0',
      shadow: 'shadow-0',
      divide: 'divide-0',
      ring: 'ring-0',
      header: {
        base: 'absolute w-full  items-center border-b-[1px] h-[4rem]',
        background: 'bg-gray-50',
        padding: 'px-3 py-3',
      },
      footer: {
        base: 'absolute bottom-0  grid w-full  items-center border-t-1 border-gray-200 h-[5rem]',
        background: 'bg-gray-100',
        padding: 'px-3 py-3',
      },
    }"
  >
    <template #header>
      <div
        v-if="currentTicket.id"
        class="flex justify-between items-center w-full"
      >
        <div class="flex items-center">
          <ProfileUserName
            :support="true"
            :pub="currentTicket?.owner"
            class="text-md flex font-bold"
          />
        </div>
        <div class="text-xs flex font-bold gap-2">
          <UBadge size="md" :label="currentTicket.topic" />
          <UDropdown
            :items="statusSelector"
            mode="click"
            :popper="{ placement: 'bottom-start' }"
          >
            <div
              class="flex items-center bg-yellow-50 text-yellow-600 px-2 py-1 cursor-pointer"
            >
              <span>
                {{
                  ticketStatus.find(
                    (item: any) => item.id === currentTicket.status,
                  )?.label
                }}
              </span>
              <IconUil:angleDown class="text-xl mr-1" />
            </div>
          </UDropdown>
        </div>
      </div>
    </template>
    <div class="absolute w-full top-[5rem] bottom-[6rem]">
      <div
        ref="conversation"
        class="px-4 overflow-x-auto h-full flex flex-col-reverse"
      >
        <div
          v-for="message in supportTimeLine"
          :key="message?.id"
          class="w-full flex mt-3 last:bg-red"
          :class="message?.selfAuthored ? 'justify-start' : 'justify-end'"
        >
          <div class="w-full">
            <div
              class="flex items-center justify-between relative"
              :class="message?.selfAuthored ? 'flex-row' : 'flex-row-reverse'"
            >
              <div class="flex items-center">
                <ProfileUserAvatar
                  :pub="message?.pubkey"
                  size="xs"
                  class="ml-4"
                />
                <ProfileUserName :pub="message?.pubkey" />
              </div>

              <p
                class="font-semibold text-sm text-slate-600"
                :class="
                  message?.selfAuthored
                    ? 'justify-start mr-3 '
                    : 'justify-end ml-3'
                "
              >
                <span class="text-slate-400 text-xs">
                  {{ FromNow(message?.created_at * 1000) }}
                </span>
              </p>
              <span
                class="absolute top-4 left-0 w-5 mr-2 text-[15px] flex"
                :class="message?.send ? 'text-green-500' : 'text-gray-400'"
              >
                <IconUil:check />
                <IconUil:check v-if="message?.send" class="-mr-3" />
              </span>
            </div>

            <div
              class="mt-3 w-full p-4 message-body relative"
              :class="[
                message?.selfAuthored
                  ? 'bg-gray-200 border-brown border-r-6 rounded-tl-xl rounded-bl-xl'
                  : 'bg-brown-100 border-brown border-l-6  rounded-tr-xl rounded-br-xl',
                !isRTL(message?.rawMessage) ? 'ltr' : 'rtl',
              ]"
            >
              <p class="text-md break-words">
                {{ message?.rawMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div
        :class="[chatMessage.length && !isRTL(chatMessage) ? 'ltr' : 'rtl']"
        class="flex justify-between px-3 items-center w-full"
      >
        <input
          v-model="chatMessage"
          type="text"
          class="w-full px-3 bg-transparent outline-none placeholder:text-slate-400 border-0 rounded-sm"
          placeholder="پاسختان را بنویسید ..."
          @keyup.enter="send"
          @click="send"
        />
        <div class="flex items-center justify-around mr-3">
          <UTooltip text="ارسال">
            <IconMdi:send
              class="text-gray-400 text-lg cursor-pointer"
              aria-hidden="true"
            />
          </UTooltip>
        </div>
      </div>
    </template>
  </UCard>
</template>
