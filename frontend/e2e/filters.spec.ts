import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test.describe("필터 & 정렬", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("예산 '100만원 이하' 필터 적용 시 7개 카드만 표시된다", async ({ page }) => {
    const homePage = new HomePage(page);
    // 예산 필터 (0번 combobox) 열기
    await homePage.getFilterTrigger(0).click();
    await page.getByRole("option", { name: "100만원 이하" }).click();
    // 강릉·속초·여수·전주·경주·통영·춘천 = 7개
    await expect(homePage.getCityCards()).toHaveCount(7);
  });

  test("지역 '제주도' 필터 적용 시 제주시 1개 카드만 표시된다", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.getFilterTrigger(1).click(); // 지역 필터
    await page.getByRole("option", { name: "제주도" }).click();
    await expect(homePage.getCityCards()).toHaveCount(1);
    await expect(homePage.getCityCards().first()).toContainText("제주시");
  });

  test("AND 복합 필터: 강원도 + 자연친화 → 2개 카드(속초·춘천)", async ({ page }) => {
    const homePage = new HomePage(page);
    // 지역=강원도
    await homePage.getFilterTrigger(1).click();
    await page.getByRole("option", { name: "강원도" }).click();
    // 환경=자연친화
    await homePage.getFilterTrigger(2).click();
    await page.getByRole("option", { name: "자연친화" }).click();
    // 강릉은 카페작업이므로 제외, 속초·춘천 = 2개
    await expect(homePage.getCityCards()).toHaveCount(2);
  });

  test("결과 없는 필터 조합 시 안내 메시지가 표시된다", async ({ page }) => {
    const homePage = new HomePage(page);
    // 제주도(제주시) + 코워킹필수 → 제주시는 자연친화이므로 0개
    await homePage.getFilterTrigger(1).click();
    await page.getByRole("option", { name: "제주도" }).click();
    await homePage.getFilterTrigger(2).click();
    await page.getByRole("option", { name: "코워킹필수" }).click();
    await expect(homePage.getEmptyMessage()).toBeVisible();
    await expect(page.getByText("다른 필터를 선택해보세요")).toBeVisible();
  });

  test("정렬 '노마드 점수순' 선택 시 첫 번째 카드가 제주시(92점)다", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.getSortTrigger().click();
    await page.getByRole("option", { name: "노마드 점수순" }).click();
    // 제주시 nomadScore 92 → 1위
    await expect(homePage.getCityCards().first()).toContainText("제주시");
  });

  test("정렬 '생활비 낮은순' 선택 시 첫 번째 카드가 춘천(55만원)다", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.getSortTrigger().click();
    await page.getByRole("option", { name: "생활비 낮은순" }).click();
    // 춘천 monthlyBudget 55 → 최저
    await expect(homePage.getCityCards().first()).toContainText("춘천");
  });
});
