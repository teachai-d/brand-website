# Changelog

## 현재 상태
<!-- /wrap이 매 세션 이 섹션을 업데이트합니다 -->
- **상태:** 운영 중 (Vercel 배포)
- **주요 기능:**
  - TD STUDIO 브랜드 웹사이트 (Next.js 16 + Tailwind CSS)
  - 히어로 섹션, 무한 스크롤 후기, ContactSection
  - AI 자료실 섹션 (PDF 배너 카드 포함)
  - Superpowers + Claude Code 가이드 PDF (한글, 5페이지)
  - QR 코드 연동
- **알려진 이슈:** 없음

## 세션 로그
<!-- ⚠️ APPEND ONLY — 아래 항목을 절대 삭제/수정하지 마세요. 새 항목은 이 줄 바로 아래에 추가합니다. -->

### 2026-04-15
- PDF 한글 깨짐 수정: jsPDF → Puppeteer + HTML/CSS 방식으로 generate-pdf.mjs 재작성
- Noto Sans KR 폰트 적용으로 5페이지 한글 PDF 정상 생성 (946KB)
- puppeteer devDependency 추가
