import { jsPDF } from "jspdf";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

// ── PDF 설정 ──────────────────────────────────────────────────────────────────
const doc = new jsPDF({ unit: "mm", format: "a4", putOnlyUsedFonts: true });
const W = 210; // A4 width mm
const MARGIN = 18;
const CONTENT_W = W - MARGIN * 2;

// ── 색상 팔레트 ──────────────────────────────────────────────────────────────
const C = {
  primary:    [88, 57, 190],   // indigo
  accent:     [16, 185, 129],  // emerald
  dark:       [15, 23, 42],    // slate-900
  mid:        [71, 85, 105],   // slate-600
  light:      [148, 163, 184], // slate-400
  bg:         [241, 245, 249], // slate-100
  white:      [255, 255, 255],
  yellow:     [251, 191, 36],
  tag_bg:     [224, 231, 255], // indigo-100
  tag_text:   [67, 56, 202],   // indigo-700
};

let y = 0; // current Y position

// ── 유틸 ─────────────────────────────────────────────────────────────────────
function pageBreakIfNeeded(needed = 20) {
  if (y + needed > 275) {
    doc.addPage();
    y = 18;
  }
}

function setColor(arr, type = "text") {
  const [r, g, b] = arr;
  if (type === "fill")  doc.setFillColor(r, g, b);
  if (type === "draw")  doc.setDrawColor(r, g, b);
  if (type === "text")  doc.setTextColor(r, g, b);
}

function rect(x, ry, w, h, color, radius = 2) {
  setColor(color, "fill");
  doc.roundedRect(x, ry, w, h, radius, radius, "F");
}

function line(x1, ry, x2, color = C.bg, lw = 0.3) {
  doc.setLineWidth(lw);
  setColor(color, "draw");
  doc.line(x1, ry, x2, ry);
}

function badge(text, x, by, bgColor = C.tag_bg, textColor = C.tag_text) {
  doc.setFontSize(7.5);
  const tw = doc.getTextWidth(text);
  rect(x, by - 3.5, tw + 5, 5.5, bgColor, 1.5);
  setColor(textColor, "text");
  doc.setFont("helvetica", "bold");
  doc.text(text, x + 2.5, by);
  return tw + 8;
}

function heading1(text) {
  pageBreakIfNeeded(20);
  // colored bar
  rect(0, y, W, 14, C.primary);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  setColor(C.white, "text");
  doc.text(text, MARGIN, y + 9.5);
  y += 18;
}

function heading2(text, color = C.primary) {
  pageBreakIfNeeded(16);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  setColor(color, "text");
  // accent bar
  rect(MARGIN, y, 3, 6, color);
  doc.text(text, MARGIN + 6, y + 4.5);
  y += 10;
}

function heading3(text) {
  pageBreakIfNeeded(12);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  setColor(C.dark, "text");
  doc.text(text, MARGIN, y + 4);
  y += 8;
}

function body(text, indent = 0, fontSize = 9.5, color = C.mid) {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "normal");
  setColor(color, "text");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  lines.forEach((l) => {
    pageBreakIfNeeded(6);
    doc.text(l, MARGIN + indent, y + 4);
    y += 5.5;
  });
}

function bullet(text, indent = 4, color = C.mid) {
  pageBreakIfNeeded(6);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  setColor(C.accent, "text");
  doc.text("▸", MARGIN + indent, y + 3.5);
  setColor(color, "text");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent - 6);
  lines.forEach((l, i) => {
    doc.text(l, MARGIN + indent + 5, y + 3.5 + i * 5);
  });
  y += 5 * lines.length + 1;
}

function numList(items, indent = 4) {
  items.forEach((item, i) => {
    pageBreakIfNeeded(6);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    setColor(C.primary, "text");
    doc.text(`${i + 1}.`, MARGIN + indent, y + 3.5);
    doc.setFont("helvetica", "normal");
    setColor(C.dark, "text");
    const lines = doc.splitTextToSize(item, CONTENT_W - indent - 8);
    lines.forEach((l, j) => {
      doc.text(l, MARGIN + indent + 7, y + 3.5 + j * 5);
    });
    y += 5 * lines.length + 1.5;
  });
}

