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
    if (
      !userService.user.profile &&
      location.pathname !== "/auth/register" &&
      location.pathname !== "/auth/login"
    ) {
      const response = await api.user.getProfile();
      if (response.success) {
        userService.user.profile = response.data.profile;
        userService.user.token = response.data.token;
        userService.saveUserData();
      }
    }
    setLoading(false);
  };

  const componentToRender = () => {
    if (loading) return <RootPreloader />;
    else if (
      !userService.user.token &&
      location.pathname !== "/auth/register" &&
      location.pathname !== "/auth/login"
    ) {
      window.location.replace(
        window.location.protocol +
          "//" +
          window.location.hostname +
          "/auth/login"
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
