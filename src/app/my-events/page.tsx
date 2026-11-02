"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  Plus,
  ArrowUpRight,
  Ticket,
  Loader2,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import EditEvent from "../events/EditEvent";
import DeleteEvent from "../events/DeleteEvent";

type Event = {
  _id: string;
  eventName?: string;
  name?: string;
  title?: string;
  category?: string;
  imageUrl?: string;
  image?: string;
  description?: string;
  date?: string;
  eventDate?: string;
  time?: string;
  eventTime?: string;
  location?: string;
  seats?: number;
};

const MyCreatedEvents = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8000/my-created-events/${encodeURIComponent(user.email)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        data.sort((a: Event, b: Event) => {
          const dateA = a.eventDate || a.date;
          const dateB = b.eventDate || b.date;

          if (!dateA) return 1;
          if (!dateB) return -1;

          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });

        setEvents(data);
      })
      .catch(() => console.log("Failed to load events"))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event._id !== id));
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-violet-600" />
          <p className="text-sm text-gray-500">Loading your events...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Ticket className="mb-4 h-12 w-12 text-violet-500" />
        <h2 className="text-2xl font-bold text-gray-900">Please Login First</h2>
        <p className="mt-2 text-gray-500">
          Login to see the events you have created.
        </p>
        <Link
          href="/login"
          className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-600">
              <Sparkles size={17} />
              YOUR EVENT SPACE
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              My Created Events
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              All the events you have created, in one place.
            </p>
          </div>

          <Link
            href="/create-event"
            className="flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            <Plus size={19} />
            Create New Event
          </Link>
        </div>

        {/* Total Events */}
        <div className="mb-7 flex items-center justify-between rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Total Events Created</p>
            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {events.length}
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Ticket size={24} />
          </div>
        </div>

        {/* Event Cards */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Event Image */}
                <div className="relative h-52 overflow-hidden bg-violet-100">
                  <img
                    src={
                      event.imageUrl ||
                      event.image ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    }
                    alt={event.eventName || "Event"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-violet-700">
                    {event.category || "Event"}
                  </div>

                  <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                    Created by you
                  </div>
                </div>

                {/* Event Information */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-gray-900 group-hover:text-violet-700">
                    {event.eventName ||
                      event.name ||
                      event.title ||
                      "Untitled Event"}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {event.description || "Discover this exciting event."}
                  </p>

                  <div className="my-5 space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CalendarDays
                        size={17}
                        className="shrink-0 text-violet-600"
                      />
                      <span>
                        {event.eventDate || event.date || "Date not added"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock size={17} className="shrink-0 text-violet-600" />
                      <span>
                        {event.eventTime || event.time || "Time not added"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin size={17} className="shrink-0 text-violet-600" />
                      <span className="line-clamp-1">
                        {event.location || "Location not added"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-50 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-600 hover:text-white"
                    >
                      View Event Details
                      <ArrowUpRight size={17} />
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      <EditEvent event={event} ownerEmail={user.email} />

                      <DeleteEvent
                        eventId={event._id}
                        ownerEmail={user.email}
                        onDelete={() => handleDelete(event._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Ticket size={30} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Events Created Yet!
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven&apos;t created any events yet. Start planning something
              amazing and your events will appear here.
            </p>

            <Link
              href="/create-event"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
              <Plus size={18} />
              Create Your First Event
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyCreatedEvents;
