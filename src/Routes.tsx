type routesProps = {
  path: string;
  element: React.ReactNode;
};

import Home from "./Page/Home/Home";

const routes: routesProps[] = [{ path: "/", element: <Home></Home> }];
export default routes;
