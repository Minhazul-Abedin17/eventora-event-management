
import Link from "next/link";
import {
  CalendarHeart,
  Home,
  Search,
} from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 shadow-lg shadow-violet-100">
          <Search size={38} className="text-violet-600" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-violet-600 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            <CalendarHeart size={18} />
            Explore Events
          </Link>
        </div>

        <p className="mt-10 text-xs font-medium tracking-widest text-violet-400">
          EVENTORA — PLAN • ORGANIZE • CELEBRATE
        </p>
      </div>
    </main>
  );
};

export default NotFound;
