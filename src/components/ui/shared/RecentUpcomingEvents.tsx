import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  Users,
} from "lucide-react";

type Event = {
  _id: string;
  eventName: string;
  category: string;
  imageUrl: string;
  eventDate: string;
  eventTime: string;
  location: string;
  seats: string;
};

const RecentUpcomingEvents = async () => {
  let events: Event[] = [];

  try {
    const res = await fetch("http://localhost:8000/upcoming-events", {
      cache: "no-store",
    });

    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.log("Failed to load upcoming events:", error);
  }

  return (
    <section className="bg-violet-50/50 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              Don't Miss Out
            </span>

            <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
              Recent <span className="text-violet-600">Upcoming Events</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Explore the latest events and find something meaningful to be
              part of.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-semibold text-violet-600 transition hover:gap-3"
          >
            View All Events <ArrowRight size={18} />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-violet-100 bg-white py-16 text-center">
            <CalendarDays
              size={40}
              className="mx-auto text-violet-400"
            />
            <h3 className="mt-4 text-xl font-bold text-gray-800">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              New events will appear here when they are available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-violet-100">
                  <img
                    src={event.imageUrl}
                    alt={event.eventName}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow">
                    {event.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
                    {event.eventName}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-violet-600" />
                      {event.eventDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock size={17} className="text-violet-600" />
                      {event.eventTime}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} className="text-violet-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Users size={17} className="text-violet-600" />
                      {event.seats} Available Seats
                    </p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                  >
                    Explore Event <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentUpcomingEvents;