"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ViewBookingModal({ isOpen, onClose, booking }) {
  if (!booking) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              backgroundColor: "rgba(12, 12, 14, 0.7)",
              backdropFilter: "blur(4px)",
            }}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.96, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 201,
              width: "100%",
              maxWidth: "480px",
              margin: "0 16px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              padding: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-interface)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "6px",
                  }}
                >
                  Booking Details
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 300,
                    color: "var(--color-text-head)",
                    margin: 0,
                  }}
                >
                  {booking.carName}
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  padding: "4px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {booking.carImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={booking.carImage}
                alt={booking.carName}
                className="booking-detail-image"
              />
            )}

            <div>
              <div className="booking-detail-row">
                <span className="booking-detail-label">Total Price</span>
                <span
                  className="booking-detail-value"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    color: "var(--color-gold)",
                  }}
                >
                  ${booking.totalPrice}
                </span>
              </div>

              <div className="booking-detail-row">
                <span className="booking-detail-label">Daily Rate</span>
                <span className="booking-detail-value">
                  ${booking.dailyRentPrice}/day
                </span>
              </div>

              <div className="booking-detail-row">
                <span className="booking-detail-label">Number of Days</span>
                <span className="booking-detail-value">
                  {booking.numberOfDays}{" "}
                  {booking.numberOfDays === 1 ? "day" : "days"}
                </span>
              </div>

              <div className="booking-detail-row">
                <span className="booking-detail-label">Booking Date</span>
                <span className="booking-detail-value">
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="booking-detail-row">
                <span className="booking-detail-label">Status</span>
                <span className="booking-status-badge">{booking.status}</span>
              </div>

              <div className="booking-detail-row">
                <span className="booking-detail-label">Driver Needed</span>
                <span className="booking-detail-value">
                  {booking.driverNeeded ? "Yes" : "No, self-drive"}
                </span>
              </div>
            </div>

            {booking.specialNote && (
              <div style={{ marginTop: "var(--space-4)" }}>
                <span className="booking-detail-label">Special Note</span>
                <p className="booking-note-block">{booking.specialNote}</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
