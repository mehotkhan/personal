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

- **توضیحات تصویر** : **گندالف** (به [انگلیسی](https://fa.wikipedia.org/wiki/زبان_انگلیسی): Gandalf)، شخصیتی افسانه‌ای با نقشی اصلی در داستان‌های *[هابیت، یا آن‌جا و بازگشت دوباره](https://fa.wikipedia.org/wiki/هابیت،*یا*آن‌جا*و*بازگشت*دوباره)_ و _[ارباب حلقه‌ها](https://fa.wikipedia.org/wiki/ارباب_حلقه‌ها)* از [جان رونالد روئل تالکین](https://fa.wikipedia.org/wiki/جان*رونالد*روئل*تالکین) است. او یکی از پنج [ایستاری](https://fa.wikipedia.org/w/index.php?title=ایستاری&action=edit&redlink=1) بود که در [دوران سوم](https://fa.wikipedia.org/wiki/دوران_سوم) توسط [والار](https://fa.wikipedia.org/wiki/والار) به [سرزمین میانه](https://fa.wikipedia.org/wiki/سرزمین_میانه) فرستاده شد. او در [والینور](https://fa.wikipedia.org/wiki/والینور) به نام اولورین معروف است.

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
