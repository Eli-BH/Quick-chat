import "./authPage.scss";
import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return isLogin ? (
    <div className="container">
      <img src="/QuickChat.png" alt="QuickChat" />
      <div className="authWrapper">
        <form className="authForm">
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
        <form className="authForm">
          <div className="authFormInput">
            <label htmlFor="RegEmail">Email:</label>
            <input
              type="email"
              className="authInput"
              id="RegEmail"
              placeholder="Email"
              required
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
            />
          </div>
          <div className="authFormInput">
            <label htmlFor="RegConfPassword">Password:</label>
            <input
              type="password"
              className="authInput"
              autoComplete="off"
              id="RegConfPassword"
              placeholder="Password..."
              required
            />
          </div>
          <div className="authFormInput">
            <label htmlFor="RegPassword">Confirm:</label>
            <input
              type="password"
              className="authInput"
              autoComplete="off"
              id="RegPassword"
              placeholder="Confirm Password..."
              required
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
