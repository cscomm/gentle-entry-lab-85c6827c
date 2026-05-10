import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock, Globe, Eye, Calendar, User, Trash2, Unlock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface PostMeta {
  id: string;
  title: string;
  author_name: string;
  is_public: boolean;
  views: number;
  created_at: string;
  content: string;
}

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [post, setPost] = useState<PostMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState<string>("");
  const [pw, setPw] = useState("");
  const [delPw, setDelPw] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, author_name, is_public, views, created_at, content")
        .eq("id", id)
        .maybeSingle();
      if (data) {
        setPost(data as PostMeta);
        setUnlocked(data.is_public);
        if (data.is_public) setUnlockedContent(data.content);
        await supabase.rpc("increment_post_views", { _post_id: id });
      }
      setLoading(false);
    })();
  }, [id]);

  const onUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const { data, error } = await supabase.rpc("get_post_content", {
      _post_id: id,
      _password: pw,
    });
    if (error || data === null) {
      toast.error(t("board.wrongPw"));
      return;
    }
    setUnlockedContent(data as string);
    setUnlocked(true);
  };

  const onDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const { data, error } = await supabase.rpc("delete_post_with_password", {
      _post_id: id,
      _password: delPw,
    });
    if (error || !data) {
      toast.error(t("board.wrongPw"));
      return;
    }
    toast.success(t("board.deleted"));
    navigate("/board");
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(lang === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-32 pb-20">
        <section className="mx-auto max-w-3xl px-6 md:px-8">
          <Link to="/board" className="text-sm text-muted-foreground hover:text-foreground">
            {t("board.back")}
          </Link>

          {loading ? (
            <div className="mt-12 text-center text-muted-foreground">…</div>
          ) : !post ? (
            <div className="mt-12 text-center text-muted-foreground">404</div>
          ) : (
            <article className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {/* Header */}
              <header className="border-b border-border bg-gradient-to-br from-primary/5 to-transparent px-6 py-8 md:px-10 md:py-10">
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${
                      post.is_public
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {post.is_public ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {post.is_public ? t("board.public") : t("board.private")}
                  </span>
                </div>
                <h1 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {post.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> {post.author_name}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {formatDate(post.created_at)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" /> {post.views}
                  </span>
                </div>
              </header>

              {/* Content */}
              <div className="px-6 py-8 md:px-10 md:py-10">
                {unlocked ? (
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
                    {unlockedContent}
                  </div>
                ) : (
                  <form onSubmit={onUnlock} className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-secondary/30 p-6 text-center">
                    <Lock className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="mb-4 text-sm text-muted-foreground">{t("board.lockedDesc")}</p>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder={t("form.password")}
                        required
                      />
                      <Button type="submit" className="gap-1 shrink-0">
                        <Unlock className="h-4 w-4" /> {t("board.unlock")}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Actions */}
              <footer className="flex items-center justify-between border-t border-border bg-secondary/30 px-6 py-4 md:px-10">
                <Link to="/board" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("board.back")}
                </Link>
                {!showDelete ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDelete(true)}
                    className="gap-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> {t("board.delete")}
                  </Button>
                ) : (
                  <form onSubmit={onDelete} className="flex gap-2">
                    <Input
                      type="password"
                      value={delPw}
                      onChange={(e) => setDelPw(e.target.value)}
                      placeholder={t("board.deleteConfirm")}
                      className="h-9 w-48"
                      required
                    />
                    <Button type="submit" size="sm" variant="destructive" className="gap-1">
                      <Trash2 className="h-3.5 w-3.5" /> {t("board.delete")}
                    </Button>
                  </form>
                )}
              </footer>
            </article>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BoardDetail;
