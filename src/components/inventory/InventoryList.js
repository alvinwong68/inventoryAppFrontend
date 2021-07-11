import React from "react";
import InventoryItem from "./InventoryItem";

const InventoryList = (props) => {
  const inventories = props.inventoryList.map((inventory) => {
    return (
      <InventoryItem
        key={inventory.id}
        id={inventory.id}
        title={inventory.title}
        description={inventory.description}
        quantity={inventory.quantity}
      />
    );
  });

  return <div>{inventories}</div>;
};

export default InventoryList;
