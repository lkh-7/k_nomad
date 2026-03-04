import { test, expect, Locator } from "@playwright/test";
import { CityDetailPage } from "./pages/city-detail.page";

// 버튼 텍스트에서 숫자만 추출 (toLocaleString 콤마 포함 대응)
async function getCount(btn: Locator): Promise<number> {
  const text = await btn.textContent();
  return parseInt(text!.replace(/[^\d]/g, ""));
}

test.describe("좋아요/싫어요 버튼", () => {
  // 각 테스트마다 localStorage 초기화
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("좋아요 클릭 시 카운트가 1 증가한다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(1); // 제주시
    const btn = detail.getLikeButton();
    const before = await getCount(btn);
    await btn.click();
    await expect(btn).toContainText(String(before + 1));
  });

  test("좋아요 재클릭 시 취소되어 카운트가 원래대로 돌아온다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(2); // 부산
    const btn = detail.getLikeButton();
    const before = await getCount(btn);
    await btn.click(); // +1
    await btn.click(); // 취소 → 원복
    await expect(btn).toContainText(String(before));
  });

  test("싫어요 클릭 시 카운트가 1 증가한다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(3); // 강릉
    const btn = detail.getDislikeButton();
    const before = await getCount(btn);
    await btn.click();
    await expect(btn).toContainText(String(before + 1));
  });

  test("싫어요 재클릭 시 취소되어 카운트가 원래대로 돌아온다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(5); // 속초
    const btn = detail.getDislikeButton();
    const before = await getCount(btn);
    await btn.click(); // +1
    await btn.click(); // 취소 → 원복
    await expect(btn).toContainText(String(before));
  });

  test("좋아요 후 싫어요 클릭 시 좋아요 -1, 싫어요 +1로 전환된다", async ({ page }) => {
    const detail = new CityDetailPage(page);
    await detail.goto(6); // 여수
    const likeBtn = detail.getLikeButton();
    const dislikeBtn = detail.getDislikeButton();
    const beforeLikes = await getCount(likeBtn);
    const beforeDislikes = await getCount(dislikeBtn);

    await likeBtn.click(); // 좋아요 +1
    await dislikeBtn.click(); // 싫어요로 전환: 좋아요 -1, 싫어요 +1

    await expect(likeBtn).toContainText(String(beforeLikes));
    await expect(dislikeBtn).toContainText(String(beforeDislikes + 1));
  });

  test("새로고침 후 이전 좋아요 투표 상태가 복원된다", async ({ page }) => {
    // localStorage에 "좋아요 완료" 상태를 사전 설정
    await page.goto("/cities/9"); // 통영
    await page.evaluate(() => localStorage.setItem("voted_9", "like"));
    await page.reload();

    const btn = detail(page).getLikeButton();
    const countBefore = await getCount(btn);

    // 이미 liked 상태이므로 클릭 = 취소 → -1
    await btn.click();
    await expect(btn).toContainText(String(countBefore - 1));
  });
});

// 인라인 헬퍼
function detail(page: import("@playwright/test").Page) {
  return new CityDetailPage(page);
}
