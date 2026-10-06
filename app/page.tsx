"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend connect karne ke baad yahan API call aayegi.
    // alert("Account setup started!");
    window.location.href = "/business/setup";
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Left Side */}
        <div className="hidden lg:flex bg-[#111827] text-white p-12 flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-white text-[#111827] flex items-center justify-center font-bold text-xl">
                H
              </div>

              <div>
                <h1 className="font-bold text-xl">Hotel SaaS</h1>
                <p className="text-xs text-gray-400">
                  Hospitality Management Platform
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Everything your
              <br />
              hospitality business
              <br />
              needs.
            </h2>

            <p className="mt-6 text-gray-400 leading-7 max-w-md">
              Manage rooms, reservations, restaurants, POS, inventory,
              housekeeping and your entire operation from one platform.
            </p>
          </div>

          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                ✓
              </span>
              One unified platform
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                ✓
              </span>
              Built for growing businesses
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                ✓
              </span>
              Role-based access control
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-7 sm:p-10 lg:p-12">
          <div className="max-w-md mx-auto">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold">
                H
              </div>

              <div>
                <h1 className="font-bold text-lg">Hotel SaaS</h1>
                <p className="text-xs text-gray-500">
                  Hospitality Platform
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-gray-500 mb-2">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>

              <p className="mt-2 text-gray-500">
                Start setting up your hospitality business.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="John"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work email
                </label>

                <input
                  type="email"
                  required
                  placeholder="john@hotel.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-20 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-20 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300"
                />

                <p className="text-sm text-gray-500 leading-5">
                  I agree to the Terms of Service and Privacy Policy.
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#111827] text-white py-3.5 font-semibold transition hover:bg-black active:scale-[0.99]"
              >
                Create account
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-7">
              Already have an account?{" "}
              <button className="font-semibold text-gray-900 hover:underline">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}