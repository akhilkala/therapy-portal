import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useAuth } from "./context/AuthContext";
import Animation from "./components/Animation";

export default function App(): ReactElement {
  const auth = useAuth();

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <div className="screen-center">
            <Animation animation="loading" />
          </div>
          <Route path="/admin" component={Admin} />
          <PrivateRoute exact path="/" component={Home} />
          {auth?.isAdmin() && <PrivateRoute path="/admin" component={Admin} />}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
