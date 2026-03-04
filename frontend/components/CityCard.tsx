"use client";

import Image from "next/image";
import Link from "next/link";
import { City } from "@/types/city";
import LikeButtons from "./LikeButtons";

const CITY_INFO = [
  { label: "월 예산", key: "budget" },
  { label: "지역", key: "regionCategory" },
  { label: "환경", key: "environment" },
  { label: "추천 계절", key: "bestSeason" },
] as const;

interface CityCardProps {
  city: City;
  animationDelay: number;
  votes: { likes: number; dislikes: number };
}

export default function CityCard({ city, animationDelay, votes }: CityCardProps) {
  const isTop3 = city.rank <= 3;

  return (
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
        <Link href={`/cities/${city.id}`} className="block">
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

          {/* 날씨 / 좋아요 */}
          <div className="flex items-center gap-3 text-xs" style={{ color: "#8b9bb4" }}>
            <span>
              {city.weather.emoji} {city.weather.temp}°C
            </span>
            <span>👍 {votes.likes.toLocaleString()}</span>
          </div>

          {/* Key-Value 정보 */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            {CITY_INFO.map(({ label, key }) => (
              <div key={label}>
                <p style={{ color: "#8b9bb4" }}>{label}</p>
                <p style={{ color: "#f0f4ff", fontWeight: 500 }}>{city[key]}</p>
              </div>
            ))}
          </div>
        </div>
        </Link>

        {/* 카드 푸터 */}
        <LikeButtons
          cityId={city.id}
          likes={votes.likes}
          dislikes={votes.dislikes}
        />
      </article>
  );
}
