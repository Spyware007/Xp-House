import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import DashBoard from "./user/UserDashBoard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Navigate replace to="/" />} />
          <Route
            exact
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashBoard />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/create/category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/create/product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
