module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "علی زِمانی",
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
    repo: "https://github.com/mehotkhan/personal-website",
    editLinks: true,
    docsDir: "notes",
    editLinkText: "ویرایش",
    persianDate: true,  
    lastUpdated: "آخرین ویرایش",
    displayAllHeaders: false, // Default: false
    nav: [
      {
        text: "یادداشت ها",
        link: "/blogs/",
      },
      {
        text: "کلاس درس آنلاین",
        link: "/online-classroom/",
      },
 
  
      {
        text: "اطلاعات تماس",
        ariaLabel: 'Language Menu',

        items: [
          {
            text: "درباره من",
            link: "/about-me/",
          },
          {
            text: "تماس بامن",
            link: "/contact-me/",
          }
        ]
      },
    ],
    sidebar: [
      {
        title: "بلاگ", // required
        path: "/blogs/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 2, // optional, defaults to 1
        children: [
          // 'blogs/',
          "blogs/jamstack-intro",
          "blogs/etools-tuts-preface",
          "blogs/self-learning-physics",
        ],
      },
      {
        title: "کتاب", // required
        path: "/books/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        // sidebarDepth: 1,    // optional, defaults to 1
        children: ["books/Modern-Web-Development-on-the-JAMstack/","books/Building-Progressive-Web-Applications-with-Vuejs/"],
      },
       
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: true
    }
  ],
};
