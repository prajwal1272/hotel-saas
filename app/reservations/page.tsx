"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getReservations,
  Reservation,
} from "@/lib/reservations";

import { formatCurrency } from "@/lib/currency";
export default function ReservationsPage() {
  const router = useRouter();

  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadReservations();

    const handleFocus = () => {
      loadReservations();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  function loadReservations() {
    const data = getReservations();
    setReservations(data);
  }

  function formatDate(date: string) {
    if (!date) return "-";

    const value = new Date(date);

    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function calculateNights(
    checkIn: string,
    checkOut: string
  ) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    return Math.max(
      1,
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    );
  }

  function calculateTotal(
    reservation: Reservation
  ) {
    const nights = calculateNights(
      reservation.checkIn,
      reservation.checkOut
    );

    const roomTotal =
      Number(reservation.roomRate) * nights;

    const discount =
      Number(reservation.discount) || 0;

    return Math.max(0, roomTotal - discount);
  }

  function handleCancel(
    reservationId: string
  ) {
    const reservation =
      reservations.find(
        (item) => item.id === reservationId
      );

    if (!reservation) return;

    if (reservation.status === "Cancelled") {
      return;
    }

    const confirmed =
      window.confirm(
        `Cancel reservation ${reservation.id}?`
      );

    if (!confirmed) return;

    const updatedReservations =
      reservations.map((item) =>
        item.id === reservationId
          ? {
              ...item,
              status: "Cancelled" as const,
            }
          : item
      );

    localStorage.setItem(
      "hotel_saas_reservations",
      JSON.stringify(updatedReservations)
    );

    setReservations(updatedReservations);
  }

  const filteredReservations =
    reservations.filter((reservation) => {
      const searchValue =
        search.toLowerCase().trim();

      const guestName =
        `${reservation.firstName} ${reservation.lastName}`
          .toLowerCase();

      const matchesSearch =
        reservation.id
          .toLowerCase()
          .includes(searchValue) ||
        guestName.includes(searchValue) ||
        reservation.room
          .toLowerCase()
          .includes(searchValue) ||
        reservation.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        reservation.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  const confirmedCount =
    reservations.filter(
      (r) => r.status === "Confirmed"
    ).length;

  const cancelledCount =
    reservations.filter(
      (r) => r.status === "Cancelled"
    ).length;

  const totalRevenue =
    reservations
      .filter(
        (r) => r.status === "Confirmed"
      )
      .reduce(
        (total, reservation) =>
          total + calculateTotal(reservation),
        0
      );

  return (
    <main className="min-h-screen bg-gray-50 p-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reservations
            </h1>

            <p className="mt-1 text-gray-500">
              Manage hotel reservations
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/reservations/new")
            }
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + New Reservation
          </button>

        </div>

        {/* STATS */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Reservations
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {reservations.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {confirmedCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Cancelled
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {cancelledCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Confirmed Revenue
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {formatCurrency(totalRevenue)}
            </p>
          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row">

          <input
            type="text"
            placeholder="Search reservation, guest, room or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
          >
            <option value="All">
              All Status
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          {filteredReservations.length === 0 ? (

            <div className="p-12 text-center">

              {reservations.length === 0 ? (
                <>
                  <p className="text-gray-500">
                    No reservations yet.
                  </p>

                  <button
                    onClick={() =>
                      router.push(
                        "/reservations/new"
                      )
                    }
                    className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                  >
                    Create Reservation
                  </button>
                </>
              ) : (
                <p className="text-gray-500">
                  No reservations match your search.
                </p>
              )}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Reservation
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Guest
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Room
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Stay
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredReservations.map(
                    (reservation) => (

                      <tr
                        key={reservation.id}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >

                        {/* RESERVATION */}
                        <td className="px-6 py-5">

                          <div className="font-semibold text-gray-900">
                            {reservation.id}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {reservation.bookingSource}
                          </div>

                        </td>

                        {/* GUEST */}
                        <td className="px-6 py-5">

                          <div className="font-medium text-gray-900">
                            {reservation.firstName}{" "}
                            {reservation.lastName}
                          </div>

                          <div className="mt-1 text-sm text-gray-500">
                            {reservation.email}
                          </div>

                        </td>

                        {/* ROOM */}
                        <td className="px-6 py-5">

                          <div className="font-medium text-gray-900">
                            Room {reservation.room}
                          </div>

                          <div className="mt-1 text-sm text-gray-500">
                            {reservation.roomType}
                          </div>

                        </td>

                        {/* STAY */}
                        <td className="px-6 py-5">

                          <div className="text-sm text-gray-900">
                            {formatDate(
                              reservation.checkIn
                            )}
                          </div>

                          <div className="text-sm text-gray-500">
                            to{" "}
                            {formatDate(
                              reservation.checkOut
                            )}
                          </div>

                          <div className="mt-1 text-xs text-gray-400">
                            {calculateNights(
                              reservation.checkIn,
                              reservation.checkOut
                            )}{" "}
                            night(s)
                          </div>

                        </td>

                        {/* TOTAL */}
                        <td className="px-6 py-5">

                          <div className="font-semibold text-gray-900">
                          {formatCurrency(
                           calculateTotal(reservation)
                             )}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {reservation.paymentStatus}
                          </div>

                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              reservation.status ===
                              "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {reservation.status}
                          </span>

                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <button
                              onClick={() =>
                                router.push(
                                  `/reservations/${reservation.id}`
                                )
                              }
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              View
                            </button>

                            {reservation.status ===
                              "Confirmed" && (
                              <>
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/reservations/${reservation.id}/edit`
                                    )
                                  }
                                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    handleCancel(
                                      reservation.id
                                    )
                                  }
                                  className="text-sm font-medium text-red-600 hover:text-red-800"
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
