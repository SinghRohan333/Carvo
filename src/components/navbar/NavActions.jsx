"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
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
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// Private links shown ONLY inside the dropdown / mobile auth section
const dropdownItems = [
  { label: "Add Car", href: "/add-car" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Added Cars", href: "/my-added-cars" },
];

export default function NavActions({
  mobile = false,
  onLinkClick,
  isLoggedIn, // lifted from Navbar
  user,
  handleLogout,
}) {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── MOBILE ────────────────────────────────────────────────────────
  if (mobile) {
    return (
      <div style={{ paddingTop: "8px" }}>
        {/* Theme toggle row */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.21, duration: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "15px",
              fontWeight: "300",
              color: "var(--color-text-head)",
            }}
          >
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-gold)",
              cursor: "pointer",
            }}
            aria-label="Toggle theme"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex" }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </motion.span>
          </button>
        </motion.div>

        {/* Auth section */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.28, duration: 0.3 }}
          style={{ paddingTop: "16px" }}
        >
          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  style={{
                    display: "block",
                    padding: "10px 0",
                    fontFamily: "var(--font-interface)",
                    fontSize: "15px",
                    fontWeight: "300",
                    color: "var(--color-text-head)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                style={{
                  marginTop: "8px",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  fontFamily: "var(--font-interface)",
                  fontSize: "15px",
                  fontWeight: "300",
                  color: "#c0392b",
                  cursor: "pointer",
                  padding: "10px 0",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={onLinkClick}
                className="btn-primary"
                style={{ justifyContent: "center" }}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onLinkClick}
                className="btn-ghost"
                style={{ justifyContent: "center" }}
              >
                Register
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────
  return (
    <div className="flex items-center gap-4">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "1px solid var(--color-border)",
          background: "transparent",
          color: "var(--color-gold)",
          cursor: "pointer",
          transition: "border-color 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-gold)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-border)")
        }
        aria-label="Toggle theme"
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex" }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </button>

      {/* Auth */}
      {isLoggedIn ? (
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              padding: "8px 14px",
              cursor: "pointer",
              color: "var(--color-text-head)",
              fontFamily: "var(--font-interface)",
              fontSize: "14px",
              fontWeight: "400",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-gold)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          >
            <span
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: "rgba(184,160,106,0.15)",
                border: "1px solid var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-gold)",
              }}
            >
              {user?.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid var(--color-gold)",
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user?.image}
                    alt="Profile preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              ) : (
                <UserIcon />
              )}
            </span>
            <span>{user?.name ? user?.name : "My Account"}</span>
            <motion.span
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", color: "var(--color-gold)" }}
            >
              <ChevronDownIcon />
            </motion.span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  minWidth: "200px",
                  backgroundColor: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                  transformOrigin: "top right",
                  zIndex: 200,
                }}
              >
                {dropdownItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      fontFamily: "var(--font-interface)",
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "var(--color-text-head)",
                      textDecoration: "none",
                      borderBottom:
                        i < dropdownItems.length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                      transition: "color 0.15s ease, background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-gold)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(184,160,106,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-head)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-gold)",
                    opacity: 0.3,
                  }}
                />
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 20px",
                    fontFamily: "var(--font-interface)",
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "#c0392b",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(192,57,43,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/register"
            className="btn-ghost"
            style={{ padding: "8px 20px" }}
          >
            Register
          </Link>
          <Link
            href="/login"
            className="btn-primary"
            style={{ padding: "8px 20px" }}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
