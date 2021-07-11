import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import classes from "./NewItemForm.module.css";
import * as inventoryActions from "../store/actions/inventory";

const NewItemForm = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.inventory.addLoading;
  });

  const error = useSelector((state) => {
    return state.inventory.addError;
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    quantity: Yup.number().required().min(1),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      quantity: 0,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        inventoryActions.addInventory(
          values.title,
          values.description,
          values.quantity
        )
      );
    },
    validationSchema: validationSchema,
  });

  return (
    <React.Fragment>
      <h1 style={{ color: "black" }}>Add New Inventory</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={formik.handleChange}
            value={formik.values.title.toUpperCase()}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <p>{formik.errors.title}</p>
          ) : null}
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <p>{formik.errors.description}</p>
          ) : null}
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <p>{formik.errors.quantity}</p>
          ) : null}
        </div>
        {!loading ? (
          <div className={classes.actions}>
            <button type="submit">Save</button>
            <button
              type="button"
              style={{ marginLeft: "0.5rem" }}
              onClick={props.onHideForm}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p style={{ color: "black" }}>Sending Request..</p>
        )}
        {error && <p style={{ color: "red" }}>{error.errMsg}</p>}
      </form>
    </React.Fragment>
  );
};

export default NewItemForm;