function codeBlock(text, label = "") {
  pageBreakIfNeeded(18);
  const lines = text.trim().split("\n");
  const bh = lines.length * 5 + 8;
  rect(MARGIN, y, CONTENT_W, bh, [30, 30, 50]);
  if (label) {
    rect(MARGIN, y, 24, 5.5, C.primary);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    setColor(C.white, "text");
    doc.text(label, MARGIN + 3, y + 4);
  }
  doc.setFontSize(8);
  doc.setFont("courier", "normal");
  setColor([180, 220, 255], "text");
  lines.forEach((l, i) => {
    doc.text(l, MARGIN + 4, y + 9 + i * 5);
  });
  y += bh + 4;
}

function infoBox(text, bgColor = C.bg, icon = "ℹ") {
  pageBreakIfNeeded(14);
  const lines = doc.splitTextToSize(text, CONTENT_W - 14);
  const bh = lines.length * 5 + 8;
  rect(MARGIN, y, CONTENT_W, bh, bgColor, 2);
  doc.setFontSize(9);
  setColor(C.primary, "text");
  doc.text(icon, MARGIN + 3, y + 5.5);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  setColor(C.dark, "text");
  lines.forEach((l, i) => {
    doc.text(l, MARGIN + 10, y + 5.5 + i * 5);
  });
  y += bh + 4;
}

function spacer(h = 5) { y += h; }

function hLine(color = C.bg) {
  line(MARGIN, y, W - MARGIN, color, 0.4);
  y += 4;
}

// ── COVER PAGE ────────────────────────────────────────────────────────────────
// gradient-ish background
rect(0, 0, W, 297, C.dark);
rect(0, 0, W, 80, C.primary);

// decorative circles
doc.setFillColor(255, 255, 255);
doc.circle(190, 20, 40, "F");
doc.setFillColor(...C.accent);
doc.circle(190, 20, 28, "F");
rect(0, 0, 135, 80, C.primary); // re-clip left

// title
y = 24;
doc.setFontSize(26);
doc.setFont("helvetica", "bold");
setColor(C.white, "text");
doc.text("Superpowers + Claude Code", MARGIN, y);
y += 11;
doc.setFontSize(12);
doc.setFont("helvetica", "normal");
setColor([199, 210, 254], "text");
doc.text("AI 개발 생산성 완전 가이드", MARGIN, y);
y += 8;
doc.setFontSize(8.5);
setColor([148, 163, 184], "text");
doc.text("obra/superpowers 분석  ·  Claude Code 입문 핵심 자료  ·  추천 리소스", MARGIN, y);

// badges row
y += 10;
let bx = MARGIN;
bx += badge("⭐ 153K Stars", bx, y, [251, 191, 36, 0.2], [120, 80, 0]);
bx += badge("Shell", bx, y, C.tag_bg, C.tag_text);
bx += badge("2025.10 출시", bx, y, [209, 250, 229], [6, 95, 70]);

// white card area
y = 92;
rect(MARGIN, y, CONTENT_W, 56, [22, 30, 55], 3);
doc.setFontSize(9);
doc.setFont("helvetica", "bold");
setColor(C.accent, "text");
doc.text("이 문서에 담긴 내용", MARGIN + 6, y + 8);
y += 12;
[
  "1. obra/superpowers 저장소 심층 분석",
  "2. 핵심 스킬 시스템 & 6단계 개발 워크플로",
  "3. Claude Code 초보자 필수 개념 & 설치 가이드",
  "4. 무료 학습 리소스 큐레이션",
  "5. Superpowers + Claude Code 통합 활용법",
].forEach((item) => {
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  setColor(C.white, "text");
  doc.text(item, MARGIN + 8, y);
  y += 7;
});

// footer
y = 272;
line(MARGIN, y, W - MARGIN, [40, 50, 80], 0.5);
y += 5;
doc.setFontSize(7.5);
setColor(C.light, "text");
doc.setFont("helvetica", "normal");
doc.text("생성일: 2026-04-15  |  출처: github.com/obra/superpowers  +  code.claude.com/docs", MARGIN, y);
doc.text("1 / 5", W - MARGIN, y, { align: "right" });

