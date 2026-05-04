import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const SiteFooter = () => {
  const { t } = useLang();

  const navItems = [
    { label: t("nav.home"), to: "/#home", external: true },
    { label: t("footer.products.title"), to: "/#products", external: true },
    { label: t("footer.about.title"), to: "/about", external: false },
    { label: t("footer.applications.title"), to: "/#applications", external: true },
    { label: t("nav.contact"), to: "/#contact", external: true },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 text-center">
        {/* Brand row */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <span className="text-3xl font-bold tracking-tight">
            Si<span className="text-primary-glow">Li</span>CA
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {t("nav.tagline")}
          </span>
        </div>

        {/* Horizontal nav with pipe separators */}
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

        {/* Bottom info */}
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>{t("footer.hq")}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link to="/terms" className="hover:text-primary-glow">{t("footer.terms")}</Link>
            <span className="opacity-30">|</span>
            <Link to="/privacy" className="hover:text-primary-glow">{t("footer.privacy")}</Link>
            <span className="opacity-30">|</span>
            <span>© 2023 SiLiCA. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
