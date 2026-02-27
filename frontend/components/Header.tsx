import Link from "next/link";
import { STATS } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

          {/* 우측 영역: 통계 + 인증 */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* 실시간 통계 */}
            <div className="flex items-center gap-2">
              <StatBadge label={`${STATS.totalCities}도시`} />
              <StatBadge
                label={`${STATS.totalRatings.toLocaleString()}평가`}
              />
              <LiveBadge />
            </div>

            {/* 구분선 */}
            <div
              className="hidden sm:block w-px h-5"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />

            {/* 로그인/로그아웃 영역 */}
            {user ? (
              <div className="flex items-center gap-2">
                <span
                  className="text-xs"
                  style={{
                    color: "#8b9bb4",
                    fontFamily: "var(--font-space-mono)",
                  }}
                >
                  {user.user_metadata?.nickname ?? user.email}
                </span>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: "rgba(0, 201, 167, 0.1)",
                      color: "#00c9a7",
                      border: "1px solid rgba(0, 201, 167, 0.3)",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  >
                    로그아웃
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: "#00c9a7",
                  color: "#0a0f1e",
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                로그인
              </Link>
            )}
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
