import axios from "axios";

const supabaseFetch = axios.create({
    baseURL: "https://ykbyhslhgdnxflfmfzbu.supabase.co/rest/v1/",
    headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYnloc2xoZ2RueGZsZm1memJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MjIwOTEsImV4cCI6MjAxNjk5ODA5MX0.kA3uYoFZ-LuLOiGXayJJtOkmBCfSFWjgAUehHzl30KU",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYnloc2xoZ2RueGZsZm1memJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MjIwOTEsImV4cCI6MjAxNjk5ODA5MX0.kA3uYoFZ-LuLOiGXayJJtOkmBCfSFWjgAUehHzl30KU",
    },
});

export default supabaseFetch;
