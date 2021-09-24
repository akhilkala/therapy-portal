import React, { ReactElement } from "react";
import { Route, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Animation from "./Animation";

interface Props {
  component: React.FC<any>;
  path: string | string[];
  exact?: boolean;
}

export default function PrivateRoute({
  component: Component,
  exact = false,
}: Props): ReactElement {
  const auth = useAuth();
  const location = useLocation();

  return (
    <Route
      exact={exact}
      render={(props: any) => {
        if (auth?.user) {
          return <Component {...props} />;
        } else {
          if (auth?.loading)
            return (
              <div className="screen-center">
                <Animation animation="loading" />
              </div>
            );

          if (location.pathname !== "/") return <NotFound />;
          return <Landing />;
        }
      }}
    />
  );
}
