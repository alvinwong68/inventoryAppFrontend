import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./Authform.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const Authform = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.auth.loading;
  });

  const error = useSelector((state) => {
    return state.auth.error;
  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(authActions.auth(values.email, values.password));
    },
    validationSchema: validationSchema,
  });

  return (
    <section className={classes.auth}>
      <h1>Dave Grocery Store</h1>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
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
          <label htmlFor="password">Your Password</label>
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
        {error && <p>{error.message}</p>}
        <div className={classes.actions}>
          {loading ? <p>login..</p> : <button type="submit">Login</button> }
        </div>
      </form>
    </section>
  );
};

export default Authform;
