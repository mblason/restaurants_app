import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { logout } from "../../store/AccessTokenStore";
import "./Navbar.css";

/* IMAGES */
import closeBtnNav from "../../assets/images/navbar/close-nav-icon.png";
import favIcon from "../../assets/images/navbar/fav-icon.png";
import homeIcon from "../../assets/images/navbar/home-icon.png";
import logoutIcon from "../../assets/images/navbar/logout-icon.png";
import myRestoIcon from "../../assets/images/navbar/my-resto-icon.png";
import navIcon from "../../assets/images/navbar/nav-icon.png";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);

  const userLogOut = () => {
    logout();
  };

  const handleOnClick = () => {
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  return (
    <div className="navbar-container">
        <div>
            <img
            src={navIcon}
            alt="img"
            className="sandwich-navbar"
            onClick={handleOnClick}
            />
        </div>

        {isOpened && (
        <div className="side-navbar">
            <div className="header-side-navbar">
            <img
                src={closeBtnNav}
                alt="btn-close"
                onClick={handleOnClick}
                className="close-navbar"
            />
            </div>
            <div className="Navbar-auth">
            <Link to="/home" onClick={handleOnClick}>
                <img src={homeIcon} alt="homeIcon" className="icon-navbar" />
                <span>Home</span>
            </Link>

            <Link to="/myRestaurants" onClick={handleOnClick}>
                <img
                src={myRestoIcon}
                alt="myRestoIcon"
                className="icon-navbar"
                />
                <span>My Restaurants</span>
            </Link>

            <Link to="/myFavourites" onClick={handleOnClick}>
                <img src={favIcon} alt="favIcon" className="icon-navbar" />
                <span>My Favourites</span>
            </Link>

            <Link onClick={userLogOut}>
                <img src={logoutIcon} alt="logoutIcon" className="icon-navbar" />
                <span>Logout</span>
            </Link>
            </div>
        </div>
        )}
    </div>
  );
}