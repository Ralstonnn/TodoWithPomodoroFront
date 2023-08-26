import "./style/app.scss";
import { Outlet, useLocation } from "react-router-dom";
import userService from "./services/userService";
import { useEffect, useState } from "react";
import Preloader from "./components/common/Preloader";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    if (location.pathname !== "/auth") {
      await userService.authenticateUser();
    }
    setLoading(false);
  };

  const componentToRender = () => {
    if (loading) return <RootPreloader />;
    else if (!userService.isAuthorized() && location.pathname !== "/auth") {
      window.location.replace(
        window.location.protocol + "//" + window.location.hostname + "/auth"
      );
      return <RootPreloader />;
    }
    return <Outlet />;
  };

  useEffect(() => {
    init();
  }, []);

  return <div className="App">{componentToRender()}</div>;
}

function RootPreloader() {
  return (
    <div className="root-preloader-wrap">
      <Preloader />
    </div>
  );
}
