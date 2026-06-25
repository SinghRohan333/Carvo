"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "@/styles/add-car.css";
import { authClient } from "@/lib/auth-client";
import { addCar } from "@/lib/action";

const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Luxury",
  "Coupe",
  "Convertible",
];
const AVAILABILITY_OPTIONS = ["available", "booked", "unavailable"];

const INITIAL_FORM = {
  carName: "",
  dailyRentPrice: "",
  carType: "",
  imageUrl: "",
  seatCapacity: "",
  pickupLocation: "",
  description: "",
  availabilityStatus: "available",
};

export default function AddCarForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.carName.trim() || formData.carName.trim().length < 2) {
      newErrors.carName = "Enter a valid car name";
    }

    if (!formData.dailyRentPrice || Number(formData.dailyRentPrice) <= 0) {
      newErrors.dailyRentPrice = "Enter a price greater than 0";
    }

    if (!formData.carType) {
      newErrors.carType = "Select a car type";
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

    const seats = Number(formData.seatCapacity);
    if (!formData.seatCapacity || seats < 1 || seats > 9) {
      newErrors.seatCapacity = "Enter a seat count between 1 and 9";
    }

    if (
      !formData.pickupLocation.trim() ||
      formData.pickupLocation.trim().length < 2
    ) {
      newErrors.pickupLocation = "Enter a pickup location";
    }

    if (
      !formData.description.trim() ||
      formData.description.trim().length < 20
    ) {
      newErrors.description = "Description should be at least 20 characters";
    }

    if (!formData.availabilityStatus) {
      newErrors.availabilityStatus = "Select an availability status";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("You must be logged in to add a car");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addCar(formData);

      if (!result.success) {
        toast.error(result.message || "Failed to add car");
        return;
      }

      // console.log("Add car submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (result.success) {
        toast.success(result.message || "Car added successfully");
        setFormData(INITIAL_FORM);
        setTimeout(() => {
          router.push("/my-added-cars");
        }, 800);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong — please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-car-shell">
      <div className="container-carvo">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="add-car-header">
            <span className="text-caption">List your vehicle</span>
            <h1 className="text-h2" style={{ marginTop: "var(--space-3)" }}>
              Add a New Car
            </h1>
          </div>

          <div className="add-car-form-card">
            <form onSubmit={handleSubmit} className="add-car-grid">
              <div className="add-car-field-full">
                <label htmlFor="carName" className="label-carvo">
                  Car Name
                </label>
                <input
                  id="carName"
                  name="carName"
                  type="text"
                  value={formData.carName}
                  onChange={handleChange}
                  placeholder="e.g. Mercedes-Benz S-Class S500"
                  className={`input-carvo ${errors.carName ? "input-error" : ""}`}
                />
                {errors.carName && (
                  <p className="add-car-error-text">{errors.carName}</p>
                )}
              </div>

              <div>
                <label htmlFor="dailyRentPrice" className="label-carvo">
                  Daily Rent Price (USD)
                </label>
                <input
                  id="dailyRentPrice"
                  name="dailyRentPrice"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.dailyRentPrice}
                  onChange={handleChange}
                  placeholder="e.g. 120"
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
                  <option value="" disabled>
                    Select a type
                  </option>
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

              <div className="add-car-field-full">
                <label htmlFor="imageUrl" className="label-carvo">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://i.ibb.co/..."
                  className={`input-carvo ${errors.imageUrl ? "input-error" : ""}`}
                />
                {errors.imageUrl && (
                  <p className="add-car-error-text">{errors.imageUrl}</p>
                )}
              </div>

              <div>
                <label htmlFor="seatCapacity" className="label-carvo">
                  Seat Capacity
                </label>
                <input
                  id="seatCapacity"
                  name="seatCapacity"
                  type="number"
                  min="1"
                  max="9"
                  step="1"
                  value={formData.seatCapacity}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className={`input-carvo ${errors.seatCapacity ? "input-error" : ""}`}
                />
                {errors.seatCapacity && (
                  <p className="add-car-error-text">{errors.seatCapacity}</p>
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
                  placeholder="e.g. Manhattan, New York"
                  className={`input-carvo ${errors.pickupLocation ? "input-error" : ""}`}
                />
                {errors.pickupLocation && (
                  <p className="add-car-error-text">{errors.pickupLocation}</p>
                )}
              </div>

              <div className="add-car-field-full">
                <label htmlFor="description" className="label-carvo">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the car's standout features, comfort, and ideal use case..."
                  className={`add-car-textarea ${errors.description ? "input-error" : ""}`}
                />
                {errors.description && (
                  <p className="add-car-error-text">{errors.description}</p>
                )}
              </div>

              <div className="add-car-field-full">
                <label htmlFor="availabilityStatus" className="label-carvo">
                  Availability Status
                </label>
                <select
                  id="availabilityStatus"
                  name="availabilityStatus"
                  value={formData.availabilityStatus}
                  onChange={handleChange}
                  className={`add-car-select ${errors.availabilityStatus ? "input-error" : ""}`}
                >
                  {AVAILABILITY_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.availabilityStatus && (
                  <p className="add-car-error-text">
                    {errors.availabilityStatus}
                  </p>
                )}
              </div>

              <div className="add-car-field-full add-car-submit-row">
                <motion.button
                  type="submit"
                  className="btn-primary add-car-submit-btn"
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-carvo"
                      style={{ width: 18, height: 18 }}
                    />
                  ) : (
                    "Add Car"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
