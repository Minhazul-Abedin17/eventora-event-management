
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isLoading) return;

  if (!email.trim() || !password) {
    toast.error("Please fill in all fields.");
    return;
  }

  try {
    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    if (error) {
      toast.error(error.message || "Login failed!");
      return;
    }

    toast.success("Login successful!");

    router.replace("/");
    router.refresh();

  } catch (error) {
    console.log("Login Error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google login failed!");
      }
    } catch (error) {
      console.log("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F7FC] px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_80px_rgba(49,35,100,0.10)] lg:min-h-[650px] lg:grid-cols-2">

        {/* Left Side */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#19152F] p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-600/30 blur-[90px]" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-[90px]" />

          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

          <div className="relative z-10">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500">
                <Sparkles size={22} />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Eventora<span className="text-violet-400">.</span>
              </span>
            </Link>

            <div className="mt-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[2px] text-violet-200">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                WELCOME BACK
              </span>

              <h1 className="mt-7 max-w-md text-5xl font-bold leading-[1.15] tracking-tight xl:text-6xl">
                Your next great experience
                <span className="text-violet-400"> starts here.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
                Sign in to discover exciting events, connect with your
                community and manage all your experiences in one place.
              </p>
            </div>

            {/* Feature Card */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-md">
              <p className="text-xs font-semibold tracking-[2px] text-violet-300">
                THE EVENTORA EXPERIENCE
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div>
                  <CalendarDays className="mb-3 text-violet-300" size={23} />
                  <p className="text-sm font-semibold">Discover</p>
                  <p className="mt-1 text-xs text-slate-400">Find events</p>
                </div>

                <div>
                  <Users className="mb-3 text-violet-300" size={23} />
                  <p className="text-sm font-semibold">Connect</p>
                  <p className="mt-1 text-xs text-slate-400">Meet people</p>
                </div>

                <div>
                  <Sparkles className="mb-3 text-violet-300" size={23} />
                  <p className="text-sm font-semibold">Celebrate</p>
                  <p className="mt-1 text-xs text-slate-400">Make memories</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400">
            <span>Plan • Organize • Celebrate</span>
            <span>© 2026 Eventora</span>
          </div>
        </section>

        {/* Right Side - Login Form */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">

            <div className="mb-9 lg:hidden">
              <Link href="/" className="flex w-fit items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <Sparkles size={21} />
                </div>
                <span className="text-2xl font-bold text-slate-900">
                  Eventora<span className="text-violet-600">.</span>
                </span>
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back!
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to your account and continue your Eventora journey.
              </p>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium tracking-wider text-slate-400">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      toast.info("Password recovery will be available later.")
                    }
                    className="text-xs font-semibold text-violet-600 transition hover:text-violet-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-violet-600"
                />
                Remember me
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-600/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Logging In..." : "Sign In"}
                {!isLoading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Signup Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-violet-600 transition hover:text-violet-800"
              >
                Create an account
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <CheckCircle2 size={15} className="text-green-500" />
              Your next memorable experience awaits.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
