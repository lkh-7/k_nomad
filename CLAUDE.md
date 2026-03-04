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

## 테스트 구조

### 유닛 테스트 (Vitest + React Testing Library)
```
frontend/
  __tests__/
    __fixtures__/
      cities.ts       # CITIES(전체) + MOCK_CITIES(5개) 픽스처
      votesMap.ts     # MOCK / EMPTY / PARTIAL votesMap
    __mocks__/
      next-image.tsx  # next/image 전역 mock (vitest.config.ts alias)
      next-link.tsx   # next/link 전역 mock (vitest.config.ts alias)
    lib/
      data.test.ts         # 도시 데이터 무결성 (14개)
      cityFilters.test.ts  # filterCities / sortCities 순수 함수 (33개)
    components/
      CityCard.test.tsx    # 렌더링, Top3 배지, Link href (10개)
      CityGrid.test.tsx    # 필터 적용, 결과 없음 메시지 (6개)
      LikeButtons.test.tsx # 투표 토글, localStorage, Supabase mock (23개)
      FilterBar.test.tsx   # 드롭다운 렌더링, 초기 상태 (6개)
```
- 실행: `cd frontend && npm test`
- `lib/cityFilters.ts` — CityGrid에서 추출한 순수 함수 (필터링/정렬), 테스트 전용

### E2E 테스트 (Playwright)
```
frontend/
  playwright.config.ts   # baseURL: localhost:3000, webServer: npm run dev
  e2e/
    pages/               # Page Object Models
      home.page.ts       # 홈 페이지 Locator/Action
      city-detail.page.ts# 상세 페이지 Locator/Action
    home.spec.ts         # 홈 페이지 로드, 카드 12개 표시
    filters.spec.ts      # 필터/정렬 UI 상호작용
    like-buttons.spec.ts # 투표 클릭, localStorage 새로고침 복원
    city-detail.spec.ts  # 카드 클릭 → 상세 이동, 목록으로 복귀
```
- 실행: `cd frontend && npm run test:e2e`
- UI 디버깅: `npm run test:e2e:ui`
- 브라우저: Chromium 단일 (MVP)
- dev 서버 자동 실행 (이미 실행 중이면 재사용)

### 역할 분담 원칙
- **유닛 테스트**: 필터 로직 정확성, 투표 상태 전환, 컴포넌트 렌더링
- **E2E 테스트**: 실제 브라우저 클릭 흐름, 페이지 이동, localStorage 새로고침 시나리오

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
