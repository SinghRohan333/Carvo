"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthLayout from "./AuthLayout";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordInput from "./PasswordInput";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    // TODO: replace with BetterAuth sign-in call once Phase 1 is built
    // console.log("Login submitted:", formData);
    const { email, password } = formData;
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (error) {
      toast.error(error?.message || "Login Failed!. Please try again.");
      setIsSubmitting(false);
      return;
    }
    if (data) {
      toast.success("Login successful! Welcome back to CARVÕ");
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

  const handleGoogleLogin = () => {
    // TODO: wire up BetterAuth Google OAuth once Phase 1 is built
    console.log("Google login clicked");
  };

  return (
    <AuthLayout
      brandProps={{
        headline: "Arrive in",
        headlineItalic: "something extraordinary.",
        caption:
          "Curated vehicles for discerning drivers. Seamless booking, effortless journeys.",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-caption">Welcome back</span>
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
          Log in to your account
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
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
              "Log In"
            )}
          </motion.button>

          <AuthDivider />

          <GoogleAuthButton onClick={handleGoogleLogin} />
        </form>

        <p
          className="text-body"
          style={{ textAlign: "center", marginTop: "var(--space-8)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-gold"
            style={{ fontWeight: 500 }}
          >
            Register
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
