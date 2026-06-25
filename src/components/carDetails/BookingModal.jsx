"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { bookingCar } from "@/lib/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// ── Toast ─────────────────────────────────────────────────────────────
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 24, x: "-50%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        zIndex: 300,
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderLeft: "3px solid var(--color-gold)",
        borderRadius: "var(--radius-card)",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        minWidth: "280px",
        maxWidth: "400px",
      }}
    >
      {/* Checkmark */}
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "rgba(74, 222, 128, 0.12)",
          border: "1px solid rgba(74, 222, 128, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>

      <div>
        <p
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "13px",
            fontWeight: "500",
            color: "var(--color-text-head)",
            marginBottom: "2px",
          }}
        >
          Reservation Requested
        </p>
        <p
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "12px",
            fontWeight: "300",
            color: "var(--color-text-muted)",
          }}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
}

// ── Booking Modal ─────────────────────────────────────────────────────
export default function BookingModal({ car, isOpen, onClose }) {
  const [driverNeeded, setDriverNeeded] = useState("no");
  const [specialNote, setSpecialNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setDriverNeeded("no");
        setSpecialNote("");
        setNumberOfDays(1);
        setSubmitting(false);
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!user?.id) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await bookingCar(
        car,
        user,
        driverNeeded,
        specialNote,
        numberOfDays,
      );

      if (!result.success) {
        toast.error(result.message || "Failed to create booking");
        return;
      }
      if (result.success) {
        setSubmitted(true);
        setShowToast(true);
        setTimeout(() => onClose(), 1200);
        router.push("/my-bookings");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong — please try again");
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
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
                backgroundColor: "rgba(12, 12, 14, 0.8)",
                backdropFilter: "blur(6px)",
              }}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "-46%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.96, x: "-50%", y: "-46%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                zIndex: 201,
                width: "100%",
                maxWidth: "480px",
                margin: "0 16px",
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* Gold top accent */}
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, var(--color-gold), transparent)",
                }}
              />

              <div style={{ padding: "32px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "28px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-interface)",
                        fontSize: "11px",
                        fontWeight: "500",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        marginBottom: "6px",
                      }}
                    >
                      Reserve Vehicle
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "22px",
                        fontWeight: "300",
                        color: "var(--color-text-head)",
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {car.carName}
                    </h3>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--color-border)",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--color-text-muted)",
                      flexShrink: 0,
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-gold)";
                      e.currentTarget.style.color = "var(--color-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.color = "var(--color-text-muted)";
                    }}
                    aria-label="Close modal"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Gold divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-border)",
                    marginBottom: "28px",
                  }}
                />

                {/* Driver Needed */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-interface)",
                      fontSize: "11px",
                      fontWeight: "500",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginBottom: "12px",
                    }}
                  >
                    Driver Needed
                  </label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {["yes", "no"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setDriverNeeded(opt)}
                        style={{
                          flex: 1,
                          padding: "11px",
                          borderRadius: "var(--radius-card)",
                          border: `1px solid ${
                            driverNeeded === opt
                              ? "var(--color-gold)"
                              : "var(--color-border)"
                          }`,
                          backgroundColor:
                            driverNeeded === opt
                              ? "rgba(184, 160, 106, 0.12)"
                              : "var(--color-bg-card)",
                          color:
                            driverNeeded === opt
                              ? "var(--color-gold)"
                              : "var(--color-text-body)",
                          fontFamily: "var(--font-interface)",
                          fontSize: "13px",
                          fontWeight: driverNeeded === opt ? "500" : "300",
                          cursor: "pointer",
                          textTransform: "capitalize",
                          transition:
                            "border-color 0.2s, background-color 0.2s, color 0.2s",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {opt === "yes"
                          ? "Yes, include driver"
                          : "No, self-drive"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Days */}
                <div style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-interface)",
                      fontSize: "11px",
                      fontWeight: "500",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginBottom: "12px",
                    }}
                  >
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={numberOfDays}
                    onChange={(e) =>
                      setNumberOfDays(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="input-carvo"
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Special Note */}
                <div style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-interface)",
                      fontSize: "11px",
                      fontWeight: "500",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginBottom: "10px",
                    }}
                  >
                    Special Note{" "}
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        textTransform: "none",
                        letterSpacing: 0,
                        fontSize: "11px",
                        fontWeight: "300",
                      }}
                    >
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="Any special requests, pickup instructions, or preferences..."
                    rows={3}
                    style={{
                      width: "100%",
                      backgroundColor: "var(--color-bg-card)",
                      color: "var(--color-text-head)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-input)",
                      padding: "14px 16px",
                      fontFamily: "var(--font-interface)",
                      fontSize: "13px",
                      fontWeight: "300",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                      transition: "border-color 0.2s",
                      minHeight: "88px",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border)")
                    }
                  />
                </div>

                {/* Gold divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-border)",
                    marginBottom: "24px",
                  }}
                />

                {/* Price summary */}
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-interface)",
                        fontSize: "13px",
                        fontWeight: "300",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      ${car.dailyRentPrice}/day × {numberOfDays}{" "}
                      {numberOfDays === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-interface)",
                        fontSize: "13px",
                        fontWeight: "300",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "24px",
                        fontWeight: "400",
                        color: "var(--color-gold)",
                      }}
                    >
                      ${car.dailyRentPrice * numberOfDays}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || submitted}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "14px",
                    fontSize: "14px",
                    opacity: submitting || submitted ? 0.7 : 1,
                    cursor: submitting || submitted ? "not-allowed" : "pointer",
                    gap: "8px",
                  }}
                >
                  {submitting ? (
                    <>
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(0,0,0,0.2)",
                          borderTopColor: "var(--color-cta-text)",
                          borderRadius: "50%",
                          animation: "spin 0.7s linear infinite",
                          flexShrink: 0,
                        }}
                      />
                      Processing…
                    </>
                  ) : submitted ? (
                    "Reservation Sent ✓"
                  ) : (
                    <>
                      Confirm Booking
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <Toast
            key="toast"
            message="We'll confirm your reservation shortly."
            onDone={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
