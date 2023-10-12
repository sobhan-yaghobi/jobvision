import { lazy } from "react";
type routesProps = {
    path: string;
    element: React.ReactNode;
};

const Home = lazy(() => import("./Page/Home/Home"));
const Jobs = lazy(() => import("./Page/Jobs/Jobs"));
const CmsEmployer = lazy(() => import("./Page/CmsEmployer/CmsEmployer"));

const routes: routesProps[] = [
    { path: "/*", element: <>Not Found</> },
    { path: "/", element: <Home></Home> },
    { path: "/jobs", element: <Jobs></Jobs> },
    { path: "/CmsEmployer", element: <CmsEmployer></CmsEmployer> },
];

export default routes;
