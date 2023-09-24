import { lazy } from "react";
type routesProps = {
    path: string;
    element: React.ReactNode;
};

const Home = lazy(() => import("./Page/Home/Home"));
const Jobs = lazy(() => import("./Page/Jobs/Jobs"));

const routes: routesProps[] = [
    { path: "/", element: <Home></Home> },
    { path: "/jobs", element: <Jobs></Jobs> },
];

export default routes;
