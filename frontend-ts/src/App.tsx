import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

import Header from './components/Header';
import AdminOrderListPage from './pages/AdminOrderListPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AuthenticityPage from './pages/AuthenticityPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import UserEditPage from './pages/UserEditPage';
import UserListPage from './pages/UserListPage';

function App() {
  return (
    <Router>
      <Header />

      <main
        className="py-3"
        style={{
          marginTop: '50px',
        }}
      >
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/search/:keyword" element={<ProductListPage />} />
            <Route path="/page/:pageNumber" element={<ProductListPage />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<ProductListPage />}
            />
            <Route
              path="/collections/:collection"
              element={<ProductListPage />}
            />
            <Route
              path="/collections/:collection/page/:pageNumber"
              element={<ProductListPage />}
            />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart/:productId" element={<CartPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
            <Route path='/admin/productlist' element={<AdminProductListPage />} />
            <Route path='/admin/productlist/:pageNumber' element={<AdminProductListPage />} />
            <Route path='/admin/product/:id/edit' element={<AdminProductEditPage />} />
            <Route path='/admin/orderlist' element={<AdminOrderListPage />} />
            <Route path='/authenticity' element={<AuthenticityPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