// ── PAGE 2: SUPERPOWERS 분석 ──────────────────────────────────────────────────
doc.addPage();
y = 18;
heading1("Superpowers 저장소 분석");

heading2("프로젝트 개요");
body(
  "Superpowers는 Claude Code, Cursor, Codex, OpenCode 등 AI 코딩 에이전트를 위한 " +
  "플러그인 시스템이자 소프트웨어 개발 방법론입니다. \"즉시 코딩\"이 아니라 " +
  "\"먼저 무엇을 원하는지 파악\"하는 구조적 워크플로를 제공합니다."
);
spacer(2);

const meta = [
  ["Stars", "153,252 ⭐  (2026-04-15 기준)"],
  ["언어", "Shell (설치 스크립트 + Markdown 기반 스킬)"],
  ["출시일", "2025년 10월 9일"],
  ["설명", "An agentic skills framework & software development methodology that works."],
  ["지원 플랫폼", "Claude Code, Cursor, Codex, OpenCode, GitHub Copilot CLI, Gemini CLI"],
];
meta.forEach(([k, v]) => {
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(C.dark, "text");
  doc.text(`${k}:`, MARGIN, y + 3.5);
  doc.setFont("helvetica", "normal");
  setColor(C.mid, "text");
  const lines = doc.splitTextToSize(v, CONTENT_W - 28);
  doc.text(lines, MARGIN + 28, y + 3.5);
  y += 6 * lines.length;
});

spacer(4);
heading2("6단계 개발 워크플로");
body("Superpowers의 핵심은 다음 6단계로 구성된 구조화된 개발 프로세스입니다:", 0, 9);
spacer(2);

const workflow = [
  ["Design (설계)", "소크라테스식 질문으로 요구사항 정제 후 섹션별 스펙 승인"],
  ["Preparation (준비)", "Git worktrees로 격리된 개발 브랜치 생성 + 깨끗한 테스트 기준선 확인"],
  ["Planning (계획)", "2~5분 단위 태스크로 분해 + 파일 경로·코드·검증 단계 명시"],
  ["Execution (실행)", "서브에이전트가 개별 태스크 처리 + 2단계 리뷰(스펙 준수 → 코드 품질)"],
  ["Implementation (구현)", "TDD RED-GREEN-REFACTOR 사이클 강제: 실패 테스트 먼저"],
  ["Completion (완료)", "자동 검증 + 머지 결정 워크플로 + 정리"],
];
workflow.forEach(([title, desc]) => {
  pageBreakIfNeeded(10);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(C.primary, "text");
  doc.text(`▶  ${title}`, MARGIN + 4, y + 4);
  doc.setFont("helvetica", "normal");
  setColor(C.mid, "text");
  const lines = doc.splitTextToSize(desc, CONTENT_W - 8);
  lines.forEach((l, i) => doc.text(l, MARGIN + 42, y + 4 + i * 5));
  y += 5 * Math.max(lines.length, 1) + 3;
});

spacer(4);
heading2("스킬(Skills) 목록");
body("14개 스킬이 skills/ 디렉토리에 폴더 단위로 구성되어 있습니다:", 0, 9);
spacer(2);

const skillGroups = [
  {
    group: "테스트 & 디버깅",
    items: ["test-driven-development", "systematic-debugging", "verification-before-completion"],
  },
  {
    group: "협업 & 계획",
    items: [
      "brainstorming", "writing-plans", "executing-plans",
      "subagent-driven-development", "dispatching-parallel-agents",
      "requesting-code-review", "receiving-code-review",
      "using-git-worktrees", "finishing-a-development-branch",
    ],
  },
  { group: "메타", items: ["writing-skills", "using-superpowers"] },
];

