import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { productCatalog } from "@/data/products";

const navItems = [
  { en: "Home", ko: "홈", href: "/#home" },
  { en: "Mineral Product", ko: "제품", href: "/#products", dropdown: true },
  { en: "About", ko: "회사소개", href: "/#about" },
  { en: "Applications", ko: "응용분야", href: "/#applications" },
  { en: "Contact", ko: "문의하기", href: "/#contact" },
];

interface SiteHeaderProps {
  /** Use transparent style at top of page (only useful when page has a hero behind it). */
  transparentAtTop?: boolean;
}

const SiteHeader = ({ transparentAtTop = false }: SiteHeaderProps) => {
  const [scrolled, setScrolled] = useState(!transparentAtTop);

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
            규석 전문 기업
          </span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <div key={item.en} className="group relative">
              <a
                href={item.href}
                className={`relative inline-flex items-center gap-1 text-[15px] font-semibold tracking-wide transition-colors duration-500 hover:text-primary-glow ${
                  scrolled ? "text-foreground/85" : "text-white/95 [text-shadow:_0_1px_2px_rgb(0_0_0_/_45%)]"
                }`}
              >
                <span className="relative inline-block">
                  <span className="block transition-opacity duration-200 group-hover:opacity-0">
                    {item.en}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {item.ko}
                  </span>
                </span>
                {item.dropdown && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </a>

              {item.dropdown && (
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-md">
                    {productCatalog.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/products/${p.slug}`}
                        className="block border-b border-border/60 px-5 py-3 text-sm text-foreground transition last:border-0 hover:bg-secondary hover:text-primary-glow"
                      >
                        <div className="font-semibold">{p.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{p.enName}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
