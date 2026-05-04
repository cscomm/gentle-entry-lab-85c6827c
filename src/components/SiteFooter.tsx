import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { productCatalog } from "@/data/products";

const SiteFooter = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top: Brand + Columns */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight">
                Si<span className="text-primary-glow">Li</span>CA
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {t("nav.tagline")}
              </span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:031-000-0000" className="hover:text-primary-glow">031-000-0000</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@silica.co.kr" className="hover:text-primary-glow">info@silica.co.kr</a>
              </li>
            </ul>
          </div>

          {/* Products column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-widest text-foreground">
              {t("footer.products.title")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {productCatalog.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className="hover:text-primary-glow">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About column */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold tracking-widest text-foreground">
              {t("footer.about.title")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary-glow">{t("footer.about")}</Link></li>
              <li><Link to="/#contact" className="hover:text-primary-glow">{t("footer.contact")}</Link></li>
              <li><Link to="/terms" className="hover:text-primary-glow">{t("footer.terms")}</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-glow">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          {/* Applications column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-widest text-foreground">
              {t("footer.applications.title")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {productCatalog.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}#applications`} className="hover:text-primary-glow">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>{t("footer.hq")}</p>
          <p>© 2023 SiLiCA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
