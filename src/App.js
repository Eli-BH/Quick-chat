import AuthPage from "./Pages/Auth/AuthPage";
import ChatMenuPage from "./Pages/ChatMenu/ChatMenuPage";
import "./sass/App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useSelector } from "react-redux";
import { authSelector } from "./slices/authSlice";
import RoomPage from "./Pages/Room/RoomPage";
import { useEffect } from "react";

const App = () => {
  const { userToken } = useSelector(authSelector);
  const userId = localStorage.getItem("userToken");

  useEffect(() => {}, [userId]);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {userToken || userId?.length ? <ChatMenuPage /> : <AuthPage />}
          </Route>
          <Route path="/room/:room">
            <RoomPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
