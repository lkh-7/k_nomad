import { City, SortType } from "@/types/city";

export type FiltersState = {
  budget: string;
  region: string;
  environment: string;
  season: string;
};

export type VotesMap = Record<number, { likes: number; dislikes: number }>;

export function filterCities(cities: City[], filters: FiltersState): City[] {
  let result = [...cities];
  if (filters.budget !== "전체") result = result.filter((c) => c.budget === filters.budget);
  if (filters.region !== "전체") result = result.filter((c) => c.regionCategory === filters.region);
  if (filters.environment !== "전체") result = result.filter((c) => c.environment === filters.environment);
  if (filters.season !== "전체") result = result.filter((c) => c.bestSeason === filters.season);
  return result;
}

export function sortCities(cities: City[], sortBy: SortType, votesMap: VotesMap): City[] {
  const result = [...cities];
  switch (sortBy) {
    case "nomadScore":
      result.sort((a, b) => b.nomadScore - a.nomadScore);
      break;
    case "budgetLow":
      result.sort((a, b) => a.monthlyBudget - b.monthlyBudget);
      break;
    case "budgetHigh":
      result.sort((a, b) => b.monthlyBudget - a.monthlyBudget);
      break;
    case "internetSpeed":
      result.sort((a, b) => b.internetSpeed - a.internetSpeed);
      break;
    case "likes":
      result.sort((a, b) => {
        const aLikes = votesMap[a.id]?.likes ?? a.likes;
        const bLikes = votesMap[b.id]?.likes ?? b.likes;
        return bLikes - aLikes;
      });
      break;
  }
  return result;
}
