"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/currency";
import {
  getReservations,
  Reservation,
} from "@/lib/reservations";

const stats = [
 {
  title: "Total Rooms",
  value: "",
  change: "+4.5%",
  icon: "🛏️",
},
{
  title: "Today's Bookings",
  value: "",
  change: "+12%",
  icon: "📅",
},
{
  title: "Occupancy",
  value: "",
  change: "+6.2%",
  icon: "🏨",
},
  {
    title: "Today's Revenue",
    value: "",
    change: "+18.4%",
    icon: "💰",
  },
];



const modules = [
  { name: "Rooms & Reservations", icon: "🛏️" },
  { name: "Restaurant", icon: "🍽️" },
  { name: "POS", icon: "💳" },
  { name: "Kitchen", icon: "👨‍🍳" },
  { name: "Inventory", icon: "📦" },
  { name: "Housekeeping", icon: "🧹" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [businessName, setBusinessName] = useState("Hotel SaaS");
  const [isMounted, setIsMounted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const todayBookings = reservations.filter(
    (reservation) =>
      reservation.status === "Confirmed" &&
      reservation.checkIn === today
  ).length;

  const todayRevenue = reservations
    .filter(
      (reservation) =>
        reservation.status === "Confirmed" &&
        reservation.checkIn === today
    )
    .reduce((total, reservation) => {
      const nights =
        (new Date(reservation.checkOut).getTime() -
          new Date(reservation.checkIn).getTime()) /
        (1000 * 60 * 60 * 24);

      return (
        total +
        reservation.roomRate * nights -
        reservation.discount
      );
    }, 0);

      const totalRooms = 8;

  const occupiedRooms = reservations.filter(
    (reservation) =>
      reservation.status === "Confirmed" &&
      reservation.checkIn <= today &&
      reservation.checkOut > today
  ).length;

  const occupancyRate =
    totalRooms > 0
      ? Math.round((occupiedRooms / totalRooms) * 100)
      : 0;

  useEffect(() => {
  setIsMounted(true);

  try {
    const data = localStorage.getItem("hotel_saas_business");

    if (data) {
      const business = JSON.parse(data);

      if (business.businessName) {
        setBusinessName(business.businessName);
      }
    }
  } catch {
    setBusinessName("Hotel SaaS");
  }

  setReservations(getReservations());
}, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >

        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
            🏨
          </div>

          <div>
            <h1 className="font-bold text-slate-900">
              {businessName}
            </h1>
            <p className="text-xs text-slate-400">
              Management Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <button className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
            <span>📊</span>
            Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>🛏️</span>
            Reservations
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>🏨</span>
            Rooms
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>🍽️</span>
            Restaurant
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>💳</span>
            POS
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>📦</span>
            Inventory
          </button>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>👥</span>
            Staff
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>💰</span>
            Finance
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>📈</span>
            Reports
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <span>⚙️</span>
            Settings
          </button>

        </nav>

        {/* User */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              JD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                John Doe
              </p>
              <p className="truncate text-xs text-slate-400">
                Owner
              </p>
            </div>

            <button className="text-slate-400 hover:text-slate-700">
              ⋮
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              ☰
            </button>

            <div>
              <h2 className="text-xl font-bold">
                Dashboard
              </h2>

              <p className="text-sm text-slate-400">
                Tuesday, October 6, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button className="relative rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
              🔔
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-9 w-px bg-slate-200 sm:block" />

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                JD
              </div>

              <div>
                <p className="text-sm font-semibold">
                  John Doe
                </p>
                <p className="text-xs text-slate-400">
                  Owner
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Content */}
        <main className="p-5 lg:p-8">

          {/* Welcome */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h1 className="text-2xl font-bold">
                Good morning, John 👋
              </h1>

              <p className="mt-1 text-slate-500">
                Here's what's happening with your hotel today.
              </p>
            </div>

            <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              + New Reservation
            </button>

          </div>

          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

<p className="mt-2 text-3xl font-bold">
  {stat.title === "Total Rooms"
    ? isMounted
      ? totalRooms
      : ""
    : stat.title === "Today's Revenue"
    ? isMounted
      ? formatCurrency(todayRevenue)
      : ""
    : stat.title === "Today's Bookings"
    ? isMounted
      ? todayBookings
      : ""
    : stat.title === "Occupancy"
    ? isMounted
      ? `${occupancyRate}%`
      : ""
    : stat.value}
</p>

                    <p className="mt-2 text-xs font-semibold text-green-600">
                      ↑ {stat.change}{" "}
                      <span className="font-normal text-slate-400">
                        vs last month
                      </span>
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {stat.icon}
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* Middle Section */}
          <div className="mt-8 grid gap-6 xl:grid-cols-3">

            {/* Occupancy */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold">
                    Occupancy Overview
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Room occupancy for this week
                  </p>
                </div>

                <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>

              {/* Chart */}
              <div className="mt-8 flex h-56 items-end justify-between gap-3">

                {[
                  ["Mon", 62],
                  ["Tue", 78],
                  ["Wed", 72],
                  ["Thu", 85],
                  ["Fri", 92],
                  ["Sat", 88],
                  ["Sun", 76],
                ].map(([day, value]) => (
                  <div
                    key={day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="text-xs font-semibold text-slate-500">
                      {value}%
                    </div>

                    <div className="flex h-40 w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                        style={{
                          height: `${Number(value) * 1.6}px`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-slate-400">
                      {day}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="font-bold">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Frequently used actions
              </p>

              <div className="mt-5 space-y-3">

                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50">
                  <span className="text-xl">📅</span>
                  <div>
                    <p className="text-sm font-semibold">
                      New Reservation
                    </p>
                    <p className="text-xs text-slate-400">
                      Create a new booking
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50">
                  <span className="text-xl">👤</span>
                  <div>
                    <p className="text-sm font-semibold">
                      Add Guest
                    </p>
                    <p className="text-xs text-slate-400">
                      Register a new guest
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50">
                  <span className="text-xl">💳</span>
                  <div>
                    <p className="text-sm font-semibold">
                      New Payment
                    </p>
                    <p className="text-xs text-slate-400">
                      Record a payment
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="text-sm font-semibold">
                      View Reports
                    </p>
                    <p className="text-xs text-slate-400">
                      Check business reports
                    </p>
                  </div>
                </button>

              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-8 grid gap-6 xl:grid-cols-3">

            {/* Reservations */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-bold">
                    Today's Reservations
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Latest guest bookings
                  </p>
                </div>

                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View All →
                </button>

              </div>

              <div className="mt-5 overflow-x-auto">

                <table className="w-full min-w-[650px]">

                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                      <th className="pb-3 font-semibold">
                        Guest
                      </th>
                      <th className="pb-3 font-semibold">
                        Room
                      </th>
                      <th className="pb-3 font-semibold">
                        Check In
                      </th>
                      <th className="pb-3 font-semibold">
                        Check Out
                      </th>
                      <th className="pb-3 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                   {reservations.map((reservation) => (
  <tr
    key={reservation.id}
                        className="border-b border-slate-50 last:border-0"
                      >

                        <td className="py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold">
                              {`${reservation.firstName} ${reservation.lastName}`
  .split(" ")
  .map((name) => name[0])
  .join("")}
                            </div>

                            <span className="text-sm font-semibold">
                              {reservation.firstName} {reservation.lastName}
                            </span>

                          </div>
                        </td>

                        <td className="py-4 text-sm text-slate-500">
                          {reservation.room}
                        </td>

                        <td className="py-4 text-sm text-slate-500">
                          {reservation.checkIn}
                        </td>

                        <td className="py-4 text-sm text-slate-500">
                          {reservation.checkOut}
                        </td>

                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                             reservation.status === "Confirmed"
  ? "bg-blue-100 text-blue-700"
  : "bg-red-100 text-red-700"
                            }`}
                          >
                           {reservation.status}
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </div>

            {/* Modules */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-bold">
                    Your Modules
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Enabled features
                  </p>
                </div>

                <button className="text-sm font-semibold text-blue-600">
                  Manage
                </button>

              </div>

              <div className="mt-5 space-y-3">

                {modules.map((module) => (
                  <div
                    key={module.name}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                      {module.icon}
                    </div>

                    <span className="text-sm font-medium">
                      {module.name}
                    </span>

                    <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />
                  </div>
                ))}

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}