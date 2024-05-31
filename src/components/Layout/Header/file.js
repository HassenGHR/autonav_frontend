import React, { useContext, useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import SearchBox from './SearchBox'
import { logout } from "../../../actions/UserAction";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import HeaderCartButton from "./HeaderCartButton";
import { TbGps } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();


  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav id="header" className="w-full z-30 top-0 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <div className="flex items-center order-1 justify-between">
  <div className="order-2 md:order-3 flex items-center gap-4" id="nav-content">
    {userInfo ? (
      <NavDropdown title={userInfo.name} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    ) : (
      <div className="flex items-center gap-2">
        <CgProfile className="text-2xl cursor-pointer" />
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
      </div>
    )}
    {userInfo && userInfo.isAdmin && (
      <NavDropdown title="Admin" id="adminmenue">
        <LinkContainer to="/admin/userlist">
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/admin/productlist">
          <NavDropdown.Item>Products</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    )}
    <HeaderCartButton onClick={props.onShowCart} />
  </div>
</div>

          <div className="flex items-center order-1"></div>

          {/* Middle Section */}
          <div className="order-2 md:order-2 flex items-center justify-center flex-grow">
            {" "}
            {/* Modified */}
            {/* AutoNav Title */}
            <div className="p-3 flex items-center">
              <TbGps
                className="mr-1 transition-transform transform hover:scale-110"
                style={{ fontSize: "1.5rem" }}
              />
              <Link
                className="tracking-wide no-underline hover:scale-110 font-bold text-gray-800 text-xl"
                to="/"
              >
                AutoNav
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="order-3 flex items-center">
            {/* Categories */}
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  to="/category/أجهزة تعقب"
                  className="text-gray-800 hover:underline"
                >
                  أجهزة تعقب
                </Link>
              </li>
              <li>
                <Link
                  to="/category/عقاقير"
                  className="text-gray-800 hover:underline"
                >
                  عقاقير
                </Link>
              </li>
              <li>
                <Link
                  to="/category/لوازم منزلية"
                  className="text-gray-800 hover:underline"
                >
                  لوازم منزلية
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
