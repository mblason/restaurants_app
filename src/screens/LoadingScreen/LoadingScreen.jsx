import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { activateAccount } from "../../services/Auth.services";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      activateAccount(token)
      .then((res) => {
        navigate("/");
      });
    } else {
      const accessToken = Object.fromEntries(
        new URLSearchParams(location.search)
      );
      login(accessToken.callbackToken);
      navigate("/home", { replace: true });
    }
  }, [token, navigate, location.search, login]);

  return <span className="loader"></span>;
}