"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const addCar = async (formData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`${BASE_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      dailyRentPrice: Number(formData.dailyRentPrice),
      seatCapacity: Number(formData.seatCapacity),
      ownerId: user?.id,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to add new car");
  }
  const data = await res.json();
  return data;
};

export const updateAddedCar = async (formData, editingCar, userId) => {
  const res = await fetch(`${BASE_URL}/cars/${editingCar._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, ownerId: userId }),
  });
  if (!res.ok) {
    throw new Error("Failed to update Cars!");
  }
  const data = await res.json();
  return data;
};

export const deleteAddedCar = async (deletingCar, userId) => {
  const res = await fetch(`${BASE_URL}/cars/${deletingCar._id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ownerId: userId }),
  });
  if (!res.ok) {
    throw new Error("Failed to delete data");
  }
  const data = await res.json();
  return data;
};

export const bookingCar = async (
  car,
  user,
  driverNeeded,
  specialNote,
  numberOfDays,
) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      carId: car._id,
      ownerId: user.id,
      driverNeeded: driverNeeded === "yes",
      specialNote: specialNote.trim(),
      numberOfDays,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to book car");
  }
  const data = await res.json();
  return data;
};

export const cancelMyBookings = async (cancellingBooking, userId) => {
  const res = await fetch(`${BASE_URL}/bookings/${cancellingBooking._id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ownerId: userId }),
  });
  if (!res.ok) {
    throw new Error("Failed to delete booked car");
  }
  const data = await res.json();
  return data;
};
