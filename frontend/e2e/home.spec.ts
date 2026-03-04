import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test.describe("홈 페이지 기본 렌더링", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test("로고가 표시된다", async ({ page }) => {
    const homePage = new HomePage(page);
    const logo = homePage.getLogo();
    await expect(logo).toBeVisible();
    await expect(logo).toContainText("KOREA");
    await expect(logo).toContainText("NOMAD");
  });

  test("도시 카드가 화면에 존재한다", async ({ page }) => {
    const homePage = new HomePage(page);
    const cards = homePage.getCityCards();
    await expect(cards.first()).toBeVisible();
  });

  test("처음 접속 시 4개 필터가 모두 기본값(전체)이다", async ({ page }) => {
    const homePage = new HomePage(page);

    // 예산, 지역, 환경, 계절 — 4개 필터 각각 "전체"
    for (const i of [0, 1, 2, 3] as const) {
      await expect(homePage.getFilterTrigger(i)).toContainText("전체");
    }
  });

  test("필터 미적용 시 12개 도시 카드가 전부 표시된다", async ({ page }) => {
    const homePage = new HomePage(page);

    // lib/data.ts 에 12개 도시가 정의되어 있으므로, 필터 없을 때 12개
    await expect(homePage.getCityCards()).toHaveCount(12);
  });
});
