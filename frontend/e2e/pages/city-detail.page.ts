import { Page, Locator } from "@playwright/test";

/**
 * 도시 상세 페이지 (/cities/:id) Page Object Model
 * - 도시 정보 표시, 좋아요/싫어요 버튼, 목록으로 링크
 */
export class CityDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(cityId: number) {
    await this.page.goto(`/cities/${cityId}`);
  }

  // --- Locators ---

  /** 도시명 h1 (상세 페이지엔 Header가 없으므로 h1 단일) */
  getCityName(): Locator {
    return this.page.locator("h1");
  }

  /** 노마드 점수 라벨 */
  getNomadScore(): Locator {
    return this.page.getByText("노마드 점수");
  }

  /** 목록으로 링크 (← 목록으로) */
  getBackLink(): Locator {
    return this.page.getByText("목록으로");
  }

  /** 좋아요 버튼 (👍) */
  getLikeButton(): Locator {
    return this.page.getByRole("button").filter({ hasText: "👍" });
  }

  /** 싫어요 버튼 (👎) */
  getDislikeButton(): Locator {
    return this.page.getByRole("button").filter({ hasText: "👎" });
  }

  /** 기본 정보 섹션 */
  getInfoSection(): Locator {
    return this.page.getByText("기본 정보");
  }

  /** 태그 영역 */
  getTagSection(): Locator {
    return this.page.getByText("태그");
  }
}
