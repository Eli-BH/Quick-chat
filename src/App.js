import AuthPage from "./Pages/Auth/AuthPage";
import ChatMenuPage from "./Pages/ChatMenu/ChatMenuPage";
import "./sass/App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useSelector } from "react-redux";
import { authSelector } from "./slices/authSlice";

const App = () => {
  const { userToken } = useSelector(authSelector);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">{userToken ? <ChatMenuPage /> : <AuthPage />}</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
