import React, { useEffect } from "react";
import { useDispatch } from "../../types";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Location } from "history";
import ProtectedRoute from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";
import Main from "../../pages/main/main";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import Orders from "../../pages/orders/orders";
import NotFound from "../../pages/not-found/not-found";
import Modal from "../modal/modal";
import { getIngredients } from "../../services/actions";

interface IAppLocation {
  background: Location
}

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<IAppLocation>();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeHandler = () => {
    history.goBack();
  };

  const background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route path="/feed">
          <Orders />
        </Route>
        <Route path="/ingredients/:id" exact>
          <Ingredient />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id" exact>
          <Modal title="Детали ингредиента" closeHandler={closeHandler}>
            <Ingredient type={"modal"} />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
