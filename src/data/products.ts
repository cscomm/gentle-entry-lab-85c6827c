import pBlockA from "@/assets/p-block-a.jpg";
import pSandA from "@/assets/p-sand-a.jpg";
import pPowder from "@/assets/p-powder.jpg";
import pProcess from "@/assets/p-process.jpg";
import pQuality from "@/assets/p-quality.jpg";

export type ProductDetail = {
  slug: string;
  name: string;
  enName: string;
  tagline: string;
  description: string;
  image: string;
  features: { title: string; desc: string }[];
  specs: { label: string; value: string }[];
  applications: string[];
};

export const productCatalog: ProductDetail[] = [
  {
    slug: "fused-silica-block",
    name: "용융규석",
    enName: "Fused Silica Block",
    tagline: "최고급 융편석영 블록 — 반도체 및 정밀 광학 소재의 기준",
    description:
      "고온 용융 공정을 통해 제조된 용융규석 블록은 99.9% 이상의 고순도 SiO₂를 포함하며, 우수한 열적 안정성과 화학적 내구성을 제공합니다. 반도체, 광학, 첨단 산업의 핵심 소재로 사용됩니다.",
    image: pBlockA,
    features: [
      { title: "고순도", desc: "SiO₂ ≥ 99.9% 의 안정적 화학 조성" },
      { title: "내열성", desc: "1700°C 이상의 고온 환경에서도 형상 안정" },
      { title: "저열팽창", desc: "열충격 저항성으로 정밀 가공에 적합" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.9%" },
      { label: "밀도", value: "2.20 g/cm³" },
      { label: "연화점", value: "1650°C" },
      { label: "형상", value: "블록 / 커스텀 가공" },
    ],
    applications: ["반도체 공정 부재", "광학 렌즈 원료", "고온 내화 소재"],
  },
  {
    slug: "fused-silica-sand",
    name: "용융규사",
    enName: "Fused Silica Sand",
    tagline: "정밀 주조와 첨단 산업 소재를 위한 고품질 용융규사",
    description:
      "균일한 입도 분포와 낮은 불순물 함량을 갖춘 용융규사는 정밀 주조, 내화재, 단열 소재 분야에서 탁월한 성능을 발휘합니다. 다양한 입도 조정이 가능하여 산업 맞춤형 공급이 가능합니다.",
    image: pSandA,
    features: [
      { title: "입도 균일성", desc: "엄격한 분급으로 균일한 품질 보장" },
      { title: "내화성", desc: "고온 환경에서도 변형이 적은 안정성" },
      { title: "다용도", desc: "주조, 단열, 첨단 소재까지 폭넓게 활용" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.7%" },
      { label: "입도", value: "0.1 ~ 3.0 mm (조정 가능)" },
      { label: "수분", value: "< 0.1%" },
      { label: "포장", value: "25kg / 1ton 백" },
    ],
    applications: ["정밀 주조", "내화 단열재", "산업용 첨가재"],
  },
  {
    slug: "fused-silica-powder",
    name: "용융규석미세분말",
    enName: "Fused Silica Micro Powder",
    tagline: "코팅·전자 소재를 위한 고분산 미세 분말",
    description:
      "용융규석을 정밀 분쇄하여 제조한 미세분말은 우수한 분산성과 화학적 안정성을 가지며, 전자 패키지, 코팅, 복합 소재 등 첨단 산업에서 핵심 충진재로 사용됩니다.",
    image: pPowder,
    features: [
      { title: "고분산성", desc: "수지 및 바인더와의 우수한 혼합 성능" },
      { title: "낮은 열팽창", desc: "전자 패키지의 신뢰성 향상" },
      { title: "고순도", desc: "전기적 절연 특성 우수" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.8%" },
      { label: "평균 입도", value: "5 ~ 50 μm" },
      { label: "비표면적", value: "1 ~ 5 m²/g" },
      { label: "외관", value: "백색 분말" },
    ],
    applications: ["반도체 EMC", "고기능 코팅", "복합 소재 충진재"],
  },
  {
    slug: "high-purity-quartz-ore",
    name: "고순도규석원석",
    enName: "High-Purity Quartz Ore",
    tagline: "엄선된 천연 원료에서 출발하는 프리미엄 규석",
    description:
      "엄격한 광맥 선별과 정제 공정을 거친 고순도 규석 원석은 후속 가공에서 최고의 결과를 보장합니다. SiLiCA의 원료 관리 노하우가 집약된 핵심 소재입니다.",
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
  {
    slug: "high-purity-quartz-powder",
    name: "고순도규석분말",
    enName: "High-Purity Quartz Powder",
    tagline: "정밀 산업을 위한 초고순도 규석 분말",
    description:
      "고순도 규석 원석을 정밀 분쇄·정제하여 만든 고순도 규석 분말은 반도체, 디스플레이, 첨단 세라믹 등 까다로운 산업 분야의 요구를 충족하는 프리미엄 등급 소재입니다.",
    image: pQuality,
    features: [
      { title: "초고순도", desc: "SiO₂ 99.95% 이상의 프리미엄 등급" },
      { title: "정밀 입도", desc: "마이크로 단위 입도 제어" },
      { title: "안정 품질", desc: "ISO 9001 기반 품질 관리" },
    ],
    specs: [
      { label: "SiO₂ 함량", value: "≥ 99.95%" },
      { label: "평균 입도", value: "10 ~ 100 μm" },
      { label: "수분", value: "< 0.05%" },
      { label: "외관", value: "백색 미세 분말" },
    ],
    applications: ["반도체 / 디스플레이", "첨단 세라믹", "고기능 필러"],
  },
];

export const getProductBySlug = (slug: string) =>
  productCatalog.find((p) => p.slug === slug);
