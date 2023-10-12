import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading/Loading.tsx";

const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Suspense>
);
