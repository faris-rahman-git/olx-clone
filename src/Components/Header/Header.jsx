import React, { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Arrow from "../../assets/Arrow";
import SellButtonPlus from "../../assets/SellButtonPlus";
import SellButton from "../../assets/SellButton";
import Search from "../../assets/Search";
import { UserContext } from "../../context/authContext";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => navigate("/")}>
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          {user ? (
            <span>{user.name}</span>
          ) : (
            <span className="loginBtn" onClick={handleLogin}>
              Login
            </span>
          )}

          <hr />
        </div>
        {user ? (
          <div className="logoutBtn">
            <span onClick={handleLogout}>Logout</span>
          </div>
        ) : null}
        {user ? (
          <div
            className="sellMenu"
            onClick={() => {
              navigate("/create");
            }}
          >
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
