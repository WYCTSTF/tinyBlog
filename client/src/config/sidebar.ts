export interface SidebarItem {
  label: string;
  href: string;
  icon?: string; // Icon name from Lucide
}

export const sidebarConfig: SidebarItem[] = [
  { label: "Blog", href: "/blog", icon: "BookOpen" },
  { label: "TIL", href: "/til", icon: "Zap" },
  { label: "Wishlist", href: "/wishlist", icon: "ListTodo" },
  { label: "Presentations", href: "/presentations", icon: "Presentation" },
];

export const highFrequencyConfig: SidebarItem[] = [
  { label: "React Docs", href: "https://react.dev" },
  { label: "Bun Docs", href: "https://bun.sh" },
  { label: "Elysia Docs", href: "https://elysiajs.com" },
];
