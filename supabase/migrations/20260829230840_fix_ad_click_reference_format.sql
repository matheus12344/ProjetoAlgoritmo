-- PostgreSQL's ARE engine limits counted repetitions to 255. Keep the same
-- validation semantics with an explicit length check and an unbounded
-- character-class expression.

alter table public.ad_click_references
  drop constraint if exists ad_click_references_click_id_format;

alter table public.ad_click_references
  add constraint ad_click_references_click_id_format
  check (
    char_length(click_id) between 10 and 512
    and click_id ~ '^[A-Za-z0-9._~-]+$'
  );
