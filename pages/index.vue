<script setup>
useHead({
  title: "علی زِمانی://طراح و توسعه دهنده وب",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="intro">
      <div class="w-full mb-3 blur-sm">
        <img
          class="w-60 mx-auto grayscale"
          src="~/assets/tom-bombadil-and-goldberry.png"
        />
      </div>
      <h2 class="text-4xl pb-1 border-b font-semibold text-right">
        تام بامبادیل
      </h2>
      <p class="mt-4 text-xl leading-9 text-justify">
        نام شخصیتی است در رشته داستان‌های تالکین . در جلد اول سه‌گانهٔ ارباب
        حلقه‌ها ، فرودو و همراهانش او را در جنگل کهن ملاقات می‌کنند. این‌طور به
        نظر می‌آید که قدرت حلقه یگانه بر روی او اثری ندارد. او به همراه همسرش
        گلدبری، دختر رودخانه، در ویتی‌ویندل زندگی می‌کنند. در کتاب او با نام
        «ارباب درختان، آب‌ها و تپه‌ها» معرفی شده‌است. در پشت ظاهر سادهٔ تام
        بامبادیل دانش و قدرتی عظیم قرار دارد ولی در محدوده قلمرو خودش.
      </p>
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
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.latest {
  ol {
    list-style-type: persian;
  }
}
</style>
