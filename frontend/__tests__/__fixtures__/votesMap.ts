export type VotesMap = Record<number, { likes: number; dislikes: number }>;

// 5개 MOCK_CITIES 전체에 투표 데이터 있음 (ids: 1, 4, 3, 2, 12)
export const MOCK_VOTES_MAP: VotesMap = {
  1: { likes: 500, dislikes: 30 },  // 제주시 — data.ts의 312보다 높은 값 (Supabase 덮어쓰기 케이스)
  4: { likes: 200, dislikes: 50 },  // 서울
  3: { likes: 150, dislikes: 10 },  // 강릉
  2: { likes: 300, dislikes: 25 },  // 부산
  12: { likes: 80, dislikes: 5 },   // 춘천
};

// 빈 투표 맵 — city.likes 폴백 로직 테스트용
export const EMPTY_VOTES_MAP: VotesMap = {};

// 일부 도시만 투표 있음 — 혼합 폴백 테스트용
export const PARTIAL_VOTES_MAP: VotesMap = {
  1: { likes: 500, dislikes: 30 }, // 제주시만 있음
};
