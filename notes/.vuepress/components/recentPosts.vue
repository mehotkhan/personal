<template>
  <div class="posts">
    <ul>
      <li
        class="post-card"
        v-for="(page, index) in orderBydate"
        :to="page.path"
        :key="index"
      >
        <h5>
          <router-link :to="page.path">
            {{ page.title }}
          </router-link>
        </h5>
        <h7 v-if="!show_tags">
          <b>برچسب ها : </b>
          <span v-for="(tag, index) in page.frontmatter.tag" :key="index">
            {{ tag }}
            {{ index + 1 !== page.frontmatter.tag.length ? "،" : "" }}</span
          >
          <br />
          <br />
        </h7>
      </li>
    </ul>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  props: ["category", "show_tags"],
  name: "recentPosts",
  data() {
    return {
      pages: [],
    };
  },
  computed: {
    orderBydate: function () {
      return _.orderBy(this.pages, "frontmatter.date", ["desc"]);
    },
  },
  mounted() {
    this.$site.pages.forEach((page) => {
      if (page.frontmatter.category === this.category) {
        this.pages.push(page);
      }
    });
  },
};
</script>