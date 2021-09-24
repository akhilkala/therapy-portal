import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useAuth } from "./context/AuthContext";

export default function App(): ReactElement {
  const auth = useAuth();

  return (
    <React.Fragment>
      <Switch>
        <Route path="/admin" component={Admin} />
        <PrivateRoute exact path="/" component={Home} />
        {auth?.isAdmin() && <PrivateRoute path="/admin" component={Admin} />}
        <Route path="*" component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}
