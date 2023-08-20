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
      to: "/dashboard",
      icon: "i-heroicons-home",
    },
    {
      title: "بلاگ",
      to: "/dashboard/notes",
      icon: "i-heroicons-pencil-square",
    },
    {
      title: "سفارش‌ها",
      to: "/dashboard/orders",
      icon: "i-heroicons-shopping-bag",
    },
    {
      title: "دیدگاه‌ها",
      to: "/dashboard/comments",
      icon: "i-heroicons-chat-bubble-left-ellipsis",
    },
    {
      title: "تیکت‌ها",
      to: "/dashboard/tickets",
      icon: "i-heroicons-chat-bubble-left-right",
    },
    {
      title: "تنظیمات",
      to: "/dashboard/settings",
      icon: "i-heroicons-cog-6-tooth",
    },
  ],
});
