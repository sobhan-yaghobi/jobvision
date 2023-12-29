import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import useAuth, { userInfo } from "./Store/useAuth";
import { useEffect } from "react";
import { getLocalStorage } from "./Utils/Utils";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ykbyhslhgdnxflfmfzbu.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYnloc2xoZ2RueGZsZm1memJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MjIwOTEsImV4cCI6MjAxNjk5ODA5MX0.kA3uYoFZ-LuLOiGXayJJtOkmBCfSFWjgAUehHzl30KU`;

export const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
    const { setUserInfo } = useAuth();
    useEffect(() => {
        const user = getLocalStorage({ key: "user" });
        const isUserInfo = (user: any): user is userInfo => {
            return (
                typeof user.email_or_phoneNumber === "string" &&
                typeof user.password === "string" &&
                (typeof user.company_id === "string" || user.company_id === null)
            );
        };
        isUserInfo(user) ? setUserInfo(user) : null;
    }, []);
    const router = useRoutes(routes);

    return <>{router}</>;
}

export default App;
