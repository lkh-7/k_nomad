import { Page, Locator } from "@playwright/test";

/**
 * 홈 페이지 (/) Page Object Model
 * - 도시 카드 목록, 필터 드롭다운, 정렬 드롭다운 조작
 */
export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  // --- Locators ---

  /** 헤더 로고 (h1: "🇰🇷 KOREA NOMAD") */
  getLogo(): Locator {
    return this.page.locator("h1").filter({ hasText: "KOREA NOMAD" });
  }

  /** 도시 카드 목록 (article 요소들) */
  getCityCards(): Locator {
    return this.page.locator("article");
  }

  /**
   * 필터 드롭다운 트리거 (예산·지역·환경·계절 — 4개)
   * shadcn Select → role="combobox", 초기값 "전체"
   */
  getFilterTriggers(): Locator {
    return this.page.getByRole("combobox").filter({ hasText: "전체" });
  }

  /** 개별 필터 트리거 (index: 0=예산, 1=지역, 2=환경, 3=계절) */
  getFilterTrigger(index: 0 | 1 | 2 | 3): Locator {
    return this.page.getByRole("combobox").nth(index);
  }

  /** 정렬 드롭다운 트리거 (5번째 combobox, 초기값 "좋아요순") */
  getSortTrigger(): Locator {
    return this.page.getByRole("combobox").nth(4);
  }

  /** 결과 없음 메시지 */
  getEmptyMessage(): Locator {
    return this.page.getByText("조건에 맞는 도시가 없습니다");
  }

  /** 도시리스트 섹션 타이틀 */
  getSectionTitle(): Locator {
    return this.page.getByText("도시리스트");
  }

  // --- Actions ---

  async clickCityCard(cityName: string) {
    await this.page.getByRole("article").filter({ hasText: cityName }).click();
  }
}
