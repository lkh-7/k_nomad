"use client";

import { useState } from "react";
import Image from "next/image";
import { City, TagType } from "@/types/city";
import ScoreBar from "./ScoreBar";
import LikeButtons from "./LikeButtons";
import RatingModal from "./RatingModal";

const TAG_CONFIG: Record<
  TagType,
  { icon: string; color: string; bg: string }
> = {
  바다: { icon: "🌊", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)" },
  "산/자연": { icon: "⛰️", color: "#4ade80", bg: "rgba(74, 222, 128, 0.12)" },
  도심: { icon: "🏙️", color: "#a78bfa", bg: "rgba(167, 139, 250, 0.12)" },
  저렴: { icon: "💰", color: "#fbbf24", bg: "rgba(251, 191, 36, 0.12)" },
  카공: { icon: "☕", color: "#fb923c", bg: "rgba(251, 146, 60, 0.12)" },
};

const SCORE_LABELS = [
  { key: "cafe" as const, label: "카공", icon: "☕" },
  { key: "internet" as const, label: "인터넷", icon: "📶" },
  { key: "safety" as const, label: "안전도", icon: "🔒" },
  { key: "price" as const, label: "물가", icon: "💰" },
  { key: "nature" as const, label: "자연", icon: "🌿" },
];

interface CityCardProps {
  city: City;
  animationDelay: number;
}

export default function CityCard({ city, animationDelay }: CityCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTop3 = city.rank <= 3;

  return (
    <>
      <article
        className="card-animate rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
        style={{
          backgroundColor: "#111827",
          border: "1px solid rgba(255,255,255,0.07)",
          animationDelay: `${animationDelay}ms`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 24px rgba(0, 201, 167, 0.2), 0 8px 32px rgba(0,0,0,0.4)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(0, 201, 167, 0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.07)";
        }}
      >
        {/* 이미지 영역 */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={city.image}
            alt={`${city.name} 도시 사진`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* 그라데이션 오버레이 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* 순위 배지 (좌상단) */}
          <div className="absolute top-2 left-2">
            <span
              className="px-2 py-0.5 rounded-md text-xs font-bold"
              style={{
                fontFamily: "var(--font-space-mono)",
                backgroundColor: isTop3
                  ? "rgba(255, 107, 53, 0.9)"
                  : "rgba(0,0,0,0.6)",
                color: "#fff",
                border: isTop3
                  ? "1px solid rgba(255, 107, 53, 0.5)"
                  : "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {isTop3 ? `🔥 #${city.rank}` : `#${city.rank}`}
            </span>
          </div>

          {/* 인터넷 속도 (우상단) */}
          <div className="absolute top-2 right-2">
            <span
              className="px-2 py-0.5 rounded-md text-xs"
              style={{
                fontFamily: "var(--font-space-mono)",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#00c9a7",
                border: "1px solid rgba(0, 201, 167, 0.3)",
              }}
            >
              📶 {city.internetSpeed}M
            </span>
          </div>

          {/* 도시명 오버레이 (하단) */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
            <p className="text-base font-bold leading-tight" style={{ color: "#fff" }}>
              {city.name}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              {city.region}
            </p>
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="p-3 space-y-3">
          {/* 생활비 */}
          <div>
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-space-mono)",
                color: "#00c9a7",
              }}
            >
              ₩{city.monthlyBudget}만
            </span>
            <span className="text-xs ml-1" style={{ color: "#8b9bb4" }}>
              /월 (노마드 기준)
            </span>
          </div>

          {/* 날씨 / 좋아요 / 별점 */}
          <div className="flex items-center gap-3 text-xs" style={{ color: "#8b9bb4" }}>
            <span>
              {city.weather.emoji} {city.weather.temp}°C
            </span>
            <span>👍 {city.likes.toLocaleString()}</span>
            <span style={{ color: "#eab308" }}>
              ★{" "}
              <span style={{ fontFamily: "var(--font-space-mono)" }}>
                {city.rating.toFixed(1)}
              </span>
            </span>
          </div>

          {/* 점수 바 */}
          <div className="space-y-1.5">
            {SCORE_LABELS.map((item) => (
              <ScoreBar
                key={item.key}
                label={item.label}
                icon={item.icon}
                score={city.scores[item.key]}
              />
            ))}
          </div>

          {/* 태그 칩 */}
          <div className="flex flex-wrap gap-1.5">
            {city.tags.slice(0, 3).map((tag) => {
              const cfg = TAG_CONFIG[tag];
              return (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: cfg.bg,
                    color: cfg.color,
                    border: `1px solid ${cfg.color}33`,
                  }}
                >
                  {cfg.icon} {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* 카드 푸터 */}
        <LikeButtons
          likes={city.likes}
          dislikes={city.dislikes}
          rating={city.rating}
          onRatingClick={() => setIsModalOpen(true)}
        />
      </article>

      <RatingModal
        city={city}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
