import { defineConfig } from "windicss/helpers";
import type { Plugin } from "windicss/types/interfaces";
// plugins
import TypographyPlugin from "windicss/plugin/typography";
import AspectRatioPlugin from "windicss/plugin/aspect-ratio";
import FiltersPlugin from "windicss/plugin/filters";

export default defineConfig({
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
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        primary: {
          DEFAULT: "#0096FF",
          "50": "#B8E2FF",
          "100": "#A3D9FF",
          "200": "#7AC8FF",
          "300": "#52B8FF",
          "400": "#29A7FF",
          "500": "#0096FF",
          "600": "#0075C7",
          "700": "#00548F",
          "800": "#003357",
          "900": "#00121F",
        },
      },
      fontFamily: {
        sans: 'FarhangDot1,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      },
      container: {
        center: true,
        padding: "16px",
      },
    },
  },
  shortcuts: {},
  plugins: [
    // filters plugin require for navbar blur
    FiltersPlugin as Plugin,
    TypographyPlugin as Plugin,
    AspectRatioPlugin as Plugin,
  ] as Plugin[],
});
