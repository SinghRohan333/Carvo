"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AuthLayout from "./AuthLayout";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (formData.photoURL.trim()) {
      try {
        new URL(formData.photoURL);
      } catch {
        newErrors.photoURL = "Enter a valid URL";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Include at least one uppercase, one lowercase letter and one number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    // TODO: replace with BetterAuth sign-up call once Phase 1 is built
    const { name, email, password, photoURL } = formData;
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    // console.log("Register submitted:", name);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (error) {
      toast.error(error?.message || "Registration Failed!. Please try again.");
      return;
    }
    if (data) {
      toast.success("Registration successful! Welcome to CARVÕ");
      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });
      setErrors({});
      setIsSubmitting(false);
      // Now poll for session confirmation, then navigate.
      const waitForSession = async () => {
        for (let attempt = 0; attempt < 10; attempt++) {
          const sessionCheck = await authClient.getSession();
          if (sessionCheck?.data?.user) {
            window.location.href = "/";
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        window.location.href = "/";
      };

      waitForSession();
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "Google login failed. Please try again.");
      setIsGoogleLoading(false);
      return;
    }
    if (data) {
      // toast.success("Login successful! Welcome back to CARVÕ");
      setIsGoogleLoading(false);
    }
  };

  const isValidPhotoURL = (() => {
    if (!formData.photoURL.trim()) return false;
    try {
      new URL(formData.photoURL);
      return true;
    } catch {
      return false;
    }
  })();

  return (
    <AuthLayout
      brandProps={{
        headline: "Your journey,",
        headlineItalic: "elevated.",
        caption:
          "Join CARVÕ to access a curated fleet of premium vehicles, built for those who expect more.",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-caption">Get started</span>
        <h2
          className="font-display"
          style={{
            fontSize: "var(--text-h2)",
            fontWeight: 300,
            color: "var(--color-text-head)",
            marginTop: "var(--space-3)",
            marginBottom: "var(--space-10)",
          }}
        >
          Create your account
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-4)",
            }}
          >
            <div style={{ flex: 1 }}>
              <label htmlFor="name" className="label-carvo">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`input-carvo ${errors.name ? "input-error" : ""}`}
                autoComplete="name"
              />
              {errors.name && (
                <p
                  className="text-caption text-error"
                  style={{
                    marginTop: "var(--space-2)",
                    textTransform: "none",
                    letterSpacing: "normal",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            <AnimatePresence>
              {isValidPhotoURL && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid var(--color-gold)",
                    flexShrink: 0,
                    marginTop: "28px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.photoURL}
                    alt="Profile preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="email" className="label-carvo">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`input-carvo ${errors.email ? "input-error" : ""}`}
              autoComplete="email"
            />
            {errors.email && (
              <p
                className="text-caption text-error"
                style={{
                  marginTop: "var(--space-2)",
                  textTransform: "none",
                  letterSpacing: "normal",
                }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="photoURL" className="label-carvo">
              Photo URL
            </label>
            <input
              id="photoURL"
              name="photoURL"
              type="text"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/your-photo.jpg"
              className={`input-carvo ${errors.photoURL ? "input-error" : ""}`}
              autoComplete="off"
            />
            {errors.photoURL ? (
              <p
                className="text-caption text-error"
                style={{
                  marginTop: "var(--space-2)",
                  textTransform: "none",
                  letterSpacing: "normal",
                }}
              >
                {errors.photoURL}
              </p>
            ) : (
              <p
                className="text-muted"
                style={{ fontSize: "13px", marginTop: "var(--space-2)" }}
              >
                Paste a link to your profile photo
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="label-carvo">
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <motion.button
            type="submit"
            className="btn-primary"
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            style={{
              marginTop: "var(--space-2)",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? (
              <span
                className="spinner-carvo"
                style={{ width: 18, height: 18 }}
              />
            ) : (
              "Register"
            )}
          </motion.button>

          <AuthDivider />

          <GoogleAuthButton
            onClick={handleGoogleLogin}
            label="Continue with Google"
            isGoogleLoading={isGoogleLoading}
          />
        </form>

        <p
          className="text-body"
          style={{ textAlign: "center", marginTop: "var(--space-8)" }}
        >
          Already have an account?{" "}
          <Link href="/login" className="text-gold" style={{ fontWeight: 500 }}>
            Log In
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
