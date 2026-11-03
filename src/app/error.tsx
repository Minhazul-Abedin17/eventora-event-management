
"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
  Home,
} from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error("Eventora Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
          <AlertTriangle
            size={38}
            className="text-red-500"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900">
          Something Went Wrong!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          Sorry! Something unexpected happened.
          Please try again or return to the homepage.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-xs font-medium tracking-widest text-violet-400">
          EVENTORA — PLAN • ORGANIZE • CELEBRATE
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
