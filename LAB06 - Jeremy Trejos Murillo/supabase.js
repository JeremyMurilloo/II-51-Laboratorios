import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qklaefqvoympgwalkqaw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbGFlZnF2b3ltcGd3YWxrcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0Njc4MTYsImV4cCI6MjA4NzA0MzgxNn0.mDVpSR6hWin0Pt65K4ptHQM_H0Q1DLzxy3jQAw28Qdw";

export const supabase = createClient(supabaseUrl, supabaseKey);