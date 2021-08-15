const { description } = require('../../package')
 
module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'علی زِمانی',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#1da1f2' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#1da1f2' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1da1f2' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: 'default-rtl',
  themeConfig: {
    repo: 'https://github.com/mehotkhan/personal-website',
    editLinks: true,
    docsDir: 'src',
    editLinkText: 'ویرایش',
   persianDate: true, // used in last-update plugin
      lastUpdated: 'آخرین ویرایش',
    nav: [
      {
        text: 'یادداشت ها',
        link: '/blogs/',
      },
      {
        text: 'درباره من',
        link: '/about-me/'
      },
      {
        text: 'پیشنهاد همکاری',
        link: '/offer-cooperation/'
      },
      {
        text: 'اطلاعات تماس',
        link: '/contact-me/'
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
