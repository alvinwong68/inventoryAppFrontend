import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import classes from "./NewUserForm.module.css";
import * as AuthActions from "../store/actions/auth";

const NewUserForm = (props) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.auth.createUserLoading;
  });

  const error = useSelector((state) => {
    return state.auth.createUserError;
  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    displayName: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "Worker",
      displayName: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        AuthActions.createUser(
          values.email,
          values.password,
          values.role,
          values.displayName
        )
      );
    },
    validationSchema: validationSchema,
  });

  return (
    <React.Fragment>
      <h1 style={{ color: "black" }}>Add New Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>
        <div className={classes.control}>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            disabled={true}
            onBlur={formik.handleBlur}
          />
          {formik.touched.role && formik.errors.role ? (
            <p>{formik.errors.role}</p>
          ) : null}
        </div>
        <div className={classes.control}>
          <label htmlFor="displayName">Name</label>
          <input
            type="text"
            id="displayName"
            onChange={formik.handleChange}
            value={formik.values.displayName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.displayName && formik.errors.displayName ? (
            <p>{formik.errors.displayName}</p>
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

export default NewUserForm;
