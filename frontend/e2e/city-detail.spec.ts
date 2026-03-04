import { test, expect } from "@playwright/test";
import { CityDetailPage } from "./pages/city-detail.page";

test.describe("도시 상세 페이지", () => {
  test("홈에서 도시 카드 클릭 시 /cities/:id 로 이동한다", async ({ page }) => {
    await page.goto("/");
    // article 안의 /cities/ href 링크를 직접 클릭
    await page.locator('article a[href*="/cities/"]').first().click();
    await expect(page).toHaveURL(/\/cities\/\d+/);
  });

  test("도시명, 노마드 점수, 기본 정보 섹션이 표시된다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(1); // 제주시

    await expect(detail.getCityName()).toContainText("제주시");
    await expect(detail.getNomadScore()).toBeVisible();
    // 제주시 nomadScore = 92
    await expect(page.getByText("92").first()).toBeVisible();
    await expect(detail.getInfoSection()).toBeVisible();
  });

  test("'목록으로' 링크 클릭 시 홈(/)으로 돌아간다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(1);
    await detail.getBackLink().click();
    await expect(page).toHaveURL("/");
  });

  test("상세 페이지에 좋아요·싫어요 버튼이 표시된다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(2); // 부산
    await expect(detail.getLikeButton()).toBeVisible();
    await expect(detail.getDislikeButton()).toBeVisible();
  });
});
