export type TagType = "바다" | "산/자연" | "도심" | "저렴" | "카공";

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
  rating: number; // 평균 별점 (1~5)
  scores: {
    cafe: number;     // 카공환경
    internet: number; // 인터넷
    safety: number;   // 안전도
    price: number;    // 물가
    nature: number;   // 자연환경
  };
  tags: TagType[];
  nomadScore: number; // 종합 노마드 점수
};

export type FilterType = "전체" | TagType;

export type SortType =
  | "nomadScore"
  | "budgetLow"
  | "budgetHigh"
  | "internetSpeed"
  | "likes";
