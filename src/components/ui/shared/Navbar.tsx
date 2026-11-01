
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  CalendarPlus,
  CalendarDays,
  Ticket,
  Menu,
  ChevronDown,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const manageLinks = [
    { name: "Create Event", href: "/create-event", icon: CalendarPlus },
    { name: "My Events", href: "/my-events", icon: CalendarDays },
    { name: "My Bookings", href: "/my-bookings", icon: Ticket },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Eventora_ Plan, Organise, Celebrate.png"
            alt="Eventora"
            width={240}
            height={120}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-violet-600"
          >
            <Compass size={18} />
            Explore Events
          </Link>

          {/* Manage Events Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-violet-600"
            >
              Manage Events
              <ChevronDown size={16} />
            </button>

            {dropdown && (
              <div className="absolute left-0 top-9 w-48 rounded-lg border bg-white p-2 shadow-lg">
                {manageLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-600"
                    >
                      <Icon size={17} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Login & Signup */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="rounded-full px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-violet-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="rounded-lg border p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={22} />
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Eventora</SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-2">
              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-violet-50"
              >
                <Compass size={19} />
                Explore Events
              </Link>

              <p className="px-4 pt-4 text-xs font-semibold uppercase text-gray-400">
                Manage Events
              </p>

              {manageLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-violet-50"
                  >
                    <Icon size={19} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="my-5 border-t" />

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border py-2.5 text-center text-sm font-semibold text-gray-700"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-full bg-violet-600 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
};

export default Navbar;