skillGroups.forEach(({ group, items }) => {
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(C.dark, "text");
  doc.text(group, MARGIN, y + 4);
  y += 7;
  let bx = MARGIN + 4;
  items.forEach((skill) => {
    const tw = doc.getTextWidth(skill);
    const bw = tw + 6;
    if (bx + bw > W - MARGIN) { y += 7; bx = MARGIN + 4; }
    pageBreakIfNeeded(8);
    rect(bx, y - 1, bw, 6, C.tag_bg, 1.5);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    setColor(C.tag_text, "text");
    doc.text(skill, bx + 3, y + 3.5);
    bx += bw + 3;
  });
  y += 9;
});

spacer(4);
heading2("설치 방법");
codeBlock(
  "# Claude Code (공식 마켓플레이스)\n/plugin install superpowers@claude-plugins-official\n\n# Claude Code (커스텀 마켓플레이스)\n/plugin marketplace add obra/superpowers-marketplace\n/plugin install superpowers@superpowers-marketplace",
  "bash"
);

spacer(2);
heading2("핵심 철학 3원칙");
numList([
  "테스트 주도 개발(TDD) — 필수적 실천, 선택이 아님",
  "직관보다 체계적 프로세스 — 일관된 품질 확보",
  "복잡성 감소 우선 — 단순함이 최우선 설계 원칙",
]);

// ── PAGE 3: CLAUDE CODE 입문 ──────────────────────────────────────────────────
doc.addPage();
y = 18;
heading1("Claude Code 초보자 가이드");

heading2("Claude Code란?");
body(
  "Claude Code는 Anthropic이 만든 AI 기반 코딩 어시스턴트입니다. " +
  "코드베이스 전체를 이해하고 여러 파일에 걸쳐 기능 구현, 버그 수정, " +
  "테스트 작성, 커밋·PR 생성까지 자동으로 처리합니다. " +
  "터미널, VS Code, JetBrains, 데스크탑 앱, 브라우저 등 다양한 환경에서 실행됩니다."
);
spacer(4);

heading2("설치 방법");

heading3("Windows");
codeBlock(
  "# PowerShell\nirm https://claude.ai/install.ps1 | iex\n\n# 또는 winget\nwinget install Anthropic.ClaudeCode",
  "powershell"
);

heading3("macOS / Linux / WSL");
codeBlock("curl -fsSL https://claude.ai/install.sh | bash", "bash");

spacer(2);
infoBox(
  "Windows 네이티브 설치에는 Git for Windows가 필요합니다. " +
  "네이티브 설치는 자동 업데이트를 지원하며, winget/Homebrew는 수동 업그레이드가 필요합니다.",
  [235, 245, 255], "💡"
);

spacer(4);
heading2("프로젝트 시작");
codeBlock("cd your-project\nclaude", "bash");
body("처음 실행 시 로그인 프롬프트가 나타납니다. Claude 구독 또는 Anthropic Console 계정이 필요합니다.", 0, 9);

spacer(4);
heading2("핵심 기능 7가지");
const features = [
  ["코드 작성 & 버그 수정", "자연어로 설명하면 여러 파일에 걸쳐 코드를 작성하고 버그를 추적·수정합니다."],
  ["Git 자동화", "변경 사항 스테이징, 커밋 메시지 작성, 브랜치 생성, PR 오픈까지 자동 처리합니다."],
  ["CLAUDE.md 메모리", "프로젝트 루트의 CLAUDE.md 파일을 매 세션 시작 시 읽어 코딩 표준·아키텍처·라이브러리 설정을 유지합니다."],
  ["MCP 통합", "Model Context Protocol로 Google Drive, Jira, Slack 등 외부 도구와 연결됩니다."],
  ["커스텀 명령(/skills)", "팀이 공유하는 반복 워크플로를 /review-pr, /deploy-staging 같은 명령으로 패키징합니다."],
  ["멀티 에이전트", "병렬로 여러 Claude Code 에이전트를 실행해 대규모 태스크를 분산 처리합니다."],
  ["스케줄 & 자동화", "정기 PR 리뷰, 야간 CI 분석, 주간 의존성 감사 등을 자동화할 수 있습니다."],
];
features.forEach(([title, desc]) => {
  pageBreakIfNeeded(12);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setColor(C.primary, "text");
  doc.text(`◆ ${title}`, MARGIN, y + 4);
  y += 6;
  body(desc, 6, 8.5);
  spacer(1);
});

