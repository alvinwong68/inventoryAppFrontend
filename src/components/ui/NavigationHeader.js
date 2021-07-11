import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./NavigationHeader.module.css";
import * as authActions from "../../store/actions/auth";

const NavigationHeader = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Dave Store</div>
      <nav className={classes.nav}>
        <ul>
          {props.userDetail && props.userDetail.role === "Admin" && <li>
            <NavLink to="/account" activeClassName={classes.active}>
              Create Employee Account
            </NavLink>
          </li> }
          <li>
            <NavLink to="/home" activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li className={classes.logoutAction} onClick={logoutHandler}>
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;
