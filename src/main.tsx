import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const App = lazy(() => import("./App.tsx"));
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Loading from "./Components/Loading/Loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