spacer(4);
heading2("CLI 활용 예시");
codeBlock(
  "# 로그 분석\ntail -200 app.log | claude -p \"이상 징후가 있으면 알려줘\"\n\n# 번역 자동화\nclaude -p \"새 문자열을 프랑스어로 번역하고 PR 올려줘\"\n\n# 보안 리뷰\ngit diff main --name-only | claude -p \"변경 파일의 보안 이슈 리뷰\"",
  "bash"
);

// ── PAGE 4: 리소스 & 통합 활용 ────────────────────────────────────────────────
doc.addPage();
y = 18;
heading1("추천 학습 리소스");

heading2("공식 문서 (필수)");
const officialDocs = [
  ["공식 문서 홈", "code.claude.com/docs", "Claude Code 전체 문서. 퀵스타트부터 고급 기능까지."],
  ["퀵스타트", "/en/quickstart", "첫 번째 실제 태스크 — 코드베이스 탐색부터 버그 수정 커밋까지."],
  ["CLAUDE.md 메모리", "/en/memory", "영구 지시사항과 자동 메모리 설정 방법."],
  ["공통 워크플로", "/en/common-workflows", "Claude Code 활용 패턴과 모범 사례."],
  ["설정", "/en/settings", "워크플로에 맞게 커스터마이즈하는 방법."],
  ["트러블슈팅", "/en/troubleshooting", "자주 발생하는 문제와 해결책."],
];
officialDocs.forEach(([title, url, desc]) => {
  pageBreakIfNeeded(12);
  rect(MARGIN, y, CONTENT_W, 11, C.bg, 2);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(C.dark, "text");
  doc.text(title, MARGIN + 4, y + 4);
  setColor(C.accent, "text");
  doc.setFontSize(7.5);
  doc.text(url, MARGIN + 4, y + 8.5);
  setColor(C.mid, "text");
  doc.setFont("helvetica", "normal");
  doc.text(desc, MARGIN + 70, y + 6.5, { maxWidth: CONTENT_W - 74 });
  y += 14;
});

spacer(4);
heading2("Superpowers 공식 리소스");
const spResources = [
  ["GitHub 저장소", "github.com/obra/superpowers", "소스 코드, 이슈 트래커, 릴리즈 노트"],
  ["공식 웹사이트", "primeradiant.com", "릴리즈 발표 및 커뮤니티 정보"],
  ["디스코드", "Discord 커뮤니티", "실시간 지원 및 사용자 Q&A"],
  ["플러그인 마켓", "claude-plugins-official", "Claude Code 공식 플러그인 마켓플레이스"],
];
spResources.forEach(([title, url, desc]) => {
  pageBreakIfNeeded(10);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(C.dark, "text");
  doc.text(`• ${title}`, MARGIN, y + 4);
  setColor(C.accent, "text");
  doc.setFontSize(7.5);
  doc.text(url, MARGIN + 36, y + 4);
  setColor(C.light, "text");
  doc.setFont("helvetica", "normal");
  doc.text(`— ${desc}`, MARGIN + 80, y + 4);
  y += 7;
});

spacer(6);
heading2("초보자 학습 로드맵");
const roadmap = [
  "Claude Code 설치 후 간단한 프로젝트에서 \"claude\" 명령 실행 체험",
  "공식 Quickstart 따라 첫 버그 수정 커밋 만들어보기",
  "프로젝트에 CLAUDE.md 파일 추가하여 코딩 표준 설정",
  "Superpowers 플러그인 설치 → /brainstorming 스킬로 기능 설계 연습",
  "test-driven-development 스킬로 TDD 워크플로 적용",
  "subagent-driven-development 스킬로 복잡한 기능 병렬 처리 경험",
  "writing-skills 스킬로 팀 맞춤형 커스텀 스킬 직접 제작",
];
numList(roadmap);

