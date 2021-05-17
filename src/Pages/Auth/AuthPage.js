import "./authPage.scss";

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { registerNewUser, loginExistingUser } from "../../slices/authSlice";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === confirmPassword.current.value) {
      const userData = {
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
      };
      dispatch(registerNewUser(userData));
    } else {
      alert("passwords do not match");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      email: email.current.value,
      password: password.current.value,
    };

    dispatch(loginExistingUser(userData));
  };

  return isLogin ? (
    <div className="container">
      <img src="/QuickChat.png" alt="QuickChat" />
      <div className="authWrapper">
        <form className="authForm" onSubmit={handleLogin}>
          <div className="authFormInput">
            <label htmlFor="LogEmail" aria-readonly="true">
              Email: &nbsp;
            </label>
            <input
              type="email"
              className="authInput"
              id="LogEmail"
              placeholder="Email"
              required
              ref={email}
            />
          </div>
          <div className="authFormInput">
            <label htmlFor="LogPassword" aria-readonly="true">
              Password: &nbsp;
            </label>
            <input
              type="password"
              className="authInput"
              autoComplete="off"
              id="LogPassword"
              placeholder="Password..."
              required
              ref={password}
            />
          </div>

          <button className="authSubmit" type="submit">
            Submit
          </button>
          <p className="authToggleQuery">
            Don't have an account?{" "}
            <span id="loginToggle" onClick={() => setIsLogin(false)}>
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  ) : (
    <div className="container">
      <img src="/QuickChat.png" alt="QuickChat" />
      <div className="authWrapper">
        <form className="authForm" onSubmit={handleRegister}>
          <div className="authFormInput">
            <label htmlFor="RegEmail">Email:</label>
            <input
              type="email"
              className="authInput"
              id="RegEmail"
              placeholder="Email"
              required
              ref={email}
            />
          </div>
          <div className="authFormInput">
            <label htmlFor="RegUsername">Username:</label>
            <input
              type="text"
              className="authInput"
              id="RegUsername"
              placeholder="Username"
              required
              ref={username}
            />
          </div>
          <div className="authFormInput">
            <label htmlFor="RegConfPassword">Password:</label>
            <input
              type="password"
              className="authInput"
              autoComplete="off"
              id="RegPassword"
              placeholder="Password..."
              required
              ref={password}
            />
          </div>
          <div className="authFormInput">
            <label htmlFor="RegPassword">Confirm:</label>
            <input
              type="password"
              className="authInput"
              autoComplete="off"
              id="RegConfPassword"
              placeholder="Confirm Password..."
              required
              ref={confirmPassword}
            />
          </div>

          <button className="authSubmit" type="submit">
            Submit
          </button>
          <p className="authToggleQuery">
            Already have an account?{" "}
            <span id="loginToggle" onClick={() => setIsLogin(true)}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
