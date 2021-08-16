---
home: true
heroImage: ./gnu-in-meditate.png
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
      - name: Bandersnatch Interactive Player
        link: /blogs/Bandersnatch-Interactive-Player

  - title: کتاب
    link: /books/
    details:
      - name: کتاب نمونه
        link: /books/
  - title: کارها
    link: /projects/
    details:
      - name: پروژه نمونه
        link: /projects/

footer: همه چیز به طور شگفت انگیزی خوب باید باشد ، طراحی و توسعه توسط علی زِمانی ❤️
---

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
