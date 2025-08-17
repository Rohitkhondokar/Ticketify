"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const inter = Inter({ subsets: ["latin"] });

const breadcrumbMap = {
  "/admin": "Overview",
  "/admin/events": "Events",
  "/admin/tickets": "Tickets",
  "/admin/vendors": "Vendors",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/payments": "Payments",
  "/admin/settings": "Settings",
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const currentPage = breadcrumbMap[pathname] || "Overview";
  // conponent
  return (
    <div className={inter.className}>
      <SidebarProvider>
        <AppSidebar userRole="admin" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Admin Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
