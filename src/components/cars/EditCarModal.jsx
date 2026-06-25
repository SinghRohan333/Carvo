"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import "@/styles/add-car.css";

const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Luxury",
  "Coupe",
  "Convertible",
];
const AVAILABILITY_OPTIONS = ["available", "booked", "unavailable"];

export default function EditCarModal({
  isOpen,
  onClose,
  car,
  onSave,
  isSaving,
}) {
  const [formData, setFormData] = useState({
    dailyRentPrice: "",
    description: "",
    availabilityStatus: "available",
    imageUrl: "",
    carType: "",
    pickupLocation: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (car) {
      setFormData({
        dailyRentPrice: car.dailyRentPrice ?? "",
        description: car.description ?? "",
        availabilityStatus: car.availabilityStatus ?? "available",
        imageUrl: car.imageUrl ?? "",
        carType: car.carType ?? "",
        pickupLocation: car.pickupLocation ?? "",
      });
      setErrors({});
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.dailyRentPrice || Number(formData.dailyRentPrice) <= 0) {
      newErrors.dailyRentPrice = "Enter a price greater than 0";
    }
    if (
      !formData.description.trim() ||
      formData.description.trim().length < 20
    ) {
      newErrors.description = "Description should be at least 20 characters";
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else {
      try {
        new URL(formData.imageUrl);
      } catch {
        newErrors.imageUrl = "Enter a valid URL";
      }
    }
    if (!formData.carType) {
      newErrors.carType = "Select a car type";
    }
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Enter a pickup location";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSave(formData);
  };

  if (!car) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${car.carName}`}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-5)",
        }}
      >
        <div>
          <label htmlFor="dailyRentPrice" className="label-carvo">
            Daily Rent Price (USD)
          </label>
          <input
            id="dailyRentPrice"
            name="dailyRentPrice"
            type="number"
            min="1"
            value={formData.dailyRentPrice}
            onChange={handleChange}
            className={`input-carvo ${errors.dailyRentPrice ? "input-error" : ""}`}
          />
          {errors.dailyRentPrice && (
            <p className="add-car-error-text">{errors.dailyRentPrice}</p>
          )}
        </div>

        <div>
          <label htmlFor="carType" className="label-carvo">
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            className={`add-car-select ${errors.carType ? "input-error" : ""}`}
          >
            {CAR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.carType && (
            <p className="add-car-error-text">{errors.carType}</p>
          )}
        </div>

        <div>
          <label htmlFor="imageUrl" className="label-carvo">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`input-carvo ${errors.imageUrl ? "input-error" : ""}`}
          />
          {errors.imageUrl && (
            <p className="add-car-error-text">{errors.imageUrl}</p>
          )}
        </div>

        <div>
          <label htmlFor="pickupLocation" className="label-carvo">
            Pickup Location
          </label>
          <input
            id="pickupLocation"
            name="pickupLocation"
            type="text"
            value={formData.pickupLocation}
            onChange={handleChange}
            className={`input-carvo ${errors.pickupLocation ? "input-error" : ""}`}
          />
          {errors.pickupLocation && (
            <p className="add-car-error-text">{errors.pickupLocation}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="label-carvo">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`add-car-textarea ${errors.description ? "input-error" : ""}`}
          />
          {errors.description && (
            <p className="add-car-error-text">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="availabilityStatus" className="label-carvo">
            Availability Status
          </label>
          <select
            id="availabilityStatus"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            className="add-car-select"
          >
            {AVAILABILITY_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions-row">
          <motion.button
            type="button"
            className="btn-ghost"
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="btn-primary"
            whileTap={{ scale: 0.97 }}
            disabled={isSaving}
            style={{ opacity: isSaving ? 0.7 : 1 }}
          >
            {isSaving ? (
              <span
                className="spinner-carvo"
                style={{ width: 16, height: 16 }}
              />
            ) : (
              "Save Changes"
            )}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}
