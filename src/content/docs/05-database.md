---
title: 데이터베이스
description: DB 스키마 전체, 캐싱 전략, PostGIS 활용
---

## 개요

- **DB:** Supabase (PostgreSQL + PostGIS + RLS)
- **PostGIS:** 좌표 저장 및 반경 검색, 거리 계산
- **RLS:** 멤버 외 접근 차단, 관리자 권한 제어

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

---

## 스키마

```sql
-- Supabase Auth 기본 제공
profiles
  id              uuid   (FK → auth.users)
  nickname        text
  role            text   -- 'user' / 'admin'
  created_at

-- 여행지 마스터
destinations
  id              uuid
  city            text
  country         text
  thumbnail_url   text
  description     text
  is_featured     boolean
  created_at

-- AI 생성 후보 계획 (선택 전 3~4개)
trip_candidates
  id                  uuid
  user_id             uuid   (FK → profiles, nullable)
  destination_city    text
  destination_country text
  start_date          date
  end_date            date
  party_size          int
  party_type          text
  budget_total        int
  travel_styles       text[]
  user_prompt         text
  keyword             text
  summary             text
  key_spots           text[]
  raw_json            jsonb
  is_selected         boolean
  created_by_admin    boolean
  created_at

-- 최종 선택된 여행 계획
trips
  id                  uuid
  user_id             uuid   (FK → profiles)
  candidate_id        uuid   (FK → trip_candidates)
  title               text
  destination_city    text
  destination_country text
  start_date          date
  end_date            date
  party_size          int
  party_type          text
  budget_total        int
  travel_styles       text[]
  departure_city      text
  transport_mode      text
  accommodation_type  text
  intensity           text
  user_prompt         text
  share_token         uuid   (unique)
  is_public           boolean
  status              text   -- draft / confirmed
  created_at
  updated_at

-- 예산 항목별
budget_breakdown
  id          uuid
  trip_id     uuid  (FK → trips)
  category    text  -- flight / accommodation / food / activities / other
  amount      int

-- 일차
itinerary_days
  id          uuid
  trip_id     uuid  (FK → trips)
  day_number  int
  date        date

-- 장소
spots
  id              uuid
  day_id          uuid   (FK → itinerary_days)
  order_index     int
  name            text
  address         text
  location        geometry(Point, 4326)
  place_id        text   -- Google Places ID
  category        text
  duration_min    int
  estimated_cost  int
  notes           text

-- 여행 멤버
trip_members
  id          uuid
  trip_id     uuid  (FK → trips)
  user_id     uuid  (FK → profiles)
  role        text  -- owner / viewer
  joined_at

-- 초대 코드
trip_invitations
  id            uuid
  trip_id       uuid  (FK → trips)
  invite_code   text  (unique)
  created_by    uuid  (FK → profiles)
  expires_at    timestamptz
  max_uses      int
  used_count    int

-- Google Places 캐시 (30일 TTL)
places_cache
  id            uuid
  place_id      text  (unique)
  search_query  text
  name          text
  address       text
  location      geometry(Point, 4326)
  category      text
  rating        float
  photo_url     text
  raw_json      jsonb
  cached_at     timestamptz

-- 항공권 가격 캐시 (6시간 TTL)
flight_price_cache
  id            uuid
  origin        text
  destination   text
  depart_date   date
  price_min     int
  currency      text
  cached_at     timestamptz
```

---

## 캐싱 전략 (Look-aside Cache)

```
조회 요청
  ↓
DB 확인 → TTL 유효 → 즉시 반환 (Cache Hit, 비용 $0)
  ↓ Cache Miss
외부 API 호출 → DB 저장 → 반환
```

| 데이터 | TTL | 이유 |
|--------|-----|------|
| Places 정보 | 30일 | 장소 정보는 잘 안 바뀜 |
| 항공권 가격 | 6시간 | 하루 수회 변동 |
| AI 후보 계획 | 영구 | 관리자가 직접 관리 |

---

## Best 여행계획 집계

```sql
SELECT s.place_id, s.name, COUNT(*) AS trip_count
FROM spots s
JOIN itinerary_days d ON s.day_id = d.id
JOIN trips t ON d.trip_id = t.id
WHERE t.destination_city = '도쿄'
  AND t.status = 'confirmed'
GROUP BY s.place_id, s.name
ORDER BY trip_count DESC
LIMIT 10;
```

:::caution
초기엔 데이터가 없으므로 DB 설계만 해두고 기능 노출은 데이터 누적 후 진행.
:::

---

## PostGIS 활용

```sql
-- 반경 500m 내 장소 검색
SELECT name FROM spots
WHERE ST_DWithin(
  location,
  ST_Point(139.701, 35.658)::geography,
  500
);

-- 두 장소 간 거리
SELECT ST_Distance(
  ST_Point(139.701, 35.658)::geography,
  ST_Point(139.769, 35.681)::geography
) AS distance_meters;
```
