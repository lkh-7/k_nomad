import { filterCities, sortCities } from "@/lib/cityFilters";
import { CITIES } from "@/lib/data";
import { MOCK_CITIES } from "@/__tests__/__fixtures__/cities";
import { MOCK_VOTES_MAP, EMPTY_VOTES_MAP, PARTIAL_VOTES_MAP } from "@/__tests__/__fixtures__/votesMap";

const ALL_FILTERS = { budget: "전체", region: "전체", environment: "전체", season: "전체" };

// ─── filterCities: budget 필터 ─────────────────────────────────────────────

describe("filterCities — budget 필터", () => {
  it('"전체" → 12개 도시 모두 반환', () => {
    expect(filterCities(CITIES, ALL_FILTERS)).toHaveLength(12);
  });

  it('"100만원 이하" → 해당 도시만 반환 (7개)', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, budget: "100만원 이하" });
    expect(result).toHaveLength(7);
    result.forEach((c) => expect(c.budget).toBe("100만원 이하"));
  });

  it('"100~200만원" → 해당 도시만 반환 (4개)', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, budget: "100~200만원" });
    expect(result).toHaveLength(4);
    result.forEach((c) => expect(c.budget).toBe("100~200만원"));
  });

  it('"200만원 이상" → 서울 1개만 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, budget: "200만원 이상" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("서울");
  });
});

// ─── filterCities: region 필터 ────────────────────────────────────────────

describe("filterCities — region 필터", () => {
  it('"전체" → 12개 도시 모두 반환', () => {
    expect(filterCities(CITIES, ALL_FILTERS)).toHaveLength(12);
  });

  it('"수도권" → 서울 1개만 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, region: "수도권" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("서울");
  });

  it('"경상도" → 부산·경주·통영 3개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, region: "경상도" });
    expect(result).toHaveLength(3);
    result.forEach((c) => expect(c.regionCategory).toBe("경상도"));
  });

  it('"전라도" → 여수·전주·광주 3개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, region: "전라도" });
    expect(result).toHaveLength(3);
    result.forEach((c) => expect(c.regionCategory).toBe("전라도"));
  });

  it('"강원도" → 강릉·속초·춘천 3개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, region: "강원도" });
    expect(result).toHaveLength(3);
    result.forEach((c) => expect(c.regionCategory).toBe("강원도"));
  });

  it('"제주도" → 제주시 1개만 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, region: "제주도" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("제주시");
  });

  it('"충청도" → 대전 1개만 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, region: "충청도" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("대전");
  });
});

// ─── filterCities: environment 필터 ──────────────────────────────────────

describe("filterCities — environment 필터", () => {
  it('"전체" → 12개 도시 모두 반환', () => {
    expect(filterCities(CITIES, ALL_FILTERS)).toHaveLength(12);
  });

  it('"자연친화" → 6개 도시 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, environment: "자연친화" });
    expect(result).toHaveLength(6);
    result.forEach((c) => expect(c.environment).toBe("자연친화"));
  });

  it('"도심선호" → 부산 1개만 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, environment: "도심선호" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("부산");
  });

  it('"카페작업" → 강릉·전주·광주 3개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, environment: "카페작업" });
    expect(result).toHaveLength(3);
    result.forEach((c) => expect(c.environment).toBe("카페작업"));
  });

  it('"코워킹필수" → 서울·대전 2개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, environment: "코워킹필수" });
    expect(result).toHaveLength(2);
    result.forEach((c) => expect(c.environment).toBe("코워킹필수"));
  });
});

// ─── filterCities: season 필터 ────────────────────────────────────────────

describe("filterCities — season 필터", () => {
  it('"전체" → 12개 도시 모두 반환', () => {
    expect(filterCities(CITIES, ALL_FILTERS)).toHaveLength(12);
  });

  it('"봄" → 제주시·서울·경주·광주 4개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, season: "봄" });
    expect(result).toHaveLength(4);
    result.forEach((c) => expect(c.bestSeason).toBe("봄"));
  });

  it('"여름" → 강릉·속초·여수·통영 4개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, season: "여름" });
    expect(result).toHaveLength(4);
    result.forEach((c) => expect(c.bestSeason).toBe("여름"));
  });

  it('"가을" → 부산·전주·대전 3개 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, season: "가을" });
    expect(result).toHaveLength(3);
    result.forEach((c) => expect(c.bestSeason).toBe("가을"));
  });

  it('"겨울" → 춘천 1개만 반환', () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, season: "겨울" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("춘천");
  });
});

// ─── filterCities: AND 복합 필터 ──────────────────────────────────────────

