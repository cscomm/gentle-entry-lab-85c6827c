import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { productCatalog } from "@/data/products";
import { useLang } from "@/contexts/LanguageContext";

const navItems = [
  { key: "nav.home", href: "/#home" },
  { key: "nav.products", href: "/#products", dropdown: "products" as const },
  { key: "nav.about", href: "/about" },
  { key: "nav.applications", href: "/#applications" },
  { key: "nav.board", href: "/board" },
  { key: "nav.contact", href: "/#contact" },
];

interface SiteHeaderProps {
  /** Use transparent style at top of page (only useful when page has a hero behind it). */
  transparentAtTop?: boolean;
}

const SiteHeader = ({ transparentAtTop = false }: SiteHeaderProps) => {
  const [scrolled, setScrolled] = useState(!transparentAtTop);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    if (!transparentAtTop) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentAtTop]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/85 border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
        <Link to="/#home" className="inline-flex flex-col leading-tight">
          <span
            className={`text-2xl font-bold tracking-tight transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-white drop-shadow"
            }`}
          >
            Si<span className="text-primary-glow">Li</span>CA
          </span>
          <span
            className={`mt-1 block w-full text-center font-medium transition-colors duration-500 ${
              scrolled ? "text-muted-foreground" : "text-white/90 drop-shadow"
            }`}
            style={{ fontSize: "0.62rem", letterSpacing: "0.05em" }}
          >
            {t("nav.tagline")}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isInternal = item.href.startsWith("/") && !item.href.includes("#");
            const linkClass = `relative inline-flex items-center gap-1 text-[15px] font-semibold tracking-wide transition-colors duration-500 hover:text-primary-glow ${
              scrolled ? "text-foreground/85" : "text-white/95 [text-shadow:_0_1px_2px_rgb(0_0_0_/_45%)]"
            }`;
            const inner = (
              <>
                <span>{t(item.key)}</span>
                {item.dropdown && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </>
            );

            return (
              <div key={item.key} className="group relative">
                {isInternal ? (
                  <Link to={item.href} className={linkClass}>{inner}</Link>
                ) : (
                  <a href={item.href} className={linkClass}>{inner}</a>
                )}

                {item.dropdown && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-md">
                      {productCatalog
                        .filter((p) => (p.category ?? "quartz") === "quartz")
                        .map((p) => (
                          <Link
                            key={p.slug}
                            to={`/products/${p.slug}`}
                            className="block border-b border-border/60 px-5 py-3 text-sm text-foreground transition hover:bg-secondary hover:text-primary-glow"
                          >
                            <div className="font-semibold">{lang === "en" ? p.enName : p.name}</div>
                            {lang === "ko" && (
                              <div className="mt-0.5 text-xs text-muted-foreground">{p.enName}</div>
                            )}
                          </Link>
                        ))}
                      <Link
                        to="/products/silica-gel"
                        className="block px-5 py-3 text-sm text-foreground transition hover:bg-secondary hover:text-primary-glow"
                      >
                        <div className="font-semibold">{lang === "en" ? "Silica Gel" : "실리카겔"}</div>
                        {lang === "ko" && (
                          <div className="mt-0.5 text-xs text-muted-foreground">Silica Gel</div>
                        )}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Language toggle */}
          <div className={`flex items-center gap-1 rounded-full border px-1 py-1 text-xs font-bold transition-colors duration-500 ${
            scrolled ? "border-border/60 bg-card" : "border-white/30 bg-white/10 backdrop-blur"
          }`}>
            <button
              onClick={() => setLang("ko")}
              className={`rounded-full px-2.5 py-1 transition ${
                lang === "ko"
                  ? "bg-primary text-primary-foreground"
                  : scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
              aria-label="한국어"
            >
              KO
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
