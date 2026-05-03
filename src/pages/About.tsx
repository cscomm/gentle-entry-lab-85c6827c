import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Award, Factory, Globe2, Mountain, ShieldCheck, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import facility from "@/assets/facility.jpg";
import heroImage from "@/assets/hero-quartz.jpg";

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
              원료에서 완제품까지,<br />
              <span className="text-primary">하나의 책임</span>
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
