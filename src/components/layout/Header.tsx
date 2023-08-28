import "../../style/layout/header.scss";
import userService from "../../services/userService";
import ButtonComponent from "../common/ButtonComponent";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const profile = userService.user.profile;

  const logout = () => {
    userService.reset();
    navigate("/auth");
  };

  return (
    <div className="header">
      <div className="header-actions">
        <NavLink to="/todo">
          <h1>Todo</h1>
        </NavLink>
        <NavLink to="/scrum">
          <h1>Scrum</h1>
        </NavLink>
      </div>
      <div className="header-info">
        <h1 className="header-info__username">{profile?.username}</h1>
        <ButtonComponent text="Logout" onClick={logout} />
      </div>
    </div>
  );
}
