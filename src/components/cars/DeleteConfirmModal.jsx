"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  carName,
  isDeleting,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete this car?">
      <p className="modal-delete-text">
        Are you sure you want to delete <strong>{carName}</strong>? This action
        cannot be undone.
      </p>

      <div className="modal-actions-row">
        <motion.button
          type="button"
          className="btn-ghost"
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </motion.button>
        <motion.button
          type="button"
          className="btn-primary"
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
          disabled={isDeleting}
          style={{
            backgroundColor: "var(--color-error)",
            opacity: isDeleting ? 0.7 : 1,
          }}
        >
          {isDeleting ? (
            <span className="spinner-carvo" style={{ width: 16, height: 16 }} />
          ) : (
            "Delete"
          )}
        </motion.button>
      </div>
    </Modal>
  );
}
