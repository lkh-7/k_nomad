import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { CITIES } from "@/lib/data";
import LikeButtons from "@/components/LikeButtons";

export const dynamic = "force-dynamic";

const SCORE_LABELS: { key: keyof typeof CITIES[0]["scores"]; label: string }[] = [
  { key: "cafe", label: "카공환경" },
  { key: "internet", label: "인터넷" },
  { key: "safety", label: "안전도" },
  { key: "price", label: "물가" },
  { key: "nature", label: "자연환경" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const city = CITIES.find((c) => c.id === Number(id));

  if (!city) notFound();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: voteRow } = await supabase
    .from("city_votes")
    .select("likes, dislikes")
    .eq("city_id", city.id)
    .single();
  const votes = voteRow ?? { likes: city.likes, dislikes: city.dislikes };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0f1a" }}>
      {/* 이미지 헤더 */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={city.image}
          alt={`${city.name} 도시 사진`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,15,26,0.9) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs mb-3 transition-colors"
            style={{ color: "#8b9bb4" }}
          >
            ← 목록으로
          </Link>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-bebas)", color: "#f0f4ff", letterSpacing: "0.05em" }}
          >
            {city.name}
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
            {city.region}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* 노마드 점수 + 순위 */}
        <div
          className="flex items-center justify-between rounded-xl px-5 py-4"
          style={{ backgroundColor: "#111827", border: "1px solid rgba(0,201,167,0.2)" }}
        >
          <div>
            <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>노마드 점수</p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-space-mono)", color: "#00c9a7" }}
            >
              {city.nomadScore}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>랭킹</p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-space-mono)", color: city.rank <= 3 ? "#ff6b35" : "#f0f4ff" }}
            >
              #{city.rank}
            </p>
          </div>
        </div>

        {/* 기본 정보 */}
        <div
          className="rounded-xl px-5 py-4"
          style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-bold mb-4" style={{ color: "#f0f4ff" }}>기본 정보</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>월 예산</p>
              <p className="text-sm font-bold" style={{ color: "#00c9a7", fontFamily: "var(--font-space-mono)" }}>
                ₩{city.monthlyBudget}만
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>날씨</p>
              <p className="text-sm font-bold" style={{ color: "#f0f4ff" }}>
                {city.weather.emoji} {city.weather.temp}°C
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>인터넷</p>
              <p className="text-sm font-bold" style={{ color: "#f0f4ff", fontFamily: "var(--font-space-mono)" }}>
                {city.internetSpeed}M
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>예산 분류</p>
              <p className="text-sm" style={{ color: "#f0f4ff" }}>{city.budget}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>지역</p>
              <p className="text-sm" style={{ color: "#f0f4ff" }}>{city.regionCategory}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "#8b9bb4" }}>추천 계절</p>
              <p className="text-sm" style={{ color: "#f0f4ff" }}>{city.bestSeason}</p>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div
          className="rounded-xl px-5 py-4"
          style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-bold mb-4" style={{ color: "#f0f4ff" }}>세부 점수</h2>
          <div className="space-y-3">
            {SCORE_LABELS.map(({ key, label }) => {
              const score = city.scores[key];
              const pct = (score / 5) * 100;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#8b9bb4" }}>{label}</span>
                    <span style={{ color: "#00c9a7", fontFamily: "var(--font-space-mono)" }}>
                      {score.toFixed(1)}
                    </span>
                  </div>
                  <div
                    className="w-full rounded-full h-1.5"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: "#00c9a7" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 태그 */}
        <div
          className="rounded-xl px-5 py-4"
          style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-bold mb-3" style={{ color: "#f0f4ff" }}>태그</h2>
          <div className="flex flex-wrap gap-2">
            {city.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: "rgba(0,201,167,0.1)",
                  color: "#00c9a7",
                  border: "1px solid rgba(0,201,167,0.25)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 좋아요/싫어요 */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <LikeButtons cityId={city.id} likes={votes.likes} dislikes={votes.dislikes} />
        </div>
      </div>
    </div>
  );
}
