import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://fuvcrbkixbbrthbnhbke.supabase.co";

const supabaseKey =
  "sb_publishable_SK1bTeV6e5KkK_8-ZtahKg_39M0HevS";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);