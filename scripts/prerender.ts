// Post-build prerender: generates a static HTML file per route under dist/<route>/index.html
// Each file inherits the built index.html (with hashed JS/CSS) and injects route-specific
// <title>, <meta name="description">, <link rel="canonical">, og:* tags, and SEO body content
// inside <div id="root">. When a crawler hits /about, Lovable static hosting serves
// dist/about/index.html (a real file with unique text). React then hydrates and replaces #root
// for human visitors — they see the normal SPA experience.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

const BASE_URL = "https://silica.co.kr";
const DIST = resolve("dist");
const SOURCE = resolve(DIST, "index.html");

type Route = {
  path: string;        // url path, e.g. "/about"
  title: string;
  description: string;
  h1: string;
  body: string;        // inner HTML for SEO content
};

const productRoutes: Route[] = [
  {
    path: "/products/fused-silica-block",
    title: "A등급 용융실리카 (Ultra-High Purity) | SiLiCA",
    description:
      "SiO₂ 99.9% 이상, 100% 무정형 구조의 초고순도 용융실리카 A등급. 반도체·광학·항공/방산·의료·에너지 등 최고 신뢰성 산업용 소재.",
    h1: "A등급 용융실리카 — 초고순도 (Ultra-High Purity Fused Silica)",
    body: `
      <p>초고순도 용융실리카 A등급은 99.9% 이상의 SiO₂ 순도와 100% 무정형 구조를 갖춘 최고 등급의 용융실리카입니다. 열팽창계수 0.6 × 10⁻⁶/°C 이하의 극저팽창, 초고전기절연성을 제공합니다.</p>
      <h2>주요 특징</h2>
      <ul>
        <li>100% 무정형 구조 — 고온 결정화·변형 제로</li>
        <li>금속 불순물 합계 0.03% 미만 — 반도체 수율 저하 요인 차단</li>
        <li>60mm 과립부터 1µm(12500 메쉬) 미분까지 맞춤 입도 가공</li>
      </ul>
      <h2>적용 분야</h2>
      <p>반도체, 광학, 디스플레이, 항공/방산, 의료, 에너지.</p>`,
  },
  {
    path: "/products/fused-silica-sand",
    title: "B등급 용융실리카 (Premium) | SiLiCA",
    description:
      "SiO₂ 99.5% 이상, 98% 이상 무정형의 프리미엄 용융실리카 B등급. 태양광·전자/반도체·정밀 주조·특수 소재용 고신뢰 소재.",
    h1: "B등급 용융실리카 — 프리미엄 (Premium Fused Silica)",
    body: `
      <p>프리미엄 용융실리카 B등급은 99.5% 이상의 SiO₂ 순도와 98% 이상의 무정형 구조를 갖춘 고품질 소재입니다. 열적 안정성과 화학적 안정성의 최적 균형을 제공합니다.</p>
      <h2>주요 특징</h2>
      <ul>
        <li>98% 이상 무정형 + 열팽창 0.8 미만으로 고온 환경 균일 성능</li>
        <li>Al, Fe 등 ppm 단위 불순물 제어</li>
        <li>60mm 과립부터 1µm 미분까지 맞춤 입도</li>
      </ul>
      <h2>적용 분야</h2>
      <p>태양광, 전자/반도체, 정밀 주조, 특수 소재.</p>`,
  },
  {
    path: "/products/fused-silica-powder",
    title: "C등급 용융실리카 (Standard) | SiLiCA",
    description:
      "SiO₂ 99.0% 이상의 표준 용융실리카 C등급. 건축·페인트·코팅·플라스틱·연마재 등 폭넓은 산업 공정에 안정 공급되는 경제형 소재.",
    h1: "C등급 용융실리카 — 스탠다드 (Standard Fused Silica)",
    body: `
      <p>스탠다드 용융실리카 C등급은 99.0% 이상의 SiO₂ 순도를 갖춘 산업 표준 소재로, 안정적인 열적·화학적 성능과 우수한 경제성을 동시에 제공합니다.</p>
      <h2>적용 분야</h2>
      <p>건축 및 건자재, 페인트 및 코팅, 플라스틱/고무, 연마 및 내마모재, 기타 산업용.</p>`,
  },
  {
    path: "/products/high-purity-quartz",
    title: "고품위 규석 (High-Purity Quartz) | SiLiCA",
    description:
      "국내 유일 고품위 규석 광산(장수백암광산)에서 직접 채광·1차 가공하는 고품위 규석. EGS·인조대리석·고급 유리·전자재료·나노 가공용 원료.",
    h1: "고품위 규석 (High-Purity Quartz)",
    body: `
      <p>당사는 국내 유일 고품위 규석 광산인 장수백암광산(BAR)을 직접 운영하여, 최저 99.5% 이상의 편차 없는 순도를 보장하는 고품위 규석을 공급합니다.</p>
      <h2>적용 분야</h2>
      <p>EGS / 인조대리석, 고급 유리, 전자재료, 나노 가공.</p>`,
  },
];

