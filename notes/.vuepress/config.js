module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "علی زِمانی://طراح و توسعه دهنده وب",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["link", { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" }],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/icons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/icons/favicon-16x16.png",
      },
    ],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#ffc40d" }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: "default-rtl",
  themeConfig: {
    hostname: "https://alizemani.ir",
    repo: "https://github.com/mehotkhan/personal-website",
    editLinks: true,
    docsDir: "notes",
    editLinkText: "ویرایش",
    persianDate: true,
    lastUpdated: "آخرین ویرایش",
    displayAllHeaders: false, // Default: false
    nav: [
      {
        text: "درباره من",
        link: "/about-me/",
      },
      {
        text: "درباره اینجا",
        items: [
          {
            text: "پیشنهاد همکاری",
            link: "/cooperation-offer/",
          },
          {
            text: "آموزش طراحی وب",
            link: "/webdeveloper-teaching/",
          },
          {
            text: "لیست تغییرات",
            link: "/changelog.html",
          },
          {
            text: "صندوق صوتی",
            link: "/voice-mail/",
          },
          {
            text: "اطلاعات تماس",
            link: "/contact-me/",
          },
        ],
      },
    ],
    sidebar: [
      {
        title: "یادداشت‌‌ها", // required
        path: "/notes/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
      },
      {
        title: "کتاب‌ها", // required
        path: "/books/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
      },
      {
        title: "پروژه‌ها", // required
        path: "/projects/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    "@mr-hope/sitemap",
    {
      urls: ["notes", "projects", "books"],
    },
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: {
        message: "محتوای جدید افزوده شده است .",
        buttonText: "به روز رسانی",
      },
    },
    "seo",
    {
      siteTitle: (_, $site) => $site.title,
      title: ($page) => $page.title,
      description: ($page) => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: ($page) => $page.frontmatter.tags,
      twitterCard: (_) => "summary_large_image",
      type: ($page) =>
        ["books", "projects", "notes"].some((folder) =>
          $page.regularPath.startsWith("/" + folder)
        )
          ? "article"
          : "page",
      url: (_, $site, path) => ($site.themeConfig.domain || "") + path,
      image: ($page, $site) =>
        $page.frontmatter.image &&
        (($site.themeConfig.domain &&
          !$page.frontmatter.image.startsWith("http")) ||
          "") + $page.frontmatter.image,
      publishedAt: ($page) =>
        $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
    },
  ],
};
