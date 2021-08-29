---
home: true
heroImage: ./gandalf-the-gray.png
heroAlt: گندالف
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
      - name: Modern Web Development on the JAMstack
        link: /books/Modern-Web-Development-on-the-JAMstack
  - title: کارها
    link: /projects/
    details:
      - name: Bandersnatch Interactive Player
        link: /projects/Bandersnatch-Interactive-Player

footer: همه چیز به طور شگفت انگیزی خوب باید باشد ، طراحی و توسعه توسط علی زِمانی ❤️
---

- **توضیحات تصویر** : **گندالف** (Gandalf)، شخصیتی افسانه‌ای با نقشی اصلی در داستان‌های [هابیت، یا آن‌جا و بازگشت دوباره](<https://fa.wikipedia.org/wiki/%D9%87%D8%A7%D8%A8%DB%8C%D8%AA_(%D8%B1%D9%85%D8%A7%D9%86)>) و [ارباب حلقه‌ها](https://fa.wikipedia.org/wiki/%D8%A7%D8%B1%D8%A8%D8%A7%D8%A8_%D8%AD%D9%84%D9%82%D9%87%E2%80%8C%D9%87%D8%A7) از [جان رونالد روئل تالکین](https://fa.wikipedia.org/wiki/%D8%AC%DB%8C._%D8%A2%D8%B1._%D8%A2%D8%B1._%D8%AA%D8%A7%D9%84%DA%A9%DB%8C%D9%86) است. او یکی از پنج [ایستاری](<https://en.wikipedia.org/wiki/Wizards_(Middle-earth)>) بود که در [دوران سوم](https://fa.wikipedia.org/wiki/%D9%BE%DB%8C%D8%B4%DB%8C%D9%86%D9%87_%D8%A2%D8%B1%D8%AF%D8%A7#%D8%AF%D9%88%D8%B1%D8%A7%D9%86_%D8%B3%D9%88%D9%85) توسط [والار](https://fa.wikipedia.org/wiki/والار) به [سرزمین میانه](<https://fa.wikipedia.org/wiki/%D9%88%D8%A7%D9%84%D8%A7_(%D8%B3%D8%B1%D8%B2%D9%85%DB%8C%D9%86_%D9%85%DB%8C%D8%A7%D9%86%D9%87)>) فرستاده شد. او در [والینور](https://fa.wikipedia.org/wiki/والینور) به نام اولورین معروف است.

- منبع تصویر : [www.vhv.rs](https://www.vhv.rs/viewpic/hJiJwxT_the-hobbit-gandalf-the-grey-mens-tank-gandalf/)

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
