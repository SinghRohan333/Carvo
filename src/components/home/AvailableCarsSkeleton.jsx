export default function AvailableCarsSkeleton() {
  return (
    <div>
      {/* Spinner + label */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginBottom: "48px",
        }}
      >
        <div className="spinner-carvo" />
        <span
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "11px",
            fontWeight: "500",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
          }}
        >
          Curating your fleet…
        </span>
      </div>

      {/* 6 skeleton cards */}
      <div className="cars-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image skeleton */}
            <div
              className="skeleton-shimmer"
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                backgroundColor: "var(--color-border)",
              }}
            />

            {/* Body skeleton */}
            <div
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                className="skeleton-shimmer"
                style={{
                  height: "20px",
                  width: "72px",
                  borderRadius: "4px",
                  backgroundColor: "var(--color-border)",
                }}
              />
              <div
                className="skeleton-shimmer"
                style={{
                  height: "22px",
                  width: "85%",
                  borderRadius: "4px",
                  backgroundColor: "var(--color-border)",
                }}
              />
              <div
                className="skeleton-shimmer"
                style={{
                  height: "16px",
                  width: "65%",
                  borderRadius: "4px",
                  backgroundColor: "var(--color-border)",
                }}
              />
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                  margin: "4px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "20px",
                    width: "90px",
                    borderRadius: "4px",
                    backgroundColor: "var(--color-border)",
                  }}
                />
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "36px",
                    width: "110px",
                    borderRadius: "var(--radius-card)",
                    backgroundColor: "var(--color-border)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            var(--color-border) 25%,
            var(--color-bg-card) 50%,
            var(--color-border) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.5s infinite linear;
        }
        .cars-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .cars-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .cars-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
