import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "..", "public", "superpowers-claude-code-guide.pdf");

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Superpowers + Claude Code 가이드</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', sans-serif;
    font-size: 11pt;
    color: #1e293b;
    background: white;
  }

  /* ── 페이지 구분 ── */
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 18mm 22mm 18mm;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .page:last-child { page-break-after: avoid; }

  /* ── 커버 페이지 ── */
  .cover {
    background: #0f172a;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .cover-top {
    background: linear-gradient(135deg, #5839be 0%, #7c3aed 100%);
    padding: 24mm 18mm 20mm 18mm;
    position: relative;
    overflow: hidden;
  }
  .cover-top::after {
    content: '';
    position: absolute;
    right: -20mm;
    top: -20mm;
    width: 70mm;
    height: 70mm;
    border-radius: 50%;
    background: rgba(16, 185, 129, 0.25);
  }
  .cover-top::before {
    content: '';
    position: absolute;
    right: -10mm;
    top: -10mm;
    width: 50mm;
    height: 50mm;
    border-radius: 50%;
    background: rgba(16, 185, 129, 0.15);
  }
  .cover-title {
    font-size: 28pt;
    font-weight: 900;
    color: white;
    line-height: 1.2;
    position: relative;
    z-index: 1;
  }
  .cover-subtitle {
    font-size: 14pt;
    color: #c7d2fe;
    margin-top: 3mm;
    font-weight: 400;
    position: relative;
    z-index: 1;
  }
  .cover-desc {
    font-size: 9pt;
    color: #94a3b8;
    margin-top: 3mm;
    position: relative;
    z-index: 1;
  }
  .cover-badges {
    display: flex;
    gap: 3mm;
    margin-top: 6mm;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  .badge {
    display: inline-block;
    padding: 1.5mm 3.5mm;
    border-radius: 3mm;
    font-size: 8pt;
    font-weight: 700;
  }
  .badge-yellow { background: rgba(251,191,36,0.25); color: #92400e; border: 1px solid rgba(251,191,36,0.4); }
  .badge-blue   { background: #e0e7ff; color: #4338ca; }
  .badge-green  { background: #d1fae5; color: #065f46; }

  .cover-body {
    padding: 10mm 18mm;
    flex: 1;
  }
  .toc-card {
    background: #1e2d4f;
    border-radius: 4mm;
    padding: 7mm 8mm;
    margin-top: 6mm;
  }
  .toc-card-title {
    font-size: 9pt;
    font-weight: 700;
    color: #10b981;
    margin-bottom: 4mm;
  }
  .toc-item {
    font-size: 9pt;
    color: #e2e8f0;
    padding: 1.5mm 0;
    display: flex;
    align-items: center;
    gap: 2mm;
  }
  .toc-num {
    font-weight: 700;
    color: #818cf8;
    min-width: 4mm;
  }

  .cover-footer {
    padding: 5mm 18mm;
    border-top: 0.5px solid #334155;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  .cover-footer-text {
    font-size: 7.5pt;
    color: #64748b;
  }

  /* ── 공통 헤더 영역 ── */
  .page-header {
    background: linear-gradient(135deg, #5839be 0%, #7c3aed 100%);
    margin: -18mm -18mm 8mm -18mm;
    padding: 7mm 18mm;
  }
  .page-header h1 {
    font-size: 16pt;
    font-weight: 700;
    color: white;
  }

  /* ── 섹션 헤딩 ── */
  h2 {
    font-size: 12pt;
    font-weight: 700;
    color: #5839be;
    margin: 7mm 0 3mm 0;
    display: flex;
    align-items: center;
    gap: 2.5mm;
  }
  h2::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 6mm;
    background: #5839be;
    border-radius: 2px;
    flex-shrink: 0;
  }
  h3 {
    font-size: 10pt;
    font-weight: 700;
    color: #1e293b;
    margin: 4mm 0 2mm 0;
  }

  /* ── 본문 ── */
  p {
    font-size: 9.5pt;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 3mm;
  }

  /* ── 목록 ── */
  ul.custom-list {
    list-style: none;
    margin: 0 0 3mm 0;
  }
  ul.custom-list li {
    font-size: 8.5pt;
    color: #475569;
    padding: 1mm 0 1mm 5mm;
    position: relative;
    line-height: 1.6;
  }
  ul.custom-list li::before {
    content: '▸';
    color: #10b981;
    position: absolute;
    left: 0;
  }

  ol.custom-ol {
    list-style: none;
    counter-reset: item;
    margin: 0 0 3mm 0;
  }
  ol.custom-ol li {
    font-size: 8.5pt;
    color: #1e293b;
    padding: 1.5mm 0 1.5mm 7mm;
    position: relative;
    line-height: 1.6;
    counter-increment: item;
  }
  ol.custom-ol li::before {
    content: counter(item) ".";
    font-weight: 700;
    color: #5839be;
    position: absolute;
    left: 0;
  }

  /* ── 메타 테이블 ── */
  .meta-table { width: 100%; border-collapse: collapse; margin: 3mm 0; }
  .meta-table tr td {
    font-size: 8.5pt;
    padding: 1.5mm 2mm;
    vertical-align: top;
    line-height: 1.6;
  }
  .meta-table tr td:first-child {
    font-weight: 700;
    color: #1e293b;
    width: 22mm;
    white-space: nowrap;
  }
  .meta-table tr td:last-child { color: #475569; }

  /* ── 워크플로 아이템 ── */
  .workflow-item {
    display: flex;
    gap: 3mm;
    padding: 2mm 0;
    align-items: flex-start;
  }
  .workflow-label {
    font-size: 8.5pt;
    font-weight: 700;
    color: #5839be;
    min-width: 36mm;
    padding-top: 0.5mm;
  }
  .workflow-desc {
    font-size: 8.5pt;
    color: #475569;
    line-height: 1.6;
    flex: 1;
  }

  /* ── 스킬 태그 ── */
  .skill-group { margin: 2mm 0 4mm 0; }
  .skill-group-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 2mm;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 2mm;
  }
  .skill-tag {
    background: #e0e7ff;
    color: #4338ca;
    font-size: 7.5pt;
    padding: 1mm 3mm;
    border-radius: 2mm;
  }

  /* ── 코드 블록 ── */
  .code-block {
    background: #1e1e32;
    border-radius: 3mm;
    padding: 4mm 5mm;
    margin: 3mm 0;
    position: relative;
  }
  .code-label {
    position: absolute;
    top: 0; left: 0;
    background: #5839be;
    color: white;
    font-size: 7pt;
    font-weight: 700;
    padding: 1mm 3mm;
    border-radius: 3mm 0 2mm 0;
    font-family: monospace;
  }
  .code-block pre {
    font-family: 'Courier New', Consolas, monospace;
    font-size: 8pt;
    color: #b4dcff;
    white-space: pre-wrap;
    line-height: 1.6;
    margin-top: 4mm;
  }

  /* ── 정보 박스 ── */
  .info-box {
    background: #f1f5f9;
    border-radius: 3mm;
    padding: 4mm 5mm;
    margin: 3mm 0;
    display: flex;
    gap: 3mm;
    align-items: flex-start;
  }
  .info-box .icon { font-size: 12pt; flex-shrink: 0; }
  .info-box .content {
    font-size: 8.5pt;
    color: #1e293b;
    line-height: 1.7;
  }
  .info-box.blue { background: #eff6ff; }
  .info-box.green { background: #f0fdf4; }
  .info-box.indigo { background: #eef2ff; }

  /* ── 리소스 카드 ── */
  .resource-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 2.5mm;
    padding: 3mm 4mm;
    margin: 2mm 0;
    display: flex;
    gap: 3mm;
    align-items: flex-start;
  }
  .resource-card .res-left { flex: 1; min-width: 0; }
  .resource-card .res-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #1e293b;
  }
  .resource-card .res-url {
    font-size: 7.5pt;
    color: #10b981;
    margin-top: 0.5mm;
    word-break: break-all;
  }
  .resource-card .res-desc {
    font-size: 7.5pt;
    color: #64748b;
    margin-top: 0.5mm;
    line-height: 1.5;
  }

  /* ── 구분선 ── */
  .divider {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 5mm 0;
  }

  /* ── URL 목록 ── */
  .url-row {
    display: flex;
    gap: 2mm;
    padding: 1.5mm 0;
    font-size: 8.5pt;
    align-items: baseline;
  }
  .url-row .url-label {
    font-weight: 700;
    color: #1e293b;
    min-width: 46mm;
    flex-shrink: 0;
  }
  .url-row .url-value { color: #10b981; word-break: break-all; }

  /* ── 페이지 푸터 ── */
  .page-footer {
    position: absolute;
    bottom: 8mm;
    left: 18mm;
    right: 18mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid #cbd5e1;
    padding-top: 2mm;
  }
  .page-footer span {
    font-size: 7.5pt;
    color: #94a3b8;
  }

  /* ── 인쇄 설정 ── */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { page-break-after: always; }
  }
</style>
</head>
<body>

<!-- ══════════════════════════════════════════════
     PAGE 1: 커버
══════════════════════════════════════════════ -->
<div class="page cover">
  <div class="cover-top">
    <div class="cover-title">Superpowers + Claude Code</div>
    <div class="cover-subtitle">AI 개발 생산성 완전 가이드</div>
    <div class="cover-desc">obra/superpowers 분석 · Claude Code 입문 핵심 자료 · 추천 리소스</div>
    <div class="cover-badges">
      <span class="badge badge-yellow">⭐ 153K Stars</span>
      <span class="badge badge-blue">Shell</span>
      <span class="badge badge-green">2025.10 출시</span>
    </div>
  </div>

  <div class="cover-body">
    <div class="toc-card">
      <div class="toc-card-title">이 문서에 담긴 내용</div>
      <div class="toc-item"><span class="toc-num">1.</span> obra/superpowers 저장소 심층 분석</div>
      <div class="toc-item"><span class="toc-num">2.</span> 핵심 스킬 시스템 &amp; 6단계 개발 워크플로</div>
      <div class="toc-item"><span class="toc-num">3.</span> Claude Code 초보자 필수 개념 &amp; 설치 가이드</div>
      <div class="toc-item"><span class="toc-num">4.</span> 무료 학습 리소스 큐레이션</div>
      <div class="toc-item"><span class="toc-num">5.</span> Superpowers + Claude Code 통합 활용법 &amp; 요약</div>
    </div>
  </div>

  <div class="cover-footer">
    <span class="cover-footer-text">생성일: 2026-04-15 &nbsp;|&nbsp; 출처: github.com/obra/superpowers + code.claude.com/docs</span>
    <span class="cover-footer-text">1 / 5</span>
  </div>
</div>


<!-- ══════════════════════════════════════════════
     PAGE 2: Superpowers 분석
══════════════════════════════════════════════ -->
<div class="page">
  <div class="page-header"><h1>Superpowers 저장소 분석</h1></div>

  <h2>프로젝트 개요</h2>
  <p>
    Superpowers는 Claude Code, Cursor, Codex, OpenCode 등 AI 코딩 에이전트를 위한
    플러그인 시스템이자 소프트웨어 개발 방법론입니다.
    "즉시 코딩"이 아니라 "먼저 무엇을 원하는지 파악"하는 구조적 워크플로를 제공합니다.
  </p>

  <table class="meta-table">
    <tr><td>Stars</td><td>153,252 ⭐ (2026-04-15 기준)</td></tr>
    <tr><td>언어</td><td>Shell (설치 스크립트 + Markdown 기반 스킬)</td></tr>
    <tr><td>출시일</td><td>2025년 10월 9일</td></tr>
    <tr><td>설명</td><td>An agentic skills framework &amp; software development methodology that works.</td></tr>
    <tr><td>지원 플랫폼</td><td>Claude Code, Cursor, Codex, OpenCode, GitHub Copilot CLI, Gemini CLI</td></tr>
  </table>

  <h2>6단계 개발 워크플로</h2>
  <p>Superpowers의 핵심은 다음 6단계로 구성된 구조화된 개발 프로세스입니다:</p>

  <div class="workflow-item">
    <span class="workflow-label">▶ Design (설계)</span>
    <span class="workflow-desc">소크라테스식 질문으로 요구사항 정제 후 섹션별 스펙 승인</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label">▶ Preparation (준비)</span>
    <span class="workflow-desc">Git worktrees로 격리된 개발 브랜치 생성 + 깨끗한 테스트 기준선 확인</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label">▶ Planning (계획)</span>
    <span class="workflow-desc">2~5분 단위 태스크로 분해 + 파일 경로·코드·검증 단계 명시</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label">▶ Execution (실행)</span>
    <span class="workflow-desc">서브에이전트가 개별 태스크 처리 + 2단계 리뷰(스펙 준수 → 코드 품질)</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label">▶ Implementation (구현)</span>
    <span class="workflow-desc">TDD RED-GREEN-REFACTOR 사이클 강제: 실패 테스트 먼저</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label">▶ Completion (완료)</span>
    <span class="workflow-desc">자동 검증 + 머지 결정 워크플로 + 정리</span>
  </div>

  <h2>스킬(Skills) 목록</h2>
  <p>14개 스킬이 skills/ 디렉토리에 폴더 단위로 구성되어 있습니다:</p>

  <div class="skill-group">
    <div class="skill-group-title">테스트 &amp; 디버깅</div>
    <div class="skill-tags">
      <span class="skill-tag">test-driven-development</span>
      <span class="skill-tag">systematic-debugging</span>
      <span class="skill-tag">verification-before-completion</span>
    </div>
  </div>
  <div class="skill-group">
    <div class="skill-group-title">협업 &amp; 계획</div>
    <div class="skill-tags">
      <span class="skill-tag">brainstorming</span>
      <span class="skill-tag">writing-plans</span>
      <span class="skill-tag">executing-plans</span>
      <span class="skill-tag">subagent-driven-development</span>
      <span class="skill-tag">dispatching-parallel-agents</span>
      <span class="skill-tag">requesting-code-review</span>
      <span class="skill-tag">receiving-code-review</span>
      <span class="skill-tag">using-git-worktrees</span>
      <span class="skill-tag">finishing-a-development-branch</span>
    </div>
  </div>
  <div class="skill-group">
    <div class="skill-group-title">메타</div>
    <div class="skill-tags">
      <span class="skill-tag">writing-skills</span>
      <span class="skill-tag">using-superpowers</span>
    </div>
  </div>

  <h2>설치 방법</h2>
  <div class="code-block">
    <span class="code-label">bash</span>
    <pre># Claude Code (공식 마켓플레이스)
/plugin install superpowers@claude-plugins-official

# Claude Code (커스텀 마켓플레이스)
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace</pre>
  </div>

  <h2>핵심 철학 3원칙</h2>
  <ol class="custom-ol">
    <li>테스트 주도 개발(TDD) — 필수적 실천, 선택이 아님</li>
    <li>직관보다 체계적 프로세스 — 일관된 품질 확보</li>
    <li>복잡성 감소 우선 — 단순함이 최우선 설계 원칙</li>
  </ol>

  <div class="page-footer">
    <span>Superpowers + Claude Code 가이드 &nbsp;|&nbsp; 생성일: 2026-04-15</span>
    <span>2 / 5</span>
  </div>
</div>


<!-- ══════════════════════════════════════════════
     PAGE 3: Claude Code 입문
══════════════════════════════════════════════ -->
<div class="page">
  <div class="page-header"><h1>Claude Code 초보자 가이드</h1></div>

  <h2>Claude Code란?</h2>
  <p>
    Claude Code는 Anthropic이 만든 AI 기반 코딩 어시스턴트입니다.
    코드베이스 전체를 이해하고 여러 파일에 걸쳐 기능 구현, 버그 수정,
    테스트 작성, 커밋·PR 생성까지 자동으로 처리합니다.
    터미널, VS Code, JetBrains, 데스크탑 앱, 브라우저 등 다양한 환경에서 실행됩니다.
  </p>

  <h2>설치 방법</h2>
  <h3>Windows (PowerShell)</h3>
  <div class="code-block">
    <span class="code-label">powershell</span>
    <pre>irm https://claude.ai/install.ps1 | iex

# 또는 winget 사용
winget install Anthropic.ClaudeCode</pre>
  </div>

  <h3>macOS / Linux / WSL</h3>
  <div class="code-block">
    <span class="code-label">bash</span>
    <pre>curl -fsSL https://claude.ai/install.sh | bash</pre>
  </div>

  <div class="info-box blue">
    <span class="icon">💡</span>
    <span class="content">
      Windows 네이티브 설치에는 Git for Windows가 필요합니다.
      네이티브 설치는 자동 업데이트를 지원하며, winget/Homebrew는 수동 업그레이드가 필요합니다.
    </span>
  </div>

  <h2>프로젝트 시작</h2>
  <div class="code-block">
    <span class="code-label">bash</span>
    <pre>cd 내-프로젝트
claude</pre>
  </div>
  <p>처음 실행 시 로그인 프롬프트가 나타납니다. Claude 구독 또는 Anthropic Console 계정이 필요합니다.</p>

  <h2>핵심 기능 7가지</h2>

  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ 코드 작성 &amp; 버그 수정</span>
    <span class="workflow-desc">자연어로 설명하면 여러 파일에 걸쳐 코드를 작성하고 버그를 추적·수정합니다.</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ Git 자동화</span>
    <span class="workflow-desc">변경 사항 스테이징, 커밋 메시지 작성, 브랜치 생성, PR 오픈까지 자동 처리합니다.</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ CLAUDE.md 메모리</span>
    <span class="workflow-desc">프로젝트 루트의 CLAUDE.md 파일을 매 세션 시작 시 읽어 코딩 표준·아키텍처·라이브러리 설정을 유지합니다.</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ MCP 통합</span>
    <span class="workflow-desc">Model Context Protocol로 Google Drive, Jira, Slack 등 외부 도구와 연결됩니다.</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ 커스텀 명령(/skills)</span>
    <span class="workflow-desc">팀이 공유하는 반복 워크플로를 /review-pr, /deploy-staging 같은 명령으로 패키징합니다.</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ 멀티 에이전트</span>
    <span class="workflow-desc">병렬로 여러 Claude Code 에이전트를 실행해 대규모 태스크를 분산 처리합니다.</span>
  </div>
  <div class="workflow-item">
    <span class="workflow-label" style="color:#5839be;font-weight:700;">◆ 스케줄 &amp; 자동화</span>
    <span class="workflow-desc">정기 PR 리뷰, 야간 CI 분석, 주간 의존성 감사 등을 자동화할 수 있습니다.</span>
  </div>

  <h2>CLI 활용 예시</h2>
  <div class="code-block">
    <span class="code-label">bash</span>
    <pre># 로그 분석
tail -200 app.log | claude -p "이상 징후가 있으면 알려줘"

# 번역 자동화
claude -p "새 문자열을 프랑스어로 번역하고 PR 올려줘"

# 보안 리뷰
git diff main --name-only | claude -p "변경 파일의 보안 이슈 리뷰"</pre>
  </div>

  <div class="page-footer">
    <span>Superpowers + Claude Code 가이드 &nbsp;|&nbsp; 생성일: 2026-04-15</span>
    <span>3 / 5</span>
  </div>
</div>


<!-- ══════════════════════════════════════════════
     PAGE 4: 추천 리소스 & 통합 활용
══════════════════════════════════════════════ -->
<div class="page">
  <div class="page-header"><h1>추천 학습 리소스</h1></div>

  <h2>공식 문서 (필수)</h2>

  <div class="resource-card">
    <div class="res-left">
      <div class="res-title">공식 문서 홈</div>
      <div class="res-url">code.claude.com/docs</div>
    </div>
    <div class="res-desc" style="flex:2;">Claude Code 전체 문서. 퀵스타트부터 고급 기능까지.</div>
  </div>
  <div class="resource-card">
    <div class="res-left">
      <div class="res-title">퀵스타트</div>
      <div class="res-url">code.claude.com/docs/en/quickstart</div>
    </div>
    <div class="res-desc" style="flex:2;">첫 번째 실제 태스크 — 코드베이스 탐색부터 버그 수정 커밋까지.</div>
  </div>
  <div class="resource-card">
    <div class="res-left">
      <div class="res-title">CLAUDE.md 메모리</div>
      <div class="res-url">code.claude.com/docs/en/memory</div>
    </div>
    <div class="res-desc" style="flex:2;">영구 지시사항과 자동 메모리 설정 방법.</div>
  </div>
  <div class="resource-card">
    <div class="res-left">
      <div class="res-title">공통 워크플로</div>
      <div class="res-url">code.claude.com/docs/en/common-workflows</div>
    </div>
    <div class="res-desc" style="flex:2;">Claude Code 활용 패턴과 모범 사례.</div>
  </div>
  <div class="resource-card">
    <div class="res-left">
      <div class="res-title">설정</div>
      <div class="res-url">code.claude.com/docs/en/settings</div>
    </div>
    <div class="res-desc" style="flex:2;">워크플로에 맞게 커스터마이즈하는 방법.</div>
  </div>
  <div class="resource-card">
    <div class="res-left">
      <div class="res-title">트러블슈팅</div>
      <div class="res-url">code.claude.com/docs/en/troubleshooting</div>
    </div>
    <div class="res-desc" style="flex:2;">자주 발생하는 문제와 해결책.</div>
  </div>

  <h2>Superpowers 공식 리소스</h2>
  <ul class="custom-list">
    <li><strong>GitHub 저장소</strong> — github.com/obra/superpowers — 소스 코드, 이슈 트래커, 릴리즈 노트</li>
    <li><strong>공식 웹사이트</strong> — primeradiant.com — 릴리즈 발표 및 커뮤니티 정보</li>
    <li><strong>디스코드</strong> — Discord 커뮤니티 — 실시간 지원 및 사용자 Q&amp;A</li>
    <li><strong>플러그인 마켓</strong> — claude-plugins-official — Claude Code 공식 플러그인 마켓플레이스</li>
  </ul>

  <h2>초보자 학습 로드맵</h2>
  <ol class="custom-ol">
    <li>Claude Code 설치 후 간단한 프로젝트에서 "claude" 명령 실행 체험</li>
    <li>공식 Quickstart 따라 첫 버그 수정 커밋 만들어보기</li>
    <li>프로젝트에 CLAUDE.md 파일 추가하여 코딩 표준 설정</li>
    <li>Superpowers 플러그인 설치 → /brainstorming 스킬로 기능 설계 연습</li>
    <li>test-driven-development 스킬로 TDD 워크플로 적용</li>
    <li>subagent-driven-development 스킬로 복잡한 기능 병렬 처리 경험</li>
    <li>writing-skills 스킬로 팀 맞춤형 커스텀 스킬 직접 제작</li>
  </ol>

  <h2>Superpowers + Claude Code 통합 활용 팁</h2>
  <ul class="custom-list">
    <li>CLAUDE.md에 Superpowers 스킬 트리거 조건을 명시하면 에이전트가 자동으로 적절한 스킬을 선택합니다.</li>
    <li>Git worktrees 스킬을 사용하면 실험적 기능과 메인 브랜치를 완전히 격리하여 안전하게 개발할 수 있습니다.</li>
    <li>dispatching-parallel-agents로 대규모 리팩토링 시 여러 모듈을 동시에 수정하면 시간을 대폭 절약합니다.</li>
    <li>systematic-debugging 스킬은 Claude Code의 코드베이스 탐색 능력과 결합하면 근본 원인을 빠르게 추적합니다.</li>
    <li>verification-before-completion 스킬로 PR 생성 전 자동 검증을 강제하여 코드 품질을 일관되게 유지하세요.</li>
  </ul>

  <div class="page-footer">
    <span>Superpowers + Claude Code 가이드 &nbsp;|&nbsp; 생성일: 2026-04-15</span>
    <span>4 / 5</span>
  </div>
</div>


<!-- ══════════════════════════════════════════════
     PAGE 5: 요약 & 핵심 정리
══════════════════════════════════════════════ -->
<div class="page">
  <div class="page-header"><h1>요약 &amp; 핵심 정리</h1></div>

  <h2>Superpowers 한눈에 보기</h2>
  <div class="info-box indigo">
    <span class="icon">🚀</span>
    <span class="content">
      <strong>Superpowers = AI 코딩 에이전트를 위한 "구조화된 개발 방법론 플러그인"</strong><br>
      14개 스킬 × 6단계 워크플로 × 멀티 플랫폼 지원<br>
      → 즉흥 코딩에서 체계적 설계·구현·검증 프로세스로 전환
    </span>
  </div>

  <h2>Claude Code 한눈에 보기</h2>
  <div class="info-box green">
    <span class="icon">⚡</span>
    <span class="content">
      <strong>Claude Code = 터미널·IDE·웹 통합 AI 코딩 어시스턴트</strong><br>
      코드 작성 / Git 자동화 / 멀티 에이전트 / MCP 통합 / 스케줄 자동화<br>
      → CLAUDE.md로 영구 지시사항 유지, /skills로 팀 워크플로 표준화
    </span>
  </div>

  <h2>시작하기 위한 3단계</h2>
  <ol class="custom-ol">
    <li>
      설치: <code style="background:#f1f5f9;padding:0.5mm 1.5mm;border-radius:1mm;font-size:8pt;">irm https://claude.ai/install.ps1 | iex</code> (Windows)<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style="background:#f1f5f9;padding:0.5mm 1.5mm;border-radius:1mm;font-size:8pt;">curl -fsSL https://claude.ai/install.sh | bash</code> (Mac/Linux)
    </li>
    <li>Claude Code에서: <code style="background:#f1f5f9;padding:0.5mm 1.5mm;border-radius:1mm;font-size:8pt;">/plugin install superpowers@claude-plugins-official</code> 실행</li>
    <li>첫 사용: <code style="background:#f1f5f9;padding:0.5mm 1.5mm;border-radius:1mm;font-size:8pt;">cd 프로젝트폴더 → claude → /brainstorming</code> 으로 설계 시작</li>
  </ol>

  <hr class="divider">

  <h2>참고 URL 모음</h2>
  <div class="url-row">
    <span class="url-label">Superpowers GitHub</span>
    <span class="url-value">https://github.com/obra/superpowers</span>
  </div>
  <div class="url-row">
    <span class="url-label">Claude Code 공식 문서</span>
    <span class="url-value">https://code.claude.com/docs/en/overview</span>
  </div>
  <div class="url-row">
    <span class="url-label">Claude Code 퀵스타트</span>
    <span class="url-value">https://code.claude.com/docs/en/quickstart</span>
  </div>
  <div class="url-row">
    <span class="url-label">CLAUDE.md 메모리 가이드</span>
    <span class="url-value">https://code.claude.com/docs/en/memory</span>
  </div>
  <div class="url-row">
    <span class="url-label">Claude Code 베스트 프랙티스</span>
    <span class="url-value">https://code.claude.com/docs/en/best-practices</span>
  </div>
  <div class="url-row">
    <span class="url-label">플러그인 마켓플레이스</span>
    <span class="url-value">https://claude.ai/marketplace</span>
  </div>

  <div class="page-footer">
    <span>Superpowers + Claude Code 가이드 &nbsp;|&nbsp; 생성일: 2026-04-15</span>
    <span>5 / 5</span>
  </div>
</div>

</body>
</html>`;

// ── Puppeteer로 PDF 생성 ──────────────────────────────────────────────────────
console.log("🚀  브라우저 실행 중...");
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--font-render-hinting=none",
  ],
});

const page = await browser.newPage();

// Google Fonts 로딩을 위해 네트워크 허용
await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

// 폰트 로딩 대기
await page.evaluateHandle("document.fonts.ready");

const pdfBuffer = await page.pdf({
  format: "A4",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: false,
});

await browser.close();

writeFileSync(OUTPUT_PATH, pdfBuffer);

const sizeKB = (pdfBuffer.length / 1024).toFixed(1);
console.log(`✅  PDF 저장 완료: ${OUTPUT_PATH}`);
console.log(`📦  크기: ${sizeKB} KB`);
