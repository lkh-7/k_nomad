import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import LikeButtons from "@/components/LikeButtons";

// Supabase mock — chain: createClient().from().update().eq()
const mockEq = vi.fn().mockResolvedValue({ error: null });
const mockUpdate = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({ update: mockUpdate }));

vi.mock("@/lib/supabase", () => ({
  createClient: vi.fn(() => ({ from: mockFrom })),
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

// 버튼 헬퍼
const getLikeBtn = () => screen.getAllByRole("button")[0];
const getDislikeBtn = () => screen.getAllByRole("button")[1];

// ─── 초기 상태 ────────────────────────────────────────────────────────────

describe("LikeButtons — 초기 상태", () => {
  it("props의 likes 값이 표시된다", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("props의 dislikes 값이 표시된다", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});

// ─── localStorage 복원 ────────────────────────────────────────────────────

describe("LikeButtons — localStorage 복원", () => {
  it('localStorage "like" → 마운트 후 재클릭 시 취소 동작 (likes -1)', async () => {
    localStorage.setItem("voted_1", "like");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    // voted="like" 상태에서 재클릭 → 취소 → 100-1=99
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it('localStorage "dislike" → 마운트 후 재클릭 시 취소 동작 (dislikes -1)', async () => {
    localStorage.setItem("voted_1", "dislike");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getDislikeBtn());
    // voted="dislike" 상태에서 재클릭 → 취소 → 20-1=19
    expect(screen.getByText("19")).toBeInTheDocument();
  });

  it("localStorage에 유효하지 않은 값 → 미투표 상태 유지", async () => {
    localStorage.setItem("voted_1", "invalid");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    // 미투표 상태이므로 좋아요 클릭 → 100+1=101
    expect(screen.getByText("101")).toBeInTheDocument();
  });
});

// ─── 좋아요 클릭 ──────────────────────────────────────────────────────────

describe("LikeButtons — 좋아요 클릭", () => {
  it("미투표 상태에서 클릭 → likes +1", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    fireEvent.click(getLikeBtn());
    expect(screen.getByText("101")).toBeInTheDocument();
  });

  it("미투표 상태에서 클릭 → localStorage에 'like' 저장", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    fireEvent.click(getLikeBtn());
    expect(localStorage.getItem("voted_1")).toBe("like");
  });

  it("미투표 상태에서 클릭 → Supabase update 호출", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    fireEvent.click(getLikeBtn());
    expect(mockFrom).toHaveBeenCalledWith("city_votes");
    expect(mockUpdate).toHaveBeenCalledWith({ likes: 101, dislikes: 20 });
    expect(mockEq).toHaveBeenCalledWith("city_id", 1);
  });
});

// ─── 좋아요 취소 ──────────────────────────────────────────────────────────

describe("LikeButtons — 좋아요 취소 (재클릭)", () => {
  it("liked 상태에서 재클릭 → likes -1", async () => {
    localStorage.setItem("voted_1", "like");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("liked 상태에서 재클릭 → localStorage 항목 제거", async () => {
    localStorage.setItem("voted_1", "like");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    expect(localStorage.getItem("voted_1")).toBeNull();
  });

  it("liked 상태에서 재클릭 → Supabase update(likes-1) 호출", async () => {
    localStorage.setItem("voted_1", "like");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    expect(mockUpdate).toHaveBeenCalledWith({ likes: 99, dislikes: 20 });
  });
});

// ─── 싫어요 클릭 ──────────────────────────────────────────────────────────

describe("LikeButtons — 싫어요 클릭", () => {
  it("미투표 상태에서 클릭 → dislikes +1", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    fireEvent.click(getDislikeBtn());
    expect(screen.getByText("21")).toBeInTheDocument();
  });

  it("미투표 상태에서 클릭 → localStorage에 'dislike' 저장", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    fireEvent.click(getDislikeBtn());
    expect(localStorage.getItem("voted_1")).toBe("dislike");
  });

  it("미투표 상태에서 클릭 → Supabase update 호출", () => {
    render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    fireEvent.click(getDislikeBtn());
    expect(mockFrom).toHaveBeenCalledWith("city_votes");
    expect(mockUpdate).toHaveBeenCalledWith({ likes: 100, dislikes: 21 });
    expect(mockEq).toHaveBeenCalledWith("city_id", 1);
  });
});

// ─── 싫어요 취소 ──────────────────────────────────────────────────────────

describe("LikeButtons — 싫어요 취소 (재클릭)", () => {
  it("disliked 상태에서 재클릭 → dislikes -1", async () => {
    localStorage.setItem("voted_1", "dislike");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getDislikeBtn());
    expect(screen.getByText("19")).toBeInTheDocument();
  });

  it("disliked 상태에서 재클릭 → localStorage 항목 제거", async () => {
    localStorage.setItem("voted_1", "dislike");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getDislikeBtn());
    expect(localStorage.getItem("voted_1")).toBeNull();
  });

  it("disliked 상태에서 재클릭 → Supabase update(dislikes-1) 호출", async () => {
    localStorage.setItem("voted_1", "dislike");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getDislikeBtn());
    expect(mockUpdate).toHaveBeenCalledWith({ likes: 100, dislikes: 19 });
  });
});

// ─── 투표 전환 ────────────────────────────────────────────────────────────

describe("LikeButtons — 투표 전환", () => {
  it("좋아요 → 싫어요 전환: likes -1, dislikes +1", async () => {
    localStorage.setItem("voted_1", "like");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getDislikeBtn());
    expect(screen.getByText("99")).toBeInTheDocument();   // likes: 100-1
    expect(screen.getByText("21")).toBeInTheDocument();   // dislikes: 20+1
  });

  it("좋아요 → 싫어요 전환: Supabase update(likes-1, dislikes+1) 호출", async () => {
    localStorage.setItem("voted_1", "like");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getDislikeBtn());
    expect(mockUpdate).toHaveBeenCalledWith({ likes: 99, dislikes: 21 });
  });

  it("싫어요 → 좋아요 전환: dislikes -1, likes +1", async () => {
    localStorage.setItem("voted_1", "dislike");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    expect(screen.getByText("101")).toBeInTheDocument();  // likes: 100+1
    expect(screen.getByText("19")).toBeInTheDocument();   // dislikes: 20-1
  });

  it("싫어요 → 좋아요 전환: Supabase update(likes+1, dislikes-1) 호출", async () => {
    localStorage.setItem("voted_1", "dislike");
    await act(async () => {
      render(<LikeButtons cityId={1} likes={100} dislikes={20} />);
    });
    fireEvent.click(getLikeBtn());
    expect(mockUpdate).toHaveBeenCalledWith({ likes: 101, dislikes: 19 });
  });
});

// ─── 이벤트 전파 차단 ─────────────────────────────────────────────────────

describe("LikeButtons — 이벤트 전파 차단", () => {
  it("좋아요 클릭 시 부모 onClick이 호출되지 않는다", () => {
    const parentClick = vi.fn();
    render(
      <div onClick={parentClick}>
        <LikeButtons cityId={1} likes={100} dislikes={20} />
      </div>
    );
    fireEvent.click(getLikeBtn());
    expect(parentClick).not.toHaveBeenCalled();
  });

  it("싫어요 클릭 시 부모 onClick이 호출되지 않는다", () => {
    const parentClick = vi.fn();
    render(
      <div onClick={parentClick}>
        <LikeButtons cityId={1} likes={100} dislikes={20} />
      </div>
    );
    fireEvent.click(getDislikeBtn());
    expect(parentClick).not.toHaveBeenCalled();
  });
});
