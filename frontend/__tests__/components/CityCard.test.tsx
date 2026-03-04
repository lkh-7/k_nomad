import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CityCard from "@/components/CityCard";
import { MOCK_CITIES } from "@/__tests__/__fixtures__/cities";

// LikeButtons mock — Supabase 의존성 제거
vi.mock("@/components/LikeButtons", () => ({
  default: ({
    likes,
    dislikes,
  }: {
    cityId: number;
    likes: number;
    dislikes: number;
  }) => (
    <div data-testid="like-buttons">
      <span data-testid="lb-likes">{likes}</span>
      <span data-testid="lb-dislikes">{dislikes}</span>
    </div>
  ),
}));

const JEJU = MOCK_CITIES[0];       // rank 1, id 1
const SEOUL = MOCK_CITIES[1];      // rank 4, id 4
const GANGNEUNG = MOCK_CITIES[2];  // rank 3, id 3
const BUSAN = MOCK_CITIES[3];      // rank 2, id 2
const CHUNCHEON = MOCK_CITIES[4];  // rank 12, id 12

const DEFAULT_VOTES = { likes: 500, dislikes: 30 };

// ─── 렌더링 ───────────────────────────────────────────────────────────────

describe("CityCard — 렌더링", () => {
  it("도시 이름이 화면에 표시된다", () => {
    render(<CityCard city={JEJU} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.getByText("제주시")).toBeInTheDocument();
  });

  it("지역명이 화면에 표시된다", () => {
    render(<CityCard city={JEJU} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.getByText("제주특별자치도")).toBeInTheDocument();
  });

  it("인터넷 속도가 표시된다", () => {
    render(<CityCard city={JEJU} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.getByText(/980M/)).toBeInTheDocument();
  });

  it("votes.likes가 카드 본문에 표시된다", () => {
    render(<CityCard city={JEJU} animationDelay={0} votes={DEFAULT_VOTES} />);
    // 카드 본문의 "👍 500" 텍스트 확인 (LikeButtons mock과 분리)
    expect(screen.getByText(/👍 500/)).toBeInTheDocument();
  });
});

// ─── Top 3 배지 ───────────────────────────────────────────────────────────

describe("CityCard — Top 3 배지", () => {
  it("rank 1 → 🔥 배지가 렌더된다", () => {
    render(<CityCard city={JEJU} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.getByText(/🔥/)).toBeInTheDocument();
  });

  it("rank 2 → 🔥 배지가 렌더된다", () => {
    render(<CityCard city={BUSAN} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.getByText(/🔥/)).toBeInTheDocument();
  });

  it("rank 3 → 🔥 배지가 렌더된다", () => {
    render(<CityCard city={GANGNEUNG} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.getByText(/🔥/)).toBeInTheDocument();
  });

  it("rank 4 → 🔥 배지가 렌더되지 않는다", () => {
    render(<CityCard city={SEOUL} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.queryByText(/🔥/)).not.toBeInTheDocument();
  });

  it("rank 12 → 🔥 배지가 렌더되지 않는다", () => {
    render(<CityCard city={CHUNCHEON} animationDelay={0} votes={DEFAULT_VOTES} />);
    expect(screen.queryByText(/🔥/)).not.toBeInTheDocument();
  });
});

// ─── 네비게이션 ───────────────────────────────────────────────────────────

describe("CityCard — 네비게이션", () => {
  it("Link href가 '/cities/${city.id}'다", () => {
    render(<CityCard city={JEJU} animationDelay={0} votes={DEFAULT_VOTES} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cities/1");
  });
});
