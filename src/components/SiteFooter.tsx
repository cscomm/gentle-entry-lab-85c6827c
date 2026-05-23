import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const SiteFooter = () => {
  const { t } = useLang();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const navItems = [
    { label: t("nav.home"), to: "/#home", external: true },
    { label: t("footer.products.title"), to: "/#products", external: true },
    { label: t("footer.about.title"), to: "/about", external: false },
    { label: t("nav.board"), to: "/board", external: false },
    { label: t("nav.contact"), to: "/#contact", external: true },
  ];

  // Compact footer for non-home pages (About, ProductDetail, etc.)
  if (!isHome) {
    return (
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          {/* Left: brand + inline nav */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight">
                Si<span className="text-primary-glow">Li</span>CA
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {t("nav.tagline")} · 실리카
              </span>
            </div>
            <nav className="flex flex-wrap items-center gap-x-5 text-sm font-medium text-foreground/80">
              {navItems.map((item) =>
                item.external ? (
                  <a key={item.label} href={item.to} className="transition hover:text-primary-glow">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.to} className="transition hover:text-primary-glow">
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right: copyright */}
          <p className="text-xs text-muted-foreground">
            © 2023 SiLiCA. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  // Home: keep centered, fuller footer
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <span className="text-3xl font-bold tracking-tight">
            Si<span className="text-primary-glow">Li</span>CA
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {t("nav.tagline")} · 실리카
          </span>
        </div>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-foreground/80">
          {navItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-x-8">
              {item.external ? (
                <a href={item.to} className="transition hover:text-primary-glow">
                  {item.label}
                </a>
              ) : (
                <Link to={item.to} className="transition hover:text-primary-glow">
                  {item.label}
                </Link>
              )}
              {i < navItems.length - 1 && (
                <span className="text-border" aria-hidden="true">|</span>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>{t("footer.hq")}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link to="/terms" className="hover:text-primary-glow">{t("footer.terms")}</Link>
            <span className="opacity-30">|</span>
            <Link to="/privacy" className="hover:text-primary-glow">{t("footer.privacy")}</Link>
            <span className="opacity-30">|</span>
            <a href="mailto:contact@silica.co.kr" className="hover:text-primary-glow">contact@silica.co.kr</a>
            <span className="opacity-30">|</span>
            <span>© 2023 SiLiCA. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
