import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "./store/actions/auth";
import { Redirect, Switch, Route } from "react-router-dom";
//import Login from "./pages/Login";
//import Home from "./pages/Home";
//import Account from "./pages/Account";
import NavigationHeader from "./components/ui/NavigationHeader";
import Spinner from "./components/ui/Spinner";

const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const Account = React.lazy(() => import("./pages/Account"));

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const userDetail = useSelector((state) => {
    return state.auth.userDetail;
  });

  useEffect(() => {
    dispatch(authActions.authCheckState());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <Suspense fallback={Spinner}>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={Spinner}>
      <NavigationHeader userDetail={userDetail} />
      <Switch>
        {userDetail && userDetail.role === "Admin" && (
          <Route path="/account" exact>
            <Account />
          </Route>
        )}
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
