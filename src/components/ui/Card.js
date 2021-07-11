import React from 'react';
import classes from "./Card.module.css";

const Modal = (props) => {
    return (
        <div className={classes["new-item"]}>
            {props.children}
        </div>
    );
};

export default Modal;