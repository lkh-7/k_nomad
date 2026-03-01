export type TagType = "바다" | "산/자연" | "도심" | "저렴" | "카공";

export type Budget = "100만원 이하" | "100~200만원" | "200만원 이상";
export type RegionCategory = "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹필수";
export type BestSeason = "봄" | "여름" | "가을" | "겨울";

export type City = {
  id: number;
  rank: number;
  name: string;
  region: string;
  image: string;
  internetSpeed: number; // Mbps
  monthlyBudget: number; // 만원 단위
  weather: { emoji: string; temp: number };
  likes: number;
  dislikes: number;
  scores: {
    cafe: number;     // 카공환경
    internet: number; // 인터넷
    safety: number;   // 안전도
    price: number;    // 물가
    nature: number;   // 자연환경
  };
  tags: TagType[];
  nomadScore: number; // 종합 노마드 점수
  budget: Budget;
  regionCategory: RegionCategory;
  environment: Environment;
  bestSeason: BestSeason;
};

export type FilterType = "전체" | TagType;

export type SortType =
  | "nomadScore"
  | "budgetLow"
  | "budgetHigh"
  | "internetSpeed"
  | "likes";
