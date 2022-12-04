import React, { useContext, useState } from 'react';
import googleIcon from '../../assets/images/misc/google-icon.png';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import AuthContext from '../../contexts/AuthContext';
import { login as userLogin, register } from "../../services/Auth.services";
import './AuthScreen.css';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({});
  const [mongoError, setMongoError] = useState({});
  const [msgActivateAccount, setMsgActivateAccount] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  }

  const handleOnSubmit = (e) => {
     e.preventDefault();

     if (isRegister) {
      register(authData)
        .then(userCreated => {
          setIsRegister(false);
          setMsgActivateAccount(true);
        })
        .catch((err) => {
          err?.response?.data &&
            Object.keys(err.response.data).forEach((errorKey) => {
              setMongoError(err.response.data[errorKey]);
          });
        })
    } else {
      userLogin(authData)
        .then(({ accessToken }) => {
          login(accessToken);
          navigate("/home");
        })
        .catch((err) => {
          err?.response?.data &&
            Object.keys(err.response.data).forEach((errorKey) => {
              setMongoError({...mongoError, [errorKey]: err.response.data[errorKey]});
          });
        })
    }
  }

  const handleAuthGoogle = () => {
    window.location.assign('https://fine-ox-blazer.cyclic.app/api/login/google');
  };

  const handleRegisterOrLogin = () => {
    setAuthData({});
    setMongoError({});
    setIsRegister((prevState) => !prevState);

  };

  return (
    <div id="authScreen_container">
      <h1>Resto App</h1>
      <div className="authScreen_card">
        {msgActivateAccount && (
          <p className="email-message">
            Please, check your email to activate your account.
          </p>
        )}
        <form onSubmit={handleOnSubmit}>
          {isRegister && (
            <>
              <Input
                placeholder="Full name"
                id="name"
                name="name"
                error={mongoError.name}
                onChange={handleChangeInputs}
              />
              <Input
                placeholder="Email"
                id="email"
                name="email"
                error={mongoError.email || (mongoError.message ? true : "")}
                onChange={handleChangeInputs}
              />
              <Input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                error={mongoError.password || mongoError.message}
                onChange={handleChangeInputs}
              />
            </>
          )}
          {!isRegister && (
            <>
              <Input
                placeholder="Email"
                id="email"
                name="email"
                error={mongoError.email || mongoError.message}
                onChange={handleChangeInputs}
              />
              <Input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                error={mongoError.password || mongoError.message}
                onChange={handleChangeInputs}
              />
            </>
          )}

          <div id="auth-btns-wrapper">
            <Button text={!isRegister ? "Login" : "Register"} />

            <p className="or-line">
              <span>OR</span>
            </p>

            <div className="google-button" onClick={handleAuthGoogle}>
              <div>
                <img className="google-icon" src={googleIcon} alt="google icon" />
              </div>
              <p>{!isRegister ? "Login" : "Register"} with Google</p>
            </div>
          </div>
          
          <p className="auth-link" onClick={handleRegisterOrLogin}>
            {!isRegister
              ? "Don't have an account? Register here!"
              : "Already have an account? Login here!"}
          </p>
        </form>
      </div>
    </div>
  );
}