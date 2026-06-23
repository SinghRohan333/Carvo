"use client";

import { useState } from "react";

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = "••••••••",
  error,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="input-wrapper-carvo">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-carvo ${error ? "input-error" : ""}`}
          autoComplete="current-password"
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M3 3l18 18" />
              <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
              <path d="M9.88 4.24A9.74 9.74 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61C4.13 8.36 2 11 2 11s3.5 7 10 7a9.74 9.74 0 0 0 3.39-.61" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p
          className="text-caption text-error"
          style={{
            marginTop: "var(--space-2)",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
