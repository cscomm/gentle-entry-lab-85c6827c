import gradeA from "@/assets/grade-a-silica.png";
import gradeB from "@/assets/grade-b-silica.png";
import gradeC from "@/assets/grade-c-silica.png";
import pProcess from "@/assets/p-process.jpg";

export type ProductDetail = {
  slug: string;
  name: string;
  enName: string;
  tagline: string;
  description: string;
  image: string;
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
    enName: "Grade B · High Purity Fused Silica",
    tagline: "산업용 정밀 공정과 첨단 소재를 위한 고품질 용융 규석",
    description:
      "B등급 용융 규석은 고순도 SiO₂ 함량과 안정적 무정형 구조를 갖춘 산업 표준급 소재로, 정밀 주조·내화·단열·고기능 충진재 등 광범위한 산업 영역에서 신뢰받는 솔루션입니다.",
    image: gradeB,
    features: [
      { title: "균일 입도", desc: "엄격한 분급으로 일관된 품질 보장" },
      { title: "우수한 내열성", desc: "고온 환경에서 변형이 적은 구조적 안정성" },
      { title: "다용도 활용", desc: "주조, 단열, 첨단 충진재까지 폭넓은 적용" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.7%" },
      { label: "Fe₂O₃", value: "≤ 100 ppm" },
      { label: "무정형상", value: "≥ 99%" },
      { label: "입도", value: "0.1 ~ 3.0 mm (조정 가능)" },
      { label: "수분", value: "< 0.1%" },
      { label: "포장", value: "25kg / 1ton 백" },
    ],
    applications: ["정밀 주조", "내화 단열재", "산업용 첨가재", "세라믹 원료"],
  },
  {
    slug: "fused-silica-powder",
    name: "C등급 용융 규석",
    enName: "Grade C · Industrial Fused Silica",
    tagline: "산업용 일반 공정에 최적화된 경제형 용융 규석",
    description:
      "C등급 용융 규석은 안정적인 품질과 경제성을 동시에 만족시키는 산업용 표준 소재입니다. 코팅·복합 소재·내화 충진재 등 일반 산업 공정에서 안정적인 성능을 발휘합니다.",
    image: gradeC,
    features: [
      { title: "경제적 솔루션", desc: "산업 공정에 최적화된 가격 대비 성능" },
      { title: "안정적인 분산성", desc: "다양한 바인더와의 우수한 혼합 특성" },
      { title: "낮은 열팽창", desc: "일반 산업 환경에서 신뢰성 있는 성능 유지" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.5%" },
      { label: "평균 입도", value: "5 ~ 50 μm" },
      { label: "비표면적", value: "1 ~ 5 m²/g" },
      { label: "수분", value: "< 0.2%" },
      { label: "외관", value: "백색 분말" },
    ],
    applications: ["산업용 코팅", "복합 소재 충진재", "내화 보조재"],
  },
  {
    slug: "high-purity-quartz",
    name: "고순도규석",
    enName: "High-Purity Quartz",
    tagline: "엄선된 천연 원료에서 출발하는 규석",
    description:
      "엄격한 광맥 선별과 정제 공정을 거친 고순도 규석은 후속 가공에서 최고의 결과를 보장합니다. SiLiCA의 원료 관리 노하우가 집약된 핵심 소재입니다.",
    image: pProcess,
    features: [
      { title: "엄선된 광원", desc: "고품질 광맥에서만 선별 채광" },
      { title: "낮은 불순물", desc: "Fe, Al, Ti 등 불순물 최소화" },
      { title: "안정 공급", desc: "장기 계약 기반의 안정적 공급망" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.5%" },
      { label: "Fe₂O₃", value: "≤ 50 ppm" },
      { label: "크기", value: "20 ~ 150 mm" },
      { label: "외관", value: "백색 / 투명 결정" },
    ],
    applications: ["용융 원료", "유리·세라믹 원료", "고순도 가공 소재"],
  },
];

export const getProductBySlug = (slug: string) =>
  productCatalog.find((p) => p.slug === slug);
