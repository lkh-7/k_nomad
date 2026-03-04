-- city_votes: 도시별 좋아요/싫어요 카운트 테이블
-- 익명 투표, 중복 방지는 클라이언트 localStorage로 처리

CREATE TABLE city_votes (
  city_id   INTEGER PRIMARY KEY,
  likes     INTEGER NOT NULL DEFAULT 0,
  dislikes  INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE city_votes ENABLE ROW LEVEL SECURITY;

-- 전체 공개 읽기
CREATE POLICY "read_all"
  ON city_votes FOR SELECT
  USING (true);

-- 전체 공개 업데이트 (익명 투표)
CREATE POLICY "update_all"
  ON city_votes FOR UPDATE
  USING (true);

-- 초기 시드 데이터 (data.ts 기준값)
INSERT INTO city_votes (city_id, likes, dislikes) VALUES
  (1,  312, 24),  -- 제주시
  (2,  287, 31),  -- 부산
  (3,  201, 18),  -- 강릉
  (4,  445, 89),  -- 서울
  (5,  156, 12),  -- 속초
  (6,  178, 14),  -- 여수
  (7,  134,  9),  -- 전주
  (8,  112,  8),  -- 경주
  (9,   98,  7),  -- 통영
  (10,  87, 11),  -- 광주
  (11,  76,  9),  -- 대전
  (12,  65,  5)   -- 춘천
ON CONFLICT (city_id) DO NOTHING;
