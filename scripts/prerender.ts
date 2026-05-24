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
    title: "A등급 용융실리카 (Ultra-High Purity Fused Silica) | SiLiCA",
    description:
      "SiO₂ 99.9% 이상, 100% 무정형 구조의 초고순도 용융실리카 A등급. 열팽창 0.6×10⁻⁶/°C 이하, EC 3µs/cm 미만의 반도체·광학·항공/방산·의료·에너지용 최고 등급 소재.",
    h1: "A등급 용융실리카 — 초고순도 (Grade A · Ultra-High Purity Fused Silica)",
    body: `
      <p><strong>A등급 용융실리카(Grade A · Ultra-High Purity Fused Silica)</strong>는 SiLiCA가 공급하는 최상위 등급의 용융실리카로, SiO₂ 순도 99.9% 이상과 100% 무정형 구조를 보유합니다. 자체 광산(장수백암광산)에서 채광한 고품위 규석을 원료로 전기 아크 용융 후 정밀 분쇄·등급화하여 생산하며, 반도체·광학·항공/방산·의료·에너지 등 최고 수준의 신뢰성과 순도가 요구되는 첨단 산업에 공급됩니다.</p>

      <h2>제품 개요</h2>
      <p>완전 무정형(amorphous) 구조 덕분에 1000°C 이상의 고온 환경에서도 결정화(devitrification)나 부피 변화가 사실상 발생하지 않으며, 0.6×10⁻⁶/°C 이하의 극저 열팽창계수로 급격한 열충격에서도 치수 안정성을 유지합니다. 금속 불순물 합계 0.03% 미만, 수성추출액 EC 3µs/cm 미만, Cl 3ppm 미만으로 반도체 공정 오염 및 절연 저하 요인을 원천 차단합니다.</p>

      <h2>주요 특징</h2>
      <ul>
        <li><strong>100% 무정형 구조</strong> — 고온 결정화·수축·균열 없음</li>
        <li><strong>극저 열팽창</strong> — 0.6 × 10⁻⁶/°C 이하, 열충격 내성 최상급</li>
        <li><strong>초고순도 관리</strong> — Al &lt; 0.01%, Fe &lt; 0.005%, Na/K/Ca &lt; 0.003%</li>
        <li><strong>고전기절연성</strong> — EC &lt; 3 µs/cm, Cl &lt; 3 ppm</li>
        <li><strong>맞춤 입도</strong> — 60mm 과립부터 1µm(12,500 메쉬) 미분까지</li>
        <li><strong>안정 공급</strong> — 자체 광산 + ISO 9001·22000 기반 일관 QC</li>
      </ul>

      <h2>대표 화학·물리 스펙</h2>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%; margin:12px 0;">
        <thead><tr><th>항목</th><th>값</th><th>비고</th></tr></thead>
        <tbody>
          <tr><td>SiO₂ (순도)</td><td>≥ 99.9%</td><td>초고순도</td></tr>
          <tr><td>Al (알루미늄)</td><td>&lt; 0.01%</td><td>극미량</td></tr>
          <tr><td>Fe (철)</td><td>&lt; 0.005%</td><td>극미량</td></tr>
          <tr><td>K / Na / Ca</td><td>&lt; 0.003%</td><td>알칼리·알칼리토 최소화</td></tr>
          <tr><td>Mg (마그네슘)</td><td>&lt; 0.001%</td><td>극미량</td></tr>
          <tr><td>무정형상 (Amorphous)</td><td>100%</td><td>완전 무정형</td></tr>
          <tr><td>열팽창계수</td><td>&lt; 0.6 × 10⁻⁶/°C</td><td>초저팽창</td></tr>
          <tr><td>밀도 (Density)</td><td>1.8 – 2.4 × 10³ kg/m³</td><td>균일</td></tr>
          <tr><td>모스경도 (Mohs)</td><td>7</td><td>내마모성</td></tr>
          <tr><td>수성추출액 EC / Cl / pH</td><td>&lt; 3 µs/cm / &lt; 3 ppm / 6.5 ± 1</td><td>고절연·중성 안정</td></tr>
          <tr><td>수분 (Moisture)</td><td>&lt; 0.1%</td><td>건조 관리</td></tr>
        </tbody>
      </table>

      <h2>적용 분야 (Applications)</h2>
      <ul>
        <li><strong>반도체</strong> — 확산/산화용 보트, 웨이퍼 캐리어, RTP 챔버 부품, 플라즈마 에칭 윈도우, 고순도 웨이퍼 카세트</li>
        <li><strong>광학</strong> — UV~IR 광학 윈도우, 고출력 레이저 거울, 리소그래피 렌즈, 광섬유 프리폼, 우주망원경 광학계</li>
        <li><strong>디스플레이</strong> — OLED 증착 마스크 지지대, 유리 기판 반송 부품, 건식 에칭 챔버 부품</li>
        <li><strong>항공/방산</strong> — 위성 광학 부품, 미사일 돔, 적외선 탐지기 윈도우, 열충격 보호 커버</li>
        <li><strong>의료</strong> — 분석용 큐벳, 생물반응기 윈도우, 진단 장비 부품, 의료용 광섬유 부품</li>
        <li><strong>에너지</strong> — 고온 수소 연료전지, 태양광 확산관, 고온 절연 부품</li>
      </ul>

      <h2>품질 보증 및 공급</h2>
      <p>SiLiCA는 자체 광산 채광 → 1차 가공 → 전기 아크 용융 → 정밀 분쇄 → 등급화 → 출하의 전 공정을 자체적으로 수행하며, ISO 9001 및 ISO 22000 품질 관리 시스템과 자체 분석실(XRF·ICP·입도분석)을 기반으로 lot 단위 성적서를 제공합니다. 입도·포장(25kg 크라프트, 500/1000kg 톤백) 및 OEM 사양 대응이 가능합니다.</p>`,
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
  {
    path: "/products/silica-gel",
    title: "실리카겔 (Silica Gel) — 미분 실리카·안티블로킹·소광제·흡착 실리카겔 | SiLiCA",
    description:
      "SiLiCA의 실리카겔 라인업 — 고순도 미분 실리카(Microsilica), 안티블로킹제, 소광제(Matting Agent), 대공극·조공극·A형·B형 실리카겔 및 내수(FNG) 실리카겔까지 8종 제품을 한곳에서 확인하세요.",
    h1: "실리카겔 · Silica Gel — 8종 제품 라인업",
    body: `
      <p>SiLiCA의 실리카겔(Silica Gel) 라인업은 고순도 이산화규소(SiO₂) 기반의 정밀 무기 소재로, 흡착·건조·소광·안티블로킹·미분 충진재 등 광범위한 산업 공정에서 사용됩니다.</p>
      <h2>제품 라인업 (총 8종)</h2>
      <ul>
        <li>미분 실리카 (Micronized Silica Powder) — 입자 3–10 µm</li>
        <li>안티블로킹제 (Anti-blocking Agent) — 입자 2–10 µm, SiO₂ 99%</li>
        <li>소광제 (Matting Agent) — 입자 D50 3.5–10 µm</li>
        <li>대공극 실리카겔 (Large Pore Silica Gel) — 기공 16–25 nm</li>
        <li>내수 실리카겔 FNG (Water-Resistant) — 가혹 환경 전용</li>
        <li>조공극 실리카겔 (Coarse Pore Silica Gel) — 기공 8–12.5 nm</li>
        <li>A형 실리카겔 (Type A) — 비표면적 650–800 m²/g</li>
        <li>B형 실리카겔 (Type B) — 기공 4.5–7.0 nm</li>
      </ul>`,
  },
  // ───────── 실리카겔 하위 제품 (각 페이지 고유 canonical/title/description) ─────────
  ...(
    [
      {
        slug: "silica-gel-microsilica",
        ko: "미분 실리카 (Microsilica)",
        en: "Micronized Silica Powder",
        desc: "고순도 SiO₂ 기반 초미세 분말(3–10µm). 충진재·보강재·고활성 무기 정밀 소재로 사용되는 SiLiCA 미분 실리카(Microsilica).",
        body: `<p>미분 실리카(Micronized Silica Powder)는 고순도 이산화규소(SiO₂)를 특수 공정으로 가공한 초미세 분말로, 입자 크기 3–10µm의 고활성·다공성 무기 정밀 소재입니다.</p><h2>주요 스펙</h2><ul><li>입자 크기: 3 – 10 µm</li><li>포장/규격: 고객 맞춤 제작</li></ul><h2>주요 용도</h2><p>고분자 충진·보강재, 고기능성 코팅, 정밀 무기 소재.</p>`,
      },
      {
        slug: "silica-gel-anti-blocking",
        ko: "플라스틱 안티블로킹제 (Anti-blocking Agent)",
        en: "Anti-blocking Agent",
        desc: "SiO₂ 99% 고순도 실리카 기반 안티블로킹제. 입자 2–10µm, 비표면적 20–380 m²/g로 필름·시트의 블로킹을 방지합니다.",
        body: `<p>플라스틱 안티블로킹제(Anti-blocking Agent)는 고순도 실리카 기반으로 필름·시트의 접착(블로킹)을 방지하면서 우수한 광학 투명성을 유지합니다.</p><h2>주요 스펙</h2><ul><li>입자 크기: 2 – 10 µm</li><li>비표면적: 20 – 380 m²/g</li><li>흡유량: 150 – 300 ml/100g</li><li>벌크 밀도: 50 – 300 kg/m³</li><li>SiO₂ 순도: 99%</li></ul><h2>주요 용도</h2><p>PE/PP/PET 필름, 라미네이션 필름, 포장재 안티블로킹.</p>`,
      },
      {
        slug: "silica-gel-matting",
        ko: "소광제 (Matting Agent)",
        en: "Matting Agent",
        desc: "도료·코팅용 소광제. D50 3.5–10µm, 흡유량 100–330 ml/100g, 왁스 처리/무처리 옵션의 SiLiCA Matting Agent.",
        body: `<p>소광제(Matting Agent)는 도료·코팅 시스템에 균일한 무광 효과와 우수한 분산성을 제공하는 실리카 기반 첨가제입니다.</p><h2>주요 스펙</h2><ul><li>입자 크기 D50: 3.5 – 10 µm</li><li>흡유량: 100 – 330 ml/100g</li><li>pH: 3.5 – 8</li><li>기공 부피: 0.4 – 2.2 ml/g</li><li>표면 처리: 왁스 처리 / 무처리</li><li>건조 감량(105℃): ≤ 5% / 강열 감량(1000℃): ≤ 6%</li></ul><h2>주요 용도</h2><p>UV 도료, 우드 코팅, 자동차 보수도료, 인쇄 잉크.</p>`,
      },
      {
        slug: "silica-gel-large-pore",
        ko: "대공극 실리카겔 (Large Pore Silica Gel)",
        en: "Large Pore Volume Silica Gel",
        desc: "기공 직경 16–25 nm, 기공 부피 1.2–2.2 ml/g의 대공극·고비표면적 실리카겔. 분자 흡착·촉매 담체용 최적화.",
        body: `<p>대공극 실리카겔(Large Pore Volume Silica Gel)은 큰 기공 직경과 높은 기공 부피로 분자 흡착·촉매 담체용에 최적화된 실리카겔입니다.</p><h2>주요 스펙</h2><ul><li>기공 직경: 16 – 25 nm</li><li>비표면적: 200 – 350 m²/g</li><li>기공 부피: 1.2 – 2.2 ml/g</li></ul><h2>주요 용도</h2><p>촉매 담체, 대분자 흡착, 크로마토그래피 충전재.</p>`,
      },
      {
        slug: "silica-gel-fng",
        ko: "내수 실리카겔 FNG (Water-Resistant)",
        en: "FNG Water-Resistant Silica Gel",
        desc: "가혹 환경 전용 고성능 내수 실리카겔 FNG. 우수한 내수성·내후성·화학적 안정성을 갖춘 SiLiCA 특수 흡습 소재.",
        body: `<p>내수 실리카겔 FNG(Water-Resistant Silica Gel)는 고온·고습 등 가혹 환경에서도 안정적으로 동작하도록 설계된 고성능 내수 실리카 소재입니다.</p><h2>주요 특성</h2><ul><li>내수성 · 내후성 · 화학적 안정성</li><li>포장/규격: 고객 맞춤 제작</li></ul><h2>주요 용도</h2><p>해상 운송 컨테이너, 군수·산업 장비 방습, 고온다습 환경 흡습.</p>`,
      },
      {
        slug: "silica-gel-coarse",
        ko: "조공극 실리카겔 (Coarse Pore Silica Gel)",
        en: "Coarse Pore Silica Gel",
        desc: "기공 8–12.5 nm, 비표면적 300–400 m²/g의 중간 기공 범용 흡착 실리카겔. 산업용 흡착·건조·정제 공정에 최적.",
        body: `<p>조공극 실리카겔(Coarse Pore Silica Gel)은 균형 잡힌 중간 기공 구조로 다양한 산업용 흡착·건조·정제 공정에 사용됩니다.</p><h2>주요 스펙</h2><ul><li>기공 직경: 8 – 12.5 nm</li><li>비표면적: 300 – 400 m²/g</li><li>기공 부피: 0.8 – 1.0 ml/g</li></ul><h2>주요 용도</h2><p>가스 건조, 용제 정제, 산업용 흡착 공정.</p>`,
      },
      {
        slug: "silica-gel-type-a",
        ko: "A형 실리카겔 (Type A)",
        en: "Silica Gel Type A",
        desc: "기공 2–3 nm, 비표면적 650–800 m²/g의 미세기공·고비표면적 표준 흡착용 실리카겔. 건조제·흡습제 표준품.",
        body: `<p>A형 실리카겔(Silica Gel Type A)은 미세기공과 매우 높은 비표면적을 가진 표준 흡착용 실리카겔로, 건조제·흡습제 등에 폭넓게 사용됩니다.</p><h2>주요 스펙</h2><ul><li>기공 직경: 2.0 – 3.0 nm</li><li>비표면적: 650 – 800 m²/g</li><li>기공 부피: 0.4 – 0.5 ml/g</li></ul><h2>주요 용도</h2><p>식품·전자제품 포장 방습제, 산업 건조제, 정밀기기 흡습.</p>`,
      },
      {
        slug: "silica-gel-type-b",
        ko: "B형 실리카겔 (Type B)",
        en: "Silica Gel Type B",
        desc: "기공 4.5–7 nm, 비표면적 450–650 m²/g의 중간 기공 다용도 실리카겔. 습도 변화가 큰 환경의 흡습에 최적.",
        body: `<p>B형 실리카겔(Silica Gel Type B)은 중간 크기 기공과 적정한 비표면적을 갖춘 다목적 실리카겔로, 습도 변화가 큰 환경의 흡습 용도에 적합합니다.</p><h2>주요 스펙</h2><ul><li>기공 직경: 4.5 – 7.0 nm</li><li>비표면적: 450 – 650 m²/g</li><li>기공 부피: 0.6 – 0.85 ml/g</li></ul><h2>주요 용도</h2><p>고습 환경 흡습, 항습 패키징, 산업용 다목적 흡착.</p>`,
      },
    ] as const
  ).map((p) => ({
    path: `/products/${p.slug}`,
    title: `${p.ko} | SiLiCA 실리카겔`,
    description: p.desc,
    h1: `${p.ko} · ${p.en}`,
    body: p.body,
  })),

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
