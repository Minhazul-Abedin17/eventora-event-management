
import Link from "next/link";
import { ArrowRight, Heart, Users, CalendarDays, Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-8 lg:gap-16 lg:px-12 lg:py-16">

        {/* Left Content */}
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold text-violet-700 sm:text-sm">
            <Heart size={16} />
            Make Every Moment Meaningful
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            Bring People Together,
            <span className="text-violet-600"> Create Memories.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base md:mx-0">
            Discover meaningful events, connect with people, and make a
            difference in your community. Every great event starts with
            an idea.
          </p>

          <div className="mt-7 flex justify-center md:justify-start">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 sm:text-base"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Static Statistics */}
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
            <div className="rounded-xl bg-white p-3 text-center shadow-sm sm:p-4">
              <h3 className="text-xl font-bold text-violet-600 sm:text-2xl">
                3K+
              </h3>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                Events Created
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 text-center shadow-sm sm:p-4">
              <h3 className="text-xl font-bold text-violet-600 sm:text-2xl">
                5K+
              </h3>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                Happy Participants
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 text-center shadow-sm sm:p-4">
              <h3 className="text-xl font-bold text-violet-600 sm:text-2xl">
                1K+
              </h3>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                Communities
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-full bg-violet-200/60 blur-3xl" />

          <div className="relative rounded-3xl border border-violet-100 bg-white p-4 shadow-xl shadow-violet-100 sm:p-6">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-6 text-white sm:p-9">
              <Sparkles size={35} className="mb-6 text-violet-200" />

              <p className="text-sm font-medium text-violet-200">
                Welcome to Eventora
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
                Together, We Can Make a Difference.
              </h2>

              <p className="mt-4 text-sm leading-7 text-violet-100 sm:text-base">
                From helping communities to creating unforgettable
                experiences, let’s make every moment count.
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-white/20 pt-5">
                <div className="rounded-full bg-white/15 p-3">
                  <Heart size={23} />
                </div>
                <div>
                  <p className="font-semibold">Plan. Organize. Celebrate.</p>
                  <p className="mt-1 text-xs text-violet-200">
                    Every event brings us closer.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-violet-50 p-4">
              <Users size={22} className="text-violet-600" />
              <p className="text-sm font-medium text-gray-700">
                Bringing Communities Together
              </p>
              <CalendarDays size={22} className="text-violet-600" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
