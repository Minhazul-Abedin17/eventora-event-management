import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  ArrowRight,
  Compass,
} from "lucide-react";
import CancelBookingButton from "./CancelBookingButton";

type Booking = {
  _id: string;
  eventId: string;
  eventName?: string;
  category?: string;
  imageUrl?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
};

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <Ticket size={45} className="text-violet-600" />

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          Please Sign In
        </h2>

        <p className="mt-2 text-gray-500">Sign in to see your booked events.</p>

        <Link
          href="/login"
          className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  let bookings: Booking[] = [];

  try {
    const res = await fetch(
      `http://localhost:8000/my-booking/${encodeURIComponent(user.email)}`,
      { cache: "no-store" },
    );

    if (res.ok) {
      bookings = await res.json();

      bookings.sort((a, b) => {
        if (!a.eventDate) return 1;
        if (!b.eventDate) return -1;

        return (
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
      });
    }
  } catch (error) {
    console.error("Booking Fetch Error:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
            <Ticket size={18} />
            My Bookings
          </div>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Your Booked Events
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your joined events and explore their details.
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            <Ticket size={16} />
            {bookings.length} {bookings.length === 1 ? "Event" : "Events"}{" "}
            Joined
          </p>
        </div>

        {/* Booking List */}
        {bookings.length > 0 ? (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:p-5"
              >
                {/* Event Image */}
                <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-violet-50 sm:h-36 sm:w-48">
                  {booking.imageUrl ? (
                    <img
                      src={booking.imageUrl}
                      alt={booking.eventName || "Event"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Ticket size={40} className="text-violet-300" />
                    </div>
                  )}
                </div>

                {/* Event Information */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    {booking.category || "Event"}
                  </span>

                  <h2 className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">
                    {booking.eventName || "Untitled Event"}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-violet-600" />
                      {booking.eventDate || "Date unavailable"}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-violet-600" />
                      {booking.eventTime || "Time unavailable"}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-violet-600" />
                      {booking.location || "Location unavailable"}
                    </span>
                  </div>

                  <Link
                    href={`/events/${booking.eventId}`}
                    className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                  <CancelBookingButton
                    bookingId={booking._id}
                    userEmail={user.email}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-5 py-16 text-center">
            <Ticket size={42} className="mx-auto text-violet-400" />

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Bookings Yet!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              You haven't joined any events yet. Explore events and join your
              first one!
            </p>

            <Link
              href="/events"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
              <Compass size={18} />
              Explore Events
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
