export default defineAppConfig({
  ui: {
    primary: "gray",
    gray: "cool",
  },
  menuItems: [
    {
      title: "صفحه‌نخست",
      to: "/",
    },
    {
      title: "یادداشت‌ها",
      to: "/notes",
    },
    {
      title: "فروشگاه",
      to: "/market",
    },
    {
      title: "درباره‌من",
      to: "/about",
    },
  ],
  dashMenuItems: [
    {
      title: "داشبورد",
      to: "/dash",
    },
    {
      title: "یادداشت‌ها",
      to: "/dash/notes",
    },
    {
      title: "دیدگاه‌ها",
      to: "/dash/comments",
    },
    {
      title: "سفارش‌ها",
      to: "/dash/orders",
    },
    {
      title: "تیکت‌ها",
      to: "/dash/tickets",
    },
  ],
});
