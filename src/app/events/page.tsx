
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type Event = {
  _id: string;
  eventName: string;
  category?: string;
  imageUrl?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  seats?: number;
};

const AllEventPage = async () => {
  let token: string | null = null;

  // Get token safely
  try {
    token = await getTokenFromServer();
  } catch (error) {
    console.log("User is not logged in:", error);
  }

  // Redirect if user is not logged in
  if (!token) {
    redirect("/login");
  }

  let events: Event[] = [];

  // Fetch events from backend
  try {
    const res = await fetch("http://localhost:8000/all-events", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Redirect if token is invalid or expired
    if (res.status === 401) {
      redirect("/login");
    }

    if (res.ok) {
      events = await res.json();

      // Sort events by date
      events.sort((a, b) => {
        if (!a.eventDate) return 1;
        if (!b.eventDate) return -1;

        return (
          new Date(a.eventDate).getTime() -
          new Date(b.eventDate).getTime()
        );
      });
    }
  } catch (error) {
    // Do not swallow Next.js redirect errors
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Failed to load events:", error);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            <Sparkles size={16} />
            Discover Something Amazing
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore All <span className="text-violet-600">Events</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Discover exciting events, connect with people, and be part of
            something meaningful.
          </p>

          <p className="mt-4 text-sm font-medium text-violet-600">
            {events.length} Events Available
          </p>
        </div>

        {/* Event Cards */}
        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                href={`/events/${event._id}`}
                key={event._id}
                className="group"
              >
                <div className="h-full overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100">

                  {/* Event Image */}
                  <div className="relative h-52 overflow-hidden bg-violet-100">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.eventName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <CalendarDays
                          size={40}
                          className="text-violet-300"
                        />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                      {event.category || "Event"}
                    </span>
                  </div>

                  {/* Event Information */}
                  <div className="p-5">
                    <h2 className="mb-3 line-clamp-1 text-xl font-bold text-gray-900 transition group-hover:text-violet-600">
                      {event.eventName}
                    </h2>

                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <CalendarDays
                          size={17}
                          className="shrink-0 text-violet-600"
                        />
                        <span>
                          {event.eventDate
                            ? new Date(
                                `${event.eventDate}T00:00:00`
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "Date not available"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock
                          size={17}
                          className="shrink-0 text-violet-600"
                        />
                        <span>
                          {event.eventTime || "Time unavailable"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin
                          size={17}
                          className="shrink-0 text-violet-600"
                        />
                        <span className="line-clamp-1">
                          {event.location || "Location unavailable"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users
                          size={17}
                          className="shrink-0 text-violet-600"
                        />
                        <span>
                          {event.seats ?? 0} Available Seats
                        </span>
                      </div>
                    </div>

                    {/* View Details */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm font-semibold text-violet-600">
                        View Event Details
                      </span>

                      <ArrowRight
                        size={19}
                        className="text-violet-600 transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-16 text-center shadow-sm">
            <CalendarDays
              size={45}
              className="mx-auto mb-4 text-violet-400"
            />

            <h2 className="text-xl font-bold text-gray-800">
              No Events Available Yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Be the first to create an event and bring people together!
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Create Your First Event
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllEventPage;
