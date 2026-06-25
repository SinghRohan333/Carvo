"use client";

import { motion } from "framer-motion";
import "@/styles/my-bookings.css";
import Link from "next/link";
import { useState } from "react";
import ViewBookingModal from "./ViewBookingModal";
import { cancelMyBookings } from "@/lib/action";
import { toast } from "react-toastify";
import CancelBookingModal from "./CancelBookingModal";

export default function MyBookingsClient({ bookingsData, userId }) {
  const [viewingBooking, setViewingBooking] = useState(null);
  const [bookings, setBookings] = useState(bookingsData?.data);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    try {
      const result = await cancelMyBookings(cancellingBooking, userId);

      if (!result.success) {
        toast.error(result.message || "Failed to cancel booking");
        return;
      }
      if (result.success) {
        toast.success(result.message || "Booking cancelled successfully");
        setBookings((prev) =>
          prev.filter((b) => b._id !== cancellingBooking._id),
        );
        setCancellingBooking(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong — please try again");
    } finally {
      setIsCancelling(false);
    }
  };
  return (
    <div className="my-bookings-shell">
      <div className="container-carvo">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="my-bookings-header">
            <span className="text-caption">Your Reservations</span>
            <h1 className="text-h2" style={{ marginTop: "var(--space-3)" }}>
              My Bookings
            </h1>
            {bookings.length > 0 && (
              <p className="text-body" style={{ marginTop: "var(--space-2)" }}>
                {bookings.length}{" "}
                {bookings.length === 1 ? "booking" : "bookings"} total
              </p>
            )}
          </div>

          {bookings.length === 0 ? (
            <div className="my-bookings-empty-state">
              <p className="text-body">
                You haven&apos;t made any bookings yet.
              </p>
              <motion.div
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: "var(--space-6)", display: "inline-block" }}
              >
                <Link href="/explore-cars" className="btn-primary">
                  Book Now
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="my-bookings-table-wrap">
              <table className="my-bookings-table">
                <thead>
                  <tr>
                    <th>Car Name</th>
                    <th>Total Price</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td data-label="Car Name" className="booking-car-name">
                        {booking.carName}
                      </td>
                      <td data-label="Total Price">
                        <span className="booking-total-price">
                          ${booking.totalPrice}
                        </span>
                      </td>
                      <td data-label="Booking Date">
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </td>
                      <td data-label="Status">
                        <span className="booking-status-badge">
                          {booking.status}
                        </span>
                      </td>
                      <td
                        data-label="Actions"
                        className="my-bookings-actions-cell"
                      >
                        <button
                          onClick={() => setViewingBooking(booking)}
                          className="btn-ghost"
                          style={{ fontSize: "13px", padding: "8px 16px" }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => setCancellingBooking(booking)}
                          className="btn-ghost"
                          style={{
                            fontSize: "13px",
                            padding: "8px 16px",
                            color: "var(--color-error)",
                            borderColor: "var(--color-error)",
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      <ViewBookingModal
        isOpen={!!viewingBooking}
        onClose={() => setViewingBooking(null)}
        booking={viewingBooking}
      />

      <CancelBookingModal
        isOpen={!!cancellingBooking}
        onClose={() => setCancellingBooking(null)}
        onConfirm={handleConfirmCancel}
        carName={cancellingBooking?.carName}
        isCancelling={isCancelling}
      />
    </div>
  );
}
