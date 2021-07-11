import React from "react";
import UserItem from "./UserItem";

const UserList = (props) => {
  const users = props.userList.map((user) => {
    return (
      <UserItem
        key={user.id}
        id={user.id}
        displayName={user.displayName}
        role={user.role}
        email={user.email}
      />
    );
  });

  return <div>{users}</div>;
};

export default UserList;
