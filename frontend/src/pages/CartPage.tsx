import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';

import Meta from '../components/Meta';
import CartProductList from '../features/cart/CartProductList';
import { useAppSelector } from '../app/hooks';
import CartSubtotal from '../components/CartSubtotal';

const CartPage = () => {
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const productId = params.productId;
  const qty = parseInt(searchParams.get('qty') || '');

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <Row>
      <Meta title="Nutrition-Strat Cart" />
      <h4 className="shopping-cart-title fw-bold">Shopping Cart</h4>
      <Col md={8}>
        <CartProductList productId={productId} qty={qty} />
      </Col>
      <Col md={4}>
        <CartSubtotal cartItems={cartItems} />
      </Col>
    </Row>
  );
};

export default CartPage;
