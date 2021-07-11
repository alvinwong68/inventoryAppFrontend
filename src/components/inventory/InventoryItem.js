import React from "react";
import classes from "./InventoryItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as inventoryActions from "../../store/actions/inventory";

const InventoryItem = (props) => {
  const dispatch = useDispatch();


  const userDetail = useSelector((state) => {
    return state.auth.userDetail
  })

  const deleteInventoryHandle = (id) => {
    dispatch(inventoryActions.deleteInventory(id));
  };

  const editInventoryHandle = (id, add = true) => {
    let newQty;
    if (add) {
      newQty = props.quantity + 1;
    } else {
      newQty = props.quantity - 1;
    }
    dispatch(inventoryActions.editInventory(id, { quantity: newQty }));
  };

  return (
    <div className={classes.inventory}>
      <h3>{props.title}</h3>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.quantity}>Qty: {props.quantity}</div>
      <div className={classes.actions}>
        <button
          onClick={() => {
            editInventoryHandle(props.id);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            editInventoryHandle(props.id, false);
          }}
          disabled={props.quantity > 0 ? false : true}
        >
          -
        </button>
        {userDetail && userDetail.role === "Admin" && <button
          style={{ color: "red" }}
          onClick={() => {
            deleteInventoryHandle(props.id);
          }}
        >
          X
        </button>}
      </div>
    </div>
  );
};

export default InventoryItem;
