<script lang="ts" setup>
const {
  changeView,
  modalMode,
  modalBoxIsOpen,
  viewTitle,
  currentTicket,
  expanded,
  expandView,
} = useSupport();

const { supportLists, getSupportLists } = useManage();

function closeModal() {
  modalBoxIsOpen.value = false;
}

function toggleModal() {
  modalBoxIsOpen.value = !modalBoxIsOpen.value;
}
const cleanedSupportLists: any = computed(() => [
  ...new Set(supportLists?.value?.map((item: any) => item.pub)),
]);
onMounted(() => {
  getSupportLists();
});
</script>

<template>
  <div>
    <div
      class="z-10 p-2 fixed left-2 bottom-2 bg-gray-200 shadow-md m-3 rounded-full cursor-pointer text-2xl"
      :class="
        modalBoxIsOpen
          ? 'text-brown bg-white border-2 border-brown'
          : ' bg-brown'
      "
      @click="toggleModal"
    >
      <IconUil:comments-alt v-if="!modalBoxIsOpen" />
      <IconUil:angle-down v-else />
    </div>
    <UCard
      v-if="modalBoxIsOpen"
      :ui="{
        body: {
          base: 'h-full border-0 ',
          padding: 'p-0 sm:p-0',
        },
        rounded: 'rounded md:rounded-2xl',
        divide: 'divide-0',
        ring: 'ring-0',
        header: {
          base: 'z-10 h-30 relative',
          background: 'bg-gradient-to-b from-gray-200  to-transparent h-30',
          padding: 'px-5 pt-4 pb-2',
        },
        footer: {
          base: 'absolute bottom-0 w-full grid w-full grid-cols-3  items-center border-t-2 border-gray-100',
          background: 'bg-white',
          padding: 'px-0 py-3',
        },
      }"
      :class="
        expanded
          ? 'md:w-[50%] md:h-[97%] md:left-4 md:bottom-[1rem]'
          : 'md:w-[23%] md:h-[80%] md:left-4 md:bottom-[4.5rem]'
      "
      class="fixed z-[999] left-0 bottom-0 h-full w-full transition-all shadow-2xl border-0"
    >
      <div
        class="absolute h-[40rem] top-0 bg-gradient-to-b from-gray-200 from-30 to-white w-full z-0"
      ></div>
      <template #header>
        <div class="flex justify-between items-center w-full z-10 relative">
          <div class="flex items-center">
            <UTooltip v-if="modalMode === 'chat'" text="پیام ها">
              <IconUil:arrow-right
                class="z-10 text-2xl cursor-pointer"
                @click="changeView('chats')"
              />
            </UTooltip>

            <UTooltip v-if="modalMode === 'home'" text="بستن">
              <IconUil:comments-alt
                class="text-4xl cursor-pointer"
                aria-hidden="true"
                @click="toggleModal()"
              />
            </UTooltip>

            <div
              v-if="modalMode !== 'home' && modalMode !== 'chat'"
              class="text-xl flex z-10 w-full font-bold mr-3"
            >
              {{ viewTitle }}
            </div>

            <span
              v-if="modalMode === 'chat'"
              class="text-xl flex z-10 w-full font-bold items-center"
            >
              <ProfileUserAvatar :pub="currentTicket.operator" size="md" />
              <ProfileUserName
                :pub="currentTicket.operator"
                :support="true"
                class="mr-2"
              />
            </span>
          </div>

          <div class="flex items-center gap-1">
            <div v-if="modalMode === 'social'" class="flex items-center">
              <UTooltip v-if="!expanded" text="بزرگ‌نمایی">
                <IconUil:expand-arrows-alt
                  class="text-md cursor-pointer"
                  aria-hidden="true"
                  @click="expandView()"
                />
              </UTooltip>
              <UTooltip v-else text="کوچک‌نمایی">
                <IconUil:compress-arrows
                  class="text-md cursor-pointer"
                  aria-hidden="true"
                  @click="expandView()"
                />
              </UTooltip>
            </div>

            <div v-if="modalMode === 'home'" class="flex items-center">
              <ProfileUserAvatar
                v-for="user in cleanedSupportLists"
                :key="user"
                :pub="user"
                size="md"
              />
            </div>
            <div v-if="modalMode === 'chat'" class="flex items-center">
              <div class="flex gap-2">
                <UBadge size="xs" :label="currentTicket.topic" color="gray" />
                <UBadge
                  size="xs"
                  :label="
                    ticketStatus.find(
                      (item: any) => item.id === currentTicket.status,
                    )?.label
                  "
                  color="gray"
                />
              </div>
            </div>

            <UTooltip v-if="modalMode !== 'home'" text="بستن">
              <IconUil:arrow-down
                class="text-2xl cursor-pointer"
                aria-hidden="true"
                @click="toggleModal()"
              />
            </UTooltip>
          </div>
        </div>
      </template>

      <div class="absolute w-full top-[4rem] bottom-[4rem]">
        <ContactConversation
          v-if="modalMode === 'chat'"
          @close-modal="closeModal"
        />

        <ContactChats
          v-if="modalMode === 'chats'"
          class=" "
          @close-modal="closeModal"
        />
        <ContactHome v-if="modalMode === 'home'" @close-modal="closeModal" />
        <ContactSocial
          v-if="modalMode === 'social'"
          @close-modal="closeModal"
        />
      </div>
      <template v-if="modalMode !== 'chat'" #footer>
        <div
          class="cursor-pointer flex flex-col item-center justify-center text-center"
          @click="changeView('home')"
        >
          <div :class="modalMode === 'home' ? 'text-gray-700' : 'text-black'">
            <IconUil:home-alt class="w-full text-xl" aria-hidden="true" />
            <div class="pt-1 text-xs">خانه</div>
          </div>
        </div>

        <div
          class="cursor-pointer flex flex-col item-center justify-center text-center"
          @click="changeView('chats')"
        >
          <div :class="modalMode === 'chats' ? 'text-gray-700' : 'text-black'">
            <IconUil:envelope-alt class="w-full text-xl" aria-hidden="true" />
            <div class="pt-1 text-xs">پیام</div>
          </div>
        </div>

        <div
          class="cursor-pointer flex flex-col item-center justify-center text-center"
          @click="changeView('social')"
        >
          <div :class="modalMode === 'social' ? 'text-gray-700' : 'text-black'">
            <IconUil:coffee class="w-full text-xl" aria-hidden="true" />
            <div class="pt-1 text-xs">افراد</div>
          </div>
        </div>
      </template>
      <template v-else #footer>
        <ContactInputForm />
      </template>
    </UCard>
  </div>
</template>
