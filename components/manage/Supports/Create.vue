<script setup lang="ts">
const { createSupport } = useManage();
const { publicMembers, getPublicMembers } = useMembers();
const { $dexieDb } = useNuxtApp();

const supportDetails = reactive({
  name: "",
  about: "",
  default: false,
});
onMounted(() => {
  getPublicMembers();
});

const members: ComputedRef<any[]> = computed(() => {
  const list: any[] = [];
  publicMembers.value.forEach(async (memberPub: any) => {
    try {
      const profile: any = await $dexieDb?.profiles.get({ pubkey: memberPub });
      const userMeta = await JSON.parse(profile?.content);
      list.push({
        id: memberPub,
        label: userMeta?.displayName ?? "بدون نام",
      });
    } catch {
      list.push({
        id: memberPub,
        label: "بدون نام",
      });
    }
  });
  return list;
});
const membersSelected = ref(members.value[0]);

const saving = ref(false);
const emit = defineEmits(["closeModal"]);

const addNew = () => {
  saving.value = true;
  createSupport({ ...supportDetails, user: membersSelected.value.id });
  saving.value = false;
  emit("closeModal");
  return null;
};
</script>

<template>
  <div class="fixed inset-0">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div
        class="w-full max-w-2xl transform overflow-hidden rounded-md bg-white"
      >
        <UCard
          :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
        >
          <template #header> ایجاد واحد پشتیبانی جدید</template>

          <div class="form-group mb-6 border-b-1 pb-5 min-h-[20rem]">
            <div class="flex w-full justify-start gap-3 items-center">
              <UFormGroup label="کاربر" hint="اجباری" class="">
                <USelectMenu
                  v-model="membersSelected"
                  class="w-[10rem] relative text-right"
                  :options="members"
                  searchable
                  searchable-placeholder="جستجوی اعضا"
                >
                  <template #label>
                    <span v-if="membersSelected" class="truncate">{{
                      membersSelected.label
                    }}</span>
                    <span v-else>انتخاب اعضا</span>
                  </template>
                </USelectMenu>
              </UFormGroup>
              <UFormGroup label="عنوان" hint="اجباری" class="">
                <UInput
                  v-model="supportDetails.name"
                  class="w-[10rem]"
                  size="md"
                  required
                  placeholder="یک عنوان انتخاب کنید"
                  icon="i-heroicons-user"
              /></UFormGroup>
              <UFormGroup label="توضیحات" hint="اجباری" class="">
                <UInput
                  v-model="supportDetails.about"
                  size="md"
                  class="w-[10rem]"
                  required
                  placeholder="در مورد چیست ؟"
                  icon="i-heroicons-information-circle"
              /></UFormGroup>
              <UFormGroup
                label="پیشفرض"
                hint="اختیاری"
                class="w-[3rem] items-center text-center"
              >
                <UToggle v-model="supportDetails.default" class="ltr" />
              </UFormGroup>
            </div>
          </div>

          <ul class="mr-8 text-sm text-gray-500 list-disc text-right">
            <li
              :class="
                supportDetails.name?.length >= 3 &&
                supportDetails.about?.length >= 3
                  ? 'text-gray-500'
                  : 'text-red-500'
              "
            >
              حداقل سه حرف
            </li>
          </ul>

          <template #footer>
            <div class="flex justify-between text-white">
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-red-400"
                @click="emit('closeModal')"
              >
                بستن
              </button>
              <button
                :class="
                  supportDetails.name?.length >= 3 &&
                  supportDetails.about?.length >= 3
                "
                type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2"
                @click="addNew()"
              >
                ایجاد
                <svg
                  v-if="saving"
                  aria-hidden="true"
                  class="flex w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </button>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
