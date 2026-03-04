"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface LikeButtonsProps {
  cityId: number;
  likes: number;
  dislikes: number;
}

export default function LikeButtons({ cityId, likes, dislikes }: LikeButtonsProps) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const [voted, setVoted] = useState<"like" | "dislike" | null>(null);

  // 클라이언트 마운트 후 localStorage에서 이전 투표 상태 복원
  useEffect(() => {
    const stored = localStorage.getItem(`voted_${cityId}`);
    if (stored === "like" || stored === "dislike") {
      setVoted(stored);
    }
  }, [cityId]);

  const syncToSupabase = async (newLikes: number, newDislikes: number) => {
    const supabase = createClient();
    await supabase
      .from("city_votes")
      .update({ likes: newLikes, dislikes: newDislikes })
      .eq("city_id", cityId);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (voted === "like") {
      // 좋아요 취소
      const newLikes = localLikes - 1;
      setLocalLikes(newLikes);
      setVoted(null);
      localStorage.removeItem(`voted_${cityId}`);
      syncToSupabase(newLikes, localDislikes);
      return;
    }

    const newLikes = localLikes + 1;
    const newDislikes = voted === "dislike" ? localDislikes - 1 : localDislikes;
    setLocalLikes(newLikes);
    if (voted === "dislike") setLocalDislikes(newDislikes);
    setVoted("like");
    localStorage.setItem(`voted_${cityId}`, "like");
    syncToSupabase(newLikes, newDislikes);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (voted === "dislike") {
      // 싫어요 취소
      const newDislikes = localDislikes - 1;
      setLocalDislikes(newDislikes);
      setVoted(null);
      localStorage.removeItem(`voted_${cityId}`);
      syncToSupabase(localLikes, newDislikes);
      return;
    }

    const newDislikes = localDislikes + 1;
    const newLikes = voted === "like" ? localLikes - 1 : localLikes;
    setLocalDislikes(newDislikes);
    if (voted === "like") setLocalLikes(newLikes);
    setVoted("dislike");
    localStorage.setItem(`voted_${cityId}`, "dislike");
    syncToSupabase(newLikes, newDislikes);
  };

  return (
    <div
      className="flex items-center justify-between px-3 py-2 rounded-b-xl"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
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
        <span style={{ fontFamily: "var(--font-space-mono)" }}>
          {localDislikes}
        </span>{" "}
        👎
      </button>
    </div>
  );
}
