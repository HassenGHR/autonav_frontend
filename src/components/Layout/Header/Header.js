import React, {  useState } from "react";
import { logout } from "../../../actions/UserAction";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import HeaderCartButton from "./HeaderCartButton";
import { TbGps } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CNavbarNav,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,

  CCollapse
} from "@coreui/react";

const Header = (props) => {
  const [visible, setVisible] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Small Screen Header */}
      <div className="lg:hidden">
        <CNavbar className="bg-body-tertiary">
          <CContainer fluid>
            <CNavbarBrand>
              <div className="p-2 flex items-center">
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
            </CNavbarBrand>
            <CNavbarToggler
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
              onClick={() => setVisible(!visible)}
            />
            <COffcanvas
              id="offcanvasNavbar"
              placement="end"
              portal={false}
              visible={visible}
              onHide={() => setVisible(false)}
            >
              <COffcanvasHeader>
                <COffcanvasTitle>
                  <Link
                    className="tracking-wide no-underline hover:scale-110 font-bold text-gray-800 text-xl"
                    to="/"
                  >
                    AutoNav
                  </Link>
                </COffcanvasTitle>
                <CCloseButton
                  className="text-reset"
                  onClick={() => setVisible(false)}
                />
              </COffcanvasHeader>
              <COffcanvasBody>
                <CNavbarNav>
                  <CNavItem>
                    <CNavLink href="/category/أجهزة تعقب" className="font-arabic">أجهزة تعقب</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="/category/لوازم كهربائية">لوازم كهربائية</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="/category/متنوعة">متنوعة</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="#" active>
                      {userInfo ? (
                        <CDropdown variant="nav-item" popper={false}>
                          <CDropdownToggle color="secondary">
                            {userInfo.name}
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href="/profile">Profile</CDropdownItem>
                            <CDropdownItem onClick={logoutHandler} href="#">
                              Logout
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      ) : (
                        <CNavItem>
                          <CNavLink href="/login">
                            <div className="flex items-center space-x-4">
                              <span>تسجيل الدخول</span>
                              <CgProfile className="text-2xl cursor-pointer" />
                            </div>
                          </CNavLink>
                        </CNavItem>
                      )}
                    </CNavLink>
                  </CNavItem>
                  {userInfo && userInfo.isAdmin && (
                    <CDropdown variant="nav-item" popper={false}>
                      <CDropdownToggle color="secondary">Admin</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="/admin/userlist">Users</CDropdownItem>
                        <CDropdownItem href="/admin/productlist">Products</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  )}
                  <CNavItem>
                    <CNavLink href="/cart">
                      <div className="flex items-center space-x-3">
                        <span>سلة المشتريات</span>
                        <HeaderCartButton onClick={props.onShowCart} />
                      </div>
                    </CNavLink>
                  </CNavItem>
                </CNavbarNav>
              </COffcanvasBody>
            </COffcanvas>
          </CContainer>
        </CNavbar>
      </div>

      {/* Large Screen Header */}
      <div className="hidden lg:block">
        <CNavbar expand="lg" className="bg-body-tertiary">
          <CContainer fluid>
            <CNavbarToggler
              aria-label="Toggle navigation"
              aria-expanded={visible}
              onClick={() => setVisible(!visible)}
            />
            <CNavbarBrand>
              <div className="p-2 flex items-center">
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
            </CNavbarBrand>
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav className="me-auto mb-2 mb-lg-0">
                <CNavItem>
                  <CNavLink href="/category/أجهزة تعقب">أجهزة تعقب</CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink href="/category/لوازم كهربائية">لوازم كهربائية</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/category/متنوعة">متنوعة</CNavLink>
                </CNavItem>
              </CNavbarNav>
              <CNavbarNav className="d-flex md:items-center">
                <CNavItem>
                  <CNavLink href="#" active>
                    {userInfo ? (
                      <CDropdown variant="nav-item" popper={false}>
                        <CDropdownToggle color="secondary" size="lg">
                          {userInfo.name}
                        </CDropdownToggle>
                        <CDropdownMenu className="max-w-2" placement="right-end">
                          <CDropdownItem href="/profile">Profile</CDropdownItem>
                          <CDropdownItem onClick={logoutHandler} href="#">
                            Logout
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    ) : (
                      <CNavItem>
                        <CNavLink href="/login">
                          <div className="flex items-center space-x-4">
                            <span>تسجيل الدخول</span>
                            <CgProfile className="text-2xl cursor-pointer" />
                          </div>
                        </CNavLink>
                      </CNavItem>
                    )}
                  </CNavLink>
                </CNavItem>
                {userInfo && userInfo.isAdmin && (
                  <CDropdown variant="nav-item" popper={false}>
                    <CDropdownToggle color="secondary" size="lg">
                      Admin
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="/admin/userlist">Users</CDropdownItem>
                      <CDropdownItem href="/admin/productlist">Products</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                )}
                <CNavItem>
                  <CNavLink href="/cart">
                    <div className="flex items-center space-x-3">
                      <span>سلة المشتريات</span>
                      <HeaderCartButton onClick={props.onShowCart} />
                    </div>
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
      </div>
    </>
  );
};

export default Header;
