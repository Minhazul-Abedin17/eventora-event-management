
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Compass,
  CalendarPlus,
  CalendarDays,
  Ticket,
  Menu,
  ChevronDown,
  LogOut,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client";

const manageLinks = [
  { name: "Create Event", href: "/create-event", icon: CalendarPlus },
  { name: "My Events", href: "/my-events", icon: CalendarDays },
  { name: "My Bookings", href: "/my-bookings", icon: Ticket },
];

const Navbar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  // Sign Out
  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed!");
        return;
      }

      toast.success("Signed out successfully!");

      setProfileOpen(false);
      setOpen(false);
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Eventora_ Plan, Organise, Celebrate.png"
            alt="Eventora"
            width={240}
            height={120}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">

          {/* Explore Events */}
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-violet-600"
          >
            <Compass size={18} />
            Explore Events
          </Link>

          {/* Manage Events Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDropdown(!dropdown);
                setProfileOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-violet-600"
            >
              Manage Events

              <ChevronDown
                size={17}
                className={`transition-transform ${dropdown ? "rotate-180" : ""}`}
              />
            </button>

            {dropdown && (
              <div className="absolute left-0 top-10 z-50 w-56 rounded-xl border border-violet-100 bg-white p-2 shadow-xl shadow-violet-100/60">

                {manageLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700"
                    >
                      <Icon size={18} />
                      {link.name}
                    </Link>
                  );
                })}

              </div>
            )}
          </div>
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">

          {user ? (
            /* User Profile Dropdown */
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setDropdown(false);
                }}
                className="flex items-center gap-2 rounded-full border border-violet-100 bg-white p-1.5 pr-3 transition hover:border-violet-300 hover:bg-violet-50"
              >
                <Avatar className="h-9 w-9 border border-violet-100">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />

                  <AvatarFallback className="bg-violet-100 font-bold text-violet-700">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                  {user.name || "My Account"}
                </span>

                <ChevronDown
                  size={17}
                  className={`text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-xl shadow-violet-100/60">

                  {/* User Information */}
                  <div className="border-b border-violet-100 bg-violet-50 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border border-violet-200">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || "User"}
                        />

                        <AvatarFallback className="bg-violet-100 font-bold text-violet-700">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {user.name || "User"}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Options */}
                  <div className="p-2">
                    <Link
                      href="/my-events"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700"
                    >
                      <CalendarDays size={18} />
                      My Dashboard
                    </Link>

                    <Link
                      href="/my-bookings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700"
                    >
                      <Ticket size={18} />
                      My Bookings
                    </Link>

                    <div className="my-2 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <LogOut size={18} />
                      {isSigningOut ? "Signing out..." : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-700"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="rounded-xl border border-violet-100 p-2.5 text-gray-700 transition hover:bg-violet-50 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] overflow-y-auto sm:w-[350px]"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-xl font-bold text-violet-700">
                Eventora
              </SheetTitle>
            </SheetHeader>

            {/* Mobile User Profile */}
            {user && (
              <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-violet-200">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />

                    <AvatarFallback className="bg-violet-100 font-bold text-violet-700">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="mt-7 flex flex-col gap-1">

              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-700"
              >
                <Compass size={19} />
                Explore Events
              </Link>

              {/* Mobile Manage Events */}
              <p className="px-4 pb-2 pt-5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Manage Events
              </p>

              {manageLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-700"
                  >
                    <Icon size={19} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="my-6 border-t border-gray-100" />

            {/* Mobile Authentication */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={18} />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-violet-200 py-3 text-center text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-violet-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
