
import { CalendarHeart, Sparkles } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4">
      <div className="flex flex-col items-center text-center">

        {/* Logo Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 shadow-lg shadow-violet-100">
          <CalendarHeart
            size={38}
            className="text-violet-600"
          />
        </div>

        {/* Loading Spinner */}
        <div className="relative mb-6 flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />

          <Sparkles size={18} className="text-violet-600" />
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-bold text-gray-900">
          Getting Everything Ready
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we prepare your experience...
        </p>

        {/* Loading Dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600 [animation-delay:300ms]" />
        </div>

        <p className="mt-6 text-xs font-medium tracking-widest text-violet-400">
          EVENTORA
        </p>
      </div>
    </main>
  );
};

export default Loading;
