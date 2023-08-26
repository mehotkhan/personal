<script setup lang="ts">
const { UpdateUserDetails, profile } = useUser();
const { $dexieDb } = useNuxtApp();

const userDetails = reactive({
  firstName: "",
  displayName: "",
  lastName: "",
  about: "",
  avatar: "",
  email: "",
  name: "",
});
const avatarFile = ref<HTMLInputElement | null>(null);
const avatarPrev = ref();
const saving = ref(false);
const emit = defineEmits(["closeModal"]);

onMounted(async () => {
  const userData = await $dexieDb?.profiles.get({ pubkey: profile.value.pub });
  if (userData) {
    const profileJson = JSON.parse(userData.content);
    if (profileJson.avatar) userDetails.avatar = profileJson.avatar;
    if (profileJson.firstName) userDetails.firstName = profileJson.firstName;
    if (profileJson.lastName) userDetails.lastName = profileJson.lastName;
    if (profileJson.email) userDetails.email = profileJson.email;
  }
});
const Updating = () => {
  if (
    userDetails.firstName?.length <= 3 &&
    userDetails.lastName?.length <= 3 &&
    userDetails.about?.length <= 3 &&
    !validateEmail(userDetails.email)
  )
    return;

  saving.value = true;

  if (userDetails.firstName.length === 0) {
    userDetails.firstName = profile.value.firstName;
  }
  if (userDetails.lastName.length === 0) {
    userDetails.lastName = profile.value.lastName;
  }
  if (userDetails.about.length === 0) {
    userDetails.about = profile.value.about;
  }
  if (userDetails.email.length === 0) {
    userDetails.email = profile.value.email;
  }
  userDetails.displayName = `${userDetails.firstName} ${userDetails.lastName}`;
  userDetails.name = profile.value.name;

  UpdateUserDetails(userDetails);
  saving.value = false;
  emit("closeModal");
  return null;
};
const selectAvatar = async () => {
  if (avatarFile.value?.files && avatarFile.value?.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      avatarPrev.value = e.target.result;
    };
    reader.readAsDataURL(avatarFile.value?.files[0]);
    const resized: File = await resizeImage(avatarFile.value?.files[0], 150);
    userDetails.avatar = await file2Base64(resized);
  }
};
</script>

<template>
  <div class="fixed inset-0">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div
        class="w-full max-w-md transform overflow-hidden rounded-md bg-white"
      >
        <UCard
          :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
        >
          <template #header> ویرایش اطلاعات کاربری</template>

          <UFormGroup
            label="تصویر"
            hint="اجباری"
            class="pb-4 mb-6 border-b-2 pt-4"
          >
            <div
              class="flex w-full justify-start items-center gap-5 h-[5.5rem]"
            >
              <ProfileUserAvatar
                v-if="!avatarPrev"
                :pub="profile.pub"
                class="tracking-normal text-3xl w-[7rem] h-full"
                size="3xl"
              />

              <UAvatar
                v-else
                size="3xl"
                class="tracking-normal text-3xl w-[7rem] h-full"
                :alt="profile.displayName"
                :src="avatarPrev"
              />

              <div class="flex items-center w-full h-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-full p-3 border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center">
                    <svg
                      aria-hidden="true"
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">فایل را انتخاب کنید</span>
                      یا به اینجا بکشید
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    ref="avatarFile"
                    type="file"
                    class="hidden"
                    accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                    aria-label="upload image button"
                    @change="selectAvatar"
                  />
                </label>
              </div>
            </div>
          </UFormGroup>

          <div class="form-group mb-6 border-b-1 pb-5">
            <div class="flex w-full justify-between gap-5">
              <UFormGroup label="نام" hint="اجباری" class="">
                <UInput
                  v-model="userDetails.firstName"
                  size="md"
                  required
                  :placeholder="profile.firstName"
                  icon="i-heroicons-user"
              /></UFormGroup>
              <UFormGroup label="نام خانوادگی" hint="اجباری" class="">
                <UInput
                  v-model="userDetails.lastName"
                  size="md"
                  required
                  :placeholder="profile.lastName"
                  icon="i-heroicons-user"
              /></UFormGroup>
            </div>
          </div>
          <UFormGroup
            label="چند کلمه درباره خود بنویسید"
            hint="اختیاری"
            class="mb-6 border-b-1 pb-5"
          >
            <UTextarea v-model="userDetails.about" :placeholder="profile.about"
          /></UFormGroup>
          <UFormGroup label="ایمیل" hint="اختیاری" class="mb-6 border-b-1 pb-5">
            <UInput
              v-model="userDetails.email"
              :placeholder="profile.email"
              icon="i-heroicons-envelope"
          /></UFormGroup>

          <ul class="mr-8 text-sm text-gray-500 list-disc text-right">
            <li
              :class="
                userDetails.firstName?.length >= 3 &&
                userDetails.lastName?.length >= 3
                  ? 'text-gray-500'
                  : 'text-red-500'
              "
            >
              حداقل سه حرف
            </li>
            <li
              :class="
                validateEmail(userDetails.email)
                  ? 'text-gray-500'
                  : 'text-red-500'
              "
            >
              ایمیل معتبر
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
                  userDetails.firstName?.length <= 3 &&
                  userDetails.lastName?.length <= 3 &&
                  userDetails.about?.length <= 3 &&
                  !validateEmail(userDetails.email)
                    ? 'disabled'
                    : ''
                "
                type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2"
                @click="Updating()"
              >
                به روز رسانی
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
