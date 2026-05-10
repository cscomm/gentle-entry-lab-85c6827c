import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Globe, PenSquare, Eye, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";

interface PostRow {
  id: string;
  title: string;
  author_name: string;
  is_public: boolean;
  views: number;
  created_at: string;
}

const Board = () => {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, author_name, is_public, views, created_at")
        .order("created_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    })();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-20">
        <section className="mx-auto max-w-5xl px-6 md:px-8">
          {/* Header */}
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold tracking-widest text-primary">
                <MessageSquare className="h-3.5 w-3.5" />
                COMMUNITY
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {t("board.title")}
              </h1>
              <p className="mt-3 text-muted-foreground">{t("board.subtitle")}</p>
            </div>
            <Button asChild size="lg" className="gap-2">
              <Link to="/board/new">
                <PenSquare className="h-4 w-4" />
                {t("board.new")}
              </Link>
            </Button>
          </div>

          {/* List */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="hidden grid-cols-12 border-b border-border bg-secondary/40 px-6 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground md:grid">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-6">{t("form.title")}</div>
              <div className="col-span-2">{t("board.author")}</div>
              <div className="col-span-2">{t("board.date")}</div>
              <div className="col-span-1 text-right">{t("board.views")}</div>
            </div>

            {loading ? (
              <div className="px-6 py-16 text-center text-muted-foreground">…</div>
            ) : posts.length === 0 ? (
              <div className="px-6 py-16 text-center text-muted-foreground">
                {t("board.empty")}
              </div>
            ) : (
              posts.map((p, idx) => (
                <Link
                  key={p.id}
                  to={`/board/${p.id}`}
                  className="grid grid-cols-1 gap-1 border-b border-border px-6 py-4 transition hover:bg-secondary/50 md:grid-cols-12 md:items-center md:gap-2"
                >
                  <div className="hidden text-center text-sm text-muted-foreground md:col-span-1 md:block">
                    {posts.length - idx}
                  </div>
                  <div className="md:col-span-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${
                          p.is_public
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.is_public ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        {p.is_public ? t("board.public") : t("board.private")}
                      </span>
                      <span className="line-clamp-1 font-semibold text-foreground">
                        {p.title}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground md:col-span-2">
                    {p.author_name}
                  </div>
                  <div className="text-sm text-muted-foreground md:col-span-2">
                    {formatDate(p.created_at)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground md:col-span-1 md:justify-end">
                    <Eye className="h-3.5 w-3.5" /> {p.views}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Board;
