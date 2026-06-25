"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function CancelBookingModal({
  isOpen,
  onClose,
  onConfirm,
  carName,
  isCancelling,
}) {
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
              zIndex: 210,
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
              zIndex: 211,
              width: "calc(100% - 32px)",
              maxWidth: "420px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              padding: "24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 300,
                color: "var(--color-text-head)",
                marginBottom: "12px",
              }}
            >
              Cancel this booking?
            </h3>

            <p
              style={{
                color: "var(--color-text-body)",
                fontSize: "14px",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              Are you sure you want to cancel your booking for{" "}
              <strong
                style={{ color: "var(--color-text-head)", fontWeight: 500 }}
              >
                {carName}
              </strong>
              ? This action cannot be undone.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <motion.button
                type="button"
                className="btn-ghost"
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                disabled={isCancelling}
                style={{ flex: "1 1 160px" }}
              >
                Keep Booking
              </motion.button>
              <motion.button
                type="button"
                className="btn-primary"
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                disabled={isCancelling}
                style={{
                  flex: "1 1 160px",
                  backgroundColor: "var(--color-error)",
                  opacity: isCancelling ? 0.7 : 1,
                }}
              >
                {isCancelling ? (
                  <span
                    className="spinner-carvo"
                    style={{ width: 16, height: 16 }}
                  />
                ) : (
                  "Cancel Booking"
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
