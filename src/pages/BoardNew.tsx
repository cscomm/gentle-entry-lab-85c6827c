import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useLang } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const BoardNew = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !password.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("posts").insert({
      title: title.trim(),
      content: content.trim(),
      author_name: author.trim() || "Anonymous",
      password_hash: password,
      is_public: isPublic,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("board.created"));
    navigate("/board");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-32 pb-20">
        <section className="mx-auto max-w-3xl px-6 md:px-8">
          <Link to="/board" className="text-sm text-muted-foreground hover:text-foreground">
            {t("board.back")}
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            {t("board.new")}
          </h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">{t("form.title")}</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">{t("form.content")}</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="resize-y"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">{t("form.author")}</label>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Anonymous" maxLength={40} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">{t("form.password")}</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                />
                <p className="mt-1 text-xs text-muted-foreground">{t("form.passwordHint")}</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3">
              <div className="flex items-center gap-2">
                {isPublic ? <Globe className="h-4 w-4 text-primary" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                <div>
                  <div className="text-sm font-semibold text-foreground">{t("form.visibility")}</div>
                  <div className="text-xs text-muted-foreground">
                    {isPublic ? t("board.public") : t("board.private")}
                  </div>
                </div>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => navigate("/board")}>
                {t("form.cancel")}
              </Button>
              <Button type="submit" disabled={submitting}>
                {t("form.publish")}
              </Button>
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BoardNew;
