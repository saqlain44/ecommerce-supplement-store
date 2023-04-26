import React, { useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchProductDetailQuery } from '../product/productApiSlice';
import { addItem, removeItem } from './cartSlice';

type Props = {
  productId?: string;
  qty?: number;
};

const CartProductList = ({ productId, qty = 1 }: Props) => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const { isError, isLoading, error, data } = useFetchProductDetailQuery(
    productId || '',
    { skip: !productId }
  );

  useEffect(() => {
    if (data) {
      dispatch(
        addItem({
          product: data._id,
          qty,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
        })
      );
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (!cartItems || cartItems.length === 0) {
    console.log('hello');
    return (
      <Message time={900000}>
        <div>
          Your Cart is Empty <Link to="/">Go Back</Link>
        </div>
      </Message>
    );
  }

  return (
    <div>
      {cartItems && cartItems.length === 0 ? (
        <Message>
          <div>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </div>
        </Message>
      ) : (
        <ListGroup variant="flush">
          {cartItems &&
            cartItems.map((item) => (
              <ListGroup.Item key={item.product} data-cy="cart-item">
                <Row className="shopping-cart-row">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      className="shopping-cart-image"
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addItem({
                            ...item,
                            qty: parseInt(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => {
                        dispatch(removeItem(item.product));
                      }}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CartProductList;
