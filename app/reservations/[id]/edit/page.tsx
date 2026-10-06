"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getReservations,
  Reservation,
} from "@/lib/reservations";
import { formatCurrency } from "@/lib/currency";

export default function EditReservationPage() {
  const params = useParams();
  const router = useRouter();

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = String(params.id);

    const reservations = getReservations();

    const found = reservations.find(
      (item) => item.id === id
    );

    setReservation(found || null);
    setLoading(false);
  }, [params.id]);

  function handleChange(
    field: keyof Reservation,
    value: string | number
  ) {
    if (!reservation) return;

    setReservation({
      ...reservation,
      [field]: value,
    });
  }

  function handleSave() {
    if (!reservation) return;

    if (!reservation.firstName.trim()) {
      alert("Please enter first name.");
      return;
    }

    if (!reservation.lastName.trim()) {
      alert("Please enter last name.");
      return;
    }

    if (!reservation.checkIn || !reservation.checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (
      new Date(reservation.checkOut) <=
      new Date(reservation.checkIn)
    ) {
      alert("Check-out must be after check-in.");
      return;
    }

    const reservations = getReservations();

const roomConflict = reservations.some(
  (item) =>
    item.id !== reservation.id &&
    item.status === "Confirmed" &&
    item.room === reservation.room &&
    new Date(reservation.checkIn) < new Date(item.checkOut) &&
    new Date(reservation.checkOut) > new Date(item.checkIn)
);

if (roomConflict) {
  alert(
    `Room ${reservation.room} is already booked for the selected dates. Please choose another room.`
  );
  return;
}

    

    const updatedReservations = reservations.map(
      (item) =>
        item.id === reservation.id
          ? reservation
          : item
    );

    localStorage.setItem(
      "hotel_saas_reservations",
      JSON.stringify(updatedReservations)
    );

    alert("Reservation updated successfully!");

    router.push(
      `/reservations/${reservation.id}`
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Loading reservation...
        </p>
      </main>
    );
  }

  if (!reservation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Reservation Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            This reservation does not exist.
          </p>

          <button
            onClick={() =>
              router.push("/reservations")
            }
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Back to Reservations
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-5">

          <div>
            <button
              onClick={() =>
                router.push(
                  `/reservations/${reservation.id}`
                )
              }
              className="mb-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              ← Back to Reservation
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Edit Reservation
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {reservation.id}
            </p>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-5xl p-6">

        <div className="space-y-6">

          {/* GUEST INFORMATION */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Guest Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="First Name"
                value={reservation.firstName}
                onChange={(value) =>
                  handleChange("firstName", value)
                }
              />

              <Input
                label="Last Name"
                value={reservation.lastName}
                onChange={(value) =>
                  handleChange("lastName", value)
                }
              />

              <Input
                label="Email"
                type="email"
                value={reservation.email}
                onChange={(value) =>
                  handleChange("email", value)
                }
              />

              <Input
                label="Phone"
                value={reservation.phone}
                onChange={(value) =>
                  handleChange("phone", value)
                }
              />

            </div>

          </section>

          {/* STAY DETAILS */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Stay Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Check-in"
                type="date"
                value={reservation.checkIn}
                onChange={(value) =>
                  handleChange("checkIn", value)
                }
              />

              <Input
                label="Check-out"
                type="date"
                value={reservation.checkOut}
                onChange={(value) =>
                  handleChange("checkOut", value)
                }
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Room
                </label>

                <select
                  value={reservation.room}
                  onChange={(e) =>
                    handleChange(
                      "room",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="101">
                    101 - Standard
                  </option>

                  <option value="103">
                    103 - Deluxe
                  </option>

                  <option value="203">
                    203 - Suite
                  </option>

                  <option value="302">
                    302 - Standard
                  </option>
                </select>
              </div>

              <Input
                label="Room Type"
                value={reservation.roomType}
                onChange={(value) =>
                  handleChange(
                    "roomType",
                    value
                  )
                }
              />

              <Input
                label="Adults"
                type="number"
                value={String(reservation.adults)}
                onChange={(value) =>
                  handleChange(
                    "adults",
                    Number(value)
                  )
                }
              />

              <Input
                label="Children"
                type="number"
                value={String(reservation.children)}
                onChange={(value) =>
                  handleChange(
                    "children",
                    Number(value)
                  )
                }
              />

              <Input
                label="Booking Source"
                value={reservation.bookingSource}
                onChange={(value) =>
                  handleChange(
                    "bookingSource",
                    value
                  )
                }
              />

            </div>

          </section>

          {/* PRICING */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Pricing & Payment
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Room Rate"
                type="number"
                value={String(reservation.roomRate)}
                onChange={(value) =>
                  handleChange(
                    "roomRate",
                    Number(value)
                  )
                }
              />

              <Input
                label="Discount"
                type="number"
                value={String(reservation.discount)}
                onChange={(value) =>
                  handleChange(
                    "discount",
                    Number(value)
                  )
                }
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Status
                </label>

                <select
                  value={reservation.paymentStatus}
                  onChange={(e) =>
                    handleChange(
                      "paymentStatus",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Partial">
                    Partial
                  </option>

                  <option value="Paid">
                    Paid
                  </option>
                </select>
              </div>

            </div>

          </section>

          {/* SPECIAL REQUESTS */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Special Requests
            </h2>

            <textarea
              value={reservation.specialRequests}
              onChange={(e) =>
                handleChange(
                  "specialRequests",
                  e.target.value
                )
              }
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter any special requests..."
            />

          </section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">

            <button
              onClick={() =>
                router.push(
                  `/reservations/${reservation.id}`
                )
              }
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}