spacer(6);
heading2("Superpowers + Claude Code 통합 활용 팁");
const tips = [
  "CLAUDE.md에 Superpowers 스킬 트리거 조건을 명시하면 에이전트가 자동으로 적절한 스킬을 선택합니다.",
  "Git worktrees 스킬을 사용하면 실험적 기능과 메인 브랜치를 완전히 격리하여 안전하게 개발할 수 있습니다.",
  "dispatching-parallel-agents로 대규모 리팩토링 시 여러 모듈을 동시에 수정하면 시간을 대폭 절약합니다.",
  "systematic-debugging 스킬은 Claude Code의 코드베이스 탐색 능력과 결합하면 근본 원인을 빠르게 추적합니다.",
  "verification-before-completion 스킬로 PR 생성 전 자동 검증을 강제하여 코드 품질을 일관되게 유지하세요.",
];
tips.forEach((tip) => bullet(tip, 4, C.dark));

// ── PAGE 5: 요약 & 마무리 ──────────────────────────────────────────────────────
doc.addPage();
y = 18;
heading1("요약 & 핵심 정리");

heading2("Superpowers 한눈에 보기");
infoBox(
  "Superpowers = AI 코딩 에이전트를 위한 \"구조화된 개발 방법론 플러그인\"\n" +
  "14개 스킬 × 6단계 워크플로 × 멀티 플랫폼 지원\n" +
  "→ 즉흥 코딩 → 체계적 설계·구현·검증 프로세스로 전환",
  [235, 245, 255], "🚀"
);

spacer(3);
heading2("Claude Code 한눈에 보기");
infoBox(
  "Claude Code = 터미널·IDE·웹 통합 AI 코딩 어시스턴트\n" +
  "코드 작성 / Git 자동화 / 멀티 에이전트 / MCP 통합 / 스케줄 자동화\n" +
  "→ CLAUDE.md로 영구 지시사항 유지, /skills로 팀 워크플로 표준화",
  [209, 250, 229], "⚡"
);

spacer(3);
heading2("시작하기 위한 3단계");
numList([
  "설치:  irm https://claude.ai/install.ps1 | iex  (Windows)\n      curl -fsSL https://claude.ai/install.sh | bash  (Mac/Linux)",
  "Claude Code에서:  /plugin install superpowers@claude-plugins-official  실행",
  "첫 사용:  cd 프로젝트 폴더  →  claude  →  /brainstorming 으로 설계 시작",
]);

spacer(5);
hLine([80, 100, 180]);

heading2("참고 URL 모음");
const urls = [
  ["Superpowers GitHub", "https://github.com/obra/superpowers"],
  ["Claude Code 공식 문서", "https://code.claude.com/docs/en/overview"],
  ["Claude Code 퀵스타트", "https://code.claude.com/docs/en/quickstart"],
  ["CLAUDE.md 메모리 가이드", "https://code.claude.com/docs/en/memory"],
  ["Claude Code 베스트 프랙티스", "https://code.claude.com/docs/en/best-practices"],
  ["플러그인 마켓플레이스", "https://claude.ai/marketplace"],
];
urls.forEach(([label, url]) => {
  pageBreakIfNeeded(7);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(C.dark, "text");
  doc.text(`${label}:`, MARGIN, y + 4);
  setColor(C.accent, "text");
  doc.setFont("helvetica", "normal");
  doc.text(url, MARGIN + 54, y + 4);
  y += 6.5;
});

// ── 모든 페이지 푸터 ──────────────────────────────────────────────────────────
const totalPages = doc.getNumberOfPages();
for (let p = 2; p <= totalPages; p++) {
  doc.setPage(p);
  line(MARGIN, 280, W - MARGIN, [80, 100, 150], 0.4);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  setColor(C.light, "text");
  doc.text(
    "Superpowers + Claude Code 가이드  |  생성일: 2026-04-15",
    MARGIN, 285
  );
  doc.text(`${p} / ${totalPages}`, W - MARGIN, 285, { align: "right" });
}

// ── 저장 ──────────────────────────────────────────────────────────────────────
const outputPath = join(PUBLIC_DIR, "superpowers-claude-code-guide.pdf");
const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
writeFileSync(outputPath, pdfBuffer);
console.log(`✅  PDF saved: ${outputPath}`);
console.log(`📄  Pages: ${totalPages}`);
console.log(`📦  Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
