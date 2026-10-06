export type Reservation = {
  id: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  checkIn: string;
  checkOut: string;

  room: string;
  roomType: string;

  bookingSource: string;

  adults: number;
  children: number;

  roomRate: number;
  discount: number;

  paymentStatus: string;

  specialRequests: string;

  status: "Confirmed" | "Cancelled";
};

const STORAGE_KEY = "hotel_saas_reservations";

export function getReservations(): Reservation[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveReservation(reservation: Reservation) {
  const reservations = getReservations();

  reservations.push(reservation);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(reservations)
  );
}

export function createReservationId() {
  return `RES-${Date.now()}`;
}