"use client";

import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/app/actions/auth";

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#f0f4ff",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.border = "1px solid rgba(0, 201, 167, 0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(0, 201, 167, 0.08)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.border = "1px solid rgba(255, 255, 255, 0.08)";
    e.target.style.boxShadow = "none";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    setError("");
    setLoading(true);

    const result = await signUp(email, password, nickname);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0a0f1e" }}
    >
      {/* 헤더 */}
      <header
        className="w-full border-b px-4 py-3"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(0, 201, 167, 0.2)",
          boxShadow: "0 1px 20px rgba(0, 201, 167, 0.08)",
        }}
      >
        <div className="mx-auto max-w-screen-xl">
          <Link href="/">
            <h1
              className="text-3xl tracking-wide leading-none w-fit"
              style={{
                fontFamily: "var(--font-bebas)",
                color: "#f0f4ff",
                letterSpacing: "0.05em",
              }}
            >
              🇰🇷 <span style={{ color: "#00c9a7" }}>KOREA</span> NOMAD
            </h1>
          </Link>
        </div>
      </header>

      {/* 메인 */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* 타이틀 */}
          <div className="text-center mb-8">
            <h2
              className="text-4xl mb-2"
              style={{
                fontFamily: "var(--font-bebas)",
                color: "#f0f4ff",
                letterSpacing: "0.05em",
              }}
            >
              회원가입
            </h2>
            <p className="text-sm" style={{ color: "#8b9bb4" }}>
              노마드 커뮤니티에 참여하세요
            </p>
          </div>

          {/* 성공 메시지 */}
          {success && (
            <div
              className="rounded-2xl p-8 text-center flex flex-col gap-4"
              style={{
                backgroundColor: "#111827",
                border: "1px solid rgba(0, 201, 167, 0.4)",
                boxShadow: "0 4px 40px rgba(0, 201, 167, 0.15)",
              }}
            >
              <div className="text-4xl">✅</div>
              <h3
                className="text-xl font-semibold"
                style={{ color: "#00c9a7" }}
              >
                회원가입이 완료되었습니다!
              </h3>
              <p className="text-sm" style={{ color: "#8b9bb4" }}>
                로그인 페이지로 이동하세요
              </p>
              <Link
                href="/login"
                className="w-full py-3 rounded-lg font-semibold text-sm text-center"
                style={{
                  backgroundColor: "#00c9a7",
                  color: "#0a0f1e",
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                지금 로그인하기
              </Link>
            </div>
          )}

          {/* 카드 */}
          {!success && (
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#111827",
              border: "1px solid rgba(0, 201, 167, 0.15)",
              boxShadow: "0 4px 40px rgba(0, 201, 167, 0.06)",
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* 에러 메시지 */}
              {error && (
                <div
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#ef4444",
                  }}
                >
                  {error}
                </div>
              )}

              {/* 닉네임 */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{
                    color: "#8b9bb4",
                    fontFamily: "var(--font-space-mono)",
                  }}
                >
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="노마드123"
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* 이메일 */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{
                    color: "#8b9bb4",
                    fontFamily: "var(--font-space-mono)",
                  }}
                >
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nomad@korea.com"
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* 비밀번호 */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{
                    color: "#8b9bb4",
                    fontFamily: "var(--font-space-mono)",
                  }}
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* 비밀번호 확인 */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{
                    color: "#8b9bb4",
                    fontFamily: "var(--font-space-mono)",
                  }}
                >
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={
                    passwordConfirm && password !== passwordConfirm
                      ? {
                          ...inputStyle,
                          border: "1px solid rgba(239, 68, 68, 0.5)",
                        }
                      : inputStyle
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {passwordConfirm && password !== passwordConfirm && (
                  <span className="text-xs" style={{ color: "#ef4444" }}>
                    비밀번호가 일치하지 않습니다
                  </span>
                )}
              </div>

              {/* 가입 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-sm transition-all mt-1"
                style={{
                  backgroundColor: loading ? "#007a65" : "#00c9a7",
                  color: "#0a0f1e",
                  fontFamily: "var(--font-space-mono)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor = "#00b896";
                    (e.target as HTMLButtonElement).style.boxShadow =
                      "0 0 20px rgba(0, 201, 167, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor = "#00c9a7";
                    (e.target as HTMLButtonElement).style.boxShadow = "none";
                  }
                }}
              >
                {loading ? "가입 중..." : "가입하기"}
              </button>
            </form>

            {/* 구분선 */}
            <div className="flex items-center gap-3 my-6">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
              <span className="text-xs" style={{ color: "#4a5a70" }}>
                또는
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
            </div>

            {/* 로그인 링크 */}
            <p className="text-center text-sm" style={{ color: "#8b9bb4" }}>
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-medium transition-colors"
                style={{ color: "#00c9a7" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#00b896")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#00c9a7")
                }
              >
                로그인
              </Link>
            </p>
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
