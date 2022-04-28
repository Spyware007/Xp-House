import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";

// const isActive = (history,path)=>{
//   console.log(history)
//   if(history.location.pathname === path){
//     return {color:"#ff9900"}
//   }else{
//     return {volor:"#ffffff"}
//   }
// }

const Menu = ({ history }) => {
  let navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/shop">
            Shop
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/cart">
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </NavLink>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/signin"
              >
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              style={{ cursor: "pointer", color: "#fff" }}
              className="nav-link"
              onClick={() => signout(() => navigate("/"))}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
