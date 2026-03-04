import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CityGrid from "@/components/CityGrid";
import { CITIES, MOCK_CITIES } from "@/__tests__/__fixtures__/cities";
import { EMPTY_VOTES_MAP } from "@/__tests__/__fixtures__/votesMap";
import type { City } from "@/types/city";

// CityCard mock — 렌더링 단순화
vi.mock("@/components/CityCard", () => ({
  default: ({ city }: { city: City; animationDelay: number; votes: unknown }) => (
    <div data-testid="city-card">{city.name}</div>
  ),
}));

const ALL_FILTERS = { budget: "전체", region: "전체", environment: "전체", season: "전체" };

// ─── 기본 렌더링 ──────────────────────────────────────────────────────────

describe("CityGrid — 기본 렌더링", () => {
  it("모든 필터 '전체'일 때 12개 카드가 렌더된다", () => {
    render(
      <CityGrid cities={CITIES} votesMap={EMPTY_VOTES_MAP} filters={ALL_FILTERS} sortBy="likes" />
    );
    expect(screen.getAllByTestId("city-card")).toHaveLength(12);
  });

  it("votesMap에 없는 cityId도 city.likes/dislikes 기본값으로 정상 렌더된다", () => {
    render(
      <CityGrid cities={MOCK_CITIES} votesMap={EMPTY_VOTES_MAP} filters={ALL_FILTERS} sortBy="likes" />
    );
    expect(screen.getAllByTestId("city-card")).toHaveLength(5);
  });
});

// ─── 필터 적용 ────────────────────────────────────────────────────────────

describe("CityGrid — 필터 적용", () => {
  it("budget '200만원 이상' 필터 → 서울 1개만 렌더된다", () => {
    render(
      <CityGrid
        cities={CITIES}
        votesMap={EMPTY_VOTES_MAP}
        filters={{ ...ALL_FILTERS, budget: "200만원 이상" }}
        sortBy="likes"
      />
    );
    const cards = screen.getAllByTestId("city-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent("서울");
  });

  it("region '충청도' 필터 → 대전 1개만 렌더된다", () => {
    render(
      <CityGrid
        cities={CITIES}
        votesMap={EMPTY_VOTES_MAP}
        filters={{ ...ALL_FILTERS, region: "충청도" }}
        sortBy="likes"
      />
    );
    const cards = screen.getAllByTestId("city-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent("대전");
  });
});

// ─── 결과 없음 ────────────────────────────────────────────────────────────

describe("CityGrid — 결과 없음", () => {
  const impossibleFilters = { ...ALL_FILTERS, budget: "200만원 이상", region: "강원도" };

  it("매칭 도시 없는 필터 → '조건에 맞는 도시가 없습니다' 표시", () => {
    render(
      <CityGrid cities={CITIES} votesMap={EMPTY_VOTES_MAP} filters={impossibleFilters} sortBy="likes" />
    );
    expect(screen.getByText("조건에 맞는 도시가 없습니다")).toBeInTheDocument();
  });

  it("결과 없을 때 '다른 필터를 선택해보세요' 표시", () => {
    render(
      <CityGrid cities={CITIES} votesMap={EMPTY_VOTES_MAP} filters={impossibleFilters} sortBy="likes" />
    );
    expect(screen.getByText("다른 필터를 선택해보세요")).toBeInTheDocument();
  });
});
