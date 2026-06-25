"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import MyCarCard from "./MyCarCard";
import EditCarModal from "./EditCarModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import "@/styles/my-added-cars.css";
import Link from "next/link";
import { deleteAddedCar, updateAddedCar } from "@/lib/action";

// TODO: replace with your actual Express base URL (env var recommended)
// const API_BASE_URL = "YOUR_EXPRESS_API_URL";

export default function MyAddedCarsClient({ initialCars, userId }) {
  const [cars, setCars] = useState(initialCars?.data);

  const [editingCar, setEditingCar] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deletingCar, setDeletingCar] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveEdit = async (formData) => {
    setIsSaving(true);
    try {
      const result = await updateAddedCar(formData, editingCar, userId);

      if (!result.success) {
        toast.error(result.message || "Failed to update car");
        return;
      }
      if (result.success) {
        toast.success(result.message || "Car updated successfully");
        setCars((prev) =>
          prev.map((c) =>
            c._id === editingCar._id ? { ...c, ...formData } : c,
          ),
        );
        setEditingCar(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong — please try again");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAddedCar(deletingCar, userId);

      if (!result.success) {
        toast.error(result.message || "Failed to delete car");
        return;
      }
      if (result.success) {
        toast.success(result.message || "Car deleted successfully");
        setCars((prev) => prev.filter((c) => c._id !== deletingCar._id));
        setDeletingCar(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong — please try again");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="my-cars-shell">
      <div className="container-carvo">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="my-cars-header">
            <span className="text-caption">Your Fleet</span>
            <h1 className="text-h2" style={{ marginTop: "var(--space-3)" }}>
              My Added Cars
            </h1>
          </div>

          {cars.length === 0 ? (
            <div className="my-cars-empty-state">
              <p className="text-body">You haven&apos;t added any cars yet.</p>
              <motion.div
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: "var(--space-6)", display: "inline-block" }}
              >
                <Link href="/add-car" className="btn-primary">
                  Add a Car
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="my-cars-grid">
              {cars.map((car) => (
                <MyCarCard
                  key={car._id}
                  car={car}
                  onEdit={setEditingCar}
                  onDelete={setDeletingCar}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <EditCarModal
        isOpen={!!editingCar}
        onClose={() => setEditingCar(null)}
        car={editingCar}
        onSave={handleSaveEdit}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deletingCar}
        onClose={() => setDeletingCar(null)}
        onConfirm={handleConfirmDelete}
        carName={deletingCar?.carName}
        isDeleting={isDeleting}
      />
    </div>
  );
}
