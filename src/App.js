import AuthPage from "./Pages/Auth/AuthPage";
import ChatMenuPage from "./Pages/ChatMenu/ChatMenuPage";
import "./sass/App.scss";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <AuthPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
