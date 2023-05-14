import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { CartItem } from '../features/cart/cartSlice';

type Props = {
  cartItems?: CartItem[] | null;
};

const CartSubtotal = ({ cartItems = null }: Props) => {
  const navigate = useNavigate();

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setDisable(false);
    }
  }, [cartItems]);

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>
            Subtotal (
            {cartItems &&
              cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            )
          </h4>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            disabled={disable}
            onClick={checkoutHandler}
            data-cy="btn-proceed-to-checkout"
          >
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CartSubtotal;
