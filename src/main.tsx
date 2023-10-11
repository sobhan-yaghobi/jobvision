import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading/Loading.tsx";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store.tsx";

const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
        <Provider store={Store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </Suspense>
);
