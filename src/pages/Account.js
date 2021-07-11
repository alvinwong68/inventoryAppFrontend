import React, { useState, useCallback, useEffect } from "react";
import classes from "./Account.module.css";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/ui/Card";
import NewUserForm from "../components/NewUserForm";
import UserList from "../components/user/UserList";
import * as authActions from "../store/actions/auth";

const Account = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => {
    return state.auth.userDetail;
  });

  const userDetailsList = useSelector((state) => {
    return state.auth.userDetailsList;
  });

  const error = useSelector((state) => {
    return state.inventory.fetchError;
  });

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(authActions.userList());
  }, [dispatch]);

  const showAddHandler = useCallback(() => {
    setShowAdd(true);
  }, []);

  const hideAddHandler = useCallback(() => {
    setShowAdd(false);
  }, []);

  let content = (
    <Card>
      <div className={classes["list__container"]}>
        <h1 style={{ textAlign: "center" }}>User List</h1>
        <UserList userList={userDetailsList} />
      </div>
    </Card>
  );

  if (error) {
    content = (
      <h1 style={{ color: "red", textAlign: "center" }}>{error.errMsg}</h1>
    );
  }

  return (
    <main>
      <div className={classes.container}>
        {userDetail && (
          <h1 style={{ color: "white" }}>
            Welcome {userDetail.displayName} ({userDetail.role})
          </h1>
        )}
        {!showAdd && <button onClick={showAddHandler}>create Account</button>}
        {showAdd && (
          <Card>
            <NewUserForm onHideForm={hideAddHandler} />
          </Card>
        )}
        {content}
      </div>
    </main>
  );
};

export default Account;
