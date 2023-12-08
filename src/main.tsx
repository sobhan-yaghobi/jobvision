import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading/Loading.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = lazy(() => import("./App.tsx"));
const client = new QueryClient({ defaultOptions: { queries: { staleTime: 10000, gcTime: 300000 } } });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
        <BrowserRouter>
            <QueryClientProvider client={client}>
                <App />
            </QueryClientProvider>
        </BrowserRouter>
    </Suspense>
);
