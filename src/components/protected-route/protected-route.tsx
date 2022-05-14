import React, { useState, useEffect, FunctionComponent } from "react";
import { useDispatch, useSelector } from "../../types";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { getUser } from "../../services/actions/user";

const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const { name, email } = useSelector((store) => store.user.data);

  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        name || email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
