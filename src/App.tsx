import "./style/app.scss";
import { Outlet, useLocation } from "react-router-dom";
import userService from "./services/userService";
import { useEffect, useState } from "react";
import Preloader from "./components/common/Preloader";
import api from "./api";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    if (!userService.user.token?.length && location.pathname !== "/auth") {
      console.log("GetProfile");
      const response = await api.user.getProfile();
      console.log("GetProfile done");
      console.log(response);
      if (response.success) {
        userService.user.profile = response.data.profile;
        userService.user.token = response.data.token;
      }
    }
    setLoading(false);
  };

  const componentToRender = () => {
    if (loading) return <RootPreloader />;
    else if (!userService.user.token && location.pathname !== "/auth") {
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