describe("filterCities — AND 복합 필터", () => {
  it("budget '100만원 이하' + region '강원도' → 강릉·속초·춘천 3개", () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, budget: "100만원 이하", region: "강원도" });
    expect(result).toHaveLength(3);
    const names = result.map((c) => c.name);
    expect(names).toContain("강릉");
    expect(names).toContain("속초");
    expect(names).toContain("춘천");
  });

  it("budget '200만원 이상' + region '수도권' → 서울 1개", () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, budget: "200만원 이상", region: "수도권" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("서울");
  });

  it("budget '200만원 이상' + region '강원도' → 빈 배열", () => {
    const result = filterCities(CITIES, { ...ALL_FILTERS, budget: "200만원 이상", region: "강원도" });
    expect(result).toHaveLength(0);
  });

  it("4개 필터 모두 적용 → AND 교집합 (제주시만 해당)", () => {
    const result = filterCities(CITIES, {
      budget: "100~200만원",
      region: "제주도",
      environment: "자연친화",
      season: "봄",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("제주시");
  });
});

// ─── sortCities ───────────────────────────────────────────────────────────

describe("sortCities — 정렬", () => {
  it('"nomadScore" → nomadScore 내림차순', () => {
    const result = sortCities([...CITIES], "nomadScore", EMPTY_VOTES_MAP);
    expect(result[0].nomadScore).toBe(92);
    expect(result[result.length - 1].nomadScore).toBe(64);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].nomadScore).toBeGreaterThanOrEqual(result[i + 1].nomadScore);
    }
  });

  it('"budgetLow" → monthlyBudget 오름차순', () => {
    const result = sortCities([...CITIES], "budgetLow", EMPTY_VOTES_MAP);
    expect(result[0].monthlyBudget).toBe(55);
    expect(result[result.length - 1].monthlyBudget).toBe(170);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].monthlyBudget).toBeLessThanOrEqual(result[i + 1].monthlyBudget);
    }
  });

  it('"budgetHigh" → monthlyBudget 내림차순', () => {
    const result = sortCities([...CITIES], "budgetHigh", EMPTY_VOTES_MAP);
    expect(result[0].monthlyBudget).toBe(170);
    expect(result[result.length - 1].monthlyBudget).toBe(55);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].monthlyBudget).toBeGreaterThanOrEqual(result[i + 1].monthlyBudget);
    }
  });

  it('"internetSpeed" → internetSpeed 내림차순', () => {
    const result = sortCities([...CITIES], "internetSpeed", EMPTY_VOTES_MAP);
    expect(result[0].internetSpeed).toBe(1200);
    expect(result[result.length - 1].internetSpeed).toBe(390);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].internetSpeed).toBeGreaterThanOrEqual(result[i + 1].internetSpeed);
    }
  });

  it('"likes" + votesMap 있음 → votesMap.likes 기준 내림차순', () => {
    // MOCK_VOTES_MAP: {1:500, 2:300, 3:150, 4:200, 12:80}
    const result = sortCities([...MOCK_CITIES], "likes", MOCK_VOTES_MAP);
    const likes = result.map((c) => MOCK_VOTES_MAP[c.id]?.likes ?? c.likes);
    for (let i = 0; i < likes.length - 1; i++) {
      expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
    }
    expect(result[0].id).toBe(1);  // 제주시: 500
    expect(result[1].id).toBe(2);  // 부산: 300
  });

  it('"likes" + votesMap 빈 객체 → city.likes 기준 내림차순 (fallback)', () => {
    // MOCK_CITIES city.likes: 서울(445), 부산(287), 강릉(201), 제주시(312), 춘천(65)
    const result = sortCities([...MOCK_CITIES], "likes", EMPTY_VOTES_MAP);
    expect(result[0].name).toBe("서울");        // 445
    expect(result[result.length - 1].name).toBe("춘천"); // 65
  });

  it('"likes" + votesMap 일부만 있음 → 있는 항목은 votesMap, 없는 항목은 city.likes', () => {
    // PARTIAL_VOTES_MAP: {1: 500} (제주시만)
    // 제주시: 500, 서울: 445(city.likes), 부산: 287(city.likes) ...
    const result = sortCities([...MOCK_CITIES], "likes", PARTIAL_VOTES_MAP);
    expect(result[0].id).toBe(1);   // 제주시 → votesMap.likes = 500
    expect(result[1].name).toBe("서울"); // city.likes = 445
  });

  it("빈 배열 입력 → 빈 배열 반환", () => {
    expect(sortCities([], "nomadScore", EMPTY_VOTES_MAP)).toHaveLength(0);
  });
});
