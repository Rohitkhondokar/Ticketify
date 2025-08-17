"use client";

import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function TicketHeader() {
  // Dummy user state for demonstration
  const userLoggedIn = true; // Set to true to simulate a logged-in user
  const router = useRouter();

  const handleLogout = async () => {};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#00453e] text-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 font-bold text-lg">
        {/* Logo */}
        <Link href="/">
          <h2>E-Ticketing</h2>
        </Link>

        {/* Desktop Navigation & Search */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/tickets/events"
            className="text-sm font-medium hover:underline"
          >
            Events
          </Link>
          <Link
            href="/tickets/organizer"
            className="text-sm font-medium hover:underline"
          >
            Become an Organizer
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </nav>

        {/* Desktop User Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/user">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>

          {userLoggedIn ? (
            <Button onClick={handleLogout} variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-gray-900 text-white">
            <div className="flex flex-col gap-4 p-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold"
              >
                <span className="text-xl">🎟️</span> Tickify
              </Link>
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary"
              />
              <Link
                href="/tickets/events"
                className="text-sm font-medium hover:underline"
              >
                Events
              </Link>
              <Link
                href="/tickets/organizer"
                className="text-sm font-medium hover:underline"
              >
                Become an Organizer
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:underline"
              >
                About
              </Link>
              <Separator className="my-2 bg-gray-700" />
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/tickets/dashboard">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
              </Button>

              {userLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="justify-start"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              ) : (
                <Button asChild className="justify-start">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
