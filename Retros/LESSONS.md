# 교훈 기록 (Lessons Learned)

코딩 및 전략 교훈. /wrap 세션에서 기록됩니다.
#coding 태그 항목은 SessionStart 시 자동 주입됩니다.
반복 패턴은 /wrap HITL 승급을 통해 적절한 vehicle로 적용됩니다.

## PDF 생성

### jsPDF는 CJK 폰트를 지원하지 않는다 #coding #pdf
jsPDF의 기본 폰트(Helvetica)는 한글/한자/일본어를 렌더링할 수 없다.
한국어 PDF가 필요하면 Puppeteer로 HTML을 렌더링하거나 PDFKit에 TTF 폰트를 직접 임베드해야 한다.
