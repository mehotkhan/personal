<template>
  <div class="posts">
    <ol>
      <li class="post-card" v-for="page in pages" :to="page.path">
        <h4>
          <router-link :to="page.path">
            {{ page.title }}
          </router-link>
        </h4>
        <h6 v-if="!show_tags">
          <b>برچسب ها : </b>
          <span v-for="(tag, index) in page.frontmatter.tag">
            {{ tag }}
            {{ index + 1 !== page.frontmatter.tag.length ? "،" : "" }}</span
          >
        </h6>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: ["category", "show_tags"],
  name: "recentPosts",
  data() {
    return {
      pages: [],
    };
  },
  mounted() {
    this.$site.pages.forEach((page) => {
      if (page.frontmatter.category === this.category) {
        this.pages.push(page);
      }
    });
    this.pages.sort(function (a, b) {
      var keyA = new Date(a.frontmatter.date),
        keyB = new Date(b.frontmatter.date);
      // Compare the 2 dates
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

    console.log(this.category);
    console.log(this.pages);
  },
};
</script>