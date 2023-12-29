// Route
import routes from "./Routes";

// Types
import { getLocalStorage, isUserInfo } from "./Utils/Utils";

// Hooks
import { useRoutes } from "react-router-dom";
import useAuth from "./Store/useAuth";
import { useEffect } from "react";
import useUser from "./Hooks/useUser";

function App() {
    const { setUserInfo } = useAuth();
    const { mutateAsync: getUser } = useUser();
    useEffect(() => {
        const user = getLocalStorage({ key: "user" });
        if (isUserInfo(user)) {
            const getUsers = async () => {
                const userFromApi = await getUser(user.email_or_phoneNumber);
                if (typeof userFromApi !== "undefined") {
                    setUserInfo(userFromApi);
                }
            };
            getUsers();
        }
    }, []);
    const router = useRoutes(routes);

    return <>{router}</>;
}

export default App;
