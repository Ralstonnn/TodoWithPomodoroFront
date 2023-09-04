import "../../style/layout/header.scss";
import userService from "../../services/userService";
import ButtonComponent from "../common/ButtonComponent";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SvgArrowDown from "../../assets/svg/SvgArrowDown";

export default function Header() {
  const navigate = useNavigate();
  const profile = userService.user.profile;
  const [showOptions, setShowOptions] = useState(false);

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
        <div
          className="header-info"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <div className="header-info__username-container">
            <div className="header-info__username">{profile?.username}</div>
            <SvgArrowDown className="header-info__username-arrow" />
          </div>
          <HeaderProfileOptions show={showOptions} onLogout={logout} />
        </div>
      </div>
    </div>
  );
}

type ProfileOptionsProps = {
  show: boolean;
  onLogout: Function;
};
function HeaderProfileOptions({ show = false, onLogout }: ProfileOptionsProps) {
  return (
    <div className={`header-info__options-container ${show ? "show" : ""}`}>
      <div className={`header-info__options`}>
        {/*<NavLink className="header-info__options-button" to="/profile">*/}
        {/*  Profile*/}
        {/*</NavLink>*/}
        <button
          className="header-info__options-button"
          type="button"
          onClick={() => onLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
