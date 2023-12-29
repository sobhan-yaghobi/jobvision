// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ykbyhslhgdnxflfmfzbu.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYnloc2xoZ2RueGZsZm1memJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MjIwOTEsImV4cCI6MjAxNjk5ODA5MX0.kA3uYoFZ-LuLOiGXayJJtOkmBCfSFWjgAUehHzl30KU`;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
