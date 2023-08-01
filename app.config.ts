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
  manageMenuItems: [
    {
      title: "داشبورد",
      to: "/manage",
    },
    {
      title: "دیدگاه‌ها",
      to: "/manage/comments",
    },
    {
      title: "سفارش‌ها",
      to: "/manage/orders",
    },
    {
      title: "تیکت‌ها",
      to: "/manage/tickets",
    },
  ],
});
