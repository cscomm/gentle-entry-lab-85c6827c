import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug, productCatalog } from "@/data/products";
import SiteHeader from "@/components/SiteHeader";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparentAtTop />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="h-[420px] w-full object-cover md:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-14 text-white">
          <span className="text-sm tracking-widest text-white/80">{product.enName.toUpperCase()}</span>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl drop-shadow-lg">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">{product.tagline}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
              OVERVIEW
            </span>
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">제품 개요</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold">규격</h3>
            <dl className="mt-6 space-y-4">
              {product.specs.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0">
                  <dt className="text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
            FEATURES
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">주요 특징</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {product.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]">
                <CheckCircle2 className="h-8 w-8 text-primary-glow" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
          APPLICATIONS
        </span>
        <h2 className="mt-6 text-3xl font-bold md:text-4xl">응용 분야</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {product.applications.map((a) => (
            <span key={a} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm text-foreground">
              {a}
            </span>
          ))}
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
