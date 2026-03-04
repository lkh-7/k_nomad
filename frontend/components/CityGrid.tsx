"use client";

import { useMemo } from "react";
import { City, SortType } from "@/types/city";
import CityCard from "./CityCard";
import { filterCities, sortCities } from "@/lib/cityFilters";

interface CityGridProps {
  cities: City[];
  votesMap: Record<number, { likes: number; dislikes: number }>;
  filters: {
    budget: string;
    region: string;
    environment: string;
    season: string;
  };
  sortBy: SortType;
}

export default function CityGrid({ cities, votesMap, filters, sortBy }: CityGridProps) {
  const filtered = useMemo(() => {
    const filteredCities = filterCities(cities, filters);
    return sortCities(filteredCities, sortBy, votesMap);
  }, [cities, votesMap, filters, sortBy]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl mb-4">🏙️</p>
        <p className="text-base font-medium" style={{ color: "#8b9bb4" }}>
          조건에 맞는 도시가 없습니다
        </p>
        <p className="text-sm mt-1" style={{ color: "#4a5a70" }}>
          다른 필터를 선택해보세요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((city, idx) => (
        <CityCard
          key={city.id}
          city={city}
          animationDelay={idx * 50}
          votes={votesMap[city.id] ?? { likes: city.likes, dislikes: city.dislikes }}
        />
      ))}
    </div>
  );
}
