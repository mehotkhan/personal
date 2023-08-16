<script setup>
const { qaLists, getQaLists } = useSupport();
onMounted(() => {
  getQaLists();
});
</script>

<template>
  <div
    class="bg-white rounded-xl w-full px-4 py-2 my-3 transition-all shadow-2xl relative text-sm"
  >
    <div
      class="flex w-full justify-between items-center pb-3 border-b-2 mt-4 mb-0 border-brown"
    >
      <h3>پرسش های متداول</h3>
    </div>
    <div class="w-full mt-5">
      <button
        v-for="item in qaLists"
        :key="item.id"
        class="w-full mb-5 border-b-2 pb-3 border-gray-200 group focus:outline-none text-right last:border-0"
      >
        <div class="">
          {{ item.title }}
        </div>
        <div class="mt-3 hidden text-gray-700 group-focus:flex text-xs">
          <p>
            {{ item.answer }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>
