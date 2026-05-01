import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Mail, Clock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  { en: "Products", ko: "제품센터", href: "#products" },
  { en: "About", ko: "회사소개", href: "#about" },
  { en: "Applications", ko: "응용분야", href: "#applications" },
  { en: "Contact", ko: "문의하기", href: "#contact" },
];

const productCategories = ["전체 제품", "석영 블록", "석영 사", "석영 분말", "고순도 석영"];

const products = [
  { img: pBlockA, title: "A급 융편석영 블록", desc: "최고급 융편석영 블록, 반도체 용도 및 고급 광학 용도에 적합", cat: "석영 블록" },
  { img: pBlockB, title: "B급 융편석영 블록", desc: "중급 융편석영 블록, 제철 용도 및 재료 용도에 적합", cat: "석영 블록" },
  { img: pBlockC, title: "C급 융편석영 블록", desc: "일반 융편석영 블록, 단열 용도 및 내화 용도에 적합", cat: "석영 블록" },
  { img: pSandA, title: "A급 융편석영 사", desc: "최고급 융편석영 사, 정밀 용도 및 고급 소재 용도에 적합", cat: "석영 사" },
  { img: pSandB, title: "B급 융편석영 사", desc: "중급 융편석영 사, 단열 용도 및 재료 용도에 적합", cat: "석영 사" },
  { img: pSandC, title: "C급 융편석영 사", desc: "일반 융편석영 사, 내화 용도 및 기초 용도에 적합", cat: "석영 사" },
  { img: pPowder, title: "융편석영 미세분말", desc: "고분산 융편석영 미세 분말, 전자 소재 및 코팅 용도에 적합", cat: "석영 분말" },
  { img: pProcess, title: "융편석영 생산공정", desc: "SiLiCA 최고급 융편석영 생산 전 과정을 확인해 보세요", cat: "고순도 석영" },
  { img: pQuality, title: "제품 품질지표", desc: "SiLiCA 제품 품질 지표 및 분석 시험 실험 결과", cat: "고순도 석영" },
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
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const slides = [
    {
      img: heroImage,
      alt: "High-purity quartz crystal",
      title: "Purity from Nature",
      sub: "Technology that Leads Industry",
      desc: "With over 20 years of expertise, SiLiCA produces the highest quality high-purity quartz",
    },
    {
      img: heroNanoImage,
      alt: "High-purity nano silica powder",
      title: "Ultrafine Nano Powder",
      sub: "A New Standard for Precision Industries",
      desc: "Highly dispersed, high-purity nano silica powder for electronics, coatings, and advanced materials",
    },
  ];
  const [slideIdx, setSlideIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % slides.length);
  const prevSlide = () => setSlideIdx((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, []);

  const filteredProducts =
    activeCat === "전체 제품" ? products : products.filter((p) => p.cat === activeCat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "필수 항목을 입력해 주세요", variant: "destructive" });
      return;
    }
    toast({ title: "문의가 접수되었습니다", description: "빠르게 답변드리겠습니다." });
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav (fixed) */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
          <a href="#home" className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold tracking-tight">
              Si<span className="text-primary-glow">Li</span>CA
            </span>
            <span className="mt-0.5 text-[11px] tracking-[0.2em] text-muted-foreground">
              규석 전문 기업
            </span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.en}
                href={item.href}
                className="group relative inline-block text-sm text-foreground/85 transition-colors hover:text-primary-glow"
              >
                <span className="block transition-opacity duration-200 group-hover:opacity-0">
                  {item.en}
                </span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.ko}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </header>

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
            size="lg"
            className="mt-10 h-12 rounded-full bg-primary px-8 text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary/90"
          >
            제품 살펴보기
            <ArrowRight className="ml-2 h-4 w-4" />
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
              20년 이상의 기술력으로<br />고순도 석영을<br />완성합니다
            </h2>
            <p className="mt-6 text-muted-foreground">
              SiLiCA는 석영 소재 전문 생산기업으로, 20년 이상의 기술력으로 최고 품질의 고순도 석영을 생산하고 있습니다.
            </p>
            <p className="mt-4 text-muted-foreground">
              ISO 9001 품질 관리 시스템 인증을 보유하며, 반도체, 광학, 태양광, 전자 소재 등 다양한 산업 분야에 최적의 솔루션을 제공합니다.
            </p>
            <p className="mt-4 text-muted-foreground">
              SiLiCA는 원료 선별부터 완제품까지 운영되는 각 단계의 차별화된 품질 관리 시스템을 통해 고객의 높은 기대에 부합하는 제품을 생산하고 있습니다.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-8 h-12 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
            >
              회사 소개 보기
              <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="mt-6 text-4xl font-bold md:text-5xl">우리의 핵심 제품 라인업</h2>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
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

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
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
                  <a
                    href="#"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-primary-glow transition hover:gap-3"
                  >
                    자세히 보기 <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section id="applications" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
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

      {/* Contact */}
      <section id="contact" className="bg-secondary/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              Contact Us
            </span>
            <h2 className="mt-6 text-4xl font-bold md:text-5xl">문의하기</h2>
            <p className="mt-4 text-muted-foreground">
              궁금한 사항이 있으시면 언제든지 문의해 주세요. 빠르게 답변드리겠습니다.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Info */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-glow">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">공장 주소</h3>
                    <p className="mt-2 text-muted-foreground">경기도 화성시 팔탄면 고주로 257-58</p>
                    <p className="text-sm text-muted-foreground">(우) 18330</p>
                    <a
                      href="https://www.google.com/maps?q=경기도+화성시+팔탄면+고주로+257-58"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm text-primary-glow hover:underline"
                    >
                      Open in Maps <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-glow">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">회사 정보</h3>
                    <p className="text-muted-foreground">이메일로 문의 주시면 신속히 답변드립니다</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> 평일 09:00 - 18:00
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" /> 031-000-0000
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="text-lg font-semibold">문의 양식</h3>
              <div className="mt-6 grid gap-5">
                <div>
                  <label className="text-sm text-muted-foreground">이름 *</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 h-11 bg-background"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">이메일 *</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 h-11 bg-background"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">회사명</label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="mt-2 h-11 bg-background"
                    placeholder="회사명을 입력해 주세요"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">문의 내용 *</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value.slice(0, 500) })
                    }
                    className="mt-2 min-h-32 bg-background"
                    placeholder="문의하실 내용을 입력해 주세요"
                  />
                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {form.message.length}/500자
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary/90"
                >
                  문의하기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="text-xl font-semibold tracking-tight">
            Si<span className="text-primary-glow">Li</span>CA
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SiLiCA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
