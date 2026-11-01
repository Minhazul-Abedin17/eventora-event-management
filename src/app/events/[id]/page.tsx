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
  Sparkles,
} from "lucide-react";
import JoinEventButton from "@/components/JoinEventButton";


const EventDetailsPage = async ({ params }) => {
  const { id } = await params;

  let event;

  try {
    const res = await fetch(`http://localhost:8000/all-events/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      notFound();
    }

    event = await res.json();
  } catch (error) {
    notFound();
  }

  const organizer = event.organizer || {};
  const volunteers = event.volunteers || [];

  const eventDate = event.eventDate
    ? new Date(`${event.eventDate}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  const organizerName = organizer.name || "Event Organizer";
  const organizerEmail = organizer.email || "Email will be available after authentication";
  const organizerImage = organizer.image;

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Image */}
        <div className="relative h-[260px] overflow-hidden rounded-3xl bg-violet-100 sm:h-[400px] lg:h-[480px]">
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10">
            <span className="mb-3 inline-block rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-violet-700">
              {event.category || "Event"}
            </span>

            <h1 className="max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {event.eventName}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* Event Information */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                  About This Event
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Event Overview
                </h2>
              </div>

              <p className="leading-8 text-slate-600">
                {event.description || "No event description available."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <div className="rounded-xl bg-white p-3 text-violet-600">
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Event Date</p>
                    <p className="font-semibold text-slate-800">{eventDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <div className="rounded-xl bg-white p-3 text-violet-600">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Event Time</p>
                    <p className="font-semibold text-slate-800">
                      {event.eventTime || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <div className="rounded-xl bg-white p-3 text-violet-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="font-semibold text-slate-800">
                      {event.location || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                  <div className="rounded-xl bg-white p-3 text-violet-600">
                    <Users size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Available Seats</p>
                    <p className="font-semibold text-slate-800">
                      {event.seats || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Organizer Information */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                  Meet The Organizer
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Event Hosted By
                </h2>
              </div>

              <div className="flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center">
                {organizerImage ? (
                  <img
                    src={organizerImage}
                    alt={organizerName}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <UserRound size={35} />
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900">
                    {organizerName}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-500">
                    <Mail size={16} className="shrink-0 text-violet-600" />
                    {organizerEmail}
                  </p>

                  <p className="mt-2 text-xs font-medium text-violet-600">
                    Event Organizer
                  </p>
                </div>
              </div>
            </section>

            {/* Volunteer Guidelines */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                Before You Join
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Volunteer Guidelines
              </h2>

              <p className="mt-2 text-slate-500">
                A few simple responsibilities to make this event successful.
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-violet-600" />
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Be On Time
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Arrive at the event venue at least 15 minutes before the
                      scheduled starting time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-violet-600" />
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Dress Appropriately
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Wear clean, comfortable and appropriate clothing
                      according to the event requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-violet-600" />
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Work As A Team
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Follow the organizer's instructions, respect everyone
                      and cooperate with other volunteers.
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* Join Event Card */}
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Community Members
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-slate-900">
                    {volunteers.length}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {volunteers.length === 1 ? "Volunteer joined" : "Volunteers joined"}
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-100 p-4 text-violet-600">
                  <Users size={28} />
                </div>
              </div>

              <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-violet-600"
                  style={{
                    width: `${Math.min(
                      (volunteers.length / (Number(event.seats) || 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <JoinEventButton />

              <p className="mt-3 text-center text-xs text-slate-400">
                Be part of something meaningful.
              </p>
            </section>

            {/* Volunteer List */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles size={19} className="text-violet-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Our Volunteers
                </h2>
              </div>

              {volunteers.length > 0 ? (
                <div className="space-y-4">
                  {volunteers.map((volunteer, index) => (
                    <div
                      key={volunteer.email || index}
                      className="flex items-center gap-3"
                    >
                      {volunteer.image ? (
                        <img
                          src={volunteer.image}
                          alt={volunteer.name || "Volunteer"}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                          <UserRound size={20} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {volunteer.name || "Volunteer"}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {volunteer.email || "Event participant"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center">
                  <Users className="mx-auto text-slate-300" size={32} />
                  <p className="mt-3 font-semibold text-slate-700">
                    No volunteers yet
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Be the first to join this event!
                  </p>
                </div>
              )}
            </section>

          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;