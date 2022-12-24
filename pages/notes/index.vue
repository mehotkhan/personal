<script setup>
useHead({
  title: "یادداشت‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content">
      <div class="w-full mb-3 blur-sm">
        <ContentDoc class="text-2xl" path="/notes" />

      </div>
      <div class="latest my-10">
        <h2 class="text-4xl py-2 border-b font-semibold block text-right">
          آخرین ورودی ها
        </h2>
        <ol class="list-decimal text-2xl mt-10">
          <li class="mb-2">
            یادداشت نمونه الف
            <span class="font-thin"> / یادداشت‌ها</span>

            <span class="font-thin"> / سه روز پیش </span>
          </li>
          <li class="mb-2">
            یادداشت نمونه ب
            <span class="font-thin"> / یادداشت‌ها</span>
            <span class="font-thin"> / یک هفته پیش </span>
          </li>
          <li class="mb-2">
            کتاب نمونه الف
            <span class="font-thin"> / کتاب‌خانه</span>

            <span class="font-thin"> / دو هفته پیش </span>
          </li>
          <!-- ... -->
        </ol>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
