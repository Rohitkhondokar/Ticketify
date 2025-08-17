"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  User,
  Ticket,
  ShoppingBag,
  Heart,
  Settings,
  Menu,
  Home,
  Bell,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

const userMenuItems = [
  { title: "Dashboard", url: "/user", icon: Home },
  { title: "My Tickets", url: "/user/tickets", icon: Ticket },
  { title: "Order History", url: "/user/orders", icon: ShoppingBag },
  { title: "Profile Settings", url: "/user/profile", icon: Settings },
];

export default function UserLayoutClient({ children, userData }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getCurrentPageTitle = () => {
    const currentItem = userMenuItems.find((item) => item.url === pathname);
    return currentItem ? currentItem.title : "Dashboard";
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#00453e] rounded-lg flex items-center justify-center">
            <Ticket className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">E-Ticketing</span>
        </Link>
      </div>

      {/* User Info - Now using real session data */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center space-x-3">
          {userData.image ? (
            <Image
              src={userData.image || "/placeholder.svg"}
              alt={userData.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{userData.name}</p>
            <p className="text-xs text-gray-500">{userData.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {userMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#00453e] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Main Site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-white">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {getCurrentPageTitle()}
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {userData.name}!
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
