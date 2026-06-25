"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";

// ── Gallery panels — 3 crops of same image ────────────────────────────
const galleryPanels = [
  { id: "left", label: "Exterior", position: "left center" },
  { id: "center", label: "Profile", position: "center center" },
  { id: "right", label: "Detail", position: "right center" },
];

// ── Availability config ───────────────────────────────────────────────
const statusConfig = {
  available: { color: "#4ade80", label: "Available" },
  booked: { color: "#fbbf24", label: "Currently Booked" },
  unavailable: { color: "#6B6450", label: "Unavailable" },
};

// ── Spec item ─────────────────────────────────────────────────────────
function SpecItem({ icon, label, value }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <span
        style={{
          color: "var(--color-gold)",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <p
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "10px",
            fontWeight: "500",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginBottom: "3px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "14px",
            fontWeight: "400",
            color: "var(--color-text-head)",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────
export default function CarDetailsClient({ car }) {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState("center");
  const [modalOpen, setModalOpen] = useState(false);

  const status =
    statusConfig[car.availabilityStatus] || statusConfig.unavailable;
  const isBookable = car.availabilityStatus === "available";
  const activePosition =
    galleryPanels.find((p) => p.id === activePanel)?.position ||
    "center center";

  // ── Animation variants ────────────────────────────────────────────
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--color-bg)",
          minHeight: "100vh",
          paddingBottom: "80px",
        }}
      >
        <div className="container-carvo" style={{ paddingTop: "40px" }}>
          {/* ── Breadcrumb / Back ── */}
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.back()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-interface)",
              fontSize: "13px",
              fontWeight: "300",
              padding: "0",
              marginBottom: "36px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-gold)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Fleet
          </motion.button>

          {/* ── Main two-column layout ── */}
          <div className="details-layout">
            {/* ── LEFT — Image gallery ── */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              {/* Main image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 2",
                  backgroundColor: "#1C1B17",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={car.imageUrl}
                  alt={car.carName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: activePosition,
                    transition: "object-position 0.5s ease",
                  }}
                />

                {/* Gradient overlay — bottom fade for premium feel */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background:
                      "linear-gradient(to top, rgba(12,12,14,0.6), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Gallery panels */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {galleryPanels.map((panel) => (
                  <button
                    key={panel.id}
                    onClick={() => setActivePanel(panel.id)}
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 9",
                      backgroundColor: "#1C1B17",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: `1px solid ${
                        activePanel === panel.id
                          ? "var(--color-gold)"
                          : "var(--color-border)"
                      }`,
                      cursor: "pointer",
                      padding: 0,
                      transition: "border-color 0.2s ease",
                    }}
                    aria-label={panel.label}
                  >
                    <Image
                      src={car.imageUrl}
                      alt={panel.label}
                      fill
                      sizes="25vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: panel.position,
                        opacity: activePanel === panel.id ? 1 : 0.55,
                        transition: "opacity 0.2s ease",
                      }}
                    />

                    {/* Panel label */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "6px",
                        left: "8px",
                        fontFamily: "var(--font-interface)",
                        fontSize: "9px",
                        fontWeight: "500",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color:
                          activePanel === panel.id
                            ? "var(--color-gold)"
                            : "rgba(255,255,255,0.5)",
                        transition: "color 0.2s",
                      }}
                    >
                      {panel.label}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT — Details ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
            >
              {/* Type + Status row */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {/* Type badge */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "rgba(184, 160, 106, 0.1)",
                    color: "var(--color-gold)",
                    border: "1px solid rgba(184, 160, 106, 0.25)",
                    borderRadius: "4px",
                    padding: "3px 12px",
                    fontFamily: "var(--font-interface)",
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {car.carType}
                </span>

                {/* Status */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: status.color,
                      boxShadow: `0 0 6px ${status.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-interface)",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: status.color,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {status.label}
                  </span>
                </div>
              </motion.div>

              {/* Car name */}
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: "300",
                  color: "var(--color-text-head)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                {car.carName}
              </motion.h1>

              {/* Price */}
              <motion.div
                variants={itemVariants}
                style={{ marginBottom: "28px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "32px",
                    fontWeight: "300",
                    color: "var(--color-gold)",
                  }}
                >
                  ${car.dailyRentPrice}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-interface)",
                    fontSize: "13px",
                    fontWeight: "300",
                    color: "var(--color-text-muted)",
                    marginLeft: "6px",
                  }}
                >
                  per day
                </span>
              </motion.div>

              {/* Gold divider */}
              <motion.div
                variants={itemVariants}
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                  marginBottom: "28px",
                }}
              />

              {/* Specs grid */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "28px",
                }}
              >
                <SpecItem
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                  label="Pickup Location"
                  value={car.pickupLocation}
                />
                <SpecItem
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  }
                  label="Seat Capacity"
                  value={`${car.seatCapacity} Passengers`}
                />
                <SpecItem
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="15" height="13" rx="2" />
                      <path d="M16 8h4l3 3v4h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  }
                  label="Vehicle Type"
                  value={car.carType}
                />
                <SpecItem
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  }
                  label="Daily Rate"
                  value={`$${car.dailyRentPrice} / day`}
                />
              </motion.div>

              {/* Gold divider */}
              <motion.div
                variants={itemVariants}
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                  marginBottom: "28px",
                }}
              />

              {/* Description */}
              <motion.div
                variants={itemVariants}
                style={{ marginBottom: "28px" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-interface)",
                    fontSize: "11px",
                    fontWeight: "500",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "12px",
                  }}
                >
                  About this Vehicle
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-interface)",
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "var(--color-text-body)",
                    lineHeight: 1.8,
                  }}
                >
                  {car.description}
                </p>
              </motion.div>

              {/* booked $inc */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "28px",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="1.8"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span className="text-body" style={{ fontSize: "13px" }}>
                  Booked {car.booking_count || 0}{" "}
                  {car.booking_count === 1 ? "time" : "times"}
                </span>
              </motion.div>

              {/* Book Now button */}
              <motion.div variants={itemVariants}>
                {isBookable ? (
                  <button
                    className="btn-primary"
                    onClick={() => setModalOpen(true)}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "15px",
                      fontSize: "14px",
                      letterSpacing: "0.06em",
                      gap: "10px",
                    }}
                  >
                    Book Now
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    disabled
                    style={{
                      width: "100%",
                      padding: "15px",
                      fontSize: "14px",
                      fontFamily: "var(--font-interface)",
                      fontWeight: "500",
                      letterSpacing: "0.06em",
                      backgroundColor: "var(--color-bg-card)",
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-card)",
                      cursor: "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: status.color,
                      }}
                    />
                    {status.label}
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      <BookingModal
        car={car}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Responsive layout styles */}
      <style>{`
        .details-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 1024px) {
          .details-layout {
            grid-template-columns: 55fr 45fr;
            gap: 56px;
            align-items: start;
          }
        }
      `}</style>
    </>
  );
}
