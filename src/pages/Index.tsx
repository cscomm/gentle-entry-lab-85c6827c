import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Mail, Clock, Phone, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { productCatalog } from "@/data/products";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/contexts/LanguageContext";

import heroImage from "@/assets/hero-quartz.jpg";
import heroNanoImage from "@/assets/hero-nanopowder.jpg";
import facility from "@/assets/facility.jpg";
import gradeA from "@/assets/grade-a-hero.png";
import gradeB from "@/assets/grade-b-silica.png";
import gradeC from "@/assets/grade-c-silica.png";
import pProcess from "@/assets/p-process.jpg";
import aSemi from "@/assets/a-semicon.jpg";
import aOptic from "@/assets/a-optics.jpg";
import aSolar from "@/assets/a-display.jpg";
import aElec from "@/assets/a-energy.jpg";

const navItems = [
  { en: "Home", ko: "홈", href: "#home" },
  { en: "Mineral Product", ko: "제품", href: "#products", dropdown: true },
  { en: "About", ko: "회사소개", href: "#about" },
  { en: "Applications", ko: "응용분야", href: "#applications" },
  { en: "Contact", ko: "문의하기", href: "#contact" },
];

const productCategories: { label: string; en: string; slug?: string }[] = [
  { label: "전체 제품", en: "All Products" },
  { label: "A등급 용융실리카", en: "Grade A Fused Silica", slug: "fused-silica-block" },
  { label: "B등급 용융실리카", en: "Grade B Fused Silica", slug: "fused-silica-sand" },
  { label: "C등급 용융실리카", en: "Grade C Fused Silica", slug: "fused-silica-powder" },
  { label: "천연 고순도규석", en: "Natural High-Purity Quartz", slug: "high-purity-quartz" },
];

const products = [
  { img: gradeA, slug: "fused-silica-block", title: "A등급 용융실리카", enTitle: "Grade A Fused Silica", desc: "초고순도 100% 무정형 용융실리카 — 반도체·광학·항공/방산 전용", enDesc: "Ultra-high-purity 100% amorphous fused silica — for semiconductor, optics, aerospace & defense.", cat: "A등급 용융실리카" },
  { img: gradeB, slug: "fused-silica-sand", title: "B등급 용융실리카", enTitle: "Grade B Fused Silica", desc: "정밀 주조 및 첨단 산업용 고품질 용융실리카", enDesc: "High-quality fused silica for precision casting and advanced industries.", cat: "B등급 용융실리카" },
  { img: gradeC, slug: "fused-silica-powder", title: "C등급 용융실리카", enTitle: "Grade C Fused Silica", desc: "산업용 일반 공정에 최적화된 경제형 용융실리카", enDesc: "Economical fused silica optimized for general industrial processes.", cat: "C등급 용융실리카" },
  { img: pProcess, slug: "high-purity-quartz", title: "천연 고순도규석", enTitle: "Natural High-Purity Quartz", desc: "엄선된 광원에서 채광한 고순도 규석", enDesc: "High-purity quartz mined from carefully selected ore deposits.", cat: "천연 고순도규석" },
];

