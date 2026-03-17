---
title: 인프라 & 배포
description: 기술 스택, 외부 API, 배포 구조, 환경변수, 비용
---

## 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| Web Frontend | Next.js + TypeScript | SSR, OG 태그, API Routes |
| UI 라이브러리 | shadcn/ui + Tailwind v4 | OKLCH 색 공간 |
| Database | Supabase | PostgreSQL + PostGIS + Auth + RLS |
| 지도 (Web) | `@vis.gl/react-google-maps` | - |
| 지도 (App) | `google_maps_flutter` | 동일 API 키 공유 |
| 모바일 앱 | Flutter | - |
| 배포 | Vercel | GitHub 연동 자동 배포 |

## 외부 API

| 용도 | API | 비고 |
|------|-----|------|
| AI 일정 생성 | Claude API or OpenAI | 2단계 호출 |
| 장소 데이터 (글로벌) | Google Places API | 월 $200 무료 크레딧 |
| 장소 데이터 (한국) | Naver Local Search API | 무료, 일 25,000건 |
| 항공권 가격 | Amadeus API | 무료 샌드박스 |
| 카카오 공유 | Kakao SDK | Flutter + Web |
| 결제 (Phase 3) | Toss Payments | 한국 카드 + 간편결제 |

---

## 배포 구조

```
코드 push (GitHub main)
    ↓
Vercel 자동 감지 → Next.js 빌드
  ├── 정적 파일 → CDN 엣지 배포
  └── API Routes → Serverless Function
    ↓
Supabase (별도 관리)
  ├── PostgreSQL + PostGIS
  ├── Auth
  └── Storage (이미지)
```

### Next.js 프로젝트 구조

```
/app
  /page.tsx                  메인 페이지
  /plan/[share_token]/
    page.tsx                 공유 페이지 (SSR)
  /api/
    /trips/route.ts          여행 계획 CRUD
    /ai/generate/route.ts    AI 일정 생성
    /places/route.ts         Places API 캐시 레이어
    /admin/seed/route.ts     관리자 시딩
```

### AI 응답 시간 대응

Vercel Serverless 기본 제한 10초 → **Streaming Response**로 해결:

```typescript
export async function POST(req: Request) {
  const stream = await openai.chat.completions.create({ stream: true })
  return new Response(stream.toReadableStream())
}
```

---

## 환경변수

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=

# AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Amadeus
AMADEUS_API_KEY=
AMADEUS_API_SECRET=

# Kakao
NEXT_PUBLIC_KAKAO_JS_KEY=

# Naver
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
```

:::caution
`NEXT_PUBLIC_` 접두사가 없는 키는 서버에서만 사용. 절대 클라이언트에 노출 금지.
:::

---

## 비용 예상 (MVP 초기)

| 항목 | 비용 | 비고 |
|------|------|------|
| Vercel | 무료 | Hobby 플랜 |
| Supabase | 무료 | Free 플랜 500MB |
| Google Maps | 무료 | 월 $200 크레딧 이내 |
| Amadeus | 무료 | 테스트 샌드박스 |
| Claude/OpenAI | 사용량 과금 | 초기엔 미미한 수준 |
| Naver API | 무료 | 일 25,000건 |

초기 MVP는 사실상 **무료**로 운영 가능.

업그레이드 순서: Vercel Pro ($20/월) → Supabase Pro ($25/월)
