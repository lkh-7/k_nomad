"use client";

import { useMemo } from "react";
import { City, FilterType, SortType, TagType } from "@/types/city";
import CityCard from "./CityCard";

interface CityGridProps {
  cities: City[];
  activeFilter: FilterType;
  sortBy: SortType;
}

export default function CityGrid({ cities, activeFilter, sortBy }: CityGridProps) {
  const filtered = useMemo(() => {
    let result = [...cities];

    // 필터링
    if (activeFilter !== "전체") {
      result = result.filter((c) => c.tags.includes(activeFilter as TagType));
    }

    // 정렬
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
        result.sort((a, b) => b.likes - a.likes);
        break;
    }

    return result;
  }, [cities, activeFilter, sortBy]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl mb-4">🏙️</p>
        <p className="text-base font-medium" style={{ color: "#8b9bb4" }}>
          해당 필터에 맞는 도시가 없습니다
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
        />
      ))}
    </div>
  );
}
