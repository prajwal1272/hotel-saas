"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getReservations,
  Reservation,
} from "@/lib/reservations";
import { formatCurrency } from "@/lib/currency";

export default function ReservationDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    const id = String(params.id);

    const reservations = getReservations();

    const found = reservations.find(
      (item) => item.id === id
    );

    setReservation(found || null);
  }, [params.id]);

  function formatDate(date: string) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function calculateNights() {
    if (!reservation) return 0;

    const start = new Date(reservation.checkIn);
    const end = new Date(reservation.checkOut);

    const difference =
      end.getTime() - start.getTime();

    return Math.max(
      1,
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    );
  }

  function calculateTotal() {
    if (!reservation) return 0;

    const subtotal =
      reservation.roomRate * calculateNights();

    return Math.max(
      0,
      subtotal - reservation.discount
    );
  }

  function handleCancel() {
    if (!reservation) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) return;

    const reservations = getReservations();

    const updatedReservations =
      reservations.map((item) => {
        if (item.id === reservation.id) {
          return {
            ...item,
            status: "Cancelled" as const,
          };
        }

        return item;
      });

    localStorage.setItem(
      "hotel_saas_reservations",
      JSON.stringify(updatedReservations)
    );

    setReservation({
      ...reservation,
      status: "Cancelled",
    });
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
                router.push("/reservations")
              }
              className="mb-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              ← Back to Reservations
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Reservation Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {reservation.id}
            </p>

          </div>

       <div className="flex gap-3">

  {reservation.status === "Confirmed" && (
    <>
      <button
        onClick={() =>
          router.push(`/reservations/${reservation.id}/edit`)
        }
        className="rounded-lg border border-blue-300 bg-white px-5 py-3 font-medium text-blue-600 hover:bg-blue-50"
      >
        Edit Reservation
      </button>

      <button
        onClick={handleCancel}
        className="rounded-lg border border-red-300 bg-white px-5 py-3 font-medium text-red-600 hover:bg-red-50"
      >
        Cancel Reservation
      </button>
    </>
  )}

</div>

        </div>
      </header>

      <div className="mx-auto max-w-6xl p-6">

        {/* STATUS */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Reservation Status
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
                  reservation.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {reservation.status}
              </span>
            </div>

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Reservation ID
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {reservation.id}
              </p>

            </div>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">

            {/* GUEST */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-xl font-semibold text-gray-900">
                Guest Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                <Info
                  label="Guest Name"
                  value={`${reservation.firstName} ${reservation.lastName}`}
                />

                <Info
                  label="Email"
                  value={reservation.email || "-"}
                />

                <Info
                  label="Phone"
                  value={reservation.phone || "-"}
                />

                <Info
                  label="Booking Source"
                  value={reservation.bookingSource}
                />

              </div>

            </section>

            {/* STAY */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-xl font-semibold text-gray-900">
                Stay Details
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                <Info
                  label="Room"
                  value={`Room ${reservation.room}`}
                />

                <Info
                  label="Room Type"
                  value={reservation.roomType}
                />

                <Info
                  label="Check-in"
                  value={formatDate(reservation.checkIn)}
                />

                <Info
                  label="Check-out"
                  value={formatDate(reservation.checkOut)}
                />

                <Info
                  label="Nights"
                  value={String(calculateNights())}
                />

                <Info
                  label="Guests"
                  value={`${reservation.adults} Adults, ${reservation.children} Children`}
                />

              </div>

            </section>

            {/* SPECIAL REQUESTS */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-xl font-semibold text-gray-900">
                Special Requests
              </h2>

              <p className="rounded-lg bg-gray-50 p-4 text-gray-700">
                {reservation.specialRequests ||
                  "No special requests."}
              </p>

            </section>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PAYMENT */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-xl font-semibold text-gray-900">
                Payment
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Room Rate
                  </span>

                 <span className="font-medium text-gray-900">
                {formatCurrency(reservation.roomRate)}
                </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Nights
                  </span>

                  <span className="font-medium text-gray-900">
                    {calculateNights()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                <span className="font-medium text-gray-900">
  {formatCurrency(
    reservation.roomRate * calculateNights()
  )}
</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-medium text-red-600">
  -{formatCurrency(reservation.discount)}
</span>
                </div>

                <div className="border-t pt-4">

                  <div className="flex justify-between">

                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>

                  <span className="text-2xl font-bold text-gray-900">
  {formatCurrency(calculateTotal())}
</span>

                  </div>

                </div>

                <div className="rounded-lg bg-gray-50 p-4">

                  <p className="text-sm text-gray-500">
                    Payment Status
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {reservation.paymentStatus}
                  </p>

                </div>

              </div>

            </section>

            {/* ROOM CARD */}
            <section className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">

              <p className="text-sm text-blue-100">
                Assigned Room
              </p>

              <p className="mt-2 text-4xl font-bold">
                {reservation.room}
              </p>

              <p className="mt-1 text-blue-100">
                {reservation.roomType}
              </p>

              <div className="mt-6 border-t border-blue-400 pt-4">

                <p className="text-sm text-blue-100">
                  Stay
                </p>

                <p className="mt-1 font-medium">
                  {formatDate(
                    reservation.checkIn
                  )}{" "}
                  →{" "}
                  {formatDate(
                    reservation.checkOut
                  )}
                </p>

              </div>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}