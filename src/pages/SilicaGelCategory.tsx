import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getProductsByCategory } from "@/data/products";
import { useLang } from "@/contexts/LanguageContext";

const SilicaGelCategory = () => {
  const { lang, t } = useLang();
  const products = getProductsByCategory("silica-gel");
  const isEn = lang === "en";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparentAtTop={false} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary/60 via-background to-background pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            ← {t("products.cat")}
          </Link>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            SILICA GEL
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isEn ? "Silica Gel · 실리카겔" : "실리카겔 · Silica Gel"}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            {isEn
              ? "High-purity silica gel and micronized silica products — micronized powder, anti-blocking, matting agents, and a full range of pore-controlled silica gels."
              : "고순도 실리카겔 및 미분 실리카 제품 — 미분 실리카, 안티블로킹제, 소광제, 다양한 기공 구조의 실리카겔까지 폭넓은 라인업을 제공합니다."}
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
            >
              <div className="aspect-square overflow-hidden bg-secondary/40">
                <img
                  src={p.image}
                  alt={isEn ? p.enName : p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold leading-snug">{isEn ? p.enName : p.name}</h3>
                {!isEn && <p className="mt-1 text-xs text-muted-foreground">{p.enName}</p>}
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary transition group-hover:gap-3">
                  {t("products.detail")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default SilicaGelCategory;
