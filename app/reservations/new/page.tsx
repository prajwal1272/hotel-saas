"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  saveReservation,
  createReservationId,
} from "@/lib/reservations";

import { formatCurrency } from "@/lib/currency";

export default function NewReservationPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [room, setRoom] = useState("101");
  const [bookingSource, setBookingSource] = useState("Direct");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [roomRate, setRoomRate] = useState(120);
  const [discount, setDiscount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [specialRequests, setSpecialRequests] = useState("");

  const rooms = [
    {
      number: "101",
      type: "Standard",
      price: 120,
    },
    {
      number: "103",
      type: "Deluxe",
      price: 180,
    },
    {
      number: "203",
      type: "Suite",
      price: 280,
    },
    {
      number: "302",
      type: "Standard",
      price: 120,
    },
  ];

  const selectedRoom =
    rooms.find((item) => item.number === room) || rooms[0];

  function handleRoomChange(value: string) {
    setRoom(value);

    const selected = rooms.find(
      (item) => item.number === value
    );

    if (selected) {
      setRoomRate(selected.price);
    }
  }

  function calculateNights() {
    if (!checkIn || !checkOut) {
      return 1;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    const nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return nights > 0 ? nights : 1;
  }

  function calculateTotal() {
    const nights = calculateNights();

    const subtotal = roomRate * nights;
    const total = subtotal - Number(discount || 0);

    return total > 0 ? total : 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert("Please enter guest name.");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const reservation = {
      id: createReservationId(),

      firstName,
      lastName,
      email,
      phone,

      checkIn,
      checkOut,

      room: selectedRoom.number,
      roomType: selectedRoom.type,

      bookingSource,

      adults: Number(adults),
      children: Number(children),

      roomRate: Number(roomRate),
      discount: Number(discount),

      paymentStatus,

      specialRequests,

      status: "Confirmed" as const,
    };

    saveReservation(reservation);

    alert(
      `Reservation created successfully!\n\nReservation ID: ${reservation.id}`
    );

    router.push("/rooms");
  }

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              New Reservation
            </h1>

            <p className="mt-1 text-gray-500">
              Create a new hotel reservation
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/rooms")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back to Rooms
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* GUEST INFORMATION */}
          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Guest Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name *
                </label>

                <input
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  type="text"
                  placeholder="John"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name *
                </label>

                <input
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  type="text"
                  placeholder="Smith"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </section>

          {/* STAY DETAILS */}
          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Stay Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Check-in *
                </label>

                <input
                  value={checkIn}
                  onChange={(e) =>
                    setCheckIn(e.target.value)
                  }
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Check-out *
                </label>

                <input
                  value={checkOut}
                  onChange={(e) =>
                    setCheckOut(e.target.value)
                  }
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Room *
                </label>

                <select
                  value={room}
                  onChange={(e) =>
                    handleRoomChange(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  {rooms.map((item) => (
                    <option
                      key={item.number}
                      value={item.number}
                    >
                      Room {item.number} — {item.type} —{" "}
                      {formatCurrency(item.price)}/night
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Booking Source
                </label>

                <select
                  value={bookingSource}
                  onChange={(e) =>
                    setBookingSource(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Direct</option>
                  <option>Website</option>
                  <option>Phone</option>
                  <option>Walk-in</option>
                  <option>Booking.com</option>
                  <option>Expedia</option>
                  <option>Agoda</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Adults
                </label>

                <input
                  value={adults}
                  onChange={(e) =>
                    setAdults(Number(e.target.value))
                  }
                  type="number"
                  min="1"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Children
                </label>

                <input
                  value={children}
                  onChange={(e) =>
                    setChildren(Number(e.target.value))
                  }
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </section>

          {/* PRICING */}
          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Pricing & Payment
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Room Rate / Night
                </label>

                <input
                  value={roomRate}
                  onChange={(e) =>
                    setRoomRate(Number(e.target.value))
                  }
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discount
                </label>

                <input
                  value={discount}
                  onChange={(e) =>
                    setDiscount(Number(e.target.value))
                  }
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Status
                </label>

                <select
                  value={paymentStatus}
                  onChange={(e) =>
                    setPaymentStatus(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Partial</option>
                  <option>Refunded</option>
                </select>
              </div>

            </div>

            {/* SUMMARY */}
            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <div className="flex justify-between py-2 text-gray-600">
                <span>Room</span>
                <span>
                  {selectedRoom.number} — {selectedRoom.type}
                </span>
              </div>

              <div className="flex justify-between py-2 text-gray-600">
                <span>Nights</span>
                <span>{nights}</span>
              </div>

              <div className="flex justify-between py-2 text-gray-600">
                <span>Rate</span>
                <span>{formatCurrency(roomRate)}/night</span>
              </div>

              <div className="flex justify-between py-2 text-gray-600">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>

              <div className="mt-3 flex justify-between border-t pt-4 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </section>

          {/* SPECIAL REQUESTS */}
          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Special Requests
            </h2>

            <textarea
              value={specialRequests}
              onChange={(e) =>
                setSpecialRequests(e.target.value)
              }
              rows={4}
              placeholder="Late check-in, extra bed, airport pickup..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() => router.push("/rooms")}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Reservation
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}