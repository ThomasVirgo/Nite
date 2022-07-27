import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://kpjgxrmtztbxuiaaknkn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwamd4cm10enRieHVpYWFrbmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTg5Mjk5MDgsImV4cCI6MTk3NDUwNTkwOH0.CkPb0tNGNvmWGWoH3Wq2N76bAi-bArDhpnIgoYxxDP8"
);