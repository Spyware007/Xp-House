import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "qwert@gmail.com",
    password: "Pass@123",
    error: "",
    loading: false,
    redirectToreferrer: false,
  });

  const { email, password, loading, error, redirectToreferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToreferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Password
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectToreferrer) {
      if (user && user.role === 1) {
        return <Navigate replace to="/admin/dashboard" />;
      } else {
        return <Navigate replace to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate replace to="/" />;
    }
  };

  return (
    <>
      <Layout
        title='"Signin'
        description="Signin to App"
        className="container col-md-8 offset-md-2"
      >
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
      </Layout>
    </>
  );
};

export default Signin;
