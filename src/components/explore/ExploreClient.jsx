"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "@/components/shared/CarCard";
import useDebounce from "@/hooks/useDebounce";
import { getAllCars } from "@/lib/data";

const CAR_TYPES = [
  "All Types",
  "Luxury",
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
];

// ── Skeleton grid ─────────────────────────────────────────────────────
function SkeletonGrid() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginBottom: "48px",
        }}
      >
        <div className="spinner-carvo" />
        <span
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "11px",
            fontWeight: "500",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
          }}
        >
          Loading fleet…
        </span>
      </div>
      <div className="explore-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              overflow: "hidden",
            }}
          >
            <div
              className="skeleton-shimmer"
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                backgroundColor: "var(--color-border)",
              }}
            />
            <div
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {[72, "85%", "65%"].map((w, j) => (
                <div
                  key={j}
                  className="skeleton-shimmer"
                  style={{
                    height: j === 0 ? "20px" : "16px",
                    width: w,
                    borderRadius: "4px",
                    backgroundColor: "var(--color-border)",
                  }}
                />
              ))}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                  margin: "4px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "20px",
                    width: "90px",
                    borderRadius: "4px",
                    backgroundColor: "var(--color-border)",
                  }}
                />
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "36px",
                    width: "110px",
                    borderRadius: "var(--radius-card)",
                    backgroundColor: "var(--color-border)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────
function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        textAlign: "center",
        gap: "20px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-gold)",
          marginBottom: "8px",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M8 11h6M11 8v6" />
        </svg>
      </div>

      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: "300",
            color: "var(--color-text-head)",
            marginBottom: "8px",
          }}
        >
          No vehicles found
        </p>
        <p
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "14px",
            fontWeight: "300",
            color: "var(--color-text-muted)",
            maxWidth: "320px",
          }}
        >
          No cars match your current search or filter. Try adjusting your
          criteria.
        </p>
      </div>

      <button
        className="btn-ghost"
        onClick={onClear}
        style={{ marginTop: "8px" }}
      >
        Clear Filters
      </button>
    </motion.div>
  );
}

// ── Main client component ─────────────────────────────────────────────
export default function ExploreClient({
  initialSearch = "",
  initialType = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeType, setActiveType] = useState(initialType || "All Types");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 400);

  // Sync URL params
  const updateURL = useCallback(
    (search, type) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (type && type !== "All Types") params.set("type", type);
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  // Fetch cars whenever debounced search or type changes
  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (debouncedSearch) params.search = debouncedSearch;
        if (activeType && activeType !== "All Types") params.type = activeType;

        const dataCollection = await getAllCars(params);
        const data = dataCollection?.data;
        setCars(data);
      } catch (err) {
        setError("Unable to load vehicles. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
    updateURL(debouncedSearch, activeType);
  }, [debouncedSearch, activeType, updateURL]);

  const handleClear = () => {
    setSearchInput("");
    setActiveType("All Types");
  };

  const hasActiveFilters = searchInput !== "" || activeType !== "All Types";

  return (
    <div>
      {/* ── Search & Filter Bar ── */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        {/* Search input */}
        <div
          style={{
            position: "relative",
            flex: "1 1 280px",
            minWidth: "0",
          }}
        >
          {/* Search icon */}
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: searchFocused
                ? "var(--color-gold)"
                : "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              transition: "color 0.2s ease",
              zIndex: 1,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search by car name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: "100%",
              backgroundColor: "var(--color-bg-card)",
              color: "var(--color-text-head)",
              border: `1px solid ${
                searchFocused ? "var(--color-gold)" : "var(--color-border)"
              }`,
              borderRadius: "var(--radius-input)",
              padding: "13px 44px",
              fontFamily: "var(--font-interface)",
              fontSize: "14px",
              fontWeight: "300",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />

          {/* Clear × button */}
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                padding: "4px",
                borderRadius: "50%",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-gold)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-muted)")
              }
              aria-label="Clear search"
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
          )}
        </div>

        {/* Type filter dropdown */}
        <div
          style={{ position: "relative", flex: "0 1 200px", minWidth: "160px" }}
        >
          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "var(--color-bg-card)",
              color:
                activeType !== "All Types"
                  ? "var(--color-gold)"
                  : "var(--color-text-head)",
              border: `1px solid ${
                activeType !== "All Types"
                  ? "var(--color-gold)"
                  : "var(--color-border)"
              }`,
              borderRadius: "var(--radius-input)",
              padding: "13px 40px 13px 16px",
              fontFamily: "var(--font-interface)",
              fontSize: "14px",
              fontWeight: "300",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
          >
            {CAR_TYPES.map((type) => (
              <option
                key={type}
                value={type}
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  color: "var(--color-text-head)",
                }}
              >
                {type}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <span
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color:
                activeType !== "All Types"
                  ? "var(--color-gold)"
                  : "var(--color-text-muted)",
              pointerEvents: "none",
              display: "flex",
              transition: "color 0.2s ease",
            }}
          >
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
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>

        {/* Clear all filters button — only when filters active */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={handleClear}
            className="btn-ghost"
            style={{ padding: "13px 20px", whiteSpace: "nowrap" }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* ── Results count ── */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "13px",
              fontWeight: "300",
              color: "var(--color-text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Showing{" "}
            <span
              style={{
                color: "var(--color-gold)",
                fontWeight: "500",
              }}
            >
              {cars.length}
            </span>{" "}
            {cars.length === 1 ? "vehicle" : "vehicles"}
            {hasActiveFilters && (
              <span style={{ color: "var(--color-text-muted)" }}>
                {" "}
                matching your search
              </span>
            )}
          </p>
        </motion.div>
      )}

      {/* ── Loading state ── */}
      {loading && <SkeletonGrid />}

      {/* ── Error state ── */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", padding: "80px 24px" }}
        >
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
          <button
            className="btn-ghost"
            onClick={() => setError(null) || setLoading(true)}
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && cars.length === 0 && (
        <EmptyState onClear={handleClear} />
      )}

      {/* ── Cars grid ── */}
      {!loading && !error && cars.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${debouncedSearch}-${activeType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="explore-grid"
          >
            {cars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <CarCard car={car} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Styles ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            var(--color-border) 25%,
            var(--color-bg-card) 50%,
            var(--color-border) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.5s infinite linear;
        }
        .explore-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .explore-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .explore-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
