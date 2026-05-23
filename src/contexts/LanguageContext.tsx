import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ko" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx | undefined>(undefined);

const dict: Record<string, { ko: string; en: string }> = {
  // Nav
  "nav.home": { ko: "홈", en: "Home" },
  "nav.products": { ko: "제품", en: "Mineral Product" },
  "nav.about": { ko: "회사소개", en: "About" },
  "nav.applications": { ko: "응용분야", en: "Applications" },
  "nav.contact": { ko: "문의하기", en: "Contact" },
  "nav.board": { ko: "게시판", en: "Board" },
  "nav.tagline": { ko: "규석 전문 기업", en: "Silica Specialist" },

  // Board
  "board.title": { ko: "게시판", en: "Board" },
  "board.subtitle": { ko: "공지사항·업계 소식·기술 정보를 자유롭게 공유하세요.", en: "Feel free to share notices, industry news, and technical information." },
  "board.new": { ko: "글쓰기", en: "New Post" },
  "board.empty": { ko: "아직 게시글이 없습니다. 첫 글의 주인공이 되어보세요.", en: "No posts yet. Be the first to write." },
  "board.private": { ko: "비공개", en: "Private" },
  "board.public": { ko: "공개", en: "Public" },
  "board.views": { ko: "조회", en: "Views" },
  "board.author": { ko: "작성자", en: "Author" },
  "board.date": { ko: "작성일", en: "Date" },
  "board.back": { ko: "← 목록으로", en: "← Back to list" },
  "board.delete": { ko: "삭제", en: "Delete" },
  "board.deleteConfirm": { ko: "비밀번호를 입력해 주세요.", en: "Enter password to delete." },
  "board.unlock": { ko: "잠금 해제", en: "Unlock" },
  "board.lockedDesc": { ko: "이 글은 비공개입니다. 비밀번호를 입력하면 내용을 볼 수 있습니다.", en: "This post is private. Enter the password to view its content." },
  "board.wrongPw": { ko: "비밀번호가 일치하지 않습니다.", en: "Incorrect password." },
  "board.deleted": { ko: "게시글이 삭제되었습니다.", en: "Post deleted." },
  "board.created": { ko: "게시글이 등록되었습니다.", en: "Post created." },

  // Compose form
  "form.title": { ko: "제목", en: "Title" },
  "form.content": { ko: "내용", en: "Content" },
  "form.author": { ko: "작성자 이름", en: "Author Name" },
  "form.password": { ko: "비밀번호", en: "Password" },
  "form.passwordHint": { ko: "수정·삭제 및 비공개 글 열람 시 사용됩니다.", en: "Used to delete/manage this post and unlock private content." },
  "form.visibility": { ko: "공개 설정", en: "Visibility" },
  "form.publish": { ko: "등록", en: "Publish" },
  "form.cancel": { ko: "취소", en: "Cancel" },

  // Hero
  "hero.cta": { ko: "제품 살펴보기", en: "Explore Products" },
  "hero1.title": { ko: "Silica: Nature's Gift to the Future.", en: "Silica: Nature's Gift to the Future." },
  "hero1.sub": { ko: "Technology that Leads Industry", en: "Technology that Leads Industry" },
  "hero1.desc": {
    ko: "용융실리카와 실리카겔. 다양한 산업에 최적의 솔루션을 제공합니다.",
    en: "Fused silica and silica gel — optimal solutions for every industry.",
  },
  "hero2.title": { ko: "High-Purity Silica Powder", en: "High-Purity Silica Powder" },
  "hero2.sub": { ko: "A New Standard for Precision Industries", en: "A New Standard for Precision Industries" },
  "hero2.desc": {
    ko: "전자·코팅·첨단소재 산업에 적용되는 고분산 고순도 실리카 분말",
    en: "High-dispersion, high-purity silica powder for electronics, coatings, and advanced materials.",
  },

  // About section (Index)
  "about.tag": { ko: "ABOUT US", en: "ABOUT US" },
  "about.title": { ko: "실리카는 자연이 주는\n미래를 만들어 갑니다", en: "Silica Shapes the Future\nNature Has Given Us" },
  "about.p1": {
    ko: "당사는 국내에는 현재 유일한 고품위 규석 광산을 직접 개발하여 운영 중이며, 탐사부터 채광 후 1차 공정을 자체적으로 수행하여 최고 품질의 고품위 석영을 생산하고 있습니다.",
    en: "We directly operate Korea's only high-grade silica mine, performing exploration, mining, and primary processing in-house to produce the highest-quality quartz.",
  },
  "about.p2": {
    ko: "원료 선별부터 완제품까지 운영되는 각 단계의 차별화된 품질 관리 시스템을 통해 고객의 높은 기대에 부합하는 제품을 생산하고 있습니다.",
    en: "From raw-material sorting to finished products, our differentiated QC system at every stage delivers results that meet our customers' highest expectations.",
  },
  "about.p3": {
    ko: "실리카의 현지 공장은 글로벌 업체들에게 원료을 공급하고 있는 오랜 경험과 축적된 기술력을 기반으로 ISO 9001 등의 품질 관리 시스템과 작업 환경을 보유 하고 있습니다. 지속적으로 발전 하는 기술의 빠른 적용을 통하여 전자 소재 · 산업용 코팅 · 세라믹 · 내화재 · 주조 · 태양광 및 에너지 소재 및 각종 실리카 첨가물을 다양한 산업분야 전반에 최적의 실리카 솔루션을 제공합니다.",
    en: "Our ISO 9001-certified facility draws on long experience supplying raw materials to global companies. By rapidly applying evolving technology, we provide optimal silica solutions — including silica additives — for electronics, industrial coatings, ceramics, refractories, casting, solar, and energy materials across all industries.",
  },
  "about.btn": { ko: "회사 소개 보기", en: "About the Company" },

  // Products section
  "products.cat": { ko: "제품 카테고리", en: "Product Category" },
  "products.all": { ko: "전체 제품", en: "All Products" },
  "products.detail": { ko: "자세히 보기", en: "View Details" },

  // Contact
  "contact.tag": { ko: "Contact Us", en: "Contact Us" },
  "contact.title": { ko: "프로젝트의 시작,\nSilica가 함께 합니다.", en: "Let's start your project\nwith Silica." },
  "contact.desc": {
    ko: "최적의 규석 솔루션이 필요하신 모든 산업 분야의 파트너를 환영합니다.",
    en: "We welcome partners from every industry seeking the optimal silica solution.",
  },
  "contact.office": { ko: "사무실", en: "Office" },
  "contact.form": { ko: "문의 양식", en: "Inquiry Form" },
  "form.name": { ko: "이름 *", en: "Name *" },
  "form.phone": { ko: "연락처 *", en: "Phone *" },
  "form.email": { ko: "이메일", en: "Email" },
  "form.company": { ko: "회사명", en: "Company" },
  "form.message": { ko: "문의 내용 *", en: "Message *" },
  "form.send": { ko: "문의 보내기", en: "Send Inquiry" },
  "form.sending": { ko: "전송 중...", en: "Sending..." },

  // Footer
  "footer.tagline": { ko: "규석전문기업", en: "Silica Specialist" },
  "footer.terms": { ko: "이용약관", en: "Terms" },
  "footer.privacy": { ko: "개인정보처리방침", en: "Privacy Policy" },
  "footer.products": { ko: "제품", en: "Products" },
  "footer.about": { ko: "회사소개", en: "About" },
  "footer.applications": { ko: "응용분야", en: "Applications" },
  "footer.contact": { ko: "문의하기", en: "Contact" },
  "footer.hq": { ko: "본사 · 전라북도 진안군 동계로 328 · 주식회사 비에이알", en: "HQ · 328 Donggye-ro, Jinan-gun, Jeollabuk-do · BAR Co., Ltd." },
  "footer.address": { ko: "경기도 화성시 남양읍 화성로1196", en: "1196 Hwaseong-ro, Namyang-eup, Hwaseong, Gyeonggi-do" },
  "footer.products.title": { ko: "제품", en: "Products" },
  "footer.about.title": { ko: "회사소개", en: "About" },
  "footer.applications.title": { ko: "응용분야", en: "Applications" },

  // Product detail page
  "pd.overview": { ko: "제품 개요", en: "Product Overview" },
  "pd.features": { ko: "주요 특징", en: "Key Features" },
  "pd.applications": { ko: "적용 범위", en: "Applications" },
  "pd.applications.desc": { ko: "고객 산업별 맞춤형 솔루션 — 각 분야의 신뢰성 요구를 완벽히 충족합니다", en: "Tailored solutions for every industry — meeting the highest reliability standards." },
  "pd.related": { ko: "다른 제품 살펴보기", en: "Explore Other Products" },
  "pd.inquire": { ko: "제품 문의하기", en: "Inquire About This Product" },
  "pd.allProducts": { ko: "← 모든 제품 보기", en: "← View All Products" },
  "pd.spec": { ko: "제품 스펙", en: "Specifications" },
  "pd.spec.item": { ko: "항목", en: "Item" },
  "pd.spec.value": { ko: "규격", en: "Spec" },
  "pd.spec.note": { ko: "비고", en: "Note" },
  "pd.notFound": { ko: "제품을 찾을 수 없습니다", en: "Product not found" },
  "pd.toHome": { ko: "홈으로 돌아가기", en: "Back to home" },

  // Application name translations (KO key -> EN label)
  "app.반도체": { ko: "반도체", en: "Semiconductor" },
  "app.광학": { ko: "광학", en: "Optics" },
  "app.디스플레이": { ko: "디스플레이", en: "Display" },
  "app.항공/방산": { ko: "항공/방산", en: "Aerospace & Defense" },
  "app.의료": { ko: "의료", en: "Medical" },
  "app.에너지": { ko: "에너지", en: "Energy" },
  "app.태양광": { ko: "태양광", en: "Solar" },
  "app.전자/반도체": { ko: "전자/반도체", en: "Electronics / Semiconductor" },
  "app.정밀 주조": { ko: "정밀 주조", en: "Precision Casting" },
  "app.특수 소재": { ko: "특수 소재", en: "Specialty Materials" },
  "app.건축 및 건자재": { ko: "건축 및 건자재", en: "Construction Materials" },
  "app.페인트 및 코팅": { ko: "페인트 및 코팅", en: "Paints & Coatings" },
  "app.플라스틱/고무": { ko: "플라스틱/고무", en: "Plastics & Rubber" },
  "app.연마 및 내마모재": { ko: "연마 및 내마모재", en: "Abrasives & Wear-Resistant" },
  "app.기타 산업용": { ko: "기타 산업용", en: "Other Industrial" },
  "app.EGS / 인조대리석": { ko: "EGS / 인조대리석", en: "EGS / Engineered Stone" },
  "app.고급 유리": { ko: "고급 유리", en: "Premium Glass" },
  "app.전자재료": { ko: "전자재료", en: "Electronic Materials" },
  "app.나노 가공": { ko: "나노 가공", en: "Nano Processing" },
  "app.실리카겔": { ko: "실리카겔 (Silica Gel)", en: "Silica Gel" },

  // About page
  "ab.hero.tag": { ko: "ABOUT US", en: "ABOUT US" },
  "ab.hero.title": { ko: "국내 유일의 고품위\n규석 광산을\n직접 개발합니다", en: "We Operate Korea's Only\nHigh-Grade Silica Mine" },
  "ab.hero.sub": { ko: "원료부터 완제품까지, 차별화된 품질로 산업의 표준을 만듭니다.", en: "From raw material to finished product — we set the industry standard with differentiated quality." },
  "ab.back": { ko: "홈으로", en: "Back to Home" },
  "ab.overview.tag": { ko: "COMPANY OVERVIEW", en: "COMPANY OVERVIEW" },
  "ab.overview.title": { ko: "원료에서 완제품까지", en: "From Raw Material to Finished Product" },
  "ab.overview.p1": {
    ko: "당사는 국내에는 현재 유일한 고품위 규석 광산을 직접 개발하여 운영 중이며, 탐사부터 채광 후 1차 공정을 자체적으로 수행하여 최고 품질의 고품위 석영을 생산하고 있습니다.",
    en: "We directly develop and operate Korea's only high-grade silica mine, performing exploration, mining, and primary processing in-house to produce the highest-quality quartz.",
  },
  "ab.overview.p2": {
    ko: "원료 선별부터 완제품까지 운영되는 각 단계의 차별화된 품질 관리 시스템을 통해 고객의 높은 기대에 부합하는 제품을 생산하고 있습니다.",
    en: "Our differentiated QC system at every stage — from raw-material sorting to finished products — delivers results that meet our customers' highest expectations.",
  },
  "ab.overview.p3": {
    ko: "실리카의 현지 공장은 글로벌 업체들에게 원료을 공급하고 있는 오랜 경험과 축적된 기술력을 기반으로 ISO 9001 등의 품질 관리 시스템과 작업 환경을 보유 하고 있습니다. 지속적으로 발전 하는 기술의 빠른 적용을 통하여 전자 소재 · 산업용 코팅 · 세라믹 · 내화재 · 주조 · 태양광 및 에너지 소재 및 각종 실리카 첨가물을 다양한 산업분야 전반에 최적의 실리카 솔루션을 제공합니다.",
    en: "Our ISO 9001-certified facility draws on long experience supplying raw materials to global companies. By rapidly applying evolving technology, we provide optimal silica solutions — including silica additives — for electronics, industrial coatings, ceramics, refractories, casting, solar, and energy materials across all industries.",
  },
  "ab.mine.tag": { ko: "JANGSU BAEKAM MINE · BAR", en: "JANGSU BAEKAM MINE · BAR" },
  "ab.mine.title": { ko: "장수백암광산", en: "Jangsu Baekam Mine" },
  "ab.mine.p1.ko": {
    ko: "<strong>장수백암광산(BAR)</strong>의 이름은 일제강점기 때의 소재지 지명에서 유래합니다. 전라북도 장수군과 진안군 경계에 위치한 <strong>백운면(白雲面) 신송리(新松里)</strong>에 소재 (현재 지명은 진안군 동향면 신송리)했던 바, 신송리라는 원래 지명도 <strong>백암(白巖) — '흰색 광석'</strong>이라는 별칭으로 불렸던 규석(Silica Stone, 硅石)과 장석이 생산됐던 이유에서 비롯돼 명명됐던 역사를 가지고 있습니다.",
    en: "The name <strong>Jangsu Baekam Mine (BAR)</strong> comes from its historical location during the Japanese colonial era. It was located in <strong>Sinsong-ri, Baekun-myeon</strong> at the border of Jangsu-gun and Jinan-gun in Jeollabuk-do (now Sinsong-ri, Donghyang-myeon, Jinan-gun). The local nickname <strong>'Baekam (白巖) — white stone'</strong> referred to the silica stone (Silica Stone, 硅石) and feldspar mined there.",
  },
  "ab.mine.p2": {
    ko: "과거에 이미 노천 장석광산으로 알려진 광산이며, 현재는 굴진을 통한 규석을 채광하고 있습니다. <strong>현존하는 국내 유일의 고품위 규석광산</strong>으로, 가장 큰 특징은 <strong class=\"text-primary\">최저 99.5%를 유지하는 편차 없는 순도</strong>를 보장한다는 점입니다.",
    en: "Already known as an open-pit feldspar mine in the past, today silica is extracted via tunneling. As <strong>Korea's only existing high-grade silica mine</strong>, its defining feature is <strong class=\"text-primary\">consistent purity of at least 99.5% with zero deviation</strong>.",
  },
  "ab.mine.aerial": { ko: "AERIAL VIEW", en: "AERIAL VIEW" },
  "ab.mine.aerialSub": { ko: "광산 전경 — 장수 신송리", en: "Mine view — Jangsu Sinsong-ri" },
  "ab.process.tag": { ko: "MANUFACTURING PROCESS", en: "MANUFACTURING PROCESS" },
  "ab.process.title": { ko: "광산에서 첨단 산업으로", en: "From Mine to Advanced Industry" },
  "ab.process.titleAccent": { ko: "정밀한 제조 공정", en: "Precision Manufacturing" },
  "ab.process.desc": {
    ko: "자체 광산에서 채광한 고순도 원광을 1차 가공·정제·용융·미분쇄까지 일관된 공정으로 처리합니다. 단계별 품질 관리(QC)를 통해 편차 없는 순도와 균일한 입도를 보장합니다.",
    en: "High-purity ore from our own mine is processed through an integrated workflow — primary processing, refining, melting, and micro-grinding. Stage-by-stage QC ensures consistent purity and uniform particle size.",
  },
  "ab.prod.tag": { ko: "PRODUCTION PROCESS", en: "PRODUCTION PROCESS" },
  "ab.prod.title": { ko: "다양한 입도 제품", en: "Various Particle-Size Products" },
  "ab.prod.titleAccent": { ko: "생산 공정", en: "Production Process" },
  "ab.prod.desc": { ko: "다섯 단계의 정밀 공정을 통해 고순도, 균일한 품질의 제품을 만듭니다.", en: "A five-step precision process produces high-purity, uniformly sized products." },
  "ab.prod.s1.t": { ko: "인공 선별", en: "Manual Sorting" },
  "ab.prod.s1.d": { ko: "원료를 육안 및 기준에 따라 선별하여 불순물을 제거합니다.", en: "Sort raw materials visually and by standard to remove impurities." },
  "ab.prod.s2.t": { ko: "기계 분쇄", en: "Mechanical Crushing" },
  "ab.prod.s2.d": { ko: "선별된 원료를 기계로 분쇄하여 적정 크기로 조절합니다.", en: "Crush sorted materials mechanically to the proper size." },
  "ab.prod.s3.t": { ko: "철 제거", en: "Iron Removal" },
  "ab.prod.s3.d": { ko: "자력 선별을 통해 철 성분 등 금속 불순물을 제거합니다.", en: "Magnetic separation removes iron and other metal impurities." },
  "ab.prod.s4.t": { ko: "체질(분류)", en: "Sieving / Classification" },
  "ab.prod.s4.d": { ko: "체질기를 통해 입도별로 분류하여 균일한 입도의 원료를 확보합니다.", en: "Sieve and classify by grain size to ensure uniform particle size." },
  "ab.prod.s5.t": { ko: "볼 밀 가공", en: "Ball Mill Processing" },
  "ab.prod.s5.d": { ko: "볼 밀에서 미세 분쇄 및 표면 처리를 진행하여 입도를 최종 조절합니다.", en: "Ball-mill micro-grinding and surface treatment finalize particle size." },

  // SDR Quartz
  "ab.sdr.tag": { ko: "PARTNER COMPANY · JIANGSU, CHINA", en: "PARTNER COMPANY · JIANGSU, CHINA" },
  "ab.sdr.titleAccent": { ko: "Quartz Material", en: "Quartz Material" },
  "ab.sdr.p1": {
    ko: "<strong>SDR Quartz(중국 장수성)</strong>는 석영 소재 분야(용융 석영, 실리콘 미분말)에서 <strong>20년 이상의 경력</strong>을 가진 전문 경영진 및 생산 인력을 보유하고 있습니다. 용융 석영 계열 제품의 전 공정 생산 체계와 <strong>나노 분체 규소 소재 공정 기술 연구 센터</strong> 및 성급 실험실을 갖추고 있어 중국내 여러 대학 및 연구소와 장기적이고 심층적인 산학연 협력을 진행 중입니다.",
    en: "<strong>SDR Quartz (Jiangsu, China)</strong> is led by management and production staff with <strong>over 20 years of experience</strong> in quartz materials (fused quartz and silicon micro-powder). They operate a full-process production system for fused-quartz products and run a <strong>Nano-Powder Silicon Process Technology Research Center</strong> and provincial-level laboratory, conducting long-term, in-depth industry-academia collaboration with leading Chinese universities and institutes.",
  },
  "ab.sdr.p2": {
    ko: "중국에서 규석 기술의 메카인 장수성에서도 앞선 기술력으로 <strong>석영 용해, 원석 선별, 분쇄, 미분말 가공</strong>에 이르는 4단계 전 공정을 자체 생산하여, 원료부터 철저하게 품질을 관리하며 <strong class=\"text-primary\">ISO 9001 및 ISO 14001 인증</strong>을 보유하고 있습니다.",
    en: "Even in Jiangsu — China's hub for silica technology — they lead with full in-house production across all four stages: <strong>quartz melting, ore sorting, crushing, and micro-powder processing</strong>. Strict quality control from raw material onward backs their <strong class=\"text-primary\">ISO 9001 and ISO 14001 certifications</strong>.",
  },
  "ab.sdr.hq": { ko: "HEADQUARTERS", en: "HEADQUARTERS" },
  "ab.sdr.hqSub": { ko: "SDR Quartz · 중국 장수성 본사", en: "SDR Quartz · Jiangsu HQ, China" },
  "ab.sdr.mfg.tag": { ko: "FUSED SILICA · MANUFACTURING", en: "FUSED SILICA · MANUFACTURING" },
  "ab.sdr.mfg.title": { ko: "용융 실리카", en: "Fused Silica" },
  "ab.sdr.mfg.titleAccent": { ko: "제조 공정", en: "Manufacturing Process" },
  "ab.sdr.mfg.desc": { ko: "고순도 용융 실리카가 만들어지는 4단계 공정 — 최첨단 기술과 철저한 품질 관리로 최고의 제품을 만듭니다.", en: "A four-step process produces high-purity fused silica — top-tier products built on advanced technology and strict QC." },
  "ab.sdr.mfg.s1.t": { ko: "용융 석영 원석", en: "Fused Quartz Ore" },
  "ab.sdr.mfg.s1.d": { ko: "천연 고순도 석영을 원료로 사용하여 고온 전기 용해로에서 1750℃ 이상의 온도로 용융하여 불순물을 제거합니다.", en: "Natural high-purity quartz is melted at 1750℃+ in a high-temperature electric furnace to remove impurities." },
  "ab.sdr.mfg.s2.t": { ko: "등급 분류", en: "Grade Classification" },
  "ab.sdr.mfg.s2.d": { ko: "첨단 정밀 검사 장비를 통해 내부 결함, 기포, 불순물 등을 정밀하게 검사하고, 품질 등급에 따라 분류합니다.", en: "Advanced inspection equipment checks internal defects, bubbles, and impurities, then classifies by quality grade." },
  "ab.sdr.mfg.s3.t": { ko: "입자 분쇄", en: "Particle Crushing" },
  "ab.sdr.mfg.s3.d": { ko: "분류된 용융 석영을 특수 장비로 입자 크기에 맞게 파쇄 및 분쇄하여 다양한 용도에 적합한 입자 형태로 가공합니다.", en: "Classified fused quartz is broken down and crushed with specialized equipment into particle forms suited to varied applications." },
  "ab.sdr.mfg.s4.t": { ko: "미분 가공", en: "Micro-Powder Processing" },
  "ab.sdr.mfg.s4.d": { ko: "파쇄된 입자를 초미세 분말로 가공하여 높은 순도와 균일한 입도를 가진 미분 석영을 생산합니다.", en: "Crushed particles become ultra-fine powder, yielding micro-powder quartz with high purity and uniform particle size." },
  "ab.qc.title": { ko: "엄격한 품질 관리", en: "Strict Quality Control" },
  "ab.qc.q1.t": { ko: "고순도", en: "High Purity" },
  "ab.qc.q1.d": { ko: "불순물 최소화로 최고의 순도 보장", en: "Minimal impurities for maximum purity" },
  "ab.qc.q2.t": { ko: "균일한 품질", en: "Uniform Quality" },
  "ab.qc.q2.d": { ko: "정밀한 공정 관리로 일정한 품질 유지", en: "Precise process control for consistent quality" },
  "ab.qc.q3.t": { ko: "안정성", en: "Stability" },
  "ab.qc.q3.d": { ko: "우수한 물리·화학적 안정성 제공", en: "Excellent physical & chemical stability" },
  "ab.qc.q4.t": { ko: "신뢰성", en: "Reliability" },
  "ab.qc.q4.d": { ko: "철저한 검사와 검증으로 높은 신뢰성 확보", en: "High reliability through rigorous inspection" },
  "ab.qc.q5.t": { ko: "맞춤 솔루션", en: "Custom Solutions" },
  "ab.qc.q5.d": { ko: "고객 요구에 맞춘 다양한 제품 공급", en: "Diverse products tailored to client needs" },

  // Photo captions
  "ab.cap.tunnel": { ko: "갱도 채광 현장", en: "Tunnel mining site" },
  "ab.cap.ore": { ko: "채광된 고품위 규석 원광", en: "Mined high-grade silica ore" },
  "ab.cap.plant": { ko: "가공 플랜트 내부", en: "Inside the processing plant" },
  "ab.cap.building": { ko: "(주)BAR 사업장 외관", en: "BAR Co., Ltd. facility" },
  "ab.cap.warehouse": { ko: "원료 야적 창고", en: "Raw material warehouse" },
  "ab.cap.ingot": { ko: "용융 석영 잉곳", en: "Fused quartz ingot" },
  "ab.cap.line": { ko: "미분말 가공 라인", en: "Micro-powder processing line" },
  "ab.cap.furnace": { ko: "고온 전기 용해로 작업", en: "High-temperature electric furnace" },
  "ab.cap.sdrhq": { ko: "SDR Quartz 본사 외관", en: "SDR Quartz headquarters" },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ko";
    return (localStorage.getItem("lang") as Lang) || "ko";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
