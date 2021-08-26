---
home: true
heroImage: ./gnu-in-meditate.png
heroAlt: گنو
tagline: یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند
actionText: یادداشت ها ←
actionLink: /blogs/
xfeatures:
  - title: بلاگ
    link: /blogs/
    details:
      - name: "جم استک : معرفی و آموزش استفاده"
        link: /blogs/jamstack-intro
      - name: آموزش طراحی و ساخت ابزار های آنلاین - مقدمه
        link: /blogs/etools-tuts-preface

  - title: کتاب
    link: /books/
    details:
      - name: کتاب نمونه
        link: /books/
  - title: کارها
    link: /projects/
    details:
      - name: Bandersnatch Interactive Player
        link: /projects/Bandersnatch-Interactive-Player

footer: همه چیز به طور شگفت انگیزی خوب باید باشد ، طراحی و توسعه توسط علی زِمانی ❤️
---

##### [GNU](https://fa.wikipedia.org/wiki/%DA%AF%D9%86%D9%88) (توضیحات تصویر) : گنو یک مخفف بازگشتی است و از نخستین حرف کلمات **GNU's Not Unix** به معنای **گنو یونیکس نیست** گرفته شده‌است. [ریچارد استالمن](https://fa.wikipedia.org/wiki/ریچارد_استالمن) این نام را روشی خلّاقانه برای ادای دین به سیستم‌عامل [یونیکس](https://fa.wikipedia.org/wiki/یونیکس) می‌داند، زیرا استفاده از نام یونیکس به دلیل علامت تجاری بودن در یک محصول دیگر بدون اجازه ممکن نیست. همچنین گنو نام گونه‌ای [گاو وحشی](https://fa.wikipedia.org/wiki/گاو_وحشی) است که در [آفریقا](https://fa.wikipedia.org/wiki/آفریقا) زندگی می‌کند.

##### نشان گنو، با طرحی از سر [گاو وحشی](https://fa.wikipedia.org/wiki/گاو_وحشی)، توسط Etienne Suvasa طراحی شده‌است و در وب‌سایت گنو یا مقاله‌های بنیاد نرم‌افزارهای آزاد به کار می‌رود.[[۴\]](https://fa.wikipedia.org/wiki/گنو#cite_note-4)

<div class="features">
  <div class="feature" v-for="feat in $page.frontmatter.xfeatures">
    <h2 ><a v-bind:href="feat.link">{{ feat.title }}</a></h2>
    <ol >
      <li v-for="detail in feat.details" >
        <a v-bind:href="detail.link"> 
        <p>{{  detail.name }} </p>
      </a>
    </li>
    </ol>
  </div>
</div>
