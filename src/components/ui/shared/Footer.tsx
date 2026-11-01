
import { CalendarDays, Heart, Users, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-violet-100 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">

        {/* Main Footer */}
        <div className="flex flex-col items-center text-center">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-violet-600 p-2">
              <CalendarDays size={26} />
            </div>

            <h2 className="text-2xl font-bold">
              Event<span className="text-violet-400">ora</span>
            </h2>
          </div>

          <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
            Bringing people together through meaningful events.
            Plan, organize, and celebrate moments that matter.
          </p>

          {/* Features */}
          <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
              <CalendarDays className="text-violet-400" size={22} />
              <span className="text-sm font-medium">Easy Planning</span>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
              <Users className="text-violet-400" size={22} />
              <span className="text-sm font-medium">Community</span>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
              <Sparkles className="text-violet-400" size={22} />
              <span className="text-sm font-medium">Great Memories</span>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-gray-500 sm:flex-row sm:text-sm">

            <p>
              © 2026 Eventora. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5">
              Made with <Heart size={14} className="fill-violet-500 text-violet-500" /> 
              for meaningful moments.
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
