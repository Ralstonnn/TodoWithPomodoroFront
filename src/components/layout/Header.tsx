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
      <div className="header-wrapper">
        <div className="header-actions">
          <NavLink className="header-actions__button" to="/todo">
            Todo
          </NavLink>
          <NavLink className="header-actions__button" to="/scrum">
            Scrum
          </NavLink>
        </div>
        <div className="header-info">
          <div className="header-info__username">{profile?.username}</div>
          {/*<ButtonComponent text="Logout" onClick={logout} />*/}
        </div>
      </div>
    </div>
  );
}
