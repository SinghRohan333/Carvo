"use client";

import AuthBrandPanel from "./AuthBrandPanel";

export default function AuthLayout({ brandProps, children }) {
  return (
    <div className="auth-shell">
      <AuthBrandPanel {...brandProps} />
      <div className="auth-form-panel">
        <div className="auth-form-container">{children}</div>
      </div>
    </div>
  );
}
