import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import useAuth, { userInfo } from "./Store/useAuth";
import { useEffect } from "react";
import { getLocalStorage } from "./Utils/Utils";

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
