import { lazy } from "react";
// import ReqeustAccept from ;
// import ReqeustReject from ;
// import RequestWait from ;
// import ReqeustAll from ;
type routesProps = {
    path: string;
    element: React.ReactNode;
    children?: routesProps[];
};

const Home = lazy(() => import("./Page/Home/Home"));
const Jobs = lazy(() => import("./Page/Jobs/Jobs"));
const CmsEmployer = lazy(() => import("./Page/CmsEmployer/CmsEmployer"));

const CmsHome = lazy(() => import("./Page/CmsEmployer/Home/CmsHome"));
const CmsAdvertising = lazy(() => import("./Page/CmsEmployer/Advertising/CmsAdvertising"));
const CmsReqeustAccept = lazy(() => import("./Page/CmsEmployer/Reqeust/ReqeustAccept"));
const CmsReqeustReject = lazy(() => import("./Page/CmsEmployer/Reqeust/ReqeustReject"));
const CmsRequestWait = lazy(() => import("./Page/CmsEmployer/Reqeust/RequestWait"));
const CmsReqeustAll = lazy(() => import("./Page/CmsEmployer/Reqeust/ReqeustAll"));

const routes: routesProps[] = [
    { path: "/*", element: <>Not Found</> },
    { path: "/", element: <Home /> },
    { path: "/jobs", element: <Jobs /> },
    {
        path: "/CmsEmployer",
        element: <CmsEmployer />,
        children: [
            { path: "", element: <CmsHome /> },
            { path: "Advertsisings", element: <CmsAdvertising /> },
            { path: "Request_Accept", element: <CmsReqeustAccept /> },
            { path: "Request_Rejection", element: <CmsReqeustReject /> },
            { path: "Request_Waiting", element: <CmsRequestWait /> },
            { path: "Request_All", element: <CmsReqeustAll /> },
        ],
    },
];

export default routes;
