"use client";

import { useEffect, useState } from "react";
import { getReservations } from "@/lib/reservations";
import { formatCurrency } from "@/lib/currency";

type RoomStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Cleaning"
  | "Maintenance";

type Room = {
  number: string;
  type: string;
  floor: number;
  price: number;
  guest: string;
  stay: string;
  status: RoomStatus;
};

const defaultRooms: Room[] = [
  {
    number: "101",
    type: "Standard",
    floor: 1,
    price: 120,
    guest: "-",
    stay: "-",
    status: "Available",
  },
  {
    number: "102",
    type: "Standard",
    floor: 1,
    price: 120,
    guest: "John Smith",
    stay: "Oct 5 - Oct 8",
    status: "Occupied",
  },
  {
    number: "103",
    type: "Deluxe",
    floor: 1,
    price: 180,
    guest: "Sarah Johnson",
    stay: "Oct 8 - Oct 11",
    status: "Reserved",
  },
  {
    number: "201",
    type: "Deluxe",
    floor: 2,
    price: 180,
    guest: "-",
    stay: "-",
    status: "Cleaning",
  },
  {
    number: "202",
    type: "Suite",
    floor: 2,
    price: 280,
    guest: "Michael Brown",
    stay: "Oct 4 - Oct 9",
    status: "Occupied",
  },
  {
    number: "203",
    type: "Suite",
    floor: 2,
    price: 280,
    guest: "-",
    stay: "-",
    status: "Available",
  },
  {
    number: "301",
    type: "Deluxe",
    floor: 3,
    price: 180,
    guest: "-",
    stay: "-",
    status: "Maintenance",
  },
  {
    number: "302",
    type: "Standard",
    floor: 3,
    price: 120,
    guest: "-",
    stay: "-",
    status: "Available",
  },
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(defaultRooms);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const reservations = getReservations();

    const updatedRooms = defaultRooms.map((room) => {
      const confirmedReservations = reservations.filter(
        (reservation) =>
          reservation.room === room.number &&
          reservation.status === "Confirmed"
      );

      // No confirmed reservation
      if (confirmedReservations.length === 0) {
        // If room was previously Reserved, make it Available
        if (room.status === "Reserved") {
          return {
            ...room,
            guest: "-",
            stay: "-",
            status: "Available" as RoomStatus,
          };
        }

        return room;
      }

      // Get latest confirmed reservation
      const latestReservation =
        confirmedReservations[confirmedReservations.length - 1];

      return {
        ...room,
        guest: `${latestReservation.firstName} ${latestReservation.lastName}`,
        stay: `${formatDate(latestReservation.checkIn)} - ${formatDate(
          latestReservation.checkOut
        )}`,
        status: "Reserved" as RoomStatus,
        price: latestReservation.roomRate,
      };
    });

    setRooms(updatedRooms);
  }, []);

  function formatDate(date: string) {
    if (!date) {
      return "";
    }

    const value = new Date(date);

    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const filteredRooms = rooms.filter((room) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      room.number.toLowerCase().includes(searchValue) ||
      room.type.toLowerCase().includes(searchValue) ||
      room.guest.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      room.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const availableCount = rooms.filter(
    (room) => room.status === "Available"
  ).length;

  const occupiedCount = rooms.filter(
    (room) => room.status === "Occupied"
  ).length;

  const reservedCount = rooms.filter(
    (room) => room.status === "Reserved"
  ).length;

  const cleaningCount = rooms.filter(
    (room) => room.status === "Cleaning"
  ).length;

  function statusClass(status: RoomStatus) {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";

      case "Occupied":
        return "bg-blue-100 text-blue-700";

      case "Reserved":
        return "bg-yellow-100 text-yellow-700";

      case "Cleaning":
        return "bg-purple-100 text-purple-700";

      case "Maintenance":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Rooms & Reservations
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage rooms, guests and reservations
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = "/reservations/new";
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + New Reservation
          </button>

        </div>
      </header>

      <div className="p-6">

        {/* STATS */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Available
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {availableCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Occupied
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {occupiedCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Reserved
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {reservedCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Cleaning
            </p>

            <p className="mt-2 text-3xl font-bold text-purple-600">
              {cleaningCount}
            </p>
          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row">

          <input
            type="text"
            placeholder="Search room, type or guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Maintenance">Maintenance</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b bg-gray-50">
                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Room
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Floor
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Guest
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Stay
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

                {filteredRooms.map((room) => (
                  <tr
                    key={room.number}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">
                      <span className="font-semibold text-gray-900">
                        {room.number}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {room.type}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {room.floor}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
  {formatCurrency(room.price)}
</td>

                    <td className="px-6 py-5">
                      <div className="font-medium text-gray-900">
                        {room.guest}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {room.stay}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          room.status
                        )}`}
                      >
                        {room.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                       onClick={() => {
  const reservations = getReservations();

  const reservation = reservations.find(
    (item) =>
      item.room === room.number &&
      item.status === "Confirmed"
  );

  if (reservation) {
    window.location.href = `/reservations/${reservation.id}`;
  } else {
    alert(`No active reservation for Room ${room.number}`);
  }
}}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {filteredRooms.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No rooms found.
            </div>
          )}

        </div>

      </div>

    </main>
  );
}

