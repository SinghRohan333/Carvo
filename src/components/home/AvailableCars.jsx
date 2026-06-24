import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedCars } from "@/lib/data";
import Image from "next/image";
import CarCard from "../shared/CarCard";

// ── Availability config ───────────────────────────────────────────────
const statusConfig = {
  available: { color: "#4ade80", label: "Available" },
  booked: { color: "#fbbf24", label: "Booked" },
  unavailable: { color: "#6B6450", label: "Unavailable" },
};

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
                href="/explore-cars"
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
