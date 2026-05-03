import gradeA from "@/assets/grade-a-silica.png";
import gradeADetail from "@/assets/grade-a-detail.png";
import gradeB from "@/assets/grade-b-silica.png";
import gradeBDetail from "@/assets/grade-b-detail.png";
import gradeC from "@/assets/grade-c-silica.png";
import gradeCDetail from "@/assets/grade-c-detail.png";
import pProcess from "@/assets/p-process.jpg";
import hpqDetail from "@/assets/hpq-detail.jpg";

export type ProductDetail = {
  slug: string;
  name: string;
  enName: string;
  tagline: string;
  description: string;
  image: string;
  detailImage?: string;
  features: { title: string; desc: string }[];
  specs: { label: string; value: string; note?: string }[];
  applications: string[];
};

export const productCatalog: ProductDetail[] = [
  {
    slug: "fused-silica-block",
    name: "A등급 용융 규석",
    enName: "Grade A · Ultra-High Purity Fused Silica",
    tagline: "반도체 공정의 신뢰를 완성하는 100% 무정형 초정밀 소재",
    description:
      "초고순도 용융 실리카 A등급은 99.9% 이상의 SiO₂ 순도와 100% 무정형 구조를 갖춘 최고 등급의 용융 실리카입니다. 반도체·광학·항공/방산·의료·에너지 등 최고 수준의 신뢰성이 요구되는 첨단 산업에 공급됩니다.",
    image: gradeA,
    detailImage: gradeADetail,
    features: [
      { title: "🔬 완벽한 무정형 구조", desc: "100% 무정형으로 고온에서도 결정화·변형 제로" },
      { title: "🌡️ 극저열팽창", desc: "열팽창계수 < 0.6 (×10⁻⁶/°C) — 열충격에 매우 강함" },
      { title: "🧼 초고순도 관리", desc: "금속 불순물 합계 < 0.03%, 반도체 수율 저하 요인 차단" },
      { title: "⚡ 고전기절연성", desc: "EC < 3 µs/cm, Cl < 3 ppm — 전자 부품 절연 최적화" },
      { title: "🔧 맞춤형 입도", desc: "60mm 과립부터 1µm(12500 메쉬) 미분까지 가공 가능" },
      { title: "✅ 안정 공급", desc: "엄격한 QC와 자체 광산 기반의 안정적 공급망" },
    ],
    specs: [
      { label: "SiO₂ (순도)", value: "≥ 99.9%", note: "초고순도" },
      { label: "Al (알루미늄)", value: "< 0.01%", note: "극미량" },
      { label: "Fe (철)", value: "< 0.005%", note: "극미량" },
      { label: "K (칼륨)", value: "< 0.003%", note: "극미량" },
      { label: "Na (나트륨)", value: "< 0.003%", note: "극미량" },
      { label: "Ca (칼슘)", value: "< 0.003%", note: "극미량" },
      { label: "Mg (마그네슘)", value: "< 0.001%", note: "극미량" },
      { label: "무정형상 (Amorphous)", value: "100%", note: "완전 무정형" },
      { label: "열팽창계수", value: "< 0.6 (×10⁻⁶/°C)", note: "초저팽창" },
      { label: "수분 (Moisture)", value: "< 0.1%", note: "건조 관리" },
      { label: "밀도 (Density)", value: "1.8 – 2.4 ×10³ kg/m³", note: "균일" },
      { label: "모스경도 (Mohs)", value: "7", note: "내마모성" },
      { label: "수성추출액 EC", value: "< 3 µs/cm", note: "고절연" },
      { label: "수성추출액 Cl", value: "< 3 ppm", note: "초저염소" },
      { label: "수성추출액 pH", value: "6.5 ± 1", note: "중성 안정" },
    ],
    applications: ["반도체", "광학", "디스플레이", "항공/방산", "의료", "에너지"],
  },
  {
    slug: "fused-silica-sand",
    name: "B등급 용융 규석",
    enName: "Grade B · Premium Fused Silica",
    tagline: "고순도와 열적 안정성의 최적 균형, 에너지 및 정밀 산업의 표준",
    description:
      "프리미엄 용융 실리카 B등급은 99.5% 이상의 SiO₂ 순도와 98% 이상의 무정형 구조를 갖춘 고품질 소재입니다. 태양광·전자/반도체·정밀 주조·특수 소재 등 고신뢰성이 요구되는 산업에 폭넓게 공급됩니다.",
    image: gradeB,
    detailImage: gradeBDetail,
    features: [
      { title: "🔥 우수한 열적 안정성", desc: "98% 이상 무정형 + 열팽창 < 0.8 → 고온 환경 균일 성능 보장" },
      { title: "🧪 철저한 불순물 관리", desc: "Al, Fe 등 ppm 단위 제어 → 화학적 부식 및 변색 방지" },
      { title: "✨ 고품질 외관", desc: "무색 투명 또는 고순도 백색 분말 → 최종 제품 신뢰성 향상" },
      { title: "⚙️ 맞춤형 입도 제어", desc: "60mm 과립 ~ 1µm(12500 메쉬) 미분 → 공정 최적화 가능" },
    ],
    specs: [
      { label: "SiO₂ (순도)", value: "> 99.5%", note: "고순도 정제" },
      { label: "Al (알루미늄)", value: "< 0.03%", note: "화학적 안정성" },
      { label: "Fe (철)", value: "< 0.02%", note: "저철분 관리" },
      { label: "K (칼륨)", value: "< 0.01%", note: "알칼리 최소화" },
      { label: "Na (나트륨)", value: "< 0.01%", note: "알칼리 최소화" },
      { label: "Ca (칼슘)", value: "< 0.01%", note: "불순물 제어" },
      { label: "Mg (마그네슘)", value: "< 0.003%", note: "미량 관리" },
      { label: "무정형상 (Amorphous)", value: "> 98%", note: "우수한 열적 특성" },
      { label: "열팽창계수", value: "< 0.8 (×10⁻⁶/°C)", note: "내열충격성 우수" },
      { label: "수분 (Moisture)", value: "< 0.1%", note: "초건조 상태" },
      { label: "밀도 (Density)", value: "1.8 – 2.4 ×10³ kg/m³", note: "표준 밀도" },
    ],
    applications: ["태양광", "전자/반도체", "정밀 주조", "특수 소재"],
  },
  {
    slug: "fused-silica-powder",
    name: "C등급 용융 규석",
    enName: "Grade C · Industrial Fused Silica",
    tagline: "경제성과 실용성을 갖춘 범용 산업 소재",
    description:
      "산업용 용융 실리카 C등급은 99% 이상의 SiO₂ 순도와 95% 이상의 무정형 구조를 갖춘 경제형 소재입니다. 건축·코팅·플라스틱·연마 등 광범위한 산업 영역에서 안정적인 성능을 발휘합니다.",
    image: gradeC,
    detailImage: gradeCDetail,
    features: [
      { title: "🧱 안정적 무정형 구조", desc: "95% 이상 무정형상 → 열적·화학적 안정성 확보" },
      { title: "💰 경제적 원가 구조", desc: "대량 산업용으로 최적화된 가격 경쟁력" },
      { title: "🧪 우수한 내화학성", desc: "산·알칼리·유기용제에 대한 높은 내구성" },
      { title: "⚙️ 폭넓은 입도 지원", desc: "과립(60mm) ~ 미분(1µm) 고객 맞춤 생산 가능" },
    ],
    specs: [
      { label: "SiO₂ (순도)", value: "> 99%", note: "일반 산업용" },
      { label: "Al (알루미늄)", value: "< 0.1%", note: "허용 범위" },
      { label: "Fe (철)", value: "< 0.04%", note: "허용 범위" },
      { label: "K (칼륨)", value: "< 0.05%", note: "허용 범위" },
      { label: "Na (나트륨)", value: "< 0.05%", note: "허용 범위" },
      { label: "Ca (칼슘)", value: "< 0.05%", note: "허용 범위" },
      { label: "Mg (마그네슘)", value: "< 0.01%", note: "허용 범위" },
      { label: "무정형상 (Amorphous)", value: "> 95%", note: "안정적 무정형" },
      { label: "열팽창계수", value: "< 1.2 (×10⁻⁶/°C)", note: "내열충격성 확보" },
      { label: "수분 (Moisture)", value: "< 0.1%", note: "건조 관리" },
      { label: "밀도 (Density)", value: "1.8 – 2.4 ×10³ kg/m³", note: "균일" },
      { label: "모스경도 (Mohs)", value: "7", note: "내마모성" },
    ],
    applications: ["건축 및 건자재", "페인트 및 코팅", "플라스틱/고무", "연마 및 내마모재", "기타 산업용"],
  },
  {
    slug: "high-purity-quartz",
    name: "천연 고순도규석",
    enName: "Natural High-Purity Quartz",
    tagline: "SiO₂ 99.77%, Fe₂O₃ 5ppm, 백색도 L 97.92 — EGS 및 고급 유리의 기준",
    description:
      "프리미엄 천연 고순도 쿼츠는 엄격한 광맥 선별과 정제 공정을 거쳐 SiO₂ 99.77%, Fe₂O₃ 5ppm 수준의 초고순도와 L 97.92의 최상급 백색도를 달성합니다. EGS·인조대리석, 고급 유리, 전자재료, 정밀 주조, 나노 가공 등 부가가치가 높은 산업의 기초 소재로 사용됩니다.",
    image: pProcess,
    detailImage: hpqDetail,
    features: [
      { title: "🧱 압도적 순도", desc: "SiO₂ 99.773% — EGS·특수 유리·전자재료 기초 소재로 적합" },
      { title: "🧼 초저 철분", desc: "Fe₂O₃ 5ppm — 황변 없이 투명도 및 백색도 핵심 유지" },
      { title: "⚡ 우수한 절연 성능", desc: "EC 2.12 µs/cm — 전자재료 충진재(Filler) 신뢰성 확보" },
      { title: "✨ 최상급 백색도", desc: "L 97.92 — 고급 인조대리석·건축 내외장재 최적" },
      { title: "📐 균일 입도", desc: "1~10mm 균일 입도로 후속 공정 효율 극대화" },
      { title: "🧪 중성 안정", desc: "pH 6.73 — 다양한 화학 공정에 적용 가능" },
    ],
    specs: [
      { label: "SiO₂ (이산화규소)", value: "99.773%", note: "초고순도" },
      { label: "Fe₂O₃ (산화철)", value: "5 ppm", note: "극저 철분 (핵심)" },
      { label: "TiO₂ (산화타이타늄)", value: "9 ppm", note: "미량" },
      { label: "Al₂O₃ (산화알루미늄)", value: "1053 ppm", note: "일반 수준" },
      { label: "백색도 (Whiteness L)", value: "97.92", note: "최상급 백색도" },
      { label: "전기전도도 (E.C)", value: "2.12 µs/cm", note: "절연성 우수" },
      { label: "pH (수소이온농도)", value: "6.73", note: "중성 안정" },
      { label: "입도 (Grain Size)", value: "1 ~ 10 mm", note: "균일 입도" },
    ],
    applications: ["EGS / 인조대리석", "고급 유리", "전자재료", "정밀 주조", "나노 가공"],
  },
];

export const getProductBySlug = (slug: string) =>
  productCatalog.find((p) => p.slug === slug);
