import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import Header from "./Components/Header/Header";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <Header></Header>
      {router}
    </>
  );
}

export default App;
