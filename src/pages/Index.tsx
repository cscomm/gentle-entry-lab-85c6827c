import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Mail, Clock, Phone, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { productCatalog } from "@/data/products";
import SiteHeader from "@/components/SiteHeader";

import heroImage from "@/assets/hero-quartz.jpg";
import heroNanoImage from "@/assets/hero-nanopowder.jpg";
import facility from "@/assets/facility.jpg";
import pBlockA from "@/assets/p-block-a.jpg";
import pBlockB from "@/assets/p-block-b.jpg";
import pBlockC from "@/assets/p-block-c.jpg";
import pSandA from "@/assets/p-sand-a.jpg";
import pSandB from "@/assets/p-sand-b.jpg";
import pSandC from "@/assets/p-sand-c.jpg";
import pPowder from "@/assets/p-powder.jpg";
import pProcess from "@/assets/p-process.jpg";
import pQuality from "@/assets/p-quality.jpg";
import aSemi from "@/assets/a-semi.jpg";
import aOptic from "@/assets/a-optic.jpg";
import aSolar from "@/assets/a-solar.jpg";
import aElec from "@/assets/a-elec.jpg";

const navItems = [
  { en: "Home", ko: "홈", href: "#home" },
  { en: "Mineral Product", ko: "제품", href: "#products", dropdown: true },
  { en: "About", ko: "회사소개", href: "#about" },
  { en: "Applications", ko: "응용분야", href: "#applications" },
  { en: "Contact", ko: "문의하기", href: "#contact" },
];

const productCategories = ["전체 제품", "용융규석", "용융규사", "용융규석미세분말", "고순도규석"];

const products = [
  { img: pBlockA, slug: "fused-silica-block", title: "용융규석", desc: "최고급 융편석영 블록 — 반도체 및 고급 광학 용도에 적합", cat: "용융규석" },
  { img: pSandA, slug: "fused-silica-sand", title: "용융규사", desc: "정밀 주조 및 첨단 산업용 고품질 용융규사", cat: "용융규사" },
  { img: pPowder, slug: "fused-silica-powder", title: "용융규석미세분말", desc: "고분산 융편석영 미세 분말, 전자 소재 및 코팅 용도에 적합", cat: "용융규석미세분말" },
  { img: pProcess, slug: "high-purity-quartz", title: "고순도규석", desc: "엄선된 광원에서 채광한 프리미엄 고순도 규석 원료", cat: "고순도규석" },
];

const applications = [
  { img: aSemi, title: "반도체 산업", desc: "반도체 웨이퍼 제조용 고순도 석영 소재" },
  { img: aOptic, title: "광학 산업", desc: "광학 렌즈 및 정밀 광학 부품용 석영 소재" },
  { img: aSolar, title: "태양광 산업", desc: "태양광 패널 생산에 적합한 석영 소재" },
  { img: aElec, title: "전자 소재", desc: "전자 소재 및 패키지 제품용 석영 소재" },
];

const news = [
  { title: "내열 소재", date: "2025-02-13" },
  { title: "정밀 주조", date: "2025-02-13" },
  { title: "도자기 산업", date: "2025-02-13" },
];

