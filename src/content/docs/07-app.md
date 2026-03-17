---
title: Flutter 앱
description: 지도 구현, 카카오톡 공유, 친구 초대
---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Flutter |
| 지도 | `google_maps_flutter` |
| 카카오 공유 | `kakao_flutter_sdk` |
| HTTP | `dio` |
| 상태관리 | `flutter_riverpod` |

---

## 지도 UI

웹과 동일한 구조. API 키 공유 가능.

```dart
GoogleMap(
  initialCameraPosition: CameraPosition(
    target: LatLng(spots.first.lat, spots.first.lng),
    zoom: 13,
  ),
  markers: spots.asMap().entries.map((e) => Marker(
    markerId: MarkerId(e.key.toString()),
    position: LatLng(e.value.lat, e.value.lng),
    infoWindow: InfoWindow(
      title: '${e.key + 1}. ${e.value.name}',
      snippet: '예상 ${e.value.durationMin}분',
    ),
  )).toSet(),
  polylines: {
    Polyline(
      polylineId: PolylineId('route'),
      points: spots.map((s) => LatLng(s.lat, s.lng)).toList(),
      color: Color(0xFF3B82F6),
      width: 3,
    ),
  },
)
```

### 스텝 검토 애니메이션

```dart
void _moveToNext() async {
  final controller = await _mapController.future;

  await controller.animateCamera(CameraUpdate.zoomOut());
  await Future.delayed(Duration(milliseconds: 400));

  await controller.animateCamera(
    CameraUpdate.newLatLng(LatLng(nextSpot.lat, nextSpot.lng)),
  );
  await Future.delayed(Duration(milliseconds: 500));

  await controller.animateCamera(CameraUpdate.zoomIn());
}
```

---

## 카카오톡 공유

```dart
await ShareClient.instance.shareDefault(
  template: FeedTemplate(
    content: Content(
      title: trip.title,
      description: '${trip.destinationCity} ${trip.totalDays}일 · 예산 ${trip.budgetTotal}원',
      imageUrl: Uri.parse(trip.thumbnailUrl),
      link: Link(
        webUrl: Uri.parse('https://tripplanner.com/plan/${trip.shareToken}'),
        mobileWebUrl: Uri.parse('https://tripplanner.com/plan/${trip.shareToken}'),
      ),
    ),
    buttons: [
      Button(title: '일정 보기', link: Link(
        webUrl: Uri.parse('https://tripplanner.com/plan/${trip.shareToken}'),
      )),
    ],
  ),
);
```

- 앱 미설치 사용자도 웹에서 바로 열람 가능
- 웹 페이지 하단에 앱 다운로드 유도 버튼 → 신규 유저 유입

---

## 친구 초대 (공동 열람)

MVP: 읽기 전용만 지원. 공동 편집은 Phase 2.

```
여행 주인이 초대 코드 생성
    ↓
친구에게 코드/링크 공유 (카카오 or 클립보드)
    ↓
친구가 앱에서 코드 입력 → viewer로 등록
    ↓
해당 여행 계획 공동 열람
```

- Supabase RLS로 trip_members 외 접근 차단
- owner만 계획 수정 가능
