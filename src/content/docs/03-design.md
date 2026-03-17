---
title: 디자인 시스템
description: OKLCH 색 공간, shadcn/ui 설정
---

## 색 공간: OKLCH

CSS와 Tailwind v4가 기본 지원하는 지각적으로 균일한 색 공간.
같은 채도(C) 값에서 밝기(L)를 바꿔도 색이 자연스럽게 보임 → 그라디언트, 호버 효과 일관성 확보.

```css
:root {
  --primary:    oklch(0.65 0.18 250);   /* 메인 브랜드 */
  --secondary:  oklch(0.55 0.14 200);
  --accent:     oklch(0.75 0.20 140);
  --background: oklch(0.98 0.00 0);
  --foreground: oklch(0.15 0.00 0);
}
```

- shadcn/ui 최신 버전은 OKLCH 기본 채택
- Tailwind v4는 OKLCH를 기본 색 공간으로 사용

---

## UI 라이브러리: shadcn/ui

컴포넌트를 npm 패키지로 설치하는 게 아니라 **코드를 직접 프로젝트에 복사**하는 방식.
디자인 수정 시 파일 직접 편집 → 커스터마이징 자유도 최고.

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

```
/components/ui/button.tsx   ← 내 코드로 소유, 자유롭게 수정 가능
/components/ui/card.tsx
/components/ui/input.tsx
```
