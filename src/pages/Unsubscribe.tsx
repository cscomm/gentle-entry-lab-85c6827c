import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "ready" | "already" | "invalid" | "submitting" | "done" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON_KEY },
        });
        const data = await res.json();
        if (!res.ok) { setState("invalid"); return; }
        if (data.valid === false && data.reason === "already_unsubscribed") setState("already");
        else if (data.valid) setState("ready");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      if (data?.success) setState("done");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch (e: any) {
      setError(e?.message ?? "오류가 발생했습니다.");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm text-center">
        <h1 className="text-2xl font-semibold mb-3">수신 거부</h1>
        {state === "loading" && <p className="text-muted-foreground">확인 중입니다…</p>}
        {state === "ready" && (
          <>
            <p className="text-muted-foreground mb-6">아래 버튼을 누르시면 향후 이메일 수신이 중단됩니다.</p>
            <Button onClick={confirm} size="lg">수신 거부 확정</Button>
          </>
        )}
        {state === "submitting" && <p className="text-muted-foreground">처리 중…</p>}
        {state === "done" && <p className="text-muted-foreground">수신 거부가 완료되었습니다.</p>}
        {state === "already" && <p className="text-muted-foreground">이미 수신 거부 처리된 이메일입니다.</p>}
        {state === "invalid" && <p className="text-destructive">유효하지 않거나 만료된 링크입니다.</p>}
        {state === "error" && <p className="text-destructive">오류가 발생했습니다. {error}</p>}
      </div>
    </div>
  );
}
