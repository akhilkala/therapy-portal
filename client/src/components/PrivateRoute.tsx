import React, { ReactElement } from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../pages/Landing";
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
          return <Landing />;
        }
      }}
    />
  );
}