const applications = [
  { img: aSemi, title: "전자 산업", desc: "전자 웨이퍼 제조용 고순도 석영 소재" },
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
  const { t, lang } = useLang();
  const [activeCat, setActiveCat] = useState("전체 제품");
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slides = [
    {
      img: heroImage,
      alt: "High-purity quartz crystal",
      title: t("hero1.title"),
      sub: t("hero1.sub"),
      desc: t("hero1.desc"),
    },
    {
      img: heroNanoImage,
      alt: "High-purity nano silica powder",
      title: t("hero2.title"),
      sub: t("hero2.sub"),
      desc: t("hero2.desc"),
    },
  ];
  const [slideIdx, setSlideIdx] = useState(0);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % slides.length);
  const prevSlide = () => setSlideIdx((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash, location.key]);

  const filteredProducts =
    activeCat === "전체 제품" ? products : products.filter((p) => p.cat === activeCat);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.message) {
      toast({ title: "필수 항목을 입력해 주세요", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const inquiryId = crypto.randomUUID();

      // 1) 관리자에게 알림 메일
      const adminRes = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: "cscomm@naver.com",
          idempotencyKey: `contact-notify-${inquiryId}`,
          templateData: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            company: form.company,
            message: form.message,
          },
        },
      });
      if (adminRes.error) throw adminRes.error;

      // 2) 고객에게 접수 확인 메일 (이메일 입력 시에만)
      if (form.email) {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-confirmation",
            recipientEmail: form.email,
            idempotencyKey: `contact-confirm-${inquiryId}`,
            templateData: { name: form.name, message: form.message },
          },
        });
      }

      setForm({ name: "", phone: "", email: "", company: "", message: "" });
      toast({ title: "문의가 전송되었습니다", description: "빠른 시일 내에 답변드리겠습니다." });
    } catch (error) {
      console.error("Contact form send failed", error);
      toast({
        title: "문의 전송에 실패했습니다",
        description: "잠시 후 다시 시도하시거나 이메일로 직접 문의해 주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              {t("hero.cta")}
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
              {t("about.tag")}
            </span>
            <h2 className="mt-6 whitespace-pre-line text-4xl font-bold leading-tight md:text-5xl">
              {t("about.title")}
            </h2>
            <p className="mt-6 text-muted-foreground">{t("about.p1")}</p>
            <p className="mt-4 text-muted-foreground">{t("about.p2")}</p>
            <p className="mt-4 text-muted-foreground">{t("about.p3")}</p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-8 h-12 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/about">
                {t("about.btn")}
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
              {t("products.cat")}
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Mineral Product
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {productCategories.map((cat) => {
              const isActive = activeCat === cat.label;
              const className = `rounded-full border px-5 py-2 text-sm transition ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
              }`;
              if (cat.slug) {
                return (
                  <Link key={cat.label} to={`/products/${cat.slug}`} className={className}>
                    {lang === "en" ? cat.en : cat.label}
                  </Link>
                );
              }
              return (
                <button key={cat.label} onClick={() => setActiveCat(cat.label)} className={className}>
                  {lang === "en" ? cat.en : cat.label}
                </button>
              );
            })}
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
                  <h3 className="text-lg font-semibold">{lang === "en" ? p.enTitle : p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? p.enDesc : p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary-glow transition group-hover:gap-3">
                    {t("products.detail")} <ArrowRight className="h-4 w-4" />
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
            전자부터 광학까지<br />다양한 산업에 공급합니다
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

      {/* Contact — refined dark panel */}
      <section
        id="contact"
        className="relative overflow-hidden scroll-mt-24 bg-foreground py-24 text-background md:py-32"
      >
        {/* decorative glows */}
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-primary-glow/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left: Slogan + small office card */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-4 py-1.5 text-xs tracking-widest text-background/80 backdrop-blur">
                <MessageSquare className="h-3.5 w-3.5" /> {t("contact.tag")}
              </span>
              <h2 className="mt-6 whitespace-pre-line text-3xl font-bold leading-tight md:text-4xl">
                {t("contact.title")}
              </h2>
              <p className="mt-5 text-sm text-background/70">
                {t("contact.desc")}
              </p>

              {/* Compact office card */}
              <aside className="mt-8 rounded-2xl border border-background/15 bg-background/5 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-widest text-primary-glow">OFFICE</span>
                  <span className="h-px flex-1 bg-background/15" />
                  <span className="text-xs text-background/60">{t("contact.office")}</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li className="flex items-start gap-2.5 text-background/85">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                    <span>{t("footer.address")}</span>
                  </li>
                  <li>
                    <a href="tel:031-356-5682" className="flex items-center gap-2.5 text-background/85 hover:text-primary-glow">
                      <Phone className="h-4 w-4 shrink-0 text-primary-glow" />
                      031-356-5682
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@silica.co.kr" className="flex items-center gap-2.5 text-background/85 hover:text-primary-glow">
                      <Mail className="h-4 w-4 shrink-0 text-primary-glow" />
                      info@silica.co.kr
                    </a>
                  </li>
                </ul>
              </aside>
            </div>

          <form
            onSubmit={handleSubmit}
            action="https://formsubmit.co/ajax/cscomm@naver.com"
            method="POST"
            className="relative overflow-hidden rounded-3xl border border-background/15 bg-background/5 p-8 backdrop-blur-xl md:p-10 lg:col-span-7"
          >
            <input type="hidden" name="_subject" value="[홈페이지 문의] 신규 문의 도착" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <div className="absolute right-0 top-0 h-40 w-40 -translate-y-16 translate-x-16 rounded-full bg-primary/30 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 translate-y-16 -translate-x-16 rounded-full bg-primary-glow/20 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Send className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-semibold">{t("contact.form")}</h3>
              </div>

              <div className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-background/60">{t("form.name")}</label>
                    <Input
                      name="이름"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-background/60">{t("form.phone")}</label>
                    <Input
                      name="연락처"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-background/60">{t("form.email")}</label>
                    <Input
                      name="이메일"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-background/60">{t("form.company")}</label>
                    <Input
                      name="회사명"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-2 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:border-primary-glow focus-visible:ring-primary-glow/40"
                      placeholder="회사명을 입력해 주세요"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-background/60">{t("form.message")}</label>
                  <Textarea
                    name="문의내용"
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
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:bg-primary/90"
                >
                  {isSubmitting ? t("form.sending") : t("form.send")} <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
