import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Footer/Layout";
import AboutUs from "./components/Layout/About";

import Delivery from "./components/Layout/Delivery";

import Home from "./pages/Home";
import UserScreen from "./pages/UserScreen";
import RegisterScreen from "./pages/RegisterScreen@";
import ProductScreen from "./pages/ProductScreen";
import ProfileScreen from "./pages/ProfileScreen@";
import CartScreen from "./pages/CartScreen";
import UserListScreen from "./pages/UserListScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import EditUserScreen from "./pages/EditUserScreen";
import ProductCategoryScreen from "./pages/ProductCategoryScreen";
import "bootstrap/dist/css/bootstrap.min.css";



const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/delivery" element={<Delivery />} />

          <Route path="/login" element={<UserScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/product/:id/" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/edit" element={<EditUserScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route
            path="/category/:category"
            element={<ProductCategoryScreen />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
