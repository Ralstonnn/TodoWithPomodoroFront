import { Outlet } from "react-router-dom";

export default function AuthenticationComponent() {
  return (
    <div className="authentication-component">
      <Outlet />
    </div>
  );
}
