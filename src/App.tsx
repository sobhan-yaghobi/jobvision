import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import AuthContextProvider from "./Context/AuthContext";

function App() {
    const router = useRoutes(routes);

    return (
        <>
            <AuthContextProvider>{router}</AuthContextProvider>
        </>
    );
}

export default App;
