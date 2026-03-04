import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FilterBar from "@/components/FilterBar";
import { MOCK_CITIES } from "@/__tests__/__fixtures__/cities";
import { MOCK_VOTES_MAP } from "@/__tests__/__fixtures__/votesMap";
import type { SortType } from "@/types/city";

// CityGrid mock — FilterBar가 내부적으로 렌더하는 CityGrid 단순화
vi.mock("@/components/CityGrid", () => ({
  default: ({
    sortBy,
    filters,
  }: {
    cities: unknown[];
    votesMap: Record<number, unknown>;
    filters: { budget: string; region: string; environment: string; season: string };
    sortBy: SortType;
  }) => (
    <div
      data-testid="city-grid"
      data-sortby={sortBy}
      data-budget={filters.budget}
      data-region={filters.region}
    />
  ),
}));

// ─── 드롭다운 렌더링 ──────────────────────────────────────────────────────

describe("FilterBar — 드롭다운 렌더링", () => {
  it("5개 드롭다운이 렌더된다 (4 필터 + 1 정렬)", () => {
    render(<FilterBar cities={MOCK_CITIES} votesMap={MOCK_VOTES_MAP} />);
    // Radix Select 트리거는 role="combobox"로 렌더됨
    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes).toHaveLength(5);
  });

  it("예산 필터 옵션 레이블이 존재한다", () => {
    render(<FilterBar cities={MOCK_CITIES} votesMap={MOCK_VOTES_MAP} />);
    // SelectValue가 초기값 "전체"를 표시
    const allValues = screen.getAllByText("전체");
    expect(allValues.length).toBeGreaterThanOrEqual(4);
  });

  it("정렬 드롭다운에 '좋아요순' 텍스트가 표시된다", () => {
    render(<FilterBar cities={MOCK_CITIES} votesMap={MOCK_VOTES_MAP} />);
    expect(screen.getByText("좋아요순")).toBeInTheDocument();
  });
});

// ─── 기본 상태 ────────────────────────────────────────────────────────────

describe("FilterBar — 기본 상태", () => {
  it("CityGrid가 렌더된다", () => {
    render(<FilterBar cities={MOCK_CITIES} votesMap={MOCK_VOTES_MAP} />);
    expect(screen.getByTestId("city-grid")).toBeInTheDocument();
  });

  it('초기 sortBy가 "likes"로 CityGrid에 전달된다', () => {
    render(<FilterBar cities={MOCK_CITIES} votesMap={MOCK_VOTES_MAP} />);
    expect(screen.getByTestId("city-grid")).toHaveAttribute("data-sortby", "likes");
  });

  it('초기 모든 필터가 "전체"로 CityGrid에 전달된다', () => {
    render(<FilterBar cities={MOCK_CITIES} votesMap={MOCK_VOTES_MAP} />);
    const grid = screen.getByTestId("city-grid");
    expect(grid).toHaveAttribute("data-budget", "전체");
    expect(grid).toHaveAttribute("data-region", "전체");
  });
});
