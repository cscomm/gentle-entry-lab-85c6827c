import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug, productCatalog } from "@/data/products";
import SiteHeader from "@/components/SiteHeader";
import aSemi from "@/assets/a-semicon.jpg";
import aOptic from "@/assets/a-optics.jpg";
import aDisplay from "@/assets/a-display.jpg";
import aAero from "@/assets/a-aero.jpg";
import aMedical from "@/assets/a-medical.jpg";
import aEnergy from "@/assets/a-energy.jpg";

const APP_VISUALS: Record<string, { img?: string; items: string[] }> = {
  "반도체": {
    img: aSemi,
    items: ["확산/산화용 보트", "웨이퍼 캐리어", "RTP 챔버 부품", "플라즈마 에칭 윈도우", "고순도 웨이퍼 카세트"],
  },
  "광학": {
    img: aOptic,
    items: ["UV~IR 광학 윈도우", "고출력 레이저 거울", "리소그래피 렌즈", "광섬유 프리폼", "우주망원경 광학계"],
  },
  "디스플레이": {
    img: aDisplay,
    items: ["OLED 증착 마스크 지지대", "유리 기판 반송 부품", "건식 에칭 챔버 부품"],
  },
  "항공/방산": {
    img: aAero,
    items: ["위성 광학 부품", "미사일 돔", "적외선 탐지기 윈도우", "열충격 보호 커버"],
  },
  "의료": {
    img: aMedical,
    items: ["분석용 큐벳", "생물반응기 윈도우", "진단 장비 부품", "의료용 광섬유 부품"],
  },
  "에너지": {
    img: aEnergy,
    items: ["고온 수소 연료전지", "태양광 확산관", "고온 절연 부품"],
  },
  // Grade B
  "태양광": { img: aEnergy, items: ["실리콘 잉곳용 도가니", "태양전지 가열 부품", "고순도 반응 용기"] },
  "전자/반도체": { img: aSemi, items: ["반도체 EMC 충진재", "하이엔드 절연재", "중간 절연층 소재"] },
  "정밀 주조": { img: aAero, items: ["항공우주 부품 금형", "정밀 기계 부품 주조", "고내열 세라믹 부품"] },
  "특수 소재": { img: aDisplay, items: ["고사양 내열 코팅", "기능성 고분자 복합재", "전자재료 절연 필름"] },
  // Grade C
  "건축 및 건자재": { items: ["고강도 시멘트 첨가제", "내화 벽돌 및 패널", "바닥재 충진재"] },
  "페인트 및 코팅": { items: ["내스크래치 도료", "방청 프라이머", "무광 코팅 필러"] },
  "플라스틱/고무": { items: ["범용 플라스틱 보강재", "내열 실리콘 충진재", "접착제 증점제"] },
  "연마 및 내마모재": { items: ["샌드블라스트 연마제", "연마 패드 및 휠", "내마모 코팅"] },
  "기타 산업용": { items: ["필터 미디어", "내열 실란트", "주물사 대체재"] },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-3xl font-bold">제품을 찾을 수 없습니다</h1>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-primary-glow hover:underline">
            <ArrowLeft className="h-4 w-4" /> 홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const others = productCatalog.filter((p) => p.slug !== product.slug);
  const isGradeA = product.slug === "fused-silica-block";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparentAtTop />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="h-[460px] w-full object-cover md:h-[560px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-16 text-white">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs tracking-widest text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            {product.enName.toUpperCase()}
          </span>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl drop-shadow-lg">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">{product.tagline}</p>
        </div>
      </section>

      {/* Overview + Spec Sheet */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              OVERVIEW
            </span>
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">제품 개요</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

            {isGradeA && (
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["100% 무정형", "초저열팽창", "초저금속 불순물", "EC < 3 µs/cm", "맞춤 입도 가공"].map((b) => (
                  <div key={b} className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2.5 text-xs font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Spec Sheet */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/30 shadow-sm">
              <div className="flex items-center justify-between border-b border-border bg-foreground px-6 py-4 text-background">
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-primary-glow">SPEC SHEET</div>
                  <div className="mt-0.5 text-lg font-semibold">📊 제품 스펙</div>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {product.enName.split("·")[0].trim()}
                </span>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 bg-secondary/40 px-6 py-3 text-xs font-semibold tracking-widest text-muted-foreground">
                  <div className="col-span-5">항목</div>
                  <div className="col-span-4">규격</div>
                  <div className="col-span-3 text-right">비고</div>
                </div>
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-12 items-center px-6 py-3.5 text-sm transition hover:bg-secondary/30">
                    <div className="col-span-5 text-muted-foreground">{s.label}</div>
                    <div className="col-span-4 font-semibold text-foreground">{s.value}</div>
                    <div className="col-span-3 text-right text-xs text-primary">{s.note ?? "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                KEY FEATURES
              </span>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">✨ 주요 특징</h2>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
                <div className="relative">
                  <h3 className="text-lg font-bold leading-snug">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications — visual cards with images */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="text-center">
          <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
            APPLICATIONS
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">🎯 적용 범위</h2>
          <p className="mt-4 text-muted-foreground">고객 산업별 맞춤형 솔루션 — 각 분야의 신뢰성 요구를 완벽히 충족합니다</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.applications.map((appName) => {
            const visual = APP_VISUALS[appName];
            return (
              <article
                key={appName}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {visual ? (
                    <img src={visual.img} alt={appName} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/30 to-primary-glow/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow">{appName}</h3>
                  </div>
                </div>
                {visual?.items && (
                  <ul className="space-y-2 p-6">
                    {visual.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link to="/#contact">
            <Button size="lg" className="h-12 rounded-full bg-primary px-8 text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary/90">
              제품 문의하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← 모든 제품 보기
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold">다른 제품 살펴보기</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.enName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="text-xl font-semibold tracking-tight">
            Si<span className="text-primary-glow">Li</span>CA
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SiLiCA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
