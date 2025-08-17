"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Settings,
  Users,
  Ticket,
  BarChart3,
  CreditCard,
  UserCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items for Admin Dashboard
const adminItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Tickets",
    url: "/admin/tickets",
    icon: Ticket,
  },
  {
    title: "Vendors",
    url: "/admin/vendors",
    icon: Users,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UserCheck,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Payments",
    url: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

// Menu items for Seller Dashboard
const sellerItems = [
  {
    title: "Dashboard",
    url: "/seller",
    icon: Home,
  },
  {
    title: "My Events",
    url: "/seller/events",
    icon: Calendar,
  },
  {
    title: "Ticket Sales",
    url: "/seller/tickets",
    icon: Ticket,
  },
  {
    title: "Analytics",
    url: "/seller/analytics",
    icon: BarChart3,
  },
  {
    title: "Earnings",
    url: "/seller/earnings",
    icon: CreditCard,
  },
  {
    title: "Profile",
    url: "/seller/profile",
    icon: Settings,
  },
];

export function AppSidebar({ userRole = "admin" }) {
  const pathname = usePathname();
  const menuItems = userRole === "admin" ? adminItems : sellerItems;
  const title = userRole === "admin" ? "Admin Panel" : "Seller Panel";

  return (
    <Sidebar>
      <SidebarContent className="bg-[#00453e] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 text-lg font-bold px-4 py-6">
            {title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`text-white hover:bg-white/10 ${
                      pathname === item.url ? "bg-white/20" : ""
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
