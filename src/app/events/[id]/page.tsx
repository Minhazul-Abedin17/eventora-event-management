
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  UserRound,
  Mail,
  CheckCircle2,
} from "lucide-react";

import JoinEventButton from "@/components/JoinEventButton";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  // Get JWT Token from Better Auth
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("JWT Token:", jwtToken?.token);

  // Check if token exists
  if (!jwtToken?.token) {
    throw new Error("JWT token not found. Please login again.");
  }

  // Fetch Event Details from Backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-events/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${jwtToken.token}`,
    },
  });

  // Handle Backend Errors
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    console.error("Backend Response:", res.status, errorData);

    throw new Error(
      errorData?.message || `Failed to fetch event: ${res.status}`
    );
  }

  const event = await res.json();

  console.log("Event Details:", event);

  const organizer = event.organizer || {};

  const eventDate = event.eventDate
    ? new Date(`${event.eventDate}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-700"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Banner */}
        <div className="relative h-[280px] overflow-hidden rounded-3xl bg-violet-100 sm:h-[400px] lg:h-[460px]">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.eventName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-violet-400">
              <CalendarDays size={70} />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-violet-700">
              {event.category || "Event"}
            </span>

            <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {event.eventName}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-8 lg:col-span-2">

            {/* Event Overview */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                About This Event
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Event Overview
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {event.description || "No event description available."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <CalendarDays size={22} className="text-violet-600" />
                  <div>
                    <p className="text-xs text-slate-500">Event Date</p>
                    <p className="font-semibold text-slate-800">{eventDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <Clock size={22} className="text-violet-600" />
                  <div>
                    <p className="text-xs text-slate-500">Event Time</p>
                    <p className="font-semibold text-slate-800">
                      {event.eventTime || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <MapPin size={22} className="text-violet-600" />
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="font-semibold text-slate-800">
                      {event.location || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <Users size={22} className="text-violet-600" />
                  <div>
                    <p className="text-xs text-slate-500">Available Seats</p>
                    <p className="font-semibold text-slate-800">
                      {event.seats || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Volunteer Guidelines */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                Before You Join
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Volunteer Guidelines
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Please follow these simple guidelines to make the event successful.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Be On Time",
                    description:
                      "Arrive at the venue at least 15 minutes before the event starts.",
                  },
                  {
                    title: "Dress Appropriately",
                    description:
                      "Wear clean and comfortable clothing suitable for the event.",
                  },
                  {
                    title: "Work As A Team",
                    description:
                      "Follow the organizer's instructions and cooperate with others.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                  >
                    <CheckCircle2 className="mt-1 shrink-0 text-violet-600" />
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Organizer Information */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                Meet The Organizer
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Event Hosted By
              </h2>

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center">
                {organizer.image ? (
                  <img
                    src={organizer.image}
                    alt={organizer.name || "Event Organizer"}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <UserRound size={35} />
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900">
                    {organizer.name || "Event Organizer"}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-500">
                    <Mail size={16} className="shrink-0 text-violet-600" />
                    {organizer.email || "Email not available"}
                  </p>

                  <p className="mt-2 text-xs font-medium text-violet-600">
                    Event Organizer
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Join Event */}
          <aside>
            <section className="sticky top-24 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Users size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Join This Event
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Be a part of this event and make a positive difference in the community.
              </p>

              <div className="mt-6">
                <JoinEventButton event={event} />
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Be part of something meaningful.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
