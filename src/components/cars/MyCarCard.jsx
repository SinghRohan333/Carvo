"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STATUS_LABELS = {
  available: "Available",
  booked: "Booked",
  unavailable: "Unavailable",
};

export default function MyCarCard({ car, onEdit, onDelete }) {
  return (
    <motion.div
      className="car-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div style={{ position: "relative" }}>
        <Image
          src={car.imageUrl}
          alt={car.carName}
          width={400}
          height={267}
          className="car-card__image"
        />
        <span
          className={`status-badge status-badge--${car.availabilityStatus}`}
        >
          {STATUS_LABELS[car.availabilityStatus] || car.availabilityStatus}
        </span>
      </div>

      <div className="car-card__body">
        <span className="text-caption">{car.carType}</span>
        <h3 className="text-h3">{car.carName}</h3>

        <div className="my-car-meta-row">
          <span className="my-car-location">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {car.pickupLocation}
          </span>
          <span className="my-car-location">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
              <path d="M3 11h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z" />
              <circle cx="7" cy="16" r="0.5" fill="currentColor" />
              <circle cx="17" cy="16" r="0.5" fill="currentColor" />
            </svg>
            {car.seatCapacity} seats
          </span>
        </div>

        <div
          className="my-car-meta-row"
          style={{ marginTop: "var(--space-2)" }}
        >
          <span className="my-car-price">${car.dailyRentPrice}/day</span>
        </div>

        <div className="my-car-actions-row">
          <motion.button
            type="button"
            className="btn-ghost"
            whileTap={{ scale: 0.97 }}
            onClick={() => onEdit(car)}
          >
            Update
          </motion.button>
          <motion.button
            type="button"
            className="btn-ghost"
            whileTap={{ scale: 0.97 }}
            onClick={() => onDelete(car)}
            style={{
              color: "var(--color-error)",
              borderColor: "var(--color-error)",
            }}
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
