import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Award, Factory, Globe2, Mountain, ShieldCheck, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/contexts/LanguageContext";
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
  const { t: tr } = useLang();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={heroImage} alt="SiLiCA" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs tracking-widest backdrop-blur">
            {tr("ab.hero.tag")}
          </span>
          <h1 className="mt-6 whitespace-pre-line text-4xl font-bold leading-tight md:text-6xl drop-shadow">
            {tr("ab.hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg drop-shadow">
            {tr("ab.hero.sub")}
          </p>
        </div>
      </section>

      {/* Back */}
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <Button asChild variant="ghost">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> {tr("ab.back")}
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
              {tr("ab.overview.tag")}
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
              {tr("ab.overview.title")}
            </h2>
            <p className="mt-6 text-muted-foreground">{tr("ab.overview.p1")}</p>
            <p className="mt-4 text-muted-foreground">{tr("ab.overview.p2")}</p>
            <p className="mt-4 text-muted-foreground">{tr("ab.overview.p3")}</p>
          </div>
        </div>

        {/* BAR Mine Story */}
        <div className="mt-20 md:mt-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              {tr("ab.mine.tag")}
            </span>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              {tr("ab.mine.title")}
            </h2>
            <p
              className="mt-6 text-left text-muted-foreground md:text-center [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: tr("ab.mine.p1.ko") }}
            />
            <p
              className="mt-4 text-left text-muted-foreground md:text-center [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: tr("ab.mine.p2") }}
            />
          </div>

          {/* Photo mosaic */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
            <div className="relative col-span-1 overflow-hidden rounded-2xl border border-border md:col-span-2 md:row-span-2">
              <img src={mineAerial} alt={tr("ab.mine.aerialSub")} className="h-full max-h-[560px] w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <span className="text-xs font-semibold tracking-widest text-white/80">{tr("ab.mine.aerial")}</span>
                <p className="mt-1 text-base font-bold text-white">{tr("ab.mine.aerialSub")}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={mineTunnel} alt={tr("ab.cap.tunnel")} className="h-full min-h-[180px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={mineOre} alt={tr("ab.cap.ore")} className="h-full min-h-[180px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border md:col-span-2">
              <img src={minePlant} alt={tr("ab.cap.plant")} className="h-full min-h-[220px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={mineBuilding} alt={tr("ab.cap.building")} className="h-full min-h-[220px] w-full object-cover transition duration-700 hover:scale-105" />
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
                  {tr("ab.process.tag")}
                </span>
                <h3 className="mt-5 text-2xl font-bold md:text-3xl">
                  {tr("ab.process.title")}<br />
                  <span className="text-primary">{tr("ab.process.titleAccent")}</span>
                </h3>
                <p className="mt-5 text-muted-foreground">
                  {tr("ab.process.desc")}
                </p>
              </div>
            </div>
          </div>

          {/* 5-step Process Diagram */}
          <div className="mt-16">
            <div className="text-center">
              <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                {tr("ab.prod.tag")}
              </span>
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">
                {tr("ab.prod.title")} <span className="text-primary">{tr("ab.prod.titleAccent")}</span>
              </h3>
              <p className="mt-3 text-muted-foreground">
                {tr("ab.prod.desc")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {[
                { n: 1, title: tr("ab.prod.s1.t"), desc: tr("ab.prod.s1.d") },
                { n: 2, title: tr("ab.prod.s2.t"), desc: tr("ab.prod.s2.d") },
                { n: 3, title: tr("ab.prod.s3.t"), desc: tr("ab.prod.s3.d") },
                { n: 4, title: tr("ab.prod.s4.t"), desc: tr("ab.prod.s4.d") },
                { n: 5, title: tr("ab.prod.s5.t"), desc: tr("ab.prod.s5.d") },
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
          </div>
        </div>
      </section>

      {/* SDR Quartz Material - Partner Company */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              {tr("ab.sdr.tag")}
            </span>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              SDR <span className="text-primary">{tr("ab.sdr.titleAccent")}</span>
            </h2>
            <p
              className="mt-6 text-left text-muted-foreground md:text-center [&_strong]:text-foreground [&_strong.text-primary]:text-primary"
              dangerouslySetInnerHTML={{ __html: tr("ab.sdr.p1") }}
            />
            <p
              className="mt-4 text-left text-muted-foreground md:text-center [&_strong]:text-foreground [&_strong.text-primary]:text-primary"
              dangerouslySetInnerHTML={{ __html: tr("ab.sdr.p2") }}
            />
          </div>

          {/* SDR Photo Mosaic */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
            <div className="relative col-span-1 overflow-hidden rounded-2xl border border-border md:col-span-2 md:row-span-2">
              <img src={sdr2} alt={tr("ab.cap.sdrhq")} className="h-full max-h-[560px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={sdr1} alt={tr("ab.cap.warehouse")} className="h-full min-h-[180px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={sdr4} alt={tr("ab.cap.ingot")} className="h-full min-h-[180px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border md:col-span-2">
              <img src={sdr3} alt={tr("ab.cap.line")} className="h-full min-h-[220px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={sdr5} alt={tr("ab.cap.furnace")} className="h-full min-h-[220px] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
          </div>

          {/* SDR Manufacturing Process - 4 step */}
          <div className="mt-20">
            <div className="text-center">
              <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                {tr("ab.sdr.mfg.tag")}
              </span>
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">
                {tr("ab.sdr.mfg.title")} <span className="text-primary">{tr("ab.sdr.mfg.titleAccent")}</span>
              </h3>
              <p className="mt-3 text-muted-foreground">
                {tr("ab.sdr.mfg.desc")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {[
                { n: "01", icon: Gem, title: tr("ab.sdr.mfg.s1.t"), desc: tr("ab.sdr.mfg.s1.d"), color: "from-blue-500/20 to-blue-500/5" },
                { n: "02", icon: Filter, title: tr("ab.sdr.mfg.s2.t"), desc: tr("ab.sdr.mfg.s2.d"), color: "from-sky-500/20 to-sky-500/5" },
                { n: "03", icon: Snowflake, title: tr("ab.sdr.mfg.s3.t"), desc: tr("ab.sdr.mfg.s3.d"), color: "from-violet-500/20 to-violet-500/5" },
                { n: "04", icon: Beaker, title: tr("ab.sdr.mfg.s4.t"), desc: tr("ab.sdr.mfg.s4.d"), color: "from-emerald-500/20 to-emerald-500/5" },
              ].map((s) => (
                <div key={s.n} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-60`} />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold tracking-widest text-primary">{s.n}</span>
                      <s.icon className="h-6 w-6 text-primary/70" />
                    </div>
                    <h4 className="mt-6 text-lg font-bold">{s.title}</h4>
                    <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* QC strip */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="grid items-center gap-6 md:grid-cols-6">
                <div className="flex items-center gap-3 md:col-span-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold">{tr("ab.qc.title")}</span>
                </div>
                {[
                  { icon: Thermometer, t: tr("ab.qc.q1.t"), d: tr("ab.qc.q1.d") },
                  { icon: Droplets, t: tr("ab.qc.q2.t"), d: tr("ab.qc.q2.d") },
                  { icon: ShieldCheck, t: tr("ab.qc.q3.t"), d: tr("ab.qc.q3.d") },
                  { icon: FlaskConical, t: tr("ab.qc.q4.t"), d: tr("ab.qc.q4.d") },
                  { icon: Microscope, t: tr("ab.qc.q5.t"), d: tr("ab.qc.q5.d") },
                ].map((q) => (
                  <div key={q.t} className="flex items-start gap-3">
                    <q.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <div className="text-xs font-bold">{q.t}</div>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{q.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default About;
