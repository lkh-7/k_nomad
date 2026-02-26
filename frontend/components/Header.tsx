import { STATS } from "@/lib/data";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b"
      style={{
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(0, 201, 167, 0.2)",
        boxShadow: "0 1px 20px rgba(0, 201, 167, 0.08)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {/* 로고 영역 */}
          <div className="flex items-center gap-3">
            <div>
              <h1
                className="text-3xl tracking-wide leading-none"
                style={{
                  fontFamily: "var(--font-bebas)",
                  color: "#f0f4ff",
                  letterSpacing: "0.05em",
                }}
              >
                🇰🇷{" "}
                <span style={{ color: "#00c9a7" }}>KOREA</span>{" "}
                <span>NOMAD</span>
              </h1>
              <p
                className="text-xs mt-0.5"
                style={{ color: "#8b9bb4" }}
              >
                한국 디지털 노마드 도시 랭킹
              </p>
            </div>
          </div>

          {/* 실시간 통계 */}
          <div className="flex items-center gap-2 flex-wrap">
            <StatBadge label={`${STATS.totalCities}도시`} />
            <StatBadge
              label={`${STATS.totalRatings.toLocaleString()}평가`}
            />
            <LiveBadge />
          </div>
        </div>
      </div>
    </header>
  );
}

function StatBadge({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: "rgba(0, 201, 167, 0.1)",
        color: "#00c9a7",
        border: "1px solid rgba(0, 201, 167, 0.25)",
        fontFamily: "var(--font-space-mono)",
      }}
    >
      {label}
    </span>
  );
}

function LiveBadge() {
  return (
    <span
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        color: "#22c55e",
        border: "1px solid rgba(34, 197, 94, 0.25)",
        fontFamily: "var(--font-space-mono)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: "#22c55e" }}
      />
      Live
    </span>
  );
}
