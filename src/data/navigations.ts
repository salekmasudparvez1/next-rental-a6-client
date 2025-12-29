
import type { NavigationType } from "@/types"



export const adminNavigationsData: NavigationType[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        iconName: "House",
        href: "/admin",
      },
    ],
  },
  {
    title:"All Users",
    items:[
      {
        title:"All Users",
        iconName:"UserRound",
        href:"/admin/all-users"
      }
    ]
  },
  {
    title: "All Posts",
    items: [
      {
        title: "All Posts",
        iconName: "FileText",
        href: "/admin/all-posts",
      },
    ],
  }

  
]
export const tenantNavigationsData: NavigationType[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        iconName: "House",
        href: "/tenant",
      },
    ],
  },
  {
    title:"All Requests",
    items:[
      {
        title:"All Requests",
        iconName:"BookOpen",
        href:"/tenant/all-requests"
      }
    ]
  },
  {
    title:"Transactions",
    items:[
      {
        title:"Transactions",
        iconName:"CreditCard",
        href:"/tenant/transaction"
      }
    ]
  },
]
export const landlordNavigationsData: NavigationType[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        iconName: "House",
        href: "/landlord",
      },
    ],
  },
  {
    title:"Create Post",
    items:[
      {
        title:"Create Post",
        iconName:"FilePlus",
        href:"/landlord/create-post"
      }
    ]
  },
  {
    title: "All Posts",
    items: [
      {
        title: "All Posts",
        iconName: "FileText",
        href: "/landlord/view-posts",
      },
    ],
  },
  {
    title:"All Requests",
    items:[
      {
        title:"All Requests",
        iconName:"BookOpen",
        href:"/landlord/all-requests"
      }
    ]
    
  },
  {
    title:"Transactions",
    items:[
      {
        title:"Transactions",
        iconName:"CreditCard",
        href:"/landlord/transactions"
      }
    ]

  }
]
