import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Award, Factory, Globe2, Mountain, ShieldCheck, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import facility from "@/assets/facility.jpg";
import heroImage from "@/assets/hero-quartz.jpg";
import mineAerial from "@/assets/mine-aerial.png";
import mineTunnel from "@/assets/mine-tunnel.jpg";
import mineOre from "@/assets/mine-ore.jpg";
import minePlant from "@/assets/mine-plant.png";
import mineBuilding from "@/assets/mine-building.jpg";
import pProcess from "@/assets/p-process.jpg";
import processDiagram from "@/assets/process-diagram.png";
import sdr1 from "@/assets/sdr-1.png";
import sdr2 from "@/assets/sdr-2.png";
import sdr3 from "@/assets/sdr-3.png";
import sdr4 from "@/assets/sdr-4.png";
import sdr5 from "@/assets/sdr-5.jpg";
import { Beaker, Filter, FlaskConical, Gem, Snowflake, Thermometer, Droplets, Microscope } from "lucide-react";

const stats = [
  { value: "유일", label: "국내 고품위 규석 광산 직접 운영" },
  { value: "ISO 9001", label: "품질 관리 시스템 인증" },
  { value: "7+", label: "공급 산업 분야" },
];

const values = [
  {
    icon: Mountain,
    title: "원광 직접 개발",
    desc: "국내 유일 고품위 규석 광산을 직접 탐사·채광하여 원료부터 완벽히 통제합니다.",
  },
  {
    icon: Factory,
    title: "수직 통합 공정",
    desc: "탐사 · 채광 · 1차 가공까지 자체 수행, 원료 단계의 품질을 끝까지 책임집니다.",
  },
  {
    icon: ShieldCheck,
    title: "엄격한 품질 관리",
    desc: "원료 선별부터 완제품 출하까지 단계별 차별화된 QC 시스템을 운영합니다.",
  },
  {
    icon: Award,
    title: "ISO 9001 인증",
    desc: "용융실리카 현지 공장은 국제 표준 품질 관리 시스템을 보유하고 있습니다.",
  },
  {
    icon: Globe2,
    title: "글로벌 파트너십",
    desc: "한국 본사·사무실, 중국 현지 공장을 통해 안정적 공급망을 구축합니다.",
  },
  {
    icon: Sparkles,
    title: "최적의 솔루션",
    desc: "전자·코팅·세라믹·내화재·주조·태양광 등 산업별 맞춤 솔루션을 제공합니다.",
  },
];

