import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import OrderSummary from '../../components/OrderSummary';
import { useCreateOrderMutation } from './orderApiSlice';
import {cartResetItems} from '../cart/cartSlice';

const PlaceOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { shippingAddress, cartItems, paymentMethod } = useAppSelector(
    (state) => state.cart
  );

  const [createOrder, { error, isError, isLoading, data }] =
    useCreateOrderMutation();

  console.log('data', data);

  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);

  // Calculate prices
  const addDecimals = (num: number) => {
    return +(Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    if (cartItems) {
      setItemsPrice(
        addDecimals(
          cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      );
      setDisableBtn(cartItems.length === 0);
    } else {
      setDisableBtn(true);
    }
  }, [cartItems]);

  useEffect(() => {
    setShippingPrice(addDecimals(itemsPrice > 100 ? 0 : 100));
    setTaxPrice(addDecimals(Number((0.15 * itemsPrice).toFixed(2))));
    setTotalPrice(
      +(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(
        2
      )
    );
  }, [itemsPrice]);

  useEffect(() => {
    if (data) {
      dispatch(cartResetItems());
      navigate(`/orders/${data._id}`);
    }
  }, [data]);

  const placeOrderHandler = () => {
    if (cartItems && shippingAddress && paymentMethod) {
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    }
  };

  return (
    <OrderSummary
      itemsPrice={itemsPrice}
      shippingPrice={shippingPrice}
      taxPrice={taxPrice}
      totalPrice={totalPrice}
    >
      <ListGroup.Item>
        {isError && <ErrorMessage error={error} />}
      </ListGroup.Item>
      <ListGroup.Item>
        {isLoading ? (
          <Loader />
        ) : (
          <Button
            type="button"
            className="btn-block"
            disabled={disableBtn}
            onClick={placeOrderHandler}
            data-cy="btn-place-order"
          >
            Place Order
          </Button>
        )}
      </ListGroup.Item>
    </OrderSummary>
  );
};

export default PlaceOrder;
