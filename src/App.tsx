import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
    const router = useRoutes(routes);

    return (
        <>
            <Header></Header>
            {router}
            <Footer></Footer>
        </>
    );
}

export default App;
