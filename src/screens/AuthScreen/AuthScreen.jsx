import React, { useContext, useState } from 'react';
import googleIcon from '../../assets/images/google-icon.png';
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
    window.location.assign(`http://localhost:3001/api/login/google`);
  };

  const handleRegisterOrLogin = () => {
    setAuthData({});
    setMongoError({});
    setIsRegister((prevState) => !prevState);

  };

  return (
    <div id="homeScreen_container">
      <h1>Resto App</h1>
      <div className="homeScreen_card">
        <h2>Login</h2>
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
                error={mongoError.email || (mongoError.message ? true : '')}
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

          <Button text={!isRegister ? "LOGIN" : "REGISTER"} />

          <div className="google-button" onClick={handleAuthGoogle}>
            <div className="flex-div">
              <img className="google-icon" src={googleIcon} alt="google icon" />
              <p>{!isRegister ? "Login" : "Register"} with Google</p>
            </div>
          </div>

          {!isRegister ? 
            (<p className="login-link" onClick={handleRegisterOrLogin}>
                Don't have an account? <span>Register here!</span>
            </p>)
            :
            (<p className="register-link" onClick={handleRegisterOrLogin}>
                Already have an account? <span>Login here!</span>
            </p>)
          }
        </form>
      </div>
    </div>
  );
}