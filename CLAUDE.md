# Korea Nomad — 프로젝트 CLAUDE.md

## 프로젝트 개요
한국 디지털 노마드 도시 추천 플랫폼. 12개 도시의 생활비, 인터넷 속도, 기후 등을
비교하고 좋아요/싫어요로 투표할 수 있다.

- **메인 디렉터리:** `frontend/` (Next.js 16 App Router)
- **백엔드:** Supabase (인증 + `city_votes` 테이블)

## 기술 스택
| 항목 | 버전/설명 |
|------|-----------|
| Next.js | 16.1.6, App Router |
| React | 19 |
| TypeScript | strict mode, `@/*` 절대 경로 alias |
| Tailwind CSS | 4 (PostCSS 방식) |
| shadcn/ui | 컴포넌트 라이브러리 |
| Supabase | `@supabase/ssr`, `@supabase/supabase-js` |

## 핵심 파일 지도
```
frontend/
  lib/
    data.ts          # 12개 도시 정적 데이터 (likes/dislikes 필드는 읽기 전용)
    supabase.ts      # 브라우저 클라이언트 (createBrowserClient)
    supabase/
      server.ts      # 서버 클라이언트 (쿠키 기반)
  types/
    city.ts          # City, SortType, Budget, Environment 등 타입 정의
  components/
    CityCard.tsx     # 도시 카드 (Link 포함)
    CityGrid.tsx     # 그리드 + 클라이언트 필터링 로직
    FilterBar.tsx    # 4개 드롭다운 필터 + 정렬
    LikeButtons.tsx  # 좋아요/싫어요 토글 (Supabase UPDATE + localStorage)
  app/
    page.tsx                  # 홈 (force-dynamic, votes fetch)
    cities/[id]/page.tsx      # 도시 상세 (force-dynamic)
supabase/
  migrations/        # DB 스키마 이력 (변경 시 여기에 SQL 파일 추가)
```

## 개발 서버 & 검증 명령
```bash
# 개발 서버 실행
cd frontend && npm run dev
# 포트 3000 점유 시 3001, 3002 사용

# 코드 검증 (PR 전 필수)
cd frontend && npm run lint && npx tsc --noEmit
```

## 아키텍처 규칙
- **데이터 흐름:** 서버 컴포넌트에서 Supabase fetch → 클라이언트 컴포넌트에 props 전달
- **votes 전달 체인:** `page.tsx` → `CityGrid` → `CityCard` → `LikeButtons` (votesMap prop)
- **DB 변경:** `supabase/migrations/` 에 SQL 파일 추가 후 적용
- **Supabase MCP read-only 상황:** Management API `curl` 명령으로 대체
- **도시 정적 데이터 위치 (MVP 임시 결정):** 12개 도시의 메타 정보는 MVP 단계이므로
  `lib/data.ts`(코드)에서 임시로 관리한다. Supabase DB로의 이전은 도시 추가·수정
  빈도가 높아지거나 관리자 편집 UI가 필요해지는 시점에 DB 마이그레이션을 별도로
  검토한다. 별도 지시가 있을 때까지 DB로 이전하지 말 것.

## 스타일 가이드
- 메인 색상: `#00c9a7` (초록 강조), `#111827` (카드 배경), `#f0f4ff` (텍스트)
- Tailwind 클래스와 inline style 혼합 사용 패턴 유지

## 커스텀 커맨드
- `/feature-breakdown` — 이슈를 단계별 Execution Plan으로 분해
- `/create-issue` — GitHub 이슈 생성 (gh CLI)
- `/resolve-issue` — 이슈 기반 실행 계획 작성

## 주의사항 (DO NOT)
- `lib/data.ts`의 `likes`/`dislikes` 값 **수정 금지** — DB 연동 후 읽기 전용
- shadcn 컴포넌트 직접 작성 금지 → `npx shadcn add <컴포넌트명>` 사용
- Hydration 오류가 나타나도 **브라우저 확장** 때문일 수 있음 (WXT, 네이버 사전) — 코드 문제로 단정 금지
- `force-dynamic` 제거 금지 — votes가 정적 캐시되어 실시간 반영 안 됨
