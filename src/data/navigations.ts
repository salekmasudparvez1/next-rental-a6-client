import type { NavigationType } from "@/types"

export const navigationsData: NavigationType[] = [
  {
    title: "Main",
    items: [
      {
        title: "Home",
        iconName: "House",
        items: [
          {
            title: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            title: "Analytics",
            href: "/admin/analytics",
          },
        ]
        
      },
    ],
  },
]
