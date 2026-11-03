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
  UserRound,
  Pencil,
  ArrowRight,
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

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
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/95 shadow-sm backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

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
        <nav className="hidden flex-1 justify-center lg:flex">
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-violet-700"
          >
            <Compass size={18} />
            Upcoming Events
          </Link>
        </nav>

        {/* Desktop Authentication / Profile */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-violet-100 p-1.5 transition hover:bg-violet-50"
              >
                <Avatar className="h-10 w-10 border-2 border-violet-100">
                  <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                  <AvatarFallback className="bg-violet-100 font-bold text-violet-700">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>

                <ChevronDown
                  size={17}
                  className={`mr-1 text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-xl shadow-violet-100/60">
                  <div className="flex items-center gap-3 bg-violet-50 p-5">
                    <Avatar className="h-12 w-12 border-2 border-white">
                      <AvatarImage src={user.image || ""} alt={user.name || "User"} />
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

                  <div className="p-2">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                    >
                      <Pencil size={18} />
                      Edit Profile
                    </Link>

                    <div className="my-2 border-t border-gray-100" />

                    {manageLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700"
                        >
                          <Icon size={18} />
                          {link.name}
                        </Link>
                      );
                    })}

                    <div className="my-2 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
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
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-700 transition hover:bg-violet-100 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-[300px] flex-col overflow-y-auto border-l border-violet-100 bg-white p-0 sm:w-[360px]"
          >
            {/* Mobile Header */}
            <SheetHeader className="border-b border-violet-100 bg-violet-50/70 px-5 py-5">
              <div className="flex items-center justify-between">
                <SheetTitle>
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src="/images/Eventora_ Plan, Organise, Celebrate.png"
                      alt="Eventora"
                      width={180}
                      height={90}
                      className="h-12 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </div>
            </SheetHeader>

            {/* Mobile User Profile */}
            {user && (
              <div className="mx-4 mt-5 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-violet-100 text-lg font-bold text-violet-700">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name || "User"}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-violet-600">
                      Eventora Member
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  <Pencil size={15} />
                  Edit Profile
                </Link>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 py-5">
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Navigation
              </p>

              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
              >
                <span className="flex items-center gap-3">
                  <Compass size={19} />
                  Upcoming Events
                </span>
                <ArrowRight size={17} />
              </Link>

              {user && (
                <>
                  <p className="mb-3 mt-7 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Manage Events
                  </p>

                  <div className="space-y-1">
                    {manageLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-violet-700"
                        >
                          <Icon size={19} className="text-violet-600" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}

              {!user && (
                <div className="mt-8 rounded-2xl bg-violet-50 p-5 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-violet-600">
                    <UserRound size={23} />
                  </div>

                  <h3 className="mt-3 text-base font-bold text-gray-900">
                    Welcome to Eventora
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Sign in to create events, manage bookings and connect with
                    your community.
                  </p>
                </div>
              )}
            </nav>

            {/* Mobile Bottom Authentication */}
            <div className="border-t border-violet-100 bg-gray-50/80 p-4">
              {user ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-violet-200 bg-white px-4 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
                  >
                    Create Account
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )}

              <p className="mt-4 text-center text-[11px] text-gray-400">
                Plan • Organize • Celebrate
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;