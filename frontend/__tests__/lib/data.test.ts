import { CITIES, STATS } from "@/lib/data";
import type { Budget, RegionCategory, Environment, BestSeason } from "@/types/city";

describe("CITIES 배열 무결성", () => {
  it("총 12개 도시가 존재한다", () => {
    expect(CITIES).toHaveLength(12);
  });

  it("모든 도시에 필수 필드가 존재한다", () => {
    const requiredFields = [
      "id", "rank", "name", "region", "image",
      "internetSpeed", "monthlyBudget", "weather",
      "likes", "dislikes", "scores", "tags",
      "nomadScore", "budget", "regionCategory",
      "environment", "bestSeason",
    ] as const;

    CITIES.forEach((city) => {
      requiredFields.forEach((field) => {
        expect(city).toHaveProperty(field);
      });
    });
  });

  it("id 값이 모두 고유하다", () => {
    const ids = CITIES.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(CITIES.length);
  });

  it("rank 값이 모두 고유하다", () => {
    const ranks = CITIES.map((c) => c.rank);
    const uniqueRanks = new Set(ranks);
    expect(uniqueRanks.size).toBe(CITIES.length);
  });

  it("rank 값이 1~12를 빠짐없이 포함한다", () => {
    const ranks = CITIES.map((c) => c.rank).sort((a, b) => a - b);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(ranks).toEqual(expected);
  });

  it("모든 nomadScore가 0~100 범위다", () => {
    CITIES.forEach((city) => {
      expect(city.nomadScore).toBeGreaterThanOrEqual(0);
      expect(city.nomadScore).toBeLessThanOrEqual(100);
    });
  });

  it("모든 internetSpeed가 양수다", () => {
    CITIES.forEach((city) => {
      expect(city.internetSpeed).toBeGreaterThan(0);
    });
  });

  it("모든 monthlyBudget이 양수다", () => {
    CITIES.forEach((city) => {
      expect(city.monthlyBudget).toBeGreaterThan(0);
    });
  });

  it("모든 scores 항목이 0~5 범위다", () => {
    const scoreKeys = ["cafe", "internet", "safety", "price", "nature"] as const;
    CITIES.forEach((city) => {
      scoreKeys.forEach((key) => {
        expect(city.scores[key]).toBeGreaterThanOrEqual(0);
        expect(city.scores[key]).toBeLessThanOrEqual(5);
      });
    });
  });

  it("모든 budget이 유효한 Budget 타입 값이다", () => {
    const validBudgets: Budget[] = ["100만원 이하", "100~200만원", "200만원 이상"];
    CITIES.forEach((city) => {
      expect(validBudgets).toContain(city.budget);
    });
  });

  it("모든 regionCategory가 유효한 RegionCategory 타입 값이다", () => {
    const validRegions: RegionCategory[] = [
      "수도권", "경상도", "전라도", "강원도", "제주도", "충청도",
    ];
    CITIES.forEach((city) => {
      expect(validRegions).toContain(city.regionCategory);
    });
  });

  it("모든 environment가 유효한 Environment 타입 값이다", () => {
    const validEnvironments: Environment[] = [
      "자연친화", "도심선호", "카페작업", "코워킹필수",
    ];
    CITIES.forEach((city) => {
      expect(validEnvironments).toContain(city.environment);
    });
  });

  it("모든 bestSeason이 유효한 BestSeason 타입 값이다", () => {
    const validSeasons: BestSeason[] = ["봄", "여름", "가을", "겨울"];
    CITIES.forEach((city) => {
      expect(validSeasons).toContain(city.bestSeason);
    });
  });
});

describe("STATS 무결성", () => {
  it("totalCities가 CITIES.length와 일치한다", () => {
    expect(STATS.totalCities).toBe(CITIES.length);
  });
});