const Index = () => {
  const { toast } = useToast();
  const [activeCat, setActiveCat] = useState("전체 제품");
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });

  const slides = [
    {
      img: heroImage,
      alt: "High-purity quartz crystal",
      title: "Purity from Nature",
      sub: "Technology that Leads Industry",
      desc: "용융실리카와 고품위 실리카. 다양한 산업에 최적의 솔루션을 제공합니다.",
    },
    {
      img: heroNanoImage,
      alt: "High-purity nano silica powder",
      title: "High-Purity Silica Powder",
      sub: "A New Standard for Precision Industries",
      desc: "전자·코팅·첨단소재 산업에 적용되는 고분산 고순도 실리카 분말",
    },
  ];
  const [slideIdx, setSlideIdx] = useState(0);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % slides.length);
  const prevSlide = () => setSlideIdx((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, []);

  const filteredProducts =
    activeCat === "전체 제품" ? products : products.filter((p) => p.cat === activeCat);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!form.name || !form.phone || !form.message) {
      e.preventDefault();
      toast({ title: "필수 항목을 입력해 주세요", variant: "destructive" });
      return;
    }
    // FormSubmit will handle the POST and redirect; show toast optimistically
    toast({ title: "문의가 전송되었습니다", description: "빠른 시일 내에 답변드리겠습니다." });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav (fixed) */}
      <SiteHeader transparentAtTop />

      {/* Hero */}
      <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {slides.map((s, i) => (
          <img
            key={s.img}
            src={s.img}
            alt={s.alt}
            width={1920}
            height={1080}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === slideIdx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />

        <button
          onClick={prevSlide}
          aria-label="이전"
          className="absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white/90 transition hover:border-primary-glow hover:text-primary-glow md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="다음"
          className="absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white/90 transition hover:border-primary-glow hover:text-primary-glow md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
          <h1 key={`t-${slideIdx}`} className="text-5xl font-bold tracking-tight md:text-7xl drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            {slides[slideIdx].title}
          </h1>
          <p key={`s-${slideIdx}`} className="mt-6 text-2xl font-light text-white/95 md:text-3xl drop-shadow animate-in fade-in duration-700">
            {slides[slideIdx].sub}
          </p>
          <p key={`d-${slideIdx}`} className="mt-6 max-w-2xl text-base text-white/85 md:text-lg drop-shadow animate-in fade-in duration-1000">
            {slides[slideIdx].desc}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-10 h-12 rounded-full bg-primary px-8 text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary/90"
          >
            <a href="#products" onClick={() => setActiveCat("전체 제품")}>
              제품 살펴보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === slideIdx ? "w-8 bg-primary-glow" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img src={facility} alt="SiLiCA 생산시설" loading="lazy" className="h-[420px] w-full object-cover" />
          </div>
          <div>
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              ABOUT US
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              국내 유일의 고품위<br />규석 광산을<br />직접 개발합니다
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
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-8 h-12 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/about">
                회사 소개 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-secondary/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              제품 카테고리
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Mineral Product
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  activeCat === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <Link
                key={p.title}
                to={`/products/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary-glow transition group-hover:gap-3">
                    자세히 보기 <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Applications - 임시 숨김 (상세페이지 작업 중) */}
      <section id="applications" className="mx-auto hidden max-w-7xl px-6 py-24 md:py-32">
        <div className="text-center">
          <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
            응용 분야
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            반도체부터 광학까지<br />다양한 산업에 공급합니다
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((a) => (
            <article
              key={a.title}
              className="group relative overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-foreground/80">{a.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {news.map((n) => (
            <a
              key={n.title}
              href="#"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm transition hover:border-primary"
            >
              <span className="text-foreground">{n.title}</span>
              <span className="text-xs text-muted-foreground">{n.date}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact — distinctive dark panel */}
      <section
        id="contact"
        className="relative overflow-hidden bg-foreground py-24 text-background md:py-32"
      >
        {/* decorative glows */}
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-primary-glow/20 blur-3xl" />
        {/* subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
            {/* Left: heading + info */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-4 py-1.5 text-xs tracking-widest text-background/80 backdrop-blur">
                  <MessageSquare className="h-3.5 w-3.5" /> Contact Us
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
                  프로젝트의 시작,<br />
                  <span className="text-primary-glow">Silica가 함께 합니다.</span>
                </h2>
                <p className="mt-6 max-w-md text-background/70">
                  최적의 규석 솔루션이 필요하신 모든 산업 분야의 파트너를 환영합니다.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-background/15 bg-background/5 p-5 backdrop-blur transition hover:border-primary-glow/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-glow/15 text-primary-glow">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">공장 주소</h3>
                  <p className="mt-2 text-xs leading-relaxed text-background/70">
                    경기도 화성시 팔탄면<br />고주로 257-58 (18330)
                  </p>
                </div>
                <div className="rounded-2xl border border-background/15 bg-background/5 p-5 backdrop-blur transition hover:border-primary-glow/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-glow/15 text-primary-glow">
                    <Phone className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">연락처</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-background/70">
                    <Phone className="h-3 w-3" /> 031-000-0000
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-background/70">
                    <Clock className="h-3 w-3" /> 평일 09:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Right: form panel */}
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/cscomm@naver.com"
              method="POST"
              className="relative overflow-hidden rounded-3xl border border-background/15 bg-background/5 p-8 backdrop-blur-xl md:p-10"
            >
              <input type="hidden" name="_subject" value="[홈페이지 문의] 신규 문의 도착" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-primary/30 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Send className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold">문의 양식</h3>
                </div>

                <div className="mt-8 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-background/60">이름 *</label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-background/60">연락처 *</label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                        placeholder="010-1234-5678"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-background/60">회사명</label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                      placeholder="회사명을 입력해 주세요"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-background/60">문의 내용 *</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value.slice(0, 500) })
                      }
                      className="mt-2 min-h-32 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                      placeholder="문의하실 내용을 입력해 주세요"
                    />
                    <div className="mt-1 text-right text-xs text-background/50">
                      {form.message.length}/500자
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:bg-primary/90"
                  >
                    문의 보내기 <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold tracking-tight">
                Si<span className="text-primary-glow">Li</span>CA
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                국내 유일의 고품위 규석 광산을<br />직접 개발하는 규석 전문 기업
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">사이트맵</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#home" className="hover:text-primary-glow">홈</a></li>
                <li><a href="#products" className="hover:text-primary-glow">제품</a></li>
                <li><Link to="/about" className="hover:text-primary-glow">회사소개</Link></li>
                <li><a href="#contact" className="hover:text-primary-glow">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">제품</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {productCatalog.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className="hover:text-primary-glow">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">연락처</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-none text-primary-glow" /> 경기도 화성시 팔탄면 고주로 257-58</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary-glow" /> 031-000-0000</li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary-glow" /> 평일 09:00 - 18:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} SiLiCA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
