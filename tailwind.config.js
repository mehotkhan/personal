module.exports = {
  darkMode: "class",
  mode: "jit",
  attributify: false,
  extract: {
    include: [
      "./components/**/*.{vue,js}",
      "./composables/**/*.{js,ts}",
      "./content/**/*.md",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./utils/**/*.{js,ts}",
      "./app.vue",
    ],
  },
  theme: {
    maxWidth: {
      "8xl": "90rem",
    },
    fontFamily: {
      sans: 'Farhang,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    container: {
      center: true,
      padding: "16px",
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  safelist: [],
  shortcuts: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
