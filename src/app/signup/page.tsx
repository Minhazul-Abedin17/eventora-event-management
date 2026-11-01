"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  LockKeyhole,
  Sparkles,
  Image as ImageIcon,
  CalendarDays,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Signup handler
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    const userData = {
      name,
      email,
      image,
      password,
    };

    console.log("Signup Data:", userData);

    toast.info(
      "Signup form is ready! Backend authentication will be connected later.",
    );
  };

  // Google signup handler
  const handleGoogleSignUp = () => {
    toast.info("Google authentication will be connected later.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-violet-100 lg:grid-cols-2">
        {/* Left Side - Welcome Section */}

        {/* Left Side - Welcome Section */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#17132F] p-10 text-white lg:flex xl:p-12">
          {/* Background Decorations */}
          <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full bg-violet-600/30 blur-[90px]" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-indigo-500/25 blur-[90px]" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Brand */}
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-white shadow-lg shadow-violet-500/30">
                <Sparkles size={23} />
              </span>
              Eventora<span className="text-violet-400">.</span>
            </Link>

            {/* Main Heading */}
            <div className="mt-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-violet-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                YOUR COMMUNITY STARTS HERE
              </div>

              <h1 className="mt-7 text-5xl font-extrabold leading-[1.15] tracking-tight xl:text-6xl">
                Make Moments
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                  Matter.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
                Great events don't just happen. They're created by people like
                you. Discover experiences, bring communities together and turn
                simple ideas into unforgettable memories.
              </p>
            </div>
          </div>

          {/* Event Showcase Card */}
          <div className="relative z-10 mt-12 rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-violet-300">
                  THE EVENTORA EXPERIENCE
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  More than just events.
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
                <Sparkles size={23} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                  <CalendarDays size={19} />
                </div>
                <p className="text-sm font-bold text-white">Discover</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Find your next experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300">
                  <Users size={19} />
                </div>
                <p className="text-sm font-bold text-white">Connect</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Meet people who inspire.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300">
                  <Sparkles size={19} />
                </div>
                <p className="text-sm font-bold text-white">Celebrate</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Create lasting memories.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#292342] bg-rose-200 text-rose-700">
                  <UserRound size={17} />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#292342] bg-violet-200 text-violet-700">
                  <UserRound size={17} />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#292342] bg-sky-200 text-sky-700">
                  <UserRound size={17} />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  One community. Endless possibilities.
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Plan • Organize • Celebrate
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-xs text-slate-400">
              Your ideas deserve an audience.
            </p>
            <span className="text-xs font-semibold tracking-wider text-violet-300">
              EVENTORA © 2026
            </span>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="px-6 py-10 sm:px-12 lg:px-14 lg:py-12">
          <div className="mb-8">
            <Link
              href="/"
              className="text-2xl font-bold text-violet-700 lg:hidden"
            >
              Eventora<span className="text-purple-400">.</span>
            </Link>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-violet-600">
              Create Your Account
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Get Started Today!
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create an account and start exploring amazing events.
            </p>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
          >
            <span className="text-xl font-bold text-blue-600">G</span>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              OR SIGN UP WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Profile Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Profile Image URL
              </label>

              <div className="relative">
                <ImageIcon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {image && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={image}
                    alt="Profile preview"
                    className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                  />
                  <span className="text-xs text-slate-500">
                    Profile image preview
                  </span>
                </div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 active:scale-[0.99]"
            >
              Create Account
              <ArrowRight size={19} />
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-violet-700 hover:text-violet-900"
            >
              Login here
            </Link>
          </p>

          <p className="mt-5 text-center text-xs text-slate-400">
            By creating an account, you agree to be part of the Eventora
            community.
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