const routes: Route[] = [
  {
    path: "/about",
    title: "회사소개 — 국내 유일 고품위 규석 광산 직영 | SiLiCA",
    description:
      "SiLiCA는 국내 유일의 고품위 규석 광산(장수백암광산)을 직접 개발·운영하며 탐사부터 채광·1차 가공·용융·미분쇄까지 일관 공정을 자체 수행하는 석영 소재 전문기업입니다.",
    h1: "회사소개 · 국내 유일의 고품위 규석 광산을 직접 개발합니다",
    body: `
      <p>당사는 국내 유일의 고품위 규석 광산을 직접 개발·운영하며, 탐사부터 채광·1차 가공까지 자체 수행하여 최고 품질의 고품위 석영을 생산합니다. 원료 선별부터 완제품까지 각 단계의 차별화된 QC 시스템을 통해 고객의 기대를 충족합니다.</p>
      <h2>장수백암광산 (BAR)</h2>
      <p>전라북도 진안군에 위치한 현존 국내 유일의 고품위 규석 광산으로, 최저 99.5%를 유지하는 편차 없는 순도를 보장합니다.</p>
      <h2>SDR Quartz · 글로벌 파트너십</h2>
      <p>중국 장수성의 SDR Quartz는 ISO 9001 및 ISO 14001 인증을 보유하고 석영 용해·원석 선별·분쇄·미분말 가공의 4단계 전 공정을 자체 생산합니다.</p>`,
  },
  ...productRoutes,
  {
    path: "/board",
    title: "게시판 — 공지·업계 소식·기술 정보 | SiLiCA",
    description:
      "SiLiCA 공식 게시판. 공지사항, 업계 소식, 용융실리카 및 고순도 규석 관련 기술 정보를 자유롭게 공유하는 공간입니다.",
    h1: "SiLiCA 게시판",
    body: `<p>공지사항, 업계 소식, 용융실리카·고순도 규석 관련 기술 정보를 자유롭게 공유하는 SiLiCA 공식 게시판입니다.</p>`,
  },
  {
    path: "/terms",
    title: "이용약관 | SiLiCA",
    description: "SiLiCA 웹사이트의 이용약관 안내 페이지입니다.",
    h1: "이용약관",
    body: `<p>본 약관은 SiLiCA 웹사이트 이용에 관한 조건과 절차, 회원과 회사의 권리·의무 및 책임사항을 규정합니다.</p>`,
  },
  {
    path: "/privacy",
    title: "개인정보처리방침 | SiLiCA",
    description: "SiLiCA의 개인정보 수집·이용·보관·파기 절차를 안내하는 개인정보처리방침입니다.",
    h1: "개인정보처리방침",
    body: `<p>SiLiCA는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 고충을 신속히 처리하기 위해 본 처리방침을 수립·공개합니다.</p>`,
  },
];

function buildHtml(template: string, route: Route): string {
  const url = `${BASE_URL}${route.path}`;
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const escTitle = escape(route.title);
  const escDesc = escape(route.description);

  let html = template;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escTitle}</title>`);

  // meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escDesc}" />`,
  );

  // canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  );

  // og:url, og:title, og:description
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}">`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escTitle}">`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escDesc}">`);

  // twitter
  html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:url" content="${url}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escTitle}">`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escDesc}">`);

  // Replace inside #root with route-specific SEO content
  const seoBlock = `
      <noscript><p>이 사이트를 보시려면 JavaScript를 활성화해 주세요.</p></noscript>
      <div style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; color: #1a1a1a; line-height: 1.7;">
        <header><h1>${escape(route.h1)}</h1></header>
        <section>${route.body}</section>
        <footer><p>SiLiCA · 주식회사 비에이알 · 경기도 화성시 남양읍 화성로 1196 · 전화 031-356-5682</p></footer>
      </div>`;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<script/, `<div id="root">${seoBlock}\n    </div>\n    <script`);

  return html;
}

function main() {
  if (!existsSync(SOURCE)) {
    console.error(`[prerender] dist/index.html not found at ${SOURCE} — skipping.`);
    return;
  }
  const template = readFileSync(SOURCE, "utf-8");
  let count = 0;
  for (const route of routes) {
    const out = resolve(DIST, route.path.replace(/^\//, ""), "index.html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, buildHtml(template, route));
    count++;
  }
  console.log(`[prerender] generated ${count} static HTML files.`);
}

main();
