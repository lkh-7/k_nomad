import { CITIES } from "@/lib/data";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "#f0f4ff" }}
        >
          도시리스트
        </h2>
        <FilterBar cities={CITIES} />
      </main>

      <footer
        className="mt-12 py-6 text-center text-xs"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "#4a5a70",
        }}
      >
        <p>
          🇰🇷 KOREA NOMAD — 한국 디지털 노마드 도시 정보 플랫폼 &nbsp;·&nbsp;
          <span style={{ color: "#00c9a7" }}>MVP v1.0</span>
        </p>
        <p className="mt-1">
          데이터는 커뮤니티 기반 평균값이며 실제와 다를 수 있습니다
        </p>
      </footer>
    </div>
  );
}
