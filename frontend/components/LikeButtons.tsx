"use client";

import { useState } from "react";

interface LikeButtonsProps {
  likes: number;
  dislikes: number;
  rating: number;
  onRatingClick: () => void;
}

export default function LikeButtons({
  likes,
  dislikes,
  rating,
  onRatingClick,
}: LikeButtonsProps) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const [voted, setVoted] = useState<"like" | "dislike" | null>(null);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (voted === "like") return;
    setLocalLikes((prev) => prev + 1);
    if (voted === "dislike") setLocalDislikes((prev) => prev - 1);
    setVoted("like");
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (voted === "dislike") return;
    setLocalDislikes((prev) => prev + 1);
    if (voted === "like") setLocalLikes((prev) => prev - 1);
    setVoted("dislike");
  };

  return (
    <div
      className="flex items-center justify-between px-3 py-2 rounded-b-xl"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all"
          style={{
            backgroundColor:
              voted === "like"
                ? "rgba(0, 201, 167, 0.15)"
                : "rgba(255,255,255,0.05)",
            color: voted === "like" ? "#00c9a7" : "#8b9bb4",
            border:
              voted === "like"
                ? "1px solid rgba(0, 201, 167, 0.3)"
                : "1px solid transparent",
          }}
        >
          👍{" "}
          <span style={{ fontFamily: "var(--font-space-mono)" }}>
            {localLikes.toLocaleString()}
          </span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all"
          style={{
            backgroundColor:
              voted === "dislike"
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(255,255,255,0.05)",
            color: voted === "dislike" ? "#ef4444" : "#8b9bb4",
            border:
              voted === "dislike"
                ? "1px solid rgba(239, 68, 68, 0.3)"
                : "1px solid transparent",
          }}
        >
          👎{" "}
          <span style={{ fontFamily: "var(--font-space-mono)" }}>
            {localDislikes}
          </span>
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRatingClick();
        }}
        className="flex items-center gap-1 text-xs transition-all hover:opacity-80"
        style={{ color: "#eab308" }}
      >
        <span>★</span>
        <span style={{ fontFamily: "var(--font-space-mono)" }}>
          {rating.toFixed(1)}
        </span>
        <span style={{ color: "#8b9bb4" }}>평가하기</span>
      </button>
    </div>
  );
}
