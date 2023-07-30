export default defineAppConfig({
  ui: {
    primary: "gray",
    gray: "cool",
  },
  menuItems: [
    {
      title: "یادداشت‌ها",
      to: "/notes",
    },
    {
      title: "بازارچه",
      to: "/market",
    },
    {
      title: "درباره‌من",
      to: "/about",
    },
    {
      title: "تماس‌با‌من",
      to: "/contact",
    },
  ],
});
