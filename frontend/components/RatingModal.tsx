"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { City } from "@/types/city";

interface RatingModalProps {
  city: City;
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { key: "cafe", label: "카공환경", icon: "☕" },
  { key: "internet", label: "인터넷", icon: "📶" },
  { key: "safety", label: "안전도", icon: "🔒" },
  { key: "price", label: "물가", icon: "💰" },
  { key: "nature", label: "자연환경", icon: "🌿" },
] as const;

const JOB_TAGS = [
  { label: "💻 개발자", value: "dev" },
  { label: "🎨 디자이너", value: "design" },
  { label: "✍️ 작가·번역가", value: "writer" },
  { label: "🎥 유튜버·크리에이터", value: "creator" },
  { label: "📊 마케터", value: "marketer" },
  { label: "📸 사진작가", value: "photographer" },
];

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="text-xl transition-transform hover:scale-110"
          style={{
            color:
              star <= (hovered || value) ? "#eab308" : "rgba(255,255,255,0.2)",
          }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function RatingModal({ city, open, onClose }: RatingModalProps) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [review, setReview] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const allScored = CATEGORIES.every((c) => scores[c.key] > 0);

  const toggleJob = (value: string) => {
    setSelectedJobs((prev) =>
      prev.includes(value) ? prev.filter((j) => j !== value) : [...prev, value]
    );
  };

  const handleClose = () => {
    setScores({});
    setReview("");
    setSelectedJobs([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md border"
        style={{
          backgroundColor: "#111827",
          borderColor: "rgba(0, 201, 167, 0.2)",
          color: "#f0f4ff",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-lg font-semibold"
            style={{ color: "#f0f4ff" }}
          >
            {city.name}를 평가해주세요
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* 카테고리별 별점 */}
          <div
            className="space-y-3 p-3 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#8b9bb4" }}>
                  {cat.icon} {cat.label}
                </span>
                <StarInput
                  value={scores[cat.key] || 0}
                  onChange={(v) =>
                    setScores((prev) => ({ ...prev, [cat.key]: v }))
                  }
                />
              </div>
            ))}
          </div>

          {/* 한 줄 후기 */}
          <div>
            <label
              className="block text-xs mb-1.5"
              style={{ color: "#8b9bb4" }}
            >
              한 줄 후기 (선택, 최대 200자)
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-lg text-sm resize-none outline-none focus:ring-1 transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f0f4ff",
                minHeight: "72px",
              }}
              placeholder="실제 방문/거주 경험을 간략히 남겨주세요..."
              maxLength={200}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <p className="text-right text-xs mt-1" style={{ color: "#8b9bb4" }}>
              {review.length}/200
            </p>
          </div>

          {/* 추천 직군 태그 */}
          <div>
            <p className="text-xs mb-2" style={{ color: "#8b9bb4" }}>
              추천 직군 (복수 선택)
            </p>
            <div className="flex flex-wrap gap-2">
              {JOB_TAGS.map((tag) => {
                const active = selectedJobs.includes(tag.value);
                return (
                  <button
                    key={tag.value}
                    type="button"
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: active
                        ? "rgba(99, 102, 241, 0.2)"
                        : "rgba(255,255,255,0.05)",
                      color: active ? "#6366f1" : "#8b9bb4",
                      border: active
                        ? "1px solid rgba(99, 102, 241, 0.4)"
                        : "1px solid rgba(255,255,255,0.1)",
                    }}
                    onClick={() => toggleJob(tag.value)}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 제출 버튼 */}
          <button
            type="button"
            disabled={!allScored}
            className="w-full py-3 rounded-lg font-medium text-sm transition-all"
            style={{
              backgroundColor: allScored ? "#00c9a7" : "rgba(255,255,255,0.06)",
              color: allScored ? "#0a0f1e" : "#8b9bb4",
              cursor: allScored ? "pointer" : "not-allowed",
            }}
            onClick={handleClose}
          >
            {allScored ? "✅ 평가 제출하기" : "모든 항목을 평가해주세요"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