const milestones = [
  { year: "원광", title: "고품위 규석 광산 탐사 및 직접 개발" },
  { year: "채광", title: "엄격한 광맥 선별과 1차 가공 자체 수행" },
  { year: "가공", title: "용융실리카 · 용융규사 · 미세분말 생산" },
  { year: "공급", title: "전자·광학·태양광 등 글로벌 산업 공급" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={heroImage} alt="SiLiCA" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs tracking-widest backdrop-blur">
            ABOUT US
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl drop-shadow">
            국내 유일의 고품위 규석<br />광산을 직접 개발합니다
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg drop-shadow">
            원료부터 완제품까지, 차별화된 품질로 산업의 표준을 만듭니다.
          </p>
        </div>
      </section>

      {/* Back */}
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <Button asChild variant="ghost">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> 홈으로
          </Link>
        </Button>
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img src={facility} alt="SiLiCA 생산시설" className="h-[460px] w-full object-cover" />
          </div>
          <div>
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              COMPANY OVERVIEW
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
              원료에서 완제품까지
            </h2>
            <p className="mt-6 text-muted-foreground">
              당사는 국내에는 현재 유일한 고품위 규석 광산을 직접 개발하여 운영 중이며, 탐사부터 채광 후 1차 공정을 자체적으로 수행하여 최고 품질의 고품위 석영을 생산하고 있습니다.
            </p>
            <p className="mt-4 text-muted-foreground">
              원료 선별부터 완제품까지 운영되는 각 단계의 차별화된 품질 관리 시스템을 통해 고객의 높은 기대에 부합하는 제품을 생산하고 있습니다.
            </p>
            <p className="mt-4 text-muted-foreground">
              용융실리카의 현지 공장은 ISO 9001 품질 관리 시스템 인증을 보유한 작업 환경에서 전자 소재 · 산업용 코팅 · 세라믹 · 내화재 · 주조 · 태양광 및 에너지 소재 등 다양한 산업 분야에 최적의 솔루션을 제공합니다.
            </p>
          </div>
        </div>

        {/* BAR Mine Story */}
        <div className="mt-20 md:mt-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              JANGSU BAEKAM MINE · BAR
            </span>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              장수백암광산
            </h2>
            <p className="mt-6 text-left text-muted-foreground md:text-center">
              <strong className="text-foreground">장수백암광산(BAR)</strong>의 이름은, 일제강점기 때의 소재지 지명에서 유래합니다.
              전라북도 장수군과 진안군 경계에 위치한 <strong className="text-foreground">백운면(白雲面) 백암리(白巖里)</strong>에 소재
              (현재 지명은 진안군 동향면 신송리)했던 바, 백암리라는 원래 지명도 <strong className="text-foreground">백암(白巖) — '흰색 광석'</strong>이라는
              별칭으로 불렸던 규석(Silica Stone, 硅石)과 장석이 생산됐던 이유에서 비롯돼 백암리(白巖里)라고 명명됐던 역사를 가지고 있습니다.
            </p>
            <p className="mt-4 text-left text-muted-foreground md:text-center">
              과거에 이미 노천 장석광산으로 알려진 광산이며, 현재는 굴진을 통한 규석을 채광하고 있습니다.
              <strong className="text-foreground"> 현존하는 국내 유일의 고품위 규석광산</strong>으로,
              가장 큰 특징은 <strong className="text-primary">최저 99.5%를 유지하는 편차 없는 순도</strong>를 보장한다는 점입니다.
            </p>
          </div>

          {/* Photo mosaic */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
            <div className="relative col-span-1 overflow-hidden rounded-2xl border border-border md:col-span-2 md:row-span-2">
              <img src={mineAerial} alt="장수백암광산 항공 전경" className="h-full max-h-[560px] w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <span className="text-xs font-semibold tracking-widest text-white/80">AERIAL VIEW</span>
                <p className="mt-1 text-base font-bold text-white">광산 전경 — 장수 백암리</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={mineTunnel} alt="갱도 채광 현장" className="h-full min-h-[180px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={mineOre} alt="채광된 고품위 규석 원광" className="h-full min-h-[180px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border md:col-span-2">
              <img src={minePlant} alt="가공 플랜트 내부" className="h-full min-h-[220px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={mineBuilding} alt="(주)BAR 사업장 외관" className="h-full min-h-[220px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
          </div>

          {/* Process banner */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-border">
            <div className="grid items-center md:grid-cols-2">
              <div className="relative h-72 md:h-full md:min-h-[360px]">
                <img src={pProcess} alt="제조 공정" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="bg-card p-8 md:p-12">
                <span className="inline-block rounded-full border border-border bg-background px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                  MANUFACTURING PROCESS
                </span>
                <h3 className="mt-5 text-2xl font-bold md:text-3xl">
                  광산에서 첨단 산업으로<br />
                  <span className="text-primary">정밀한 제조 공정</span>
                </h3>
                <p className="mt-5 text-muted-foreground">
                  자체 광산에서 채광한 고순도 원광을 1차 가공·정제·용융·미분쇄까지
                  일관된 공정으로 처리합니다. 단계별 품질 관리(QC)를 통해
                  편차 없는 순도와 균일한 입도를 보장합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 5-step Process Diagram */}
          <div className="mt-16">
            <div className="text-center">
              <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                PRODUCTION PROCESS
              </span>
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">
                다양한 입도 제품 <span className="text-primary">생산 공정</span>
              </h3>
              <p className="mt-3 text-muted-foreground">
                다섯 단계의 정밀 공정을 통해 고순도, 균일한 품질의 제품을 만듭니다.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {[
                { n: 1, title: "인공 선별", desc: "원료를 육안 및 기준에 따라 선별하여 불순물을 제거합니다." },
                { n: 2, title: "기계 분쇄", desc: "선별된 원료를 기계로 분쇄하여 적정 크기로 조절합니다." },
                { n: 3, title: "철 제거", desc: "자력 선별을 통해 철 성분 등 금속 불순물을 제거합니다." },
                { n: 4, title: "체질(분류)", desc: "체질기를 통해 입도별로 분류하여 균일한 입도의 원료를 확보합니다." },
                { n: 5, title: "볼 밀 가공", desc: "볼 밀에서 미세 분쇄 및 표면 처리를 진행하여 입도를 최종 조절합니다." },
              ].map((s) => (
                <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {s.n}
                  </div>
                  <h4 className="mt-4 text-lg font-bold">{s.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center justify-center gap-2 border-b border-border pb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">✓</span>
                <span className="text-sm font-semibold tracking-wide md:text-base">다양한 입도 (모래 / 분말) 제품으로 생산</span>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold text-primary">모래 (Sand) 제품군</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    60mm 과립부터 정밀 입도까지 — 주조·건축·태양광 등 산업별 맞춤 공급
                  </p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">분말 (Powder) 제품군</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    1µm(12500 메쉬) 미분까지 — 반도체·코팅·전자재료 등 고정밀 응용
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="text-center">
          <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
            OUR VALUES
          </span>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">SiLiCA를 선택해야 하는 이유</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              PROCESS
            </span>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">원광에서 산업으로</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative rounded-2xl border border-border bg-card p-6">
                <div className="text-xs font-semibold tracking-widest text-primary">STEP {String(i + 1).padStart(2, "0")}</div>
                <div className="mt-2 text-xl font-bold">{m.year}</div>
                <p className="mt-3 text-sm text-muted-foreground">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">함께할 준비가 되셨다면</h2>
        <p className="mt-4 text-muted-foreground">
          최적의 규석 솔루션이 필요하신가요? 언제든 문의해 주세요.
        </p>
        <Button asChild size="lg" className="mt-8 h-12 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
          <Link to="/#contact">
            문의하기 <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default About;
