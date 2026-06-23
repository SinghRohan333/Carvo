import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedCars } from "@/lib/data";
import Image from "next/image";

// ── Availability config ───────────────────────────────────────────────
const statusConfig = {
  available: { color: "#4ade80", label: "Available" },
  booked: { color: "#fbbf24", label: "Booked" },
  unavailable: { color: "#6B6450", label: "Unavailable" },
};

// ── Car Card ──────────────────────────────────────────────────────────
function CarCard({ car, index }) {
  const status =
    statusConfig[car.availabilityStatus] || statusConfig.unavailable;

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition:
          "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="car-card-hover"
    >
      {/* Image — always dark bg, plain img tag */}
      {/* Image — always dark bg */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 2",
          backgroundColor: "#1C1B17",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={car.imageUrl}
          alt={car.carName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          className="car-card-img"
        />

        {/* Availability badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(12, 12, 14, 0.75)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "4px 10px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: status.color,
              flexShrink: 0,
              boxShadow: `0 0 6px ${status.color}`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "10px",
              fontWeight: "500",
              letterSpacing: "0.08em",
              color: status.color,
              textTransform: "uppercase",
            }}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {/* Type badge */}
        <span
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            backgroundColor: "rgba(184, 160, 106, 0.1)",
            color: "var(--color-gold)",
            border: "1px solid rgba(184, 160, 106, 0.25)",
            borderRadius: "4px",
            padding: "2px 10px",
            fontFamily: "var(--font-interface)",
            fontSize: "10px",
            fontWeight: "500",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {car.carType}
        </span>

        {/* Car name */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "19px",
            fontWeight: "300",
            color: "var(--color-text-head)",
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {car.carName}
        </h3>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--color-text-muted)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "12px",
              fontWeight: "300",
            }}
          >
            {car.pickupLocation}
          </span>
        </div>

        {/* Seats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--color-text-muted)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "12px",
              fontWeight: "300",
            }}
          >
            {car.seatCapacity} seats
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--color-border)",
            margin: "4px 0",
          }}
        />

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* Price */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-interface)",
                fontSize: "10px",
                fontWeight: "500",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                display: "block",
                marginBottom: "2px",
              }}
            >
              From
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: "400",
                color: "var(--color-gold)",
              }}
            >
              ${car.dailyRentPrice}
              <span
                style={{
                  fontFamily: "var(--font-interface)",
                  fontSize: "11px",
                  fontWeight: "300",
                  color: "var(--color-text-muted)",
                  marginLeft: "3px",
                }}
              >
                / day
              </span>
            </span>
          </div>

          {/* View Details */}
          <Link
            href={`/cars/${car._id}`}
            className="car-card-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "var(--color-cta-bg)",
              color: "var(--color-cta-text)",
              fontFamily: "var(--font-interface)",
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "0.06em",
              padding: "9px 16px",
              borderRadius: "var(--radius-card)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            View Details
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main section — SERVER COMPONENT ──────────────────────────────────
export default async function AvailableCars() {
  let cars = [];
  let error = null;

  try {
    const carsCollection = await getFeaturedCars();
    cars = carsCollection?.data;
  } catch (err) {
    error = "Unable to load vehicles. Please try again.";
  }

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="container-carvo">
        {/* Section header */}
        <div style={{ marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "11px",
              fontWeight: "500",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                backgroundColor: "var(--color-gold)",
              }}
            />
            Our Fleet
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: "300",
              color: "var(--color-text-head)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              marginBottom: "16px",
              maxWidth: "520px",
            }}
          >
            Vehicles curated for{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              every journey.
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "15px",
              fontWeight: "300",
              color: "var(--color-text-body)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            From executive sedans to open-air convertibles — a handpicked
            selection built for every occasion and every kind of driver.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p
              style={{
                fontFamily: "var(--font-interface)",
                fontSize: "15px",
                fontWeight: "300",
                color: "var(--color-text-muted)",
                marginBottom: "24px",
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Cars grid */}
        {!error && cars.length > 0 && (
          <>
            <div className="cars-grid">
              {cars.map((car, index) => (
                <CarCard key={car._id} car={car} index={index} />
              ))}
            </div>

            {/* Explore Full Fleet CTA */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "64px",
              }}
            >
              <Link
                href="/explore"
                className="btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 32px",
                }}
              >
                Explore Full Fleet
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Grid + hover styles */}
      <style>{`
        .cars-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .cars-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .cars-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .car-card-hover:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: var(--color-gold) !important;
          box-shadow: 0 8px 32px rgba(184, 160, 106, 0.12);
        }
        .car-card-hover:hover .car-card-img {
          transform: scale(1.04);
        }
        .car-card-btn:hover {
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
