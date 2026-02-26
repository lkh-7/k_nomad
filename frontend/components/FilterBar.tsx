"use client";

import { useState } from "react";
import { FilterType, SortType } from "@/types/city";
import { City } from "@/types/city";
import CityGrid from "./CityGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "전체", value: "전체" },
  { label: "🌊 바다", value: "바다" },
  { label: "⛰️ 산/자연", value: "산/자연" },
  { label: "🏙️ 도심", value: "도심" },
  { label: "💰 저렴", value: "저렴" },
  { label: "☕ 카공", value: "카공" },
];

const SORTS: { label: string; value: SortType }[] = [
  { label: "노마드 점수순", value: "nomadScore" },
  { label: "생활비 낮은순", value: "budgetLow" },
  { label: "생활비 높은순", value: "budgetHigh" },
  { label: "인터넷 속도순", value: "internetSpeed" },
  { label: "좋아요순", value: "likes" },
];

interface FilterBarProps {
  cities: City[];
}

export default function FilterBar({ cities }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");
  const [sortBy, setSortBy] = useState<SortType>("nomadScore");

  return (
    <div className="space-y-4">
      {/* 필터 + 정렬 바 */}
      <div
        className="sticky top-[68px] z-30 py-3 px-4 -mx-4"
        style={{
          backgroundColor: "rgba(10, 15, 30, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto max-w-screen-xl flex items-center gap-3 flex-wrap">
          {/* 필터 칩 */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {FILTERS.map((f) => {
              const active = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: active
                      ? "#00c9a7"
                      : "rgba(255,255,255,0.06)",
                    color: active ? "#0a0f1e" : "#8b9bb4",
                    border: active
                      ? "1px solid #00c9a7"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* 정렬 드롭다운 */}
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortType)}
          >
            <SelectTrigger
              className="w-44 text-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f0f4ff",
              }}
            >
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: "#1a2235",
                border: "1px solid rgba(0, 201, 167, 0.2)",
                color: "#f0f4ff",
              }}
            >
              {SORTS.map((s) => (
                <SelectItem
                  key={s.value}
                  value={s.value}
                  className="text-sm cursor-pointer"
                  style={{ color: "#f0f4ff" }}
                >
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 도시 그리드 */}
      <CityGrid cities={cities} activeFilter={activeFilter} sortBy={sortBy} />
    </div>
  );
}
