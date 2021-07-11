import React from 'react';
import classes from "./UserItem.module.css";

const UserItem = (props) => {
    return (
      <div className={classes.user}>
        <h3>{props.displayName}</h3>
        <div className={classes.email}>{props.email}</div>
        <div className={classes.role}>Role: {props.role}</div>
      </div>
    );
};

export default UserItem;