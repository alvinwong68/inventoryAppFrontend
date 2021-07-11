import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Home.module.css";
import Card from "../components/ui/Card";
import NewItemForm from "../components/NewItemForm";
import InventoryList from "../components/inventory/InventoryList";
import * as inventoryActions from "../store/actions/inventory";

const Home = () => {
  const dispatch = useDispatch();

  const [showAdd, setShowAdd] = useState(false);

  const inventoryList = useSelector((state) => {
    return state.inventory.inventoryList;
  });

  const error = useSelector((state) => {
    return state.inventory.fetchError;
  });

  const userDetail = useSelector((state) => {
    return state.auth.userDetail;
  });

  const showAddHandler = useCallback(() => {
    setShowAdd(true);
  }, []);

  const hideAddHandler = useCallback(() => {
    setShowAdd(false);
    dispatch(inventoryActions.clearAddError());
  }, [dispatch]);

  useEffect(() => {
    dispatch(inventoryActions.fetchInventory());
  }, [dispatch]);

  let content = (
    <Card>
      <div className={classes["list__container"]}>
        <h1 style={{ textAlign: "center" }}>Inventory List</h1>
        <InventoryList inventoryList={inventoryList} />
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
        {!showAdd && <button onClick={showAddHandler}>Add Inventory</button>}
        {showAdd && (
          <Card>
            <NewItemForm onHideForm={hideAddHandler} />
          </Card>
        )}
        {content}
      </div>
    </main>
  );
};

export default Home;
