import { Mail, Send } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="bg-white px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-purple-800 px-6 py-14 text-center shadow-xl shadow-violet-200 sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Mail size={32} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Stay Connected with Eventora
            </h2>

            <p className="mt-4 text-sm leading-7 text-violet-100 sm:text-base">
              Get updates about upcoming events, community activities and
              exciting opportunities. Never miss a meaningful moment!
            </p>

            <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 rounded-xl bg-white p-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Subscribe <Send size={16} />
              </button>
            </div>

            <p className="mt-4 text-xs text-violet-200">
              Join our community and stay inspired.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;