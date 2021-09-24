import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { useAuth } from "./context/AuthContext";
import Teacher from "./pages/Teacher";
import User from "./pages/User";

export default function App(): ReactElement {
  const auth = useAuth();

  const getHomeComponent = () => {
    if (auth?.user?.isAdmin) return Admin;
    else if (auth?.user?.isTeacher) return Teacher;
    else return User;
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/admin" component={Admin} />
        <PrivateRoute
          exact
          path={["/", "/patient-actions", "/feedback"]}
          component={getHomeComponent()}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}
