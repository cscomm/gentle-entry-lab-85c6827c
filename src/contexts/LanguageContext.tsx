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
  "nav.tagline": { ko: "규석 전문 기업", en: "Silica Specialist" },

  // Hero
  "hero.cta": { ko: "제품 살펴보기", en: "Explore Products" },
  "hero1.title": { ko: "Silica: Nature's Gift to the Future.", en: "Silica: Nature's Gift to the Future." },
  "hero1.sub": { ko: "Technology that Leads Industry", en: "Technology that Leads Industry" },
  "hero1.desc": {
    ko: "용융실리카와 고품위 실리카. 다양한 산업에 최적의 솔루션을 제공합니다.",
    en: "Fused silica and high-purity silica — optimal solutions for every industry.",
  },
  "hero2.title": { ko: "High-Purity Silica Powder", en: "High-Purity Silica Powder" },
  "hero2.sub": { ko: "A New Standard for Precision Industries", en: "A New Standard for Precision Industries" },
  "hero2.desc": {
    ko: "전자·코팅·첨단소재 산업에 적용되는 고분산 고순도 실리카 분말",
    en: "High-dispersion, high-purity silica powder for electronics, coatings, and advanced materials.",
  },

  // About section (Index)
  "about.tag": { ko: "ABOUT US", en: "ABOUT US" },
  "about.title": { ko: "국내 유일의 고품위\n규석 광산을\n직접 개발합니다", en: "We Operate Korea's Only\nHigh-Grade Silica Mine" },
  "about.p1": {
    ko: "당사는 국내에는 현재 유일한 고품위 규석 광산을 직접 개발하여 운영 중이며, 탐사부터 채광 후 1차 공정을 자체적으로 수행하여 최고 품질의 고품위 석영을 생산하고 있습니다.",
    en: "We directly operate Korea's only high-grade silica mine, performing exploration, mining, and primary processing in-house to produce the highest-quality quartz.",
  },
  "about.p2": {
    ko: "원료 선별부터 완제품까지 운영되는 각 단계의 차별화된 품질 관리 시스템을 통해 고객의 높은 기대에 부합하는 제품을 생산하고 있습니다.",
    en: "From raw-material sorting to finished products, our differentiated QC system at every stage delivers results that meet our customers' highest expectations.",
  },
  "about.p3": {
    ko: "용융실리카의 현지 공장은 ISO 9001 품질 관리 시스템 인증을 보유한 작업 환경에서 전자 소재 · 산업용 코팅 · 세라믹 · 내화재 · 주조 · 태양광 및 에너지 소재 등 다양한 산업 분야에 최적의 솔루션을 제공합니다.",
    en: "Our fused-silica facility is ISO 9001-certified, supplying optimal solutions for electronics, industrial coatings, ceramics, refractories, casting, solar, and energy materials.",
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
  "footer.address": { ko: "경기도 화성시 남양읍 수작이길 55", en: "55 Sujagi-gil, Namyang-eup, Hwaseong, Gyeonggi-do" },
  "footer.products.title": { ko: "제품", en: "Products" },
  "footer.about.title": { ko: "회사소개", en: "About" },
  "footer.applications.title": { ko: "응용분야", en: "Applications" },
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
