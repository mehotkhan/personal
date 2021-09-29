---
home: true
heroImage: ./front-poster/Charlie-and-H.Keller.jpg
heroAlt: That Time Helen Keller Met Charlie Chaplin
tagline: یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند
actionText: یادداشت ها
actionLink: /blogs/
actionText2: صندوق صوتی
actionLink2: /contact-me/#صندوق-صوتی
xfeatures:
  - title: بلاگ
    link: /blogs/
    details:
      - name: "مقاله ای در مورد خود یادگیری فیزیک نوین"
        link: /blogs/self-learning-physics
      - name: "جم استک : معرفی و آموزش استفاده"
        link: /blogs/jamstack-intro
      - name: آموزش طراحی و ساخت ابزار های آنلاین - مقدمه
        link: /blogs/etools-tuts-preface

  - title: کتاب
    link: /books/
    details:
      - name: Modern Web Development on the JAMstack
        link: /books/Modern-Web-Development-on-the-JAMstack
      - name: Building Progressive Web Applications with Vue.js
        link: /books/Building-Progressive-Web-Applications-with-Vuejs
  - title: کارها
    link: /projects/
    details:
      - name: یک خبرخوان ساده و جمع و جور
        link: /projects/pnews
      - name: کمی شعر کهن بخوانیم
        link: /projects/faPoems
      - name: Bandersnatch Interactive Player
        link: /projects/Bandersnatch-Interactive-Player

footer: همه چیز به طور شگفت انگیزی خوب باید باشد ، طراحی و توسعه توسط علی زِمانی ❤️
---

- **توضیحات تصویر** : That Time Helen Keller Met Charlie Chaplin

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
