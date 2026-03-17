---
title: 웹 프론트엔드
description: Next.js 페이지 구조, 메인 페이지, 지도 UI, 관리자 페이지
---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js + TypeScript |
| UI | shadcn/ui + Tailwind v4 |
| 지도 | `@vis.gl/react-google-maps` |
| 배포 | Vercel |

---

## 페이지 구조

```
/                       메인 페이지
/plan/new               조건 입력 플로우
/plan/[share_token]     공개 공유 페이지 (로그인 불필요)
/my/trips               내 여행 목록
/my/trips/[id]          여행 상세 (지도 + 일정)
/admin                  관리자 (role=admin 전용)
/admin/destinations     여행지 관리
/admin/generate         계획 대량 생성
```

---

## 메인 페이지

```
[네비게이션]

어디로 여행 갈 예정이세요?
[검색창]

이번달 인기 여행지
[도쿄] [오사카] [제주]

3달 내 인기 여행지
[후쿠오카] [교토] [부산]
```

인기 여행지 집계 쿼리:

```sql
SELECT destination_city, destination_country, COUNT(*) AS trip_count
FROM trips
WHERE status = 'confirmed'
  AND start_date BETWEEN NOW() AND NOW() + INTERVAL '3 months'
GROUP BY destination_city, destination_country
ORDER BY trip_count DESC
LIMIT 6;
```

---

## 지도 UI

### 전체 지도뷰
- 모든 포인트(①②③) + 폴리라인
- `fitBounds`로 전체 일정 자동 줌 조정

### 스텝 검토 뷰

```
[다음] 클릭
  → 줌아웃 (전체 경로 보임)
  → 카메라 다음 포인트로 이동
  → 줌인
  → 하단 카드: 장소명 / 체류 시간 / 메모
  → "구글맵으로 경로 보기" 버튼
```

### 구현

```tsx
<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
  <Map>
    {spots.map((spot, i) => (
      <AdvancedMarker
        key={spot.id}
        position={{ lat: spot.lat, lng: spot.lng }}
        onClick={() => setSelected(spot)}
      >
        <div className="marker-badge">{i + 1}</div>
      </AdvancedMarker>
    ))}

    <Polyline
      path={spots.map(s => ({ lat: s.lat, lng: s.lng }))}
      strokeColor="oklch(0.65 0.18 250)"
      strokeWeight={3}
    />

    {selected && (
      <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
        <p>{selected.name} · {selected.duration_min}분</p>
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}&travelmode=transit`}>
          구글맵으로 경로 보기
        </a>
      </InfoWindow>
    )}
  </Map>
</APIProvider>
```

---

## 공유 페이지 (`/plan/[share_token]`)

- 로그인 없이 접근 가능 (읽기 전용)
- Next.js SSR로 OG 태그 생성 → 카카오 미리보기

```tsx
export async function generateMetadata({ params }) {
  const trip = await getTripByShareToken(params.share_token)
  return {
    title: trip.title,
    openGraph: { images: [trip.thumbnail_url] },
  }
}
```

---

## 관리자 페이지

### 접근 제어

```typescript
// middleware.ts
if (pathname.startsWith('/admin') && role !== 'admin') {
  return NextResponse.redirect(new URL('/', request.url))
}
```

### 계획 대량 생성

```
여행지 선택 + 조건 설정 + 생성 개수
    ↓
[생성 실행] → AI 순차 호출 → DB 저장
    ↓
진행률 표시: 3/10 완료...
```
