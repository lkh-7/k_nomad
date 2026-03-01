"use client";

import { useState } from "react";
import { City, SortType } from "@/types/city";
import CityGrid from "./CityGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FILTER_CONFIGS = [
  {
    key: "budget" as const,
    label: "예산",
    options: ["전체", "100만원 이하", "100~200만원", "200만원 이상"],
  },
  {
    key: "region" as const,
    label: "지역",
    options: ["전체", "수도권", "경상도", "전라도", "강원도", "제주도", "충청도"],
  },
  {
    key: "environment" as const,
    label: "환경",
    options: ["전체", "자연친화", "도심선호", "카페작업", "코워킹필수"],
  },
  {
    key: "season" as const,
    label: "계절",
    options: ["전체", "봄", "여름", "가을", "겨울"],
  },
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
  const [filters, setFilters] = useState({
    budget: "전체",
    region: "전체",
    environment: "전체",
    season: "전체",
  });
  const [sortBy, setSortBy] = useState<SortType>("likes");

  const setFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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
          {/* 4개 필터 드롭다운 */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {FILTER_CONFIGS.map((config) => {
              const isActive = filters[config.key] !== "전체";
              return (
                <Select
                  key={config.key}
                  value={filters[config.key]}
                  onValueChange={(v) => setFilter(config.key, v)}
                >
                  <SelectTrigger
                    className="w-36 text-sm"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(0, 201, 167, 0.15)"
                        : "rgba(255,255,255,0.06)",
                      border: isActive
                        ? "1px solid rgba(0, 201, 167, 0.4)"
                        : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? "#00c9a7" : "#f0f4ff",
                    }}
                  >
                    <SelectValue placeholder={config.label} />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: "#1a2235",
                      border: "1px solid rgba(0, 201, 167, 0.2)",
                      color: "#f0f4ff",
                    }}
                  >
                    {config.options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="text-sm cursor-pointer"
                        style={{ color: "#f0f4ff" }}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      <CityGrid cities={cities} filters={filters} sortBy={sortBy} />
    </div>
  );
}
