<script setup>
useHead({
  title: "یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    {
      name: "یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند",
      content: "Ali Zemani Personal website",
    },
    {
      name: "fontiran.com:license",
      content: "7RP38A",
    },
  ],
});
</script>
<template>
  <body
    class="flex justify-center content-center bg-gray-400 min-h-screen w-screen"
    dir="rtl"
  >
    <!-- outer container -->
    <main
      class="border border-gray-300 rounded-sm shadow-lg container my-10 bg-white flex px-0"
    >
      <div class="w-4/6 p-20 content">
        <section class="flex flex-col justify-center content-center">
          <div class="intro">
            <div class="w-full mb-3">
              <img
                class="w-90 mx-auto"
                src="~/assets/tom-bombadil-and-goldberry.png"
              />
            </div>
            <h2 class="text-4xl pb-1 border-b font-semibold text-right">
              تام بامبادیل
            </h2>
            <p class="mt-4 text-xl leading-9 text-justify">
              نام شخصیتی است در رشته داستان‌های تالکین . در جلد اول سه‌گانهٔ
              ارباب حلقه‌ها ، فرودو و همراهانش او را در جنگل کهن ملاقات می‌کنند.
              این‌طور به نظر می‌آید که قدرت حلقه یگانه بر روی او اثری ندارد. او
              به همراه همسرش گلدبری، دختر رودخانه، در ویتی‌ویندل زندگی می‌کنند.
              در کتاب او با نام «ارباب درختان، آب‌ها و تپه‌ها» معرفی شده‌است. در
              پشت ظاهر سادهٔ تام بامبادیل دانش و قدرتی عظیم قرار دارد ولی در
              محدوده قلمرو خودش.
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
                <span class="font-thin"> /  کتاب‌خانه</span>

                <span class="font-thin"> / دو هفته پیش </span>
              </li>
              <!-- ... -->
            </ol>
          </div>
        </section>
      </div>

      <div
        class="w-1/2 bg-gray-100 px-30 flex flex-col justify-center relative"
      >
        <nav class="absolute top-20 rounded-md w-full">
          <ol class="list-reset flex text-xl text-gray-400 align-middle">
            <li>
              <a href="#" class="ml-5">خانه</a>
            </li>
            <li>
              <a href="#" class="ml-5">/</a>
            </li>
            <li>
              <a href="#" class="font-bold hover:text-gray-600">پست نخست</a>
            </li>
          </ol>
        </nav>
        <div class="flex justify-between mb-10">
          <div class="grid justify-start">
            <h1 class="">
              <span class="text-9xl font-normal block"> علـی </span>
              <span class="text-9xl font-extrabold"> زِمـــانی </span>
            </h1>
            <p class="text-xl mt-10 bg-black p-3 text-white">
              یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند
            </p>
          </div>
        </div>
        <div
          class="h-1 w-full mb-10 border-2 border-dashed border-gray-200"
        ></div>
        <ul class="flex text-xl justify-between">
          <li>
            <a class="text-gray-500 hover:text-black" href="#">صفحه‌نخست</a>
          </li>
          <li>
            <a class="text-gray-500 hover:text-black" href="#">یادداشت‌ها </a>
          </li>
          <li>
            <a class="text-gray-500 hover:text-black" href="#">کتاب‌خانه </a>
          </li>
          <li>
            <a class="text-gray-500 hover:text-black" href="#"> درباره‌من</a>
          </li>
          <li>
            <a class="text-gray-500 hover:text-black" href="#"> اطلاعات‌تماس</a>
          </li>
        </ul>
      </div>
    </main>
  </body>
</template>

<style lang="scss">
.latest {
  ol {
    list-style-type: persian;
  }
}
</style>
