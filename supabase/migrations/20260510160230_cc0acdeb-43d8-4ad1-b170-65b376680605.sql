
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='posts' AND policyname='Anyone can read posts') THEN
    CREATE POLICY "Anyone can read posts" ON public.posts FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='posts' AND policyname='Anyone can insert posts') THEN
    CREATE POLICY "Anyone can insert posts" ON public.posts FOR INSERT WITH CHECK (true);
  END IF;
END $$;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.posts_hash_password()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  IF NEW.password_hash IS NOT NULL AND NEW.password_hash <> '' AND NEW.password_hash NOT LIKE '$2%' THEN
    NEW.password_hash := crypt(NEW.password_hash, gen_salt('bf'));
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS posts_hash_password_trigger ON public.posts;
CREATE TRIGGER posts_hash_password_trigger
BEFORE INSERT OR UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.posts_hash_password();

CREATE OR REPLACE FUNCTION public.verify_post_password(_post_id uuid, _password text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $$
  SELECT EXISTS (SELECT 1 FROM public.posts WHERE id = _post_id AND password_hash = crypt(_password, password_hash));
$$;

CREATE OR REPLACE FUNCTION public.get_post_content(_post_id uuid, _password text)
RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE _content text; _is_public boolean;
BEGIN
  SELECT content, is_public INTO _content, _is_public FROM public.posts WHERE id = _post_id;
  IF _is_public THEN RETURN _content; END IF;
  IF public.verify_post_password(_post_id, _password) THEN RETURN _content; END IF;
  RETURN NULL;
END; $$;

CREATE OR REPLACE FUNCTION public.delete_post_with_password(_post_id uuid, _password text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  IF public.verify_post_password(_post_id, _password) THEN
    DELETE FROM public.posts WHERE id = _post_id;
    RETURN true;
  END IF;
  RETURN false;
END; $$;

CREATE OR REPLACE FUNCTION public.increment_post_views(_post_id uuid)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.posts SET views = views + 1 WHERE id = _post_id;
$$;

GRANT EXECUTE ON FUNCTION public.verify_post_password(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_post_content(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.delete_post_with_password(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_post_views(uuid) TO anon, authenticated;

CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts (created_at DESC);
