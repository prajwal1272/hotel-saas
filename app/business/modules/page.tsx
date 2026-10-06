"use client";

import { useState } from "react";

const modules = [
  {
    id: "rooms",
    icon: "🛏️",
    title: "Rooms & Reservations",
    description: "Manage rooms, availability, bookings and reservations.",
  },
  {
    id: "restaurant",
    icon: "🍽️",
    title: "Restaurant",
    description: "Manage restaurant operations, menus and tables.",
  },
  {
    id: "pos",
    icon: "💳",
    title: "POS",
    description: "Handle billing, payments and point-of-sale operations.",
  },
  {
    id: "kitchen",
    icon: "👨‍🍳",
    title: "Kitchen",
    description: "Manage kitchen orders, preparation and KOT.",
  },
  {
    id: "inventory",
    icon: "📦",
    title: "Inventory",
    description: "Track stock, purchases, suppliers and inventory.",
  },
  {
    id: "housekeeping",
    icon: "🧹",
    title: "Housekeeping",
    description: "Manage room cleaning and housekeeping tasks.",
  },
  {
    id: "staff",
    icon: "👥",
    title: "Staff Management",
    description: "Manage employees, roles, shifts and attendance.",
  },
  {
    id: "finance",
    icon: "💰",
    title: "Finance",
    description: "Track expenses, revenue and financial operations.",
  },
  {
    id: "reports",
    icon: "📊",
    title: "Reports",
    description: "View business analytics and operational reports.",
  },
];

export default function ModulesPage() {
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "rooms",
  ]);

  const toggleModule = (id: string) => {
    setSelectedModules((current) =>
      current.includes(id)
        ? current.filter((module) => module !== id)
        : [...current, id]
    );
  };

  const handleContinue = () => {
    if (selectedModules.length === 0) {
      alert("Please select at least one module.");
      return;
    }

    console.log("Selected Modules:", selectedModules);

    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg">
            🏨
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Choose your modules
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Select the features your business needs. You can change these
            modules later from your settings.
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mb-10 max-w-3xl">
          <div className="flex items-center justify-between">

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                ✓
              </div>
              <span className="mt-2 text-sm font-medium text-green-600">
                Account
              </span>
            </div>

            <div className="h-1 flex-1 bg-green-500" />

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                ✓
              </div>
              <span className="mt-2 text-sm font-medium text-green-600">
                Business
              </span>
            </div>

            <div className="h-1 flex-1 bg-blue-600" />

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                3
              </div>
              <span className="mt-2 text-sm font-semibold text-blue-600">
                Modules
              </span>
            </div>

            <div className="h-1 flex-1 bg-slate-200" />

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-500">
                4
              </div>
              <span className="mt-2 text-sm font-medium text-slate-400">
                Dashboard
              </span>
            </div>

          </div>
        </div>

        {/* Module Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const isSelected = selectedModules.includes(module.id);

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => toggleModule(module.id)}
                className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <span className="text-sm">✓</span>}
                </div>

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                  {module.icon}
                </div>

                <h2 className="pr-8 text-lg font-semibold text-slate-900">
                  {module.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {module.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row">
          <div>
            <p className="font-semibold text-slate-900">
              {selectedModules.length} module
              {selectedModules.length !== 1 ? "s" : ""} selected
            </p>

            <p className="mt-1 text-sm text-slate-500">
              You can add or remove modules later.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Continue →
          </button>
        </div>

      </div>
    </main>
  );
}