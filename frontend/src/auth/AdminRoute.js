import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// const PrivateRoute = ({component:Component,...rest}) => (
//     <Route {...rest} render={props=> isAuthenticated() ? (
//         <Component {...props}/>
//     ): (
//         <Navigate
//             replace to="/signin"
//         />
//     )}/>
// )
// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
//     return isAuthenticated() ? children : <Navigate to="/signin" />;
// };

export const AdminRoute = ({ children }) => {
  if (isAuthenticated() && isAuthenticated().user.role === 1) {
    return children;
  }

  return <Navigate to="/signin" />;
};
export default AdminRoute;
