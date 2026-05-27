# PASTA App Prototype

카카오헬스케어 PASTA 앱 클론 프로토타입 프로젝트

## 프로젝트 구조

```
pasta/
├── images/           # uibowl.io에서 스크랩한 원본 스크린샷 (221장)
├── scraper/          # uibowl.io 스크래핑 스크립트 (Playwright)
│   └── scraper.js
├── design.md         # 디자인 시스템 명세서 (토큰, 컴포넌트, 레이아웃)
├── package.json
└── CLAUDE.md         # 이 파일
```

## 디자인 레퍼런스

- `design.md`에 모든 디자인 토큰, 컴포넌트 스펙, 화면 레이아웃이 정의되어 있음
- `images/` 폴더의 스크린샷을 시각적 참조로 활용
- 대표 이미지 7개: `017`, `048`, `157` (식사기록), `011` (카메라), `208` (레시피), `100` (챌린지), `035` (대시보드)

## 주요 화면

1. **식사기록** - AI 음식 인식 + 태그 오버레이 + 칼로리 자동 계산
2. **홈 대시보드** - 주간 캘린더 + 칼로리/영양소 게이지 (Cal AI 참조)
3. **목표 관리** - 챌린지 카드 + 주차별 진행 현황
4. **콘텐츠 상세** - 레시피/건강 팁 상세 뷰
5. **카메라** - 얼굴/음식 인식 카메라 뷰

## 빌드 & 실행

```bash
npm install          # 의존성 설치
# 프로토타입 프레임워크는 아직 미정 (React Native / Flutter / Web)
```

## 코딩 컨벤션

- UI 구현 시 `design.md`의 토큰 값을 CSS 변수로 먼저 정의한 뒤 사용할 것
- 다크 테마가 기본, 대시보드만 라이트 테마
- 모든 터치 타겟 최소 44×44px
- 폰트: Pretendard (한글/영문 통합) — `font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;`
- 아이콘: lucide-react (`npm install lucide-react`), strokeWidth 1.5 기본값 사용
