import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Manager from './pages/Manager';
import OrderDetails from './pages/OrderDetails';
import NotFound from './pages/NotFound';
import Seller from './pages/Seller';
import SellerDetails from './pages/detailsSeller';
import CustomerOrders from './pages/CustomerOrders';

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/admin/manage" element={ <Manager /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/seller/orders" element={ <Seller /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerDetails /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
      <Route exact path="*" element={ <NotFound /> } />
    </Routes>
  );
}